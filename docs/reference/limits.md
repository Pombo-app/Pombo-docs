---
id: limits
title: Limits and defaults
description: "Every number in one place: retention, file sizes, key rotation, push, crypto parameters, on-chain costs."
---

# Limits and defaults

## Storage and retention

| | Value |
|---|---|
| Retention range | 1 to 365 days, per stream |
| Default retention | 180 days |
| Where it is set | Channel settings, by the owner; your own settings for your DM inbox |
| Changing it | An on-chain transaction |
| Storage providers per channel | One or more, added or removed at any time |
| Messages per erase request | 100, batched automatically |
| Erasure reported as | Per storage provider, "erased on k of n" |
| Signed request validity | 5 minutes of clock skew, one nonce per request |
| Gate answers cached by the node | 10 minutes |
| Retention sweep on the node | Every 6 hours |

## Files

| | Value |
|---|---|
| Chunk size, storage transport | About 240 KB, the practical per-message limit |
| Chunk partitions | 9, round-robin |
| P2P transport, per file | 500 MB maximum |
| Seed cache | 700 MB, kept up to 7 days for re-serving |
| Download availability | Storage: the channel's retention. P2P: while a seeder is online |

## Channel keys

| | Value |
|---|---|
| Scheduled epoch rotation | Every 7 days, when an admin is present |
| Publish key reset, sealed channels | Two transactions |

## Push notifications

| | Value |
|---|---|
| Tag size | 1 byte, so 256 buckets shared by all users |
| Proof-of-work | 4 leading zeros, bound to a 10-second epoch |
| Registration refresh | Every 6 hours |
| Registration secrecy | Encrypted to the relay's public key |
| Content in the push path | None |

## Cryptography

| | Value |
|---|---|
| Channel and DM content | AES-256-GCM |
| DM key agreement | ECDH on secp256k1, fresh ephemeral key per message, HKDF-SHA256 |
| Protected-channel key | PBKDF2-SHA256, 310,000 iterations, from the password |
| Web app state at rest | AES-256-GCM under a key derived from a wallet signature |
| Web private key at rest | scrypt-encrypted keystore |
| Android key at rest | Encrypted preferences under a hardware-backed key |

## On-chain costs

Paid in POL on Polygon PoS, typically cents:

- Creating a channel, and the gate contract if it is contract-backed
- Creating your DM inbox, once
- Adding or removing members of a closed channel
- Changing a channel's retention or storage providers
- Banning at the contract level, appointing a moderator, and resetting a sealed channel's publish key

Chatting, DMs, file sharing, joining an open channel and rotating the channel key are free.

## Platform requirements

| | Value |
|---|---|
| Android | 8.0, API 26, or newer |
| iOS push | Requires the PWA installed to the Home Screen, iOS 16.4 or newer |
| Storage node endpoint | HTTPS on a real hostname |
