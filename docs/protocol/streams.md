---
id: streams
title: Streams and partitions
description: The streams behind every channel and DM inbox, what each carries, and which are stored.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Streams and partitions

Every channel is a set of Streamr streams derived from one base ID: four for open and protected channels, five when membership is contract-backed. The stream ID has the form `{ownerAddress}/{id}`, which is what makes ownership self-evident.

These are protocol constants, not settings.

| Stream | Stored | Partitions | Carries |
|---|---|---|---|
| `…-1` message | Yes | 12 | Conversation (P0), edits and deletes (P1), moderator deltas (P2), file chunks (P3–P11) |
| `…-2` ephemeral | No | 3 | Presence and typing (P0), media signals (P1), media data (P2) |
| `…-3` admin | Yes | 3 | Moderation snapshot (P0), channel image (P1), password challenge (P2) |
| `…-4` keys | Yes | 4 | Key announcements (P0), requests and answers (P1), member roster (P2). Contract-backed only |
| `…-5` interactions | Yes | 3 | Reactions (P0), two reserved |

## Who may publish where

| Stream | Open and protected | Contract-backed, visible | Contract-backed, sealed |
|---|---|---|---|
| `-1` | Everyone, or the owner alone if read-only | The gate contract | The shared publish key |
| `-2` and `-5` | Everyone | The gate contract | The interactions key |
| `-3` | The owner | The owner | The owner |
| `-4` | None | Members | Members |

The `-3` stays owner-only in every type, which is why the keys protocol cannot fold into it: any member must be able to publish a key request.

## DM inboxes

A personal inbox is a deterministic pair of streams derived from your address: a stored message stream of 13 partitions (messages, sync, sync blobs, notifications, then nine file-chunk partitions) and an ephemeral one for presence and typing.

Its permissions are the inverse of a channel: **anyone publishes, only the owner subscribes**. The inbox metadata carries the owner's encryption public key, which is what lets anyone seal a message to them.

## Diagrams

<Tabs>
<TabItem value="open" label="Open channel">

![Open channel: streams with their on-chain metadata, permissions and partition layout](../assets/diagrams/open-channel.webp)

*Content flows unencrypted; the metadata variants cover listed/unlisted and read-only combinations. The interactions stream is not drawn here.*

</TabItem>
<TabItem value="protected" label="Protected channel">

![Protected channel: identical layout, with every partition encrypted by a key derived from the shared password](../assets/diagrams/protected-channel.webp)

*Same layout, with every partition's content passing through AES-256-GCM under a PBKDF2-derived key. The interactions stream is not drawn here.*

</TabItem>
<TabItem value="dm" label="DM inbox">

![DM inbox: a stored inbox stream and an ephemeral one, with ECDH-derived AES-256-GCM on every partition](../assets/diagrams/dm-inbox.webp)

*The inbox publishes the owner's encryption public key as on-chain metadata; every partition is sealed with a key derived via ECDH and HKDF before it touches the network.*

</TabItem>
</Tabs>
