---
title: Glossary
description: Terms used across these docs, each linked to the page that explains it.
---

## Channels and streams

| Term | Meaning |
| --- | --- |
| Channel | Up to five Streamr streams that share a base ID, owned by the account that created them. [Streams](/protocol/streams/) |
| Open, Protected | Channels without a gate: public, or encrypted with a password. [Access](/protocol/access/) |
| Closed, Gated, Paid | Channels with a gate contract: an allowlist, a token or NFT, or a subscription. [Access](/protocol/access/) |
| Message stream, `-1` | Messages, overrides, moderator actions and stored-file chunks. |
| Ephemeral stream, `-2` | Presence, typing and P2P media. Never stored. |
| Admin stream, `-3` | The moderation state, the channel image and the password challenge. Only the owner publishes. |
| Keys stream, `-4` | Key announces, requests and answers, and the member roster. Closed, Gated and Paid only. |
| Interactions stream, `-5` | Reactions. |
| Partition | A numbered lane inside a stream; each kind of traffic has its own. [Streams](/protocol/streams/) |
| DM inbox | An account's two streams, `DM-1` and `DM-2`: anyone can write, only the owner reads. |
| Listed | A channel that appears in Explore, marked `e: visible` in its metadata. |
| Read-only | A channel where only the owner, and moderators in gated channels, post to `-1`. |
| Override | An edit or delete published on `-1`, partition 1, that readers apply to an earlier message. |

## Keys and identity

| Term | Meaning |
| --- | --- |
| Account | One secp256k1 key. Its address is the identity; it signs proofs, reads and transactions. [Identity](/protocol/identity/) |
| Gate contract | One contract per Closed, Gated or Paid channel that decides who has access. [Access](/protocol/access/) |
| Epoch key | The key that encrypts a gated channel's content. Numbered; a new epoch cuts off anyone without access. [Encryption](/protocol/encryption/) |
| Announce | The owner's message on `-4` naming a key and its hash, so members can check the key they receive. |
| Wrap | A key sealed to one requester, in answer to a key request. |
| Roster | One entry per member per epoch on `-4`, sealed with the epoch key. |
| Identity on the wire | **Sealed** or **Visible**, fixed when a gated channel is created: whether the network sees shared keys or each author. |
| Publish key | In Sealed channels, the shared key that signs `-1`. |
| Interactions key | In Sealed channels, the shared key that signs `-2` and `-5`; every member gets it. |
| Sealed sender | Direct messages leave under a one-time key; the author's proof travels inside the ciphertext. |

## Moderation

| Term | Meaning |
| --- | --- |
| Moderation state | `ADMIN_STATE`, the owner's snapshot on `-3`: bans, hidden messages, pins. [Moderation](/protocol/moderation/) |
| Moderator | An account the owner appoints on the gate contract. It publishes moderator actions on `-1`, partition 2. |
| Hide | A declaration in the moderation state. Pombo apps stop showing the message; it stays in storage. |
| Ban | A declaration that hides what an account writes in the channel: everything in ungated channels, and from the current epoch on in gated channels, where the gate contract also refuses it. |
| Erase | Deleting stored messages from the providers that support it, with a signed purge. [Storage](/protocol/storage/) |

## Storage and push

| Term | Meaning |
| --- | --- |
| Storage provider | A storage node identity registered on Polygon and assigned to streams; it may be a cluster of machines. [Storage](/protocol/storage/) |
| Retention | How long a provider keeps a stream, set on chain per stream (`storageDays`). |
| Signed read | A history request signed by the reader's account, required for gated streams and inboxes. |
| `storedAt` | The time a node received a message, returned with every stored message. |
| Push relay | The server that wakes devices by tag, without seeing content, sender or channel. [Push notifications](/protocol/push/) |
| Tag | The first byte of a hash of a stream ID; many channels share each tag. |
| Wake | A contentless message asking the relay to wake every device under a tag. |
