import md5 from "md5";
import crypto from "crypto";

export class Wallet {

    /**
     * @class Wallet
     * @param json {Object} initial wallet
     */
    constructor(json = {}) {
        if (json && json.privateKey) {
            Object.keys(json).forEach(k => this[k] = json[k]);
        } else {
            const keys = crypto.generateKeyPairSync("rsa", {
                modulusLength: 2048,
                publicKeyEncoding: {type: "spki", format: "pem"},
                privateKeyEncoding: {type: "pkcs8", format: "pem"},
            });

            this.privateKey = Buffer.from(keys.privateKey).toString("base64");
            this.publicKey = Buffer.from(keys.publicKey).toString("base64");
            this.address = md5(keys.publicKey);
        }
    }

}
