---
id: files
title: Files and media
description: The two file transports, when to use each, and how transfers are managed.
---

# Files and media

Pombo moves files two ways, and you choose per file from the attach menu: **Storage** or **P2P**.

| | Storage | P2P |
|---|---|---|
| Travels over | The channel's stored stream | The ephemeral stream, peer to peer |
| Sender must stay online | No | Yes, at least one seeder |
| Available for | The channel's retention period | While someone is seeding |
| Leaves a trace in storage | Yes | No |
| Size limit | Practically unbounded, in chunks of about 240 KB | 500 MB per file |

Use Storage for anything people should be able to grab later, and for images in DMs. Use P2P to push something big to people who are online right now.

## What happens on send

**Storage**: the file is split into chunks, published across nine partitions, verified as stored, and only then announced in the chat. A receiver can start any time.

**P2P**: a pull-based swarm, in spirit like BitTorrent. Receivers request pieces and anyone holding pieces serves them, with a hash check on each one. Seeded files stay in a local cache, capped at 700 MB, for up to 7 days.

## In private channels

Both transports are sealed with the same key that protects messages, so storage nodes and the network carry ciphertext either way. A new member receives every key the channel still retains, so older files open for them exactly like older messages, as long as the chunks are still in storage.

Uploads follow the channel's identity on the wire: sealed, the chunks travel under the shared publish key and the network cannot tell who uploaded; visible, your account signs every chunk.

In DMs, file content is sealed end-to-end like the messages themselves.

## Managing transfers

Transfers in progress live in the notification bell, and completed downloads save automatically. You can pause and resume on both transports. Storage downloads can also be cancelled, which discards what was fetched, while a pause keeps it. When you stop seeding a file, the bytes stay as an inactive record you can re-seed later; deleting them is a separate, explicit action.
