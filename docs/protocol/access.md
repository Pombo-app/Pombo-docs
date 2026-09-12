---
id: access
title: How access works
description: Which layer enforces reading, writing and history in a contract-backed channel, and why the identity mode is a one-time choice.
---

# How access works

Open and protected channels enforce access by client convention and a shared password. Closed, gated and paid channels, the contract-backed family, enforce it with contract state the owner controls. The rules are in [Channel types](../reference/channel-types.md) and [The gate contract](contract.md). This page is about where each rule is enforced, and where it is not.

## Three cuts, three layers

Losing access does not cut everything at once. Each layer holds its own line.

| | Enforced by | Visible mode | Sealed mode |
|---|---|---|---|
| **Writing** | The network and the storage node, at ingest | The gate validates every signature. Selling the token, an expired subscription, a revocation or a ban all stop writing within the gate cache window | The network sees only the shared publish key and never consults the gate. An ex-member who kept that key can keep writing until the owner resets it |
| **Reading** | Key distribution | No channel key, no plaintext. The gate is consulted on every key answer | Same |
| **History** | The storage node, at ingest, and the client, on read | A Pombo storage node validates signature and publish permission before storing, and refuses the history of the channel to anyone the gate does not accept now | Same, except that authorship is invisible to the node by design |

Streamr's subscribe permission is not enforced on the live read path. What keeps a non-member from reading is the key, and what keeps them from fetching stored ciphertext is the signed read a Pombo storage node requires.

## What you wrote stays written

A message is validated when it is published and never re-checked when it is read. Losing access cuts your future and leaves the thread intact: members keep reading what a departed member wrote, and the departed member keeps whatever their client already holds.

## Identity on the wire

Contract-backed channels are the one place where Pombo's throwaway publisher identity does not apply. Anything the network checks has to be readable by non-members, so per-message enforcement and publisher anonymity cannot both hold. The creator picks which one gives, once, with the **Identity on the wire** setting:

- **Sealed**, the default, drops the per-message check. Everyone publishes under one shared key. Authorship travels inside the encryption, as a session pseudonym signed per message and bound to your account by a proof only members can read.
- **Visible** keeps the check and pays in privacy. Your account signs each message, the network validates it against the contract, and anyone can recover your address from that signature.

The contract holds the choice for the life of the channel, and Explore shows it on the card, so someone about to pay sees the trade before entering. What each mode reveals is in [Publisher identity](identity.md).

## Read-only channels

Read-only is fixed at creation too. Each mode enforces it with the property that already defines it:

- **Sealed**: the shared publish key goes to the owner and moderators only. The content key and the interactions key go to every member.
- **Visible**: the gate accepts every member's signature by design, because a contract cannot tell streams apart, so the cut is made by the Pombo storage node, which refuses to store a message on the conversation stream from anyone but the owner and moderators.
- **Open and protected**: there is no moderator role, so the owner posts alone.

Members still react and show as online in every type, because [reactions have a stream of their own](streams.md).

## Protected channels

A protected channel looks public to the network and carries only ciphertext, under a key derived from the shared password. Verification is local: the channel publishes a challenge, and a candidate password is tested against it on your device. The password never touches the network.

The challenge is public, so a protected channel is exactly as secret as its password is strong. The [threat model](../security/threat-model.md) puts a number on that.
