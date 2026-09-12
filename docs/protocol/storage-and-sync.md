---
id: storage-and-sync
title: Storage and sync
description: How history persists, who may read it, what lives on your device, and how devices converge without a sync server.
---

# Storage and sync

The Streamr Network delivers messages live; it does not remember them. Persistence comes from **storage nodes**: Streamr nodes that archive stream history and serve it back over HTTPS.

Pombo publishes and runs its own node software, [pombo-storage-node](https://github.com/Pombo-app/pombo-storage-node). This page describes channels stored on it.

:::note[Any Streamr storage node works]
A channel can point at a plain Streamr storage node and keeps working: content stays encrypted and history is served. What a plain node lacks is everything this page attributes to the node itself: validation at ingest, signed reads, erasure and the receipt timestamp. A channel's storage panel shows which of its providers support what.
:::

## Storage providers

What a channel points at is a **provider**: one identity registered on-chain, which may be a single machine or a cluster of servers sharing a replicated database. Everything a channel owner decides is per provider, not per machine.

| | What it is | How to get it |
|---|---|---|
| **Pombo** | The cluster the Pombo project runs | Default, nothing to do |
| **Third-party** | Any provider someone else runs | Paste its address into the channel's storage panel |
| **Self-hosted** | Your own | [Run one](../operators/run-a-storage-node.md), register it, paste its address |

All three are the same mechanism, with no privileged path for Pombo's cluster. A provider must publish an HTTPS endpoint on a real hostname, because a browser cannot read from anything else, and the app checks that before accepting it.

A channel can hold several providers at once, added or removed on-chain at any point, so its history can have independent copies under different operators. Reads rotate across every healthy endpoint a provider publishes, and one that keeps failing drops out of the rotation for the session.

What providers hold is what the network carried: ciphertext for protected channels, contract-backed channels and DMs, signed plaintext for open channels.

## What the node checks

**At ingest**, before storing a message, the node validates it the way a subscriber would: a valid signature, and publish permission for the publisher. A forged or unauthorized message is dropped, not stored. On the conversation stream of a read-only channel with visible authors, only the owner's and moderators' messages are stored. If the chain cannot be reached, the message is stored anyway, because an outage must not erase legitimate history.

**On read**, the node asks who is making the request:

- **Contract-backed channels**: the request is signed with your account, and the node serves it only if the gate accepts you at that moment. An expired subscription or a sold token stops the history there. If the node cannot reach the chain to decide, it refuses rather than guesses.
- **DM inboxes**: the same, with the owner as the only one who qualifies.
- **Open and protected channels**, and every channel's admin stream, are served to anyone. The admin stream is what lets a stranger see a channel's name and image before joining.

Signing a read keeps everyone else out of a private channel's history. It also gives the provider a verified record of which private channels you open and when, instead of an inference from your IP. Choosing a provider is choosing who holds that record.

**A receipt timestamp.** The node stamps each message with the time it received it. That stamp is the node's, not the publisher's, which is what lets a client tell a message that genuinely arrived last year from one that merely claims to.

**Erasure.** The channel owner, a moderator, or a message's own author while they still hold its signing key can delete specific messages from the node before retention ends. Who can erase what is in [Moderation](moderation.md).

## Retention

Owners choose how long history is kept, per stream, from 1 to 365 days with a default of 180. The node prunes expired data on its own timer. A DM inbox has the same setting, chosen by its owner.

Artifacts that are written once and then only read, the moderation snapshot, the channel image and the password challenge, are republished by the owner before their retention expires, so bans and pins do not quietly vanish.

## What lives on your device

- Your key and app state, contacts and channel list and settings, encrypted at rest and isolated per account.
- **Channel messages are not cached**: they are re-fetched from storage each time you open a channel.
- **Sent DMs are kept locally.** What you sent lives in the recipient's inbox, so your own copy is your record of it.

## Cross-device sync

Your DM inbox doubles as a personal sync channel. The app writes **self-encrypted snapshots** of your state to it. Another device with the same account pulls them, merges, and converges: contacts, channels, settings, sent messages and the keys of your private channels. Read state stays per device.

Only your key decrypts a snapshot, and any payload not authored by your own wallet is rejected. The merge is designed so a channel you left cannot come back, which is also why restoring a backup cannot duplicate or resurrect anything.

Three modes, under **Settings → Account → Device Sync**: Automatic, Skip on start, Manual only.

A device offline for longer than your inbox's retention may miss intermediate snapshots; importing a [backup](../use/backup.md) resyncs it fully.
