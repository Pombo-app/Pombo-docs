---
id: threat-model
title: Threat model
description: What Pombo protects, what it trusts, what it does not hide, and the problems that are still open.
---

# Threat model

This page is the complete list of Pombo's limits. Other pages link here instead of repeating it.

Storage claims below assume the channel is stored on a Pombo storage node. A plain Streamr node serves the same encrypted history without the ingest validation, signed reads and erasure described in [Storage and sync](../protocol/storage-and-sync.md).

## What Pombo protects

- **DM content and sender identity.** End-to-end encrypted with sealed sender: no party except the recipient, not the network, not storage nodes, not relays, learns the content *or who sent it*.
- **Protected-channel content.** Encrypted client-side; the network carries ciphertext published by throwaway keys.
- **Contract-backed channel content.** Encrypted under a channel key only members obtain, rotated over time.
- **Your account on the wire.** In open and protected channels and DMs, traffic is published under a pseudonym, not your wallet. Contract-backed channels publish under one address for the whole channel: the shared publish key when authorship is sealed, the gate contract when it is visible.
- **Stored history of private streams.** A Pombo node serves the history of a contract-backed channel, or of a DM inbox, only against a signed request from an account the gate accepts right now, or that owns the inbox.
- **Your data at rest.** Keys and app state encrypted on-device and isolated per account, on web and Android.
- **Push privacy.** Notifications carry no content, and k-anonymity tags stop the relay identifying recipients.

## What you are trusting

Pombo has no backend, and every piece of infrastructure it touches can be swapped for someone else's. That does not make it free of third parties.

| Component | What it could learn or do |
|---|---|
| **Google FCM, Apple APNs** | That your device runs Pombo. Inherent to platform push. Not content, not contacts |
| **The push relay**, one in production today | Tag buckets and timing. If it is down, push stops and messaging is unaffected |
| **Public RPCs and ENS infrastructure** | Polygon RPCs serve chain queries, Ethereum RPCs resolve ENS with decoys, a public gateway serves ENS avatars. All see the requests and your IP. You can configure your own |
| **The Graph** | Channel-type and membership queries. A shared default API key ships with the app; you can supply your own |
| **The storage provider you read from** | Holds ciphertext, or plaintext for open channels. Private reads are signed, so it does not infer who is reading: it knows which addresses open which channels and when. This applies to the Pombo project's cluster like any other provider |
| **The gate contracts** | Decide who participates in every contract-backed channel and route subscription payments, which go straight to the owner. Open source, not upgradeable, **not audited**. A flaw there is a flaw in access control and payment, not in the confidentiality of other channel types |
| **app.pombo.cc itself** | A hosted interface. Its operator controls what *this interface* shows, such as Explore curation, but not the protocol |

## If the app's origin is compromised

How the client hardens itself is in [Client security](client-security.md). The accepted risk behind that design: if attacker code runs in the app's origin, through an XSS that beats the sanitizer, a poisoned dependency or compromised hosting, nothing contains it. It can read the encrypted keystore and crack your password offline, and capture the key while the wallet is unlocked. Origin compromise means vault compromise, and your password's strength is the last line of defense, with scrypt making each guess expensive.

## Visible metadata

- **Open channels are public.** Anyone implementing the message format recovers the real account behind each message and correlates a person across open channels. Display names travel in cleartext in presence and typing signals too. The countermeasure is separate accounts, not a setting.
- **Channel creators are permanent public record**, since the creator's address is in the channel ID.
- **Membership of contract-backed channels is on-chain**: allowlists, bans, and in paid channels who subscribed and until when. Paying for a channel is a public act.
- **Members of a contract-backed channel can list each other.** Key requests and roster entries on the keys stream are account-signed, so any member can reconstruct the membership. Outsiders cannot, because a Pombo node serves that stream only to a signed request from someone with current access.
- **In a channel with visible authors, your wallet signs everything you publish**, file uploads included, in the clear. The contract is the publisher, but it is not a mask: the network must be able to read what it checks. Everyone who can fetch the history sees who wrote what, for as long as it is retained.
- **Moderation is visible.** In open channels the moderation state is world-readable; in protected channels it is encrypted for members; in contract-backed channels it is member-only. The owner's own actions are published by their real wallet in every type, exposing the owner and the timing of each one.
- **The owner's posts in a read-only open or protected channel** carry their account, since posting there is theirs alone.
- **Protected channels are brute-forceable offline.** Each publishes a password-verification challenge anyone can fetch and grind guesses against, at 310,000 PBKDF2 iterations per guess. A protected channel is exactly as secret as its password is strong.
- **DM inboxes are addressable.** Anyone can derive your inbox address and its encryption key from your account. Reading what is stored there needs your signature, and every envelope carries a different throwaway publisher, so the most a provider could leak is timing and volume, never correspondents.
- **A DM you send is retained under the recipient's settings**, in their inbox, on their provider, for as long as they chose. You can erase it from storage only during the session that sent it. See [Moderation](../protocol/moderation.md).
- **IP addresses are visible to network peers**, as in any P2P system, and timing correlation is possible for a well-positioned observer. Pair Pombo with a VPN or Tor if that is in your threat model; a proxy-node layer built on Streamr Sponsorships is in development.

## Shrinking what a seizure would find

A seized provider yields ciphertext plus the metadata around it: stream identifiers, sizes, arrival times, and the signed record of who fetched what.

Three things shrink that. Two belong to whoever owns the stream: point it at a **provider you run**, and set **retention low**, down to a single day. The third is **erasure**, which removes specific messages before retention ends. For a channel the owner sets all three, and the cost is real: late joiners and second devices get only what is still retained.

## Known open problems

- **DM spam.** Inboxes are public-write by design, so anyone can send to anyone, including spam that consumes inbox storage. Rate-limiting at this layer was evaluated and rejected as ineffective; a better answer is an open question.
- **Moderation in open channels is advisory.** Accounts are free, so a ban there is one click to evade. Only contract-backed channels cut someone off for real.
- **Revocation lags by up to a rotation.** Losing access stops at the contract immediately. Writing stops within about ten minutes in a visible channel, once cached gate answers expire. Reading stops only when the channel key next rotates, and every path to a rotation needs an admin present, as [Encryption](../protocol/encryption.md) lists. A determined ex-member reads new messages until one lands, and a channel nobody administers waits indefinitely. Rotating more often would cost every member a re-distribution; the current setting is a deliberate trade.
- **In a sealed channel, a removed member can still write bytes.** Everyone there publishes under one shared key the transport cannot tie to a person, so someone who kept it goes on writing until the owner resets it, at the cost of two transactions. Nobody can read what they write after the rotation, but the bytes occupy retention until erased. Visible channels are unaffected: the gate refuses the signature and nothing lands.
- **In a sealed channel an author cannot erase their own message from storage**, because the shared key proves nothing about who wrote it. Delete still works in every Pombo client, and the owner or a moderator can erase.
- **Unaudited contracts in the access path.** See the trusted-components table above.
- **Push anonymity scales with the user base.** The k in k-anonymity is roughly users divided by 256, so a small network means small anonymity sets.
- **No key rotation for a compromised account.** Identity *is* the keypair: if it leaks, the account is the attacker's, there is no revocation, and the answer is a new account.
