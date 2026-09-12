---
id: welcome
title: What is Pombo?
slug: /
description: "Pombo is an open-source, permissionless messaging and social media app: peer-to-peer, with no accounts to approve, no server that can read your messages, and channels whose creators keep everything they charge."
---

# What is Pombo?

**Pombo is an open-source, peer-to-peer messaging and social media app**, built on open infrastructure instead of a company's servers.

- Your account is a keypair on your device. No email, no phone number, no approval step.
- Direct messages are end-to-end encrypted and sealed, so not even the network learns who wrote.
- Channels can be open, password-protected, allowlisted, token-gated or paid, and a paid channel's price goes straight to its owner.

Everything below follows from how Pombo is built, not from a policy someone maintains.

## Nobody has to let you in

No record of you is created anywhere, so there is no account to suspend, rate-limit or lock out. Creating a channel is the same: you register it and it is yours. Accounts are free and instant, which is also Pombo's answer to pseudonymity: separate identities for separate parts of your life cost nothing.

## Anyone can run the infrastructure

Messages travel peer-to-peer across the [Streamr Network](https://streamr.network). History is kept by storage nodes: Pombo runs a default cluster, but a channel's owner can point it elsewhere, and [anyone can run one](operators/run-a-storage-node.md). The same is true of the [relay](operators/run-a-relay.md) behind push notifications.

## Your channels outlive the app

Channel ownership and access rules are records on [Polygon PoS](https://polygon.technology), registered to your address. Nobody, Pombo included, can take a channel from you or change who may read it. Any client speaking the protocol reads the same channels, so this interface is replaceable.

## Encrypted before it leaves your device

All cryptography runs locally, on web and Android alike. DMs are end-to-end encrypted and sealed. Protected and contract-backed channels are encrypted under keys only members hold, and in every channel you publish under a pseudonym rather than your account unless you chose otherwise. None of this is absolute, and the [threat model](security/threat-model.md) says exactly where it stops.

## Creators keep the whole price

A channel can charge for entry: a token or NFT to hold, or a subscription at a price its owner sets. Each payment is a single transfer to the owner's address. No fee, no revenue share, no Pombo account in between.

Everything else is free. Actions that write to the blockchain, such as creating a channel, cost a few cents in POL paid to the network.

## Where to start

| You want to… | Start here |
|---|---|
| **Try it** | [Install](use/install.md), then [first steps](use/first-steps.md) |
| **Run a channel** | [Channels](use/channels.md) |
| **Look something up** | [Channel types](reference/channel-types.md) · [Limits and defaults](reference/limits.md) · [Glossary](reference/glossary.md) |
| **Understand it** | [Architecture](protocol/overview.md) · [Encryption](protocol/encryption.md) · [Publisher identity](protocol/identity.md) |
| **Check our claims** | [Privacy at a glance](security/privacy-at-a-glance.md) · [Threat model](security/threat-model.md) |
| **Run infrastructure** | [Storage node](operators/run-a-storage-node.md) · [Push relay](operators/run-a-relay.md) |

## Platforms

**Web (PWA)** at [app.pombo.cc](https://app.pombo.cc), installable from any modern browser, and **Android**, a native app speaking the same protocol, so the two interoperate exactly.

## Links

- Website: [pombo.cc](https://pombo.cc)
- App: [app.pombo.cc](https://app.pombo.cc)
- Source code: [github.com/Pombo-app](https://github.com/Pombo-app)
- X: [@app_Pombo](https://x.com/app_Pombo)
