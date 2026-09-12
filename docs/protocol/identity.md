---
id: identity
title: Publisher identity
description: Who appears as the publisher on the wire in each context, where your account proof travels, and the metadata protections that are on by default.
---

# Publisher identity

[Encryption](encryption.md) protects what you said. This page is about who can see that it was you. The rule: **your account is not visible on the wire unless the context deliberately makes it so.**

## The channel pseudonym

When you join a channel, Pombo generates **one throwaway keypair per channel** and publishes under it across that channel's streams. It is created on your first publish, never persisted, and discarded when you leave. The address the network sees is not your account.

Your account travels as a **publisher proof**: a signature by your account over the throwaway key, so other Pombo clients can attribute the message and show your name. Where that proof sits depends on the context:

| Context | Publisher on the wire | Proof lives | Who learns your account |
|---|---|---|---|
| Open channel | Channel pseudonym | Plaintext in the message | Anyone parsing Pombo's format |
| Protected channel | Channel pseudonym | Inside the AES envelope | Members only |
| Direct message | Fresh throwaway, sealed sender | Inside the ECDH envelope | The recipient only |
| Contract-backed, sealed | The shared publish key | Inside the epoch envelope | Members only |
| Contract-backed, visible | The gate contract | Your signature on the message | Anyone |
| Read-only open or protected, the owner's posts | The owner's account | Not needed | Anyone |

Three things always travel under your real account: **creating a channel**, whose creator address is part of the channel ID; **the owner's moderation**, published on the admin stream only the owner may write; and **entering or staying in a contract-backed channel**, whose key requests and roster entries are account-signed so that members can check the gate before handing over a key. A moderator's actions travel as signed deltas on the message stream, under the channel's identity on the wire like any other message. Whether that identity is sealed or visible in a contract-backed channel is the creator's one-time choice, explained in [How access works](access.md).

## Anonymity is another account

Pombo has no per-channel anonymous mode. To take part somewhere without linking it to your main identity, use a different account. Accounts are free, instant, and each one's local data is isolated.

## On by default

- **ENS reverse lookups are decoyed.** Resolving the name behind an address you see mixes the real lookup with decoys, in shuffled order. Resolving a name *you typed*, to start a DM or send an invite, is not covered, and the provider sees exactly what you asked for.
- **Push notifications carry no content** and use k-anonymity tags, so the relay cannot tell who a notification is for. See [Notifications](notifications.md).
- **Cross-device sync is sealed to yourself**, and any payload not authored by your own wallet is rejected.
- **History reads are signed** for contract-backed channels and for your DM inbox, so a Pombo storage node serves that history only to the people it is for. The provider you read from gets a signed record of which private channels you open. See [Storage and sync](storage-and-sync.md).
- **Network node IDs are not derived from your wallet.**
- **ENS avatars can be turned off.** Showing someone's avatar fetches an image from a server *they* chose, which learns your IP. **Settings → Content → ENS Avatars** turns the fetch off and shows the generated identicon instead, everywhere an avatar is drawn.

What none of this hides is listed once, in the [threat model](../security/threat-model.md).
