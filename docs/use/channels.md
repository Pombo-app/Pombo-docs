---
id: channels
title: Channels
description: Create a channel, manage its members, moderate it, invite people.
---

# Channels

## Create one

**Create Channel** registers the channel's streams on Polygon PoS. The app estimates the fee and blocks creation if your balance is below it, so "nothing happens" usually means an empty wallet.

You choose:

- **Type**: Open, Protected, Closed, Gated or Paid. Side by side in [Channel types](../reference/channel-types.md). The last three deploy a gate contract, which adds a transaction.
- **Identity on the wire**, contract-backed only: **Sealed**, the default, or **Visible**. Fixed at creation.
- **Read-Only**, any type: only you post, plus your moderators in a contract-backed channel. Fixed at creation.
- **Listed**: whether the channel appears in Explore. Unlisted by default. Listed channels also carry a description, language and category.
- **Message Retention**: 1 day to 1 year, default 6 months.
- **Storage Provider**: **Pombo**, or **Custom** with a provider's Ethereum address. The app verifies on-chain that it publishes an HTTPS endpoint a browser can reach.

Retention and storage providers can be changed later in **Channel Details**, each change an on-chain transaction. Type, identity mode and read-only never change: if you need the other, you need a new channel.

The channel belongs to the account that created it, on-chain, and nobody can take it away.

## Manage members

**Closed channels** have an allowlist under **Channel Details**: adding several addresses at once is a single transaction, and members then read and write for free. This is the type to use when a ban has to stick.

**Gated and paid channels** have no member list to manage. The rule decides: holding the asset, or an active subscription. What you manage there is bans and, if you want the help, moderators.

## Moderate

### A person

The ban dialog offers three independent checkboxes:

| | Cost | Effect |
|---|---|---|
| **Hide their messages** | Free, reversible | What they write from now on stops being rendered for everyone |
| **Cut their access** | One transaction, contract-backed only | No further keys, and the channel key rotates at once |
| **Erase their messages from storage** | Free, irreversible | Their messages are deleted from the channel's storage providers, in one batch |

What each one does and does not achieve is in [Moderation](../protocol/moderation.md).

:::caution
In open and protected channels bans are advisory: accounts are free, so a determined user returns with a new one. For enforceable access control, use a closed, gated or paid channel.
:::

### A message

From the message's menu:

| | Cost | Effect |
|---|---|---|
| **Hide** | Free, reversible | The message stops being rendered |
| **Erase from storage** | Free, irreversible | It is deleted from the channel's storage providers, and hidden on the way |
| **Pin** | Free | It rides the channel's banner |

You and your moderators keep a greyed-out placeholder for a hidden message, with **Unhide** and **Erase from storage** on it. Everyone else stops seeing it.

If none of the channel's providers supports erasure, the option is not shown.

### The channel

Under **Channel Details**:

| | Cost | Effect |
|---|---|---|
| **Confirm Moderator Actions** | Free | Makes your moderators' pending actions your own |
| **Rotate Channel Key** | Free | Anyone without current access stops reading new messages |
| **Key Responder** | Free | This device keeps answering the channel's key requests while the app is open |
| **Reset Publish Key**, under Advanced | Two transactions, sealed channels only | A new shared write key. Current members pick it up on their own; an ex-member who kept the old one can no longer write |

It is a last resort, for an ex-member flooding storage when erasing alone is not keeping up.

**Moderators** act while you are away, with the powers listed in [Moderation](../protocol/moderation.md). Until you confirm their actions, dismissing a moderator dissolves whatever they left pending.

## Invite people

- **Share the channel link.** Anyone who opens it lands in the channel. For a protected channel they also need the password, which is worth sending through a Pombo DM rather than anywhere public.
- **Invite to Channel** sends an in-app invite through the recipient's DM inbox, end-to-end encrypted like any DM.
