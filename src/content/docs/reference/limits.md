---
title: Limits and defaults
description: Sizes, counts and timings built into the official clients and pombo-storage-node.
---

Protocol constants, such as partition counts, are in [Streams](/protocol/streams/). The values below are choices of the official clients and of `pombo-storage-node`; another implementation may choose differently.

## Channels and inboxes

| What | Value |
| --- | --- |
| Retention of a channel or an inbox | 1 to 365 days; 180 by default |
| Retention a node applies when none is set | 365 days |
| New epoch key | Weekly, and at once after a ban or an allowlist removal |
| Previous epoch still accepted after a new one | 10 minutes |
| Subscription renewal warning | Last 3 days |

## Moderation

| What | Value |
| --- | --- |
| Snapshot read back after publishing | 5, 10, 20 and 40 seconds |
| Republishes before the owner is told | 3 |
| Chunks per snapshot | 4 at most |
| Owed key rotation retried | Every 5 to 60 seconds |

## Files

| What | Value |
| --- | --- |
| Peer-to-peer file | 500 MB at most |
| Stored-file chunk | 240 KB |
| Files kept for seeding, web app | 700 MB, for 7 days |
| Image in a message, web app | 1 MB; GIFs 5 MB |

## Storage reads

| What | Value |
| --- | --- |
| Signed read valid for | 5 minutes |
| Storage endpoints cached | 10 minutes |
| Message dated after its `storedAt` | Dropped beyond 5 minutes |
| Node URL taken out of rotation | After 3 failures in a row |
| Taken-out URL probed again | Every 5 minutes |
| Node caches a gate's "yes" | 10 minutes |
| Node caches a gate's "no" | 20 seconds |

## Push

| What | Value |
| --- | --- |
| Registration refreshed | Every 6 hours |
| Proof-of-work | 4 leading zero hex digits, 10-second epoch |
| Proof-of-work given up after | 15 seconds |

## Device sync

| What | Value |
| --- | --- |
| Push after a change | 15 seconds; 5 for sent messages |
| Check for newer snapshots | Every 60 seconds while visible |
| Push read back | 5, 10, 20 and 40 seconds |
| Confirmed state published again | After 7 days |
| Snapshot chunk | 150 KiB |
| Sent messages kept per conversation | 200 |
