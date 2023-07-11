## Blockchain Structure
CHAIN => BLOCK1     => INDEX
                       HASH
                       PREV_HASH
                       TIMESTAMP
                       POW (Proof of work)
                       DATA
         BLOCK...N  => INDEX
                       HASH
                       PREV_HASH
                       TIMESTAMP
                       POW (Proof of work)
                       DATA

## Content of Data
Data can be fill anything, 
in example we use data to hold transactions
which transactions we used to hold crypto.

CHAIN => BLOCK1     => INDEX
                       HASH
                       PREV_HASH
                       TIMESTAMP
                       POW (Proof of work)
                       DATA => TRANSACTION1
                               TRANSACTION..N
         BLOCK...N  => INDEX
                       HASH
                       PREV_HASH
                       TIMESTAMP
                       POW (Proof of work)
                       DATA => TRANSACTION1
                               TRANSACTION..N

So we assume transactions in list of
{
    transaction: {
        from => this is sender address
        to => this is receiver address
        amount => this is crypto amount
    },
    publicKey => this is public key of sender address (from)
    signature => this is signature of transaction (we use sha256 in example)
}

## Signature of transaction
Signature is used by miner to validate the transaction by public key of sender
in this example we use transaction.from