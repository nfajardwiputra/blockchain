import ip from "ip";
import express from "express";
import bodyParser from "body-parser";

/**
 * Create common express.js config
 * @param prefix {string} log prefix
 * @param configure
 */
export function createApp(prefix, configure) {
    /** Instance express js server */
    const server = express();
    server.use(bodyParser.json());

    /** CORS */
    server.all("*", (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        next();
    });

    /** Argument parsed */
    const httpPort = process.env.PORT || 9090;
    const peers = process.env.NODE_PAIRS
        ? process.env.NODE_PAIRS.split(";")
        : [];

    /** Override logs */
    const log = console.log;
    console.log = (...args) => log(`${prefix}@${ip.address()}:${httpPort} =>`, ...args);

    /** Hook callback configuration */
    configure(server, peers);

    /** Start express js server */
    server.listen(httpPort, () => {
        console.log(`Current Node listen at http://${ip.address()}:${httpPort}\n`);
    });
}
