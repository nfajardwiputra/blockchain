import {createApp} from "./app.js";
import {Crypto} from "./src/crypto/Crypto.js";

createApp("CRYPTO", (server, peers) => {
    const rootWallet = {
        "privateKey": "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2d0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktrd2dnU2xBZ0VBQW9JQkFRREVHN3YyOVJFRDZRWFkKbkZBYVl3M0RlNzBLK1lKQXBTM1pscHpxT2tWNDNINGVJSUVSNGRwNmFjeEJQSlFubUlkSTMrdzZwZS9waHNHbAp1QkZweWFTYmFZLzdBNE1obUNvUW5EMmxkZnZkNkxtN09qL3AzVG12TUcrNlh5TFZ3dmlNbGNsdERjd2EzZTZXClhZTkRZZjQ1WUVaSFdWSEFLVEE4N1o2OTg1UGtTdmdVUzdvUTRVNjVIYVhtYUZGZDhraXZSa1F0WElucGhRSTcKTUpjZG1CUzVQM3hLWVk4NzQ2TXFQek1Ocy9TMHQvZ1JEQnh4c2xUdjQySHBOd3phSmJHYThmNmlTU3BSeUJxMQpQdkxEWVdUa05uYllGT3pIenJDNnZOdkdzaDZtdk56V1RsWUE3SDVoelEvZGpmRXZxekZ5YURXKzNQa3hvY3pwCkduVHpQM1p4QWdNQkFBRUNnZ0VCQUlZSVRwZWpOMVhzMWNvT1M5RTlFaE1oWnpzdy9RMGgyQXgzSEJnYWE1RUgKWWt0RSsvSTA0eFgzYVZyTkJKVnJja3NrZ0ZnMVFadmlOa2dGWGlGblo5R3dmRytiSHV5L0MwRC9DRU1tT0ZhYQowUlpkNFlEOWFvZUtHMUxONHdrbWtLbkZWajNxeUMwMHNmU2pSU3V3dGdpUS9IZVhYSUJ4cGo1K1NaaVorZUoxCkJnMHVQNy9MdXRNdHFVbGFYMXlxUFdNR3l0Z2E5bVNvUS9kQ2lWQlcrcThSRjJTWFdKV0pmUWZtanp5ZFN1NmEKNkdWelpWaUUzeFltUkVXcGtZaVhSMjZ1QnpGMTluODB2dGgwcUpKYi8weDNXRnBuM0RWNlZhSm5CV3ZINFQ1aApPczdwdGR2ZHR3K2wxWThyUUN3bmFObzRDMmZiRXNHQ2N3NldNN1FycmdFQ2dZRUEva2MvNnZJUmRvaWNkbDh6CnpWZ3lrS3ZjVXFqcW1TQy84eERHNVZRV1NjL3VPVURLT1E0UGpvaWJFU2JvRmliY1YyQXkyaW1HbUxRZjR1SUkKczIxUlBqTDNReUU2aGhGcXE0WXZocTFVYnN5QTdIY1BMRFBjUUZVWSs2OWticnlRdHVtbGVSaHJiL2hKbU5PVQp1V0dGbkg1WWUxeDdET1hVRkFEdlVwRzRRWmtDZ1lFQXhXK29BN1pjcDVlK1BzNFppUTZ6aTM3TGUwa1FiRlFYCi93ZEN5QW1ic3pGUEI3K3FTQ2o0VXVXL1FES0lWd0t3N2JzcEIxTEVDZjExaG95L3FPeVM0bnBJYlZKWVdMQTYKc2taUUhSVldzNzhuQ3JZL2RqK1k4VUwwdHJJNS8yK2ZSVDVXL2hJakNNSDFZQ1l0L0VjdE1GckxicXNpdUR6ZQpTeDhTN3h6UGtwa0NnWUVBbGhkQVoxSVRkTUFXZXRpZkh5cGNUb0RqUC9kczRvNHVQeTg3OThtMmprTXAvcWw3CnRFblViUEc5ZGxaYzBCYUlJUnNyYVJMeDI5a1dxVGw2b1U1NWtobExVbGllenR3ZzlyWHgvN0Q0RVo2c3l1ZE0KRVc5YkpxNFVYUnVlVUs4RlRMS0ZkZ0V3Q1p1bzlZaU9WUTUzYTNRNGpqaDhlWlIvcG44V3hNbzIxS0VDZ1lCbgo2UWdJVENZZm5tRm1OSnFENDlUakNleVdDakkya1Z1L3dWYUlhV1lrdlVMVzFTME5wV0pzWHJaMVZ5TWlpQ3dPCk1uNjVkL250T0JSdXFBMEhIdHQvanRRbmxUc2lFajRTTGFka1p5S21uMmd3M3hJdmJmRlVxT1NhY3RyTGNUZmwKL1pWVFNzQmRqNWRRNzBjc2kxbGhKYWdEcXRZdkdQbjFsM2tqbDRvM29RS0JnUUREbWh6aGQ1YnRmdlZDQkV3LwpDRlo1S1diT3B0dXZ3dUI0MElsNHk4RHl3UVZCTEtKdkJPd05VNHZZamwrUDVwbjBNK2F3alV5Y2U0Z2tkTDBQCkprWXVvMzhlNU90TkpxWWdaUm9EQkxva3ZQZTRKdUJOeG5XQXNrdTgrU3I3eXVaeFRiV0hjYzFtV3Jmd0lRL1oKS04xVjVCL0RyYmNMQk9PaVVRM3RVNVRIK1E9PQotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tCg==",
        "publicKey": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF4QnU3OXZVUkEra0YySnhRR21NTgp3M3U5Q3ZtQ1FLVXQyWmFjNmpwRmVOeCtIaUNCRWVIYWVtbk1RVHlVSjVpSFNOL3NPcVh2NlliQnBiZ1JhY21rCm0ybVArd09ESVpncUVKdzlwWFg3M2VpNXV6by82ZDA1cnpCdnVsOGkxY0w0akpYSmJRM01HdDN1bGwyRFEySCsKT1dCR1IxbFJ3Q2t3UE8yZXZmT1Q1RXI0RkV1NkVPRk91UjJsNW1oUlhmSklyMFpFTFZ5SjZZVUNPekNYSFpnVQp1VDk4U21HUE8rT2pLajh6RGJQMHRMZjRFUXdjY2JKVTcrTmg2VGNNMmlXeG12SCtva2txVWNnYXRUN3l3MkZrCjVEWjIyQlRzeDg2d3VyemJ4ckllcHJ6YzFrNVdBT3grWWMwUDNZM3hMNnN4Y21nMXZ0ejVNYUhNNlJwMDh6OTIKY1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
        "address": "4c1e857f3c87557054e244c6927918f8"
    };

    const totalSupply = 1000;

    const syncTrxPath = "/transactions";

    const blockChain = new Crypto(peers, syncTrxPath, rootWallet, totalSupply);

    /******************* CONSUMED By Client & Nodes ***************************/

    /** List all block, this endpoint use to sync chain */
    server.get("/", (req, res) => res.json(blockChain.chain.blocks));

    /** Trigger to sync */
    server.post("/", async (req, res) => res.json(await blockChain.selfSync()));

    /** List all current transactions, this endpoint use to sync transactions */
    server.get(syncTrxPath, (req, res) => res.json(blockChain.transactions));



    /********************* CONSUMED By Client ********************************/

    /** Create new wallet, will not store in blockchain */
    server.post("/wallet", async(req, res) => res.json(await blockChain.createWallet()));

    /** Get balance of address */
    server.get("/balance/:address", async(req, res) => res.json(await blockChain.getBalance(req.params.address)));

    /** Create new transaction, build only not yet broadcast */
    server.post("/transaction", (req, res) => {
        blockChain.createTransaction(req.body)
            .then(data => res.json(data))
            .catch(e => res.json({"error": e.message}))
    });
    server.post("/transaction-submit", (req, res) => {
        blockChain.submitTransaction(req.body)
            .then(data => res.json(data))
            .catch(e => res.json({"error": e.message}))
    });

    /** Create new block when transactions not empty */
    server.post("/mine", (req, res) => {
        blockChain.mineTransaction(req.body)
            .then(data => res.json(data))
            .catch(e => res.json({"error": e.message}))
    });
});
