---
title: Threat model
description: What each party in the system can see and do, and what it cannot.
---

Pombo removes the server that reads everything. It does not remove every observer: the network, the chain and the services around them each see something. This page lists what.

## At a glance

| Party | Sees | Can | Cannot |
| --- | --- | --- | --- |
| Streamr nodes | Stream IDs, timing, sizes, the publishers on the wire, peers' IP addresses | Drop or delay what they relay | Read encrypted content or forge a message |
| Anyone reading Polygon | Channels, their metadata and permissions, gate events, payments, inbox public keys | | See content |
| RPC providers | Your IP and every contract call, key-access checks included | Answer falsely | Alone, pass a false access answer to clients that cross-check |
| The Graph | Your IP and the channels you look up | Hide or misreport listings | See content |
| Storage providers | What they store, when, and who signs each read | Omit messages, refuse reads, misstate `storedAt` | Forge, read encrypted content, or erase elsewhere |
| Push relay | Tags, device endpoints, wake times | Drop wakes | Learn the content, sender, channel or recipient |
| A removed member | The keys it held | Read until the next epoch; in Sealed channels, write until the keys are reset | Read what follows a new epoch |
| The channel owner | Who asks for keys | Ban, rotate, erase, change the price, delete the streams | Change the type, token or identity on the wire; read direct messages |
| A thief of your key | Everything your account can open | Act as you; keep your channels | |

## The network

- Stream IDs start with the creator's address, so every channel shows its owner, and every inbox its recipient.
- Who publishes on the wire depends on the channel: see [Identity](/protocol/identity/). In Visible channels anyone can recover each author from the signature. Key requests on `-4` name the requester's account in every mode.
- Direct messages leave under a new key each time. The network still sees when an inbox receives something, how big it is, and from the partition whether it is a message, a sync snapshot or an invite.
- Nothing pads message sizes.

## The chain

Everything on Polygon is public and permanent:

- channel creation, stream metadata and permission grants, including every key reset;
- each gate's parameters, allowlist, bans, moderators, price changes and payments: who paid which gate, and until when;
- storage assignments and retention;
- every inbox, with its public key: that an address uses Pombo.

## Service providers

- **RPC providers** see each call. When a member's device answers a key request it asks `checkAccess(requester)`, which tells the provider who is asking for which channel's keys. The official clients ask several providers and refuse when they disagree.
- **The Graph** sees which channels you look up, from your IP.
- **Storage providers** learn the reading account on every signed read. What else they can and cannot do: [Storage](/protocol/storage/).
- **The push relay** stores tags and device endpoints; a device registered under several tags links them. It keeps no account or channel. See [Push notifications](/protocol/push/).

## Members and owners

- A removed or banned member keeps every key it received. It stops reading at the next epoch, which the owner's app starts at once, weekly, or when it notices lost access.
- In Sealed channels, a removed member can keep publishing junk under the shared keys until the owner resets them: [Encryption](/protocol/encryption/).
- A gate contract has no ownership transfer. Whoever holds the owner's key holds the channel for good.

## A stolen account key

- **Direct messages:** there is no forward secrecy. The key opens every message your inbox still stores.
- **Your state:** sync snapshots in your inbox, and key wraps on each channel's `-4`, open with the same key.
- **Your channels:** the thief can act as the owner, permanently.

What the official clients add, and where they fall short: [Client security](/security/client-security/).
