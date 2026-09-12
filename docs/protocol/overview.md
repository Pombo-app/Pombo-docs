---
id: overview
title: Architecture
description: What Pombo borrows, what it had to build on top, and why a social app with no backend needs all of it.
---

# Architecture

Pombo has no message backend. No server receives, routes or authorizes your conversations. Everything you would expect a backend to do is done by the client on your device or by open infrastructure anyone can run.

```
┌─────────────────────────────────────────────┐
│  Pombo client (browser PWA / Android app)   │
│  identity · encryption · access · UI        │
├─────────────────────────────────────────────┤
│  Streamr Network      →  message transport  │
│  (P2P pub/sub)           & delivery         │
├─────────────────────────────────────────────┤
│  Storage nodes        →  message history    │
│  (Streamr + Cassandra)   & offline delivery │
├─────────────────────────────────────────────┤
│  Polygon PoS          →  ownership,         │
│  (registries + gates)    access & payment   │
└─────────────────────────────────────────────┘
```

## What Pombo composes

Each layer is something that already existed. None of them was built for group chat, and none of them does the job alone. What makes Pombo a protocol rather than an integration is the part in the third column.

| Borrowed | What it gives | What had to be built on top |
|---|---|---|
| **Streamr Network** | Pub/sub transport with signed messages and no accounts | Its key exchange needs the publisher online to hand keys out, which a chat app cannot assume. Pombo turns that layer off and distributes a channel key between members instead |
| **Streamr registries on Polygon** | Stream ownership and permissions as public state nobody can confiscate | Permissions are per address, so a channel of a thousand people would be a thousand transactions. Pombo puts one contract in front of the stream and makes membership contract state |
| **ERC-1271** | A way for a contract to vouch for a signature | Used here so the channel's gate *is* the publisher of record: the network checks membership on every single message, and adding a member costs no stream transaction at all |
| **Storage nodes** | History, so people who were offline catch up | `pombo-storage-node` ships Cassandra and one-step clustering, closes the metadata leak with signed reads, deletes on request, and validates at ingest |
| **Web Push and FCM** | A way to wake a device that is not running | A relay that knows whom to wake knows your social graph. Pombo sends k-anonymous tags with a proof-of-work cost, and the device works out locally whether the tag was for it |
| **ENS** | Human-readable names for addresses | Every reverse lookup tells an RPC operator whom you are talking to, so Pombo fires decoy lookups alongside the real one |

Read the third column as a list: **the parts that usually live in a server were rebuilt as protocol**, and each one had to survive the absence of any coordinator.

## What the client does that a server usually does

| Job | Where it happens |
|---|---|
| Deciding who may read and write | A contract read, on every message, by the network itself |
| Distributing the keys that open a channel | Member to member over the channel's keys stream, answered by whoever is online |
| Moderating | Signed state on the channel's own streams, plus a signed deletion request to the storage nodes |
| Keeping your devices in step | Snapshots encrypted to yourself, in your own inbox |
| Notifying you | A tag your own device resolves after the fact |
| Charging for access | A transfer from the subscriber's wallet to the owner's, with nothing in between |

None of these has a privileged party. That is the property the design exists to preserve, and what makes each job harder than its centralized equivalent.

## Follow one message

You type in a channel.

1. The client encrypts it if the channel calls for it, signs it, and publishes it to one of the channel's [streams](streams.md).
2. It propagates directly between subscribers on the Streamr Network.
3. A storage provider archiving that stream checks the gate accepted the publisher, then keeps a copy. That copy is what members who were offline read later.
4. Why the network accepted it at all, who owns the channel and who may publish, is a record on Polygon PoS.

Two deliberate choices sit inside step 1. The Streamr SDK's own encryption is **disabled**, so all confidentiality is the client's, covered in [Encryption](encryption.md). And the publisher on the wire is never your account, covered in [Publisher identity](identity.md).

The client also talks to public RPC endpoints, The Graph, the [push relay](notifications.md) and the Explore curation manifest. None of them handles message content; what each one sees is in the [threat model](../security/threat-model.md).

## The interface is replaceable

Pombo, the app at app.pombo.cc, is *an* interface to this protocol, not *the* system. Identities, channels, permissions and history live on public networks, so anyone can build another client against the same streams.

The same holds one layer down. `pombo-storage-node` is a fork of the Streamr node, and every capability it adds is announced over `/capabilities`, detected by the client, and optional by construction.
