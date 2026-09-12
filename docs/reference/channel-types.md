---
id: channel-types
title: Channel types
description: The five access models side by side, plus the two flags fixed at creation.
---

# Channel types

Five access models, chosen at creation and never changed afterwards.

<div className="matrix-table">

| | Open | Protected | Closed | Gated | Paid |
|---|---|---|---|---|---|
| Who reads | Everyone | Password holders | Allowlisted addresses | Token or NFT holders | Active subscribers |
| Who writes | Everyone | Password holders | The same | The same | The same |
| Enforced by | Open by design | Client-side encryption | Gate contract | Gate contract | Gate contract |
| Content on the wire | Signed plaintext | AES-256-GCM ciphertext | AES-256-GCM under a channel key | Same | Same |
| Cost to join | Free | Free | Free, the owner pays gas to add you | Holding the asset | The subscription price |
| Moderators | No | No | Yes | Yes | Yes |
| Listed in Explore | Optional | Optional | Never | Optional | Optional |

</div>

**Closed, gated and paid** are the contract-backed family: one [gate contract](../protocol/contract.md) per channel decides membership, and content is encrypted under a channel key only members obtain. They differ only in the rule the contract enforces. Which layer enforces reading, writing and history, and what happens when someone loses access, is in [How access works](../protocol/access.md).

## Two flags fixed at creation

**Identity on the wire**, contract-backed channels only:

| | Sealed (default) | Visible |
|---|---|---|
| Publisher on the wire | The channel's shared publish key | The gate contract |
| Who can attribute a message | Members | Anyone, without a key |
| What an ex-member can still publish | Bytes that spend the channel's retention, until the owner resets the publish key. Clients drop them on arrival | Nothing, once the gate cache expires |

**Read-only**: only the owner posts, plus the moderators in a contract-backed channel. Members read, react and show as online in every type.

## Other axes

- **Listed or Unlisted** decides whether the channel appears in Explore. Unlisted is the default and publishes no name or description on-chain.
- A channel can also be **write-only**, straight from the stream permissions: you publish, you do not read.
