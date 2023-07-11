import axios from "axios";

import {BlockChain} from "../blockchain/BlockChain.js";
import {Block} from "../blockchain/Block.js";
import {Transaction} from "./Transaction.js";
import {Wallet} from "./Wallet.js";

export class Crypto extends BlockChain {

    /**
     * @class Crypto
     * Class which implement chain => block => transaction crypto
     * @param nodePeers {string[]}
     * @param syncTrxPath {string}
     * @param rootWallet {Object}
     * @param totalSupply {number}
     */
    constructor(nodePeers, syncTrxPath, rootWallet, totalSupply) {
        super(nodePeers);

        this.syncTrxPath = syncTrxPath;

        this.rootWallet = new Wallet(rootWallet);
        this.totalSupply = totalSupply;

        this.transactions = [];

        this.createGenesisTransaction();
    }

    /**
     * Create initial transaction for root wallet
     */
    createGenesisTransaction() {
        const transaction = new Transaction(this.rootWallet.address, this.rootWallet.address, this.totalSupply);
        transaction.from = "0000";
        transaction.sign(this.rootWallet.publicKey, this.rootWallet.privateKey);

        this.chain.getFirsBlock().data.push(transaction.verify(transaction.publicKey, transaction.signature));
    }

    /**
     * Create new account holder (wallet)
     * @return {Wallet}
     */
    async createWallet() {
        return new Wallet();
    }

    /**
     * Build transaction from payload
     *
     * @param payload
     */
    async buildTransaction(payload) {
        const transaction = new Transaction(payload.from, payload.to, payload.amount);

        if (await this.getBalance(payload.from) < transaction.amount) {
            throw new Error("Insufficient balance");
        }

        return transaction;
    }

    /**
     * Create signed transaction
     *
     * @param payload
     */
    async createTransaction(payload) {
        const transaction = await this.buildTransaction(payload);

        return transaction.sign(payload.publicKey, payload.privateKey);
    }

    /**
     * Broadcast validated transaction to chain and waiting to mining
     *
     * @param payload
     * @return {Promise<Transaction>}
     */
    async submitTransaction(payload) {
        const transaction = await this.buildTransaction(payload);
        transaction.timestamp = payload.timestamp;
        transaction.verify(payload.publicKey, payload.signature)

        if (transaction.signature) {
            this.transactions.push(transaction);

            await this.broadcastSync();
        }

        return transaction;
    }

    /**
     * Get balance of specific address
     *
     * @param address
     * @return {Promise<number>}
     */
    async getBalance(address) {
        await this.selfSync();

        let balance = 0;

        if ("0000" !== address) {
            for (let b in this.chain.blocks) {
                for (let d in this.chain.blocks[b].data) {
                    const transaction = this.chain.blocks[b].data[d];

                    if (transaction.from === address) {
                        balance = balance - transaction.amount;
                    } else if (transaction.to === address) {
                        balance = balance + transaction.amount;
                    }
                }
            }
        }

        return balance;
    }


    /** Override super class to implement crypto */

    /**
     * Override super mining
     * to void empty transactions when create new block
     * and implement custom for crypto
     * @param payload {Object}
     * @return {Promise<void>}
     */
    async mineTransaction(payload) {
        if (!this.transactions.length) {
            throw new Error("No transaction in block to mining");
        }

        if (!payload.address) {
            throw new Error("Unknown mining address");
        }

        // add fee to miner
        const fee = this.transactions.reduce((total, trx) => {
            return total + trx.amount;
        }, 0) / this.transactions.length * 0.05;

        const transaction = await this.createTransaction({
            ...this.rootWallet,
            from: this.rootWallet.address,
            to: payload.address,
            amount: fee
        });

        await this.submitTransaction(transaction);

        return super.mineBlock();
    }

    /**
     * Override super to add transactions
     *
     * @param index {number}
     * @param previousHash {string}
     * @param pow {number}
     * @return {Block}
     */
    createBlock(index, previousHash, pow) {
        const block = new Block(index, previousHash, pow, this.transactions);

        // emptying transaction and update timestamp
        this.transactions = [];

        return block;
    }

    /**
     * Hook to trigger sync
     * @return {Promise<*[]>}
     */
    selfSync() {
        return super.selfSync().then(async activePeers => {
            for (let peer in activePeers) {
                try {
                    // http call other node to sync transactions
                    const transactions = (await axios.get(`${peer}${this.syncTrxPath}`)).data;

                    console.log(`Synced from ${peer} with ${transactions.length} transactions`);

                    if (transactions.length > this.transactions.length) {
                        console.log(`Replacing transactions from other node ${peer}`);

                        this.transactions = transactions;
                    }
                } catch (error) {
                    console.log(`Unable to sync to node ${peer}:`, error.message);
                }
            }
        });
    }

}
