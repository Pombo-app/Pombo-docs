---
id: direct-messages
title: Direct messages
description: Set up your inbox, message anyone, block people, and know where your messages live.
---

# Direct messages

DMs travel live when you are both online, and every message also lands in the recipient's inbox, where it waits if they are away. Neither of you ever needs to be online at the same time.

## Set up your inbox

To *receive* DMs you need a **DM inbox**. **Create DM Inbox** registers streams on-chain: a small POL fee, once. The inbox also carries channel invites and keeps your devices in sync.

- **Sync starts with it.** Once the inbox exists, Pombo publishes self-encrypted snapshots of your state to it so a second device can converge. Only your key reads them. **Settings → Account → Device Sync** sets the mode.
- **Guest mode has no inbox**, so guests can neither receive DMs nor sync.

## Send a message

**New DM**, then an address or ENS name. No friend request, no waiting for them to be online. Images and files ride along, sealed the same way.

Only the recipient can read a DM, and only the recipient learns who sent it. The mechanics, and the one trade-off worth knowing, are in [Encryption](../protocol/encryption.md).

## Living with a public mailbox

Your inbox is **public-write by design**, which is what lets a stranger answer your channel post or accept your invite without a handshake. The consequence is that anyone can write to you and there is no server-side filter.

**Block** a peer from the conversation: your clients stop showing you anything from them, and the block list syncs across your devices. Blocking hides; it cannot stop a deposit from arriving at a public mailbox. The wider spam question is an [open problem](../security/threat-model.md).

## Where your messages live

| | Whose inbox | Whose retention |
|---|---|---|
| What you receive | Yours | Yours, on the provider you chose |
| What you send | Theirs | Theirs, on the provider they chose |

Your device keeps a local copy of what you sent, because it is your only record of it. Your own inbox's retention and storage provider are under **Inbox Storage**.

## Deleting a message

Deleting a DM removes it from both sides' apps: your client publishes a deletion that the other client honours. Whether the stored copy goes with it depends on which side of the mailbox it sits on.

- **A message you received** lives in your inbox, so deleting it also erases it from your storage, along with any file that came with it.
- **A message you sent** lives in their inbox. Each DM is written under a throwaway key that never leaves the session that sent it, and that key is the only proof of authorship the storage node accepts. So the stored copy is erased if you delete during that session; after the app has been closed, the deletion still hides the message everywhere, but the stored copy stays in their inbox until their retention ends.

Who can erase what, in every context, is in [Moderation](../protocol/moderation.md).
