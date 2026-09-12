---
id: faq
title: FAQ
description: Frequently asked questions about Pombo.
---

# FAQ

Privacy questions have their own page: [Privacy at a glance](../security/privacy-at-a-glance.md).

### Is Pombo free?

Yes. No ads, no premium tier, no cut of anything. The only costs are Polygon network fees, typically cents, for on-chain actions: creating a channel, creating your DM inbox once, managing members of a closed channel, and changing a channel's retention or storage providers. The full list is in [Limits and defaults](../reference/limits.md).

A channel's *creator* can charge, through a gated or paid channel, and that money goes to them: the contract takes no fee and Pombo is not a party to it. Join only open channels and you pay nothing at all.

### Do I need a crypto wallet or tokens?

No. Pombo generates its own keypair: no MetaMask, no seed-phrase ceremony, no purchase. You need a few cents of POL for on-chain actions, and whatever asset a gated or paid channel asks for. You can import an existing Ethereum private key if you want to keep an established identity.

### What happens if pombo.cc disappears?

Your channels, messages and identity live on the Streamr Network and Polygon, not on Pombo's website. The app is open source and any client implementing the protocol reaches the same data.

### Are there group chats?

Group conversation in Pombo is a **channel**. There is no separate group-DM primitive: a private group is a protected or closed channel.

### Someone I banned came back with a new account. Why?

Because accounts are free and unlinked, a ban in an open or protected channel cannot stop a determined user. That is a structural property of permissionless systems. For enforceable access control use a closed, gated or paid channel, where membership is contract state you control and removing someone rotates the channel key on the spot. See [Moderation](../protocol/moderation.md).

### How is this different from Signal, Matrix or Farcaster?

**Signal** is the gold standard for content encryption, but it requires a phone number, a real-world identity anchor, and runs on central servers you trust to stay up and neutral. **Matrix** federates servers; Pombo has no backend to federate, since transport is peer-to-peer and state is on-chain. **Farcaster**-style social protocols are public-first; Pombo is messaging-first, with end-to-end encrypted DMs and encrypted channels. Pombo's corner is no sign-up, no servers, creator-owned channels and sealed-sender DMs.
