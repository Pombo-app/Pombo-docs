---
id: privacy-at-a-glance
title: Privacy at a glance
description: The answers most people came for, each linking to the page that owns the explanation.
---

# Privacy at a glance

One answer per question. The link owns the full story.

**Can Pombo read my messages?** No: there is no server where messages pass in the clear. Open channels are public rooms by design. See [Encryption](../protocol/encryption.md).

**Can anyone see who I DM?** No. Sealed sender means correspondents are never visible, and your inbox's history is served only to a request you signed. See [Threat model](threat-model.md).

**Can I delete a message?** Yes. Every Pombo client honours the deletion, and a Pombo storage node erases the stored copy while you can still prove you wrote it. See [Moderation](../protocol/moderation.md).

**Is Pombo anonymous?** No: pseudonymous, with strong wire privacy. Separating contexts means separate accounts. See [Publisher identity](../protocol/identity.md).

**Who sees my IP address?** Network peers, the storage provider you read from, RPC providers, The Graph, and the host behind any ENS avatar you view. That last one has an off switch. The storage provider also learns your account when you read a private channel, because those reads are signed. See [Threat model](threat-model.md).

**Can storage nodes read what they store?** No, except open channels, which are plaintext for everyone. See [Storage and sync](../protocol/storage-and-sync.md).

**What ends up on the blockchain, permanently?** Channel creation, membership and bans in contract-backed channels, and subscription payments. Never content. See [The gate contract](../protocol/contract.md).

**Can people see who wrote what in a private channel?** Members can. Outside the channel nobody can, unless its creator chose visible authors at creation. See [How access works](../protocol/access.md).

**What does enabling notifications reveal?** Google or Apple learns your device runs Pombo; the relay stores a push token it cannot link to your identity or channels. See [Notifications](../protocol/notifications.md).

**What does device sync upload?** A snapshot of your state, encrypted to your own key, in your own inbox. See [Storage and sync](../protocol/storage-and-sync.md).

**What happens if my key leaks?** The account is the attacker's too: there is no revocation, and no forward secrecy in DMs. See [Encryption](../protocol/encryption.md).

**What does the Pombo project itself hold?** Encrypted history on its storage cluster, your push token if notifications are on, and mail you send to privacy@pombo.cc. See the [privacy policy](/legal/privacy-policy).
