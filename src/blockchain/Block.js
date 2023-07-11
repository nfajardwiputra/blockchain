import crypto from "crypto-js";

export class Block {

    /**
     * @class Block
     * which data is accept anything value,
     * it mean block can be fill data for transaction,
     * for property and etc
     *
     * @param index {number}
     * @param prevHash {string}
     * @param pow {number} proof of work
     * @param data {Object | Object[]}
     */
    constructor(index = 0, prevHash = "0", pow = 9, data = []) {
        this.index = index;
        this.prevHash = prevHash;
        this.data = data;
        this.pow = pow;

        this.timestamp = Date.now();
        this.hash = this.hashBlock();

        console.log(`Create block ${JSON.stringify(this)}`);
    }

    /**
     * Create SHA256 of this block
     * @returns {string}
     */
    hashBlock() {
        return crypto.SHA256(JSON.stringify({
            index: this.index,
            prevHash: this.prevHash,
            timestamp: this.timestamp,
            data: this.data
        })).toString();
    }

}
