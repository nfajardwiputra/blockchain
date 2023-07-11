import axios from "axios";

import {Chain} from "./Chain.js";
import {Block} from "./Block.js";

export class BlockChain {

    /**
     * @class BlockChain
     * Class which implement chain => block => data
     * @param nodePeers {string[]}
     */
    constructor(nodePeers) {
        this.nodePeers = nodePeers;

        this.createGenesisBlock();

        console.log(`Create node with paired to ${nodePeers.join(",")}`);
    }

    /**
     * Create initial genesis block
     */
    createGenesisBlock() {
        this.chain = new Chain(new Block());
    }

    /**
     * Create new block,
     * separate method to override in other implementation
     *
     * @param index {number}
     * @param previousHash {string}
     * @param pow {number}
     * @return {Block}
     */
    createBlock(index, previousHash, pow) {
        return new Block(index, previousHash, pow);
    }

    /**
     * Create a proof with incrementing the incrementor until it's equal
     * to a number divisible by firstProof (genesis) and the proof of work
     * of the previous block in the chain
     *
     * @param firstProof
     * @param lastProof
     * @return {*}
     */
    proofOfWork(firstProof, lastProof) {
        let incrementor = lastProof + 1;

        // any logic
        while (!(incrementor % firstProof === 0 && incrementor % lastProof === 0)) {
            incrementor += 1;
        }

        return incrementor;
    }

    /**
     * Mining new block
     *
     * @return {Promise<Block>}
     */
    async mineBlock() {
        await this.selfSync();

        const firstBlock = this.chain.getFirsBlock();
        const firstProof = firstBlock.pow;

        const lastBlock = this.chain.getLastBlock();
        const lastProof = lastBlock.pow;

        const pow = this.proofOfWork(firstProof, lastProof);
        const block = this.createBlock(lastBlock.index + 1, lastBlock.hash, pow);

        this.chain.addBlock(block);

        await this.broadcastSync();

        return block;
    }

    /**
     * Call other paired nodes to trigger sync of that node
     * @return {Promise<void>}
     */
    async broadcastSync() {
        for (let peer of this.nodePeers) {
            try {
                // call another node to trigger sync at that node
                await axios.post(peer);

                console.log(`Broadcast to ${peer} with ${peer}`);
            } catch (error) {
                console.log(`Unable to broadcast to node ${peer}:`, error.message);
            }
        }
    }

    /**
     * Check and validate longest block,
     * it mean that node is very up to date
     *
     * @return {Promise<*[]>}
     */
    async selfSync() {
        const otherBlocksChains = [];

        for (let peer of this.nodePeers) {
            try {
                otherBlocksChains[peer] = (await axios.get(peer)).data;

                console.log(`Synced from ${peer} with ${otherBlocksChains[peer].length} blocks`);

                if (otherBlocksChains[peer].length > this.chain.blocks.length) {
                    console.log(`Replacing blocks from other node ${peer}`);

                    // todo logic to validate every block
                    this.chain.replace(otherBlocksChains[peer]);
                }
            } catch (error) {
                console.log(`Unable to sync from node ${peer}:`, error.message);
            }
        }

        return otherBlocksChains;
    }

}
