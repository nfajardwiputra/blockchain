import {Block} from "./Block.js"

export class Chain {

    /**
     * @class Chain
     * @param genesisBlock {Block}
     */
    constructor(genesisBlock) {
        this.blocks = [];

        this.addBlock(genesisBlock);

        console.log(`Create chain initial chain ${JSON.stringify(genesisBlock)}`);
    }

    /**
     * Add new block to chain with validation
     * @param block {Block}
     */
    addBlock(block) {
        this.replace(this.blocks.concat(block));
    }

    /**
     * Replace current list blocks with validation
     * @param blocks {Block[]}
     */
    replace(blocks = []) {
        for (let index = blocks.length - 1; index > 0; index--) {
            if (blocks[index].prevHash !== blocks[index - 1].hash) {
                return;
            }
        }

        this.blocks = JSON.parse(JSON.stringify(blocks));
    }

    /**
     * Get genesis block
     *
     * @return {Block}
     */
    getFirsBlock() {
        return this.blocks[0];
    }

    /**
     * Get latest block
     *
     * @return {Block}
     */
    getLastBlock() {
        return this.blocks[this.blocks.length - 1];
    }

}
