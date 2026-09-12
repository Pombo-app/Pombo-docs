---
id: first-steps
title: First steps
description: Join a channel, send a message, set up DMs.
---

# First steps

## Join a channel

Three ways in:

- **Explore**, the in-app discovery view, lists the channels their owners chose to list.
- **A link.** Any channel can be shared as a URL of the form `app.pombo.cc/#/channel/…`, listed or not. Opening it lands you in the channel.
- **The channel ID**, pasted into **Join with ID** (on Android, **Join Channel**). Every channel has one, in the form `0x…/name`.

Channels are unlisted by default, so for most of them a link or the ID is the only way in. What each channel type asks of you is in [Channel types](../reference/channel-types.md).

## Send a message

Type and send. Messages propagate peer-to-peer over the Streamr Network and are kept by storage nodes, so people who join later or come back online read the history. Reactions, edits, deletes and replies work as you would expect.

## Set up direct messages

To *receive* DMs you need a **DM inbox**. Choose **Create DM Inbox**: it registers streams on-chain, so it costs a small POL fee once and never again. The inbox is also where channel invites arrive and how your devices stay in sync.

With that done, open **New DM**, enter an address or ENS name, and send. They do not need to be online, and there is no friend request to accept. See [Direct messages](direct-messages.md).

## Create a channel

**Create Channel** registers streams on Polygon PoS, one of the handful of actions that cost a network fee. See [Channels](channels.md).

:::tip[Two minutes now]
[Export a backup](backup.md). There is no account recovery without it.
:::
