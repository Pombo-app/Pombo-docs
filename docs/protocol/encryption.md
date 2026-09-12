---
id: encryption
title: Encryption
description: DMs with sealed sender, protected channels, channel keys and their distribution, and what is protected locally.
---

# Encryption

All cryptography runs on your device: WebCrypto and ethers.js on the web, and the same protocol code in a headless WebView on Android, where signatures are made natively so the private key never enters the WebView. Private keys never leave the device. The only key material ever published is your *public* encryption key, attached to your DM inbox so others can encrypt to you.

This page is about protecting content. Who can see that it was you is [Publisher identity](identity.md). The parameters are in [Limits and defaults](../reference/limits.md).

## Direct messages

Three steps per message:

1. **Key agreement.** A fresh ephemeral keypair and the recipient's static public key derive a shared secret over ECDH on secp256k1. The recipient's key is published as inbox metadata, so no online handshake is needed.
2. **Key derivation.** HKDF-SHA256 turns that secret into an AES key.
3. **Encryption.** AES-256-GCM with a fresh IV, so tampering is detected.

There is no session handshake, so the recipient can be offline for days: the sealed message waits in their inbox and opens when they return.

### Sealed sender

A DM does not reveal its author, not even to the network. Each message is published under a fresh throwaway address, and the sender's identity travels inside the encrypted envelope. Only the recipient, on decrypting, learns who wrote. An observer watching an inbox sees that messages arrive, since inboxes are public-write by design, but not from whom.

### No forward secrecy

There is no ratchet, so message keys are not destroyed after use. A stolen key opens whatever is still retained, and the mailbox model makes that asymmetric:

- **Your key** opens the DMs you received, which sit in your inbox.
- **The other person's key** opens the DMs you sent, which sit in theirs.

Signal makes the opposite trade: its ratchet destroys each key immediately, and history cannot be recovered from the network. Pombo needs that recovery, because restoring a backup or opening a second device is the act of deriving those keys again. Retention is the lever: a short retention on your inbox shrinks what your key would expose, and does nothing for what you sent.

## Protected channels

Content is AES-256-GCM under a key derived from the shared password with PBKDF2-SHA256. The network and storage nodes carry only ciphertext, and anyone with the password derives the key.

## Contract-backed channels

Content is encrypted with an **epoch key**: one AES-256-GCM key shared by the whole channel, versioned, and rotated over time. Every message names the key that sealed it, so a client picks the right one without trial decryption. The Streamr SDK's own group-key layer is not used.

### How members get the key

A small protocol on the [keys stream](streams.md):

1. An admin **announces** each new epoch: its number, an identifier, and a hash of the key. The key itself is never announced.
2. A newcomer who passes the gate **requests** it. The request carries a throwaway public key made for that request and the account's own static public key.
3. **Any member** holding the key may answer, sealing it to the requester with the same construction as a DM. Answerers rank themselves by a hash so they do not all reply at once.
4. The newcomer adopts the key only if it hashes to what the admin announced.

Distribution does not depend on the admin, so a channel does not go dark when its owner is away. A malicious answer wastes bandwidth and nothing more, because the announced hash is the anchor. The keys stream is stored, so a request waits for an answer instead of requiring two people online at once, and because the request carries the account's static key, an answer written days later still opens after the requesting device restarted.

An owner or moderator can mark a device as the channel's **key responder**, which keeps answering pending requests while the app is open.

**A new member receives every epoch the channel still retains.** Holding access now is the whole condition. Keys never go back to someone the gate no longer admits, and a superseded key does not open messages written after it.

### Rotation

| Trigger | When |
|---|---|
| A member is removed or banned | At once |
| Access lost another way: sale, expiry, revoke | Next time an admin opens the channel |
| Nothing in particular | Weekly |
| The owner presses **Rotate Now** | At once |

Every path needs an admin present, so a channel nobody administers does not rotate. Rotation is what turns a contract-level revocation into an actual loss of reading; how long that lag can be is in the [threat model](../security/threat-model.md).

### Two more keys, in sealed channels

Both ride the same stream, announced and wrapped exactly like an epoch key, and checked against the announced hash:

- The **shared publish key**, which everything on the conversation stream is written under. It does not rotate on a schedule; replacing it is the owner's **Reset Publish Key**, two transactions. In a read-only channel only the owner and moderators receive it.
- The **interactions key**, which covers the ephemeral and interactions streams and goes to every member with access, including those who cannot post. That is what lets members of a read-only channel react and show as present.

## Open channels

Open channels are deliberately not encrypted: they are public rooms, and their content is signed plaintext. What Pombo protects there is your network-level identity, through the channel pseudonym.

## What is protected locally

- Your **private key**: a scrypt-encrypted keystore unlocked by your password on the web; on Android, encrypted preferences under a hardware-backed key, with no password. See [Account](../use/account.md).
- The app's **state**, contacts and channels and settings: AES-256-GCM, isolated per account, under a key derived from a deterministic wallet signature on the web, and the platform's encrypted storage on Android.
- On the web, a few low-sensitivity items stay in plain browser storage: display name, ENS cache, and which streams are registered for push.
