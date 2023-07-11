import crypto from "crypto";

export class Transaction {

    /**
     * @class Transaction
     * @param from {string}
     * @param to {string}
     * @param amount {number}
     */
    constructor(from, to, amount) {
        if (!from || !to || !this.validAddress(from) || !this.validAddress(to) || isNaN(amount)) {
            throw new Error("Invalid input");
        }

        this.from = from;
        this.to = to;
        this.amount = Number(amount);
        this.timestamp = Date.now();

        console.log(`Create transaction ${this.toString()}`);
    }

    /**
     * Stringify core data
     *
     * @return {string}
     */
    toString() {
        return JSON.stringify({
            timestamp: this.timestamp,
            from: this.from,
            to: this.to,
            amount: this.amount
        });
    }

    /**
     * Check if string is a valid MD5 Hash
     * @param param
     * @return {boolean}
     */
    validAddress(param) {
        const regexExp = /^[a-f0-9]{32}$/gi;

        return regexExp.test(param);
    }

    /**
     * Create signature of current transaction
     * @param publicKey {string}
     * @param privateKey {string}
     */
    sign(publicKey, privateKey) {
        const shaSign = crypto.createSign("SHA256");
        shaSign.update(this.toString()).end();

        // set public key sender if success signed
        this.publicKey = publicKey;
        this.signature = Buffer.from(shaSign.sign(
            Buffer.from(privateKey, "base64").toString()
        )).toString("base64");

        return this;
    }

    /**
     * Validate signature with current transaction
     * @param publicKey {string}
     * @param signature {string}
     */
    verify(publicKey, signature) {
        const verify = crypto.createVerify("SHA256");
        verify.update(this.toString());

        if (!verify.verify(
            Buffer.from(publicKey, "base64").toString(),
            Buffer.from(signature, "base64"))) {

            throw new Error("Invalid transaction");
        }

        // set public key sender if success validate
        this.publicKey = publicKey;
        this.signature = signature;

        return this;
    }

}
