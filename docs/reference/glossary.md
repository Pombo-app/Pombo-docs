---
id: glossary
title: Glossary
description: The terms Pombo's documentation uses, defined once.
---

# Glossary

**Account**: an Ethereum keypair generated on your device. Your address is your identity; there is no server-side record of you.

**Admin stream**: the `-3`, where the owner publishes the moderation snapshot, the channel image and a protected channel's password challenge. Owner-only publish in every channel type, readable by anyone.

**Channel**: Pombo's group space, a set of Streamr streams owned by its creator. Four streams, or five when membership is contract-backed. See [Streams and partitions](../protocol/streams.md).

**Contract-backed channel**: closed, gated or paid. The three types whose membership is decided by a [gate contract](../protocol/contract.md) rather than by client convention.

**Delta**: a moderator's signed moderation action, published on the message stream because only the owner may write to the admin stream. Applied on top of the owner's snapshot by every client until the owner confirms it.

**DM inbox**: your personal mailbox, a stored stream anyone may publish to and only you may read, plus an ephemeral one. Also carries channel invites and cross-device sync.

**Epoch key**: the content key shared by the members of a contract-backed channel. Versioned and rotated; each message names the key that sealed it.

**Erase from storage**: deleting specific messages from a channel's storage providers, as opposed to hiding them in the apps. Irreversible, reported per provider. See [Moderation](../protocol/moderation.md).

**Ephemeral stream**: the `-2`, carrying presence, typing and live media coordination. Never stored.

**Explore**: the in-app discovery view, listing channels whose owners marked them Listed, filtered by a curation manifest the interface applies.

**Gate contract, PomboGate**: one EIP-1167 clone per contract-backed channel, holding the access rule. See [The gate contract](../protocol/contract.md).

**Identity on the wire**: the creation-time setting of a contract-backed channel. **Sealed** authors are attributable only by members; **Visible** authors by anyone.

**Interactions key**: in a sealed channel, the shared key covering the ephemeral and interactions streams. Every member with access holds it, including those who cannot post.

**Interactions stream**: the `-5`, carrying reactions, in every channel type.

**Keys stream**: the `-4`, where key announcements, requests, answers and the member roster travel. Contract-backed channels only, and stored, which is what makes joining asynchronous.

**Key responder**: a device an owner or moderator has marked to keep answering the channel's pending key requests while the app is open.

**Listed, Unlisted**: whether a channel appears in Explore. Unlisted is the default and keeps the channel's name and description off-chain.

**Message stream**: the `-1`, carrying conversation, edits and deletes, moderator deltas and file chunks.

**Moderator**: an address the owner of a contract-backed channel appoints to moderate through signed deltas. Powers and limits in [Moderation](../protocol/moderation.md).

**Channel pseudonym**: the throwaway keypair a client publishes under in a channel, created on first publish, never persisted, discarded when you leave. Your account travels as a signed proof inside the payload instead.

**Publisher proof**: the signature by your account over your channel pseudonym, which is how other Pombo clients attribute a message published under it.

**Read-only channel**: a channel where only the owner posts, plus the moderators in a contract-backed one. Members still read, react and show as online.

**Relay**: the open-source server that turns Streamr wake signals into Web Push. It sees tag buckets and timing, never content or identities.

**Roster**: one entry per member per epoch on the keys stream, sealed under the channel key, which is how members see who else is in.

**Sealed sender**: a DM's property of hiding not only its content but its author. The network sees a throwaway publisher, and the sender's identity travels inside the encrypted envelope.

**Shared publish key**: in a sealed channel, the key everything on the conversation stream is written under. Replacing it is the owner's **Reset Publish Key**.

**Signed read**: a history request carrying the reader's address and a signature over it. Pombo storage nodes require one for contract-backed channels and DM inboxes, and check the gate before answering.

**Storage node**: a Streamr node that archives stream history and serves it back over HTTPS. Pombo publishes and runs [its own node software](https://github.com/Pombo-app/pombo-storage-node); any Streamr storage node can also store a Pombo channel.

**Storage provider**: one storage node identity as registered on-chain, which may be a cluster of several servers sharing a database. Capabilities and access decisions are per provider, and a channel can hold several.

**Streamr Network**: the peer-to-peer pub/sub network Pombo uses for transport. Messages travel between subscribers with no relay server in between.

**Wake signal**: the tagged, contentless message a sender broadcasts so the relay can wake a recipient's device. See [Notifications](../protocol/notifications.md).
