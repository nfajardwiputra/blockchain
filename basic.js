import {createApp} from "./app.js";
import {BlockChain} from "./src/blockchain/BlockChain.js";

createApp("BASIC", (server, peers) => {
    const blockChain = new BlockChain(peers);

    /******************* CONSUMED By Client & Nodes ***************************/

    /** List all block, this endpoint use to sync chain */
    server.get("/", (req, res) => res.json(blockChain.chain.blocks));

    /** Trigger to sync */
    server.post("/", async (req, res) => res.json(await blockChain.selfSync()));


    /********************* CONSUMED By Client ********************************/

    /** Create new block */
    server.post("/mine", async(req, res) => res.json(await blockChain.mineBlock()));
});
