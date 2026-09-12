---
id: moderation
title: Ownership and moderation
description: What ownership means on-chain, what each part of a ban does, who can erase what from storage, and how moderators work without the owner's key.
---

# Ownership and moderation

## Ownership

A channel's stream ID contains its creator's address, and its permissions are entries in the Streamr registry contracts on Polygon PoS: public state that no third party, Pombo included, can alter or confiscate.

Two consequences. Your channels survive Pombo, because any client speaking the protocol reads them. And creating a channel is public: the creator's address is in the ID forever, so a channel you do not want linked to your main identity has to be created from a separate account.

## What a ban does

A ban is three independent effects, offered as three checkboxes:

| | Where it lives | Cost | Effect |
|---|---|---|---|
| **Hide their messages** | The owner's snapshot on the admin stream, or a moderator's delta on the message stream | Free, reversible | Every Pombo client stops rendering what they write from the ban onward. The bytes stay on the network |
| **Cut their access** | The gate contract | One transaction, contract-backed only | No further keys, and the channel key rotates at once |
| **Erase their messages from storage** | A signed request to each of the channel's storage providers | Free, irreversible | Their messages are deleted from storage, and hidden on the way |

Cutting access alone expels and leaves the history readable to members: clients validate a message when it arrives and never again. Hiding alone silences: the person goes on publishing and nobody sees it. Neither is a shadow ban, because the list is published on the channel's own streams and anyone in the channel can read it.

A hide carries the **key generation** it was applied in, not a timestamp: messages travel with the identifier of the key that sealed them and that cannot be forged, while a timestamp is the publisher's to choose. So hiding someone covers what they write from that point on, and what they wrote before stays as it was. Open and protected channels have no key generations, so a ban there hides everything.

Whether cutting access also stops the person from *writing* depends on the channel's identity on the wire; see [How access works](access.md).

## Erasing from storage

Hiding is a promise every Pombo client keeps. Erasing is a deletion the storage provider performs.

| Who | Which message | Action | Reversible |
|---|---|---|---|
| The author | Their own | **Delete** | No |
| Owner or moderator | Any | **Hide**, then **Unhide** | Yes |
| Owner or moderator | Any | **Erase from storage** | No |
| Owner | Everything by a banned member | The third ban checkbox | No |

**Per provider, reported as such.** A channel can hold several providers, so the request goes to each and the result is "erased on two of three". A provider without the capability keeps its copy, and the option is hidden unless at least one provider has it.

**Hide first, erase second.** A client already holding the message shows it until a hide arrives, so erasing always hides on the way.

**The author's Delete erases only while the proof holds.** The provider needs proof of authorship, which is the key that signed the message:

| Channel | The author's Delete reaches storage |
|---|---|
| Visible | Always |
| Open, protected | Only during the session that published it, because the signing key is a throwaway |
| DM | Only during the session that sent it, for the same reason |
| Sealed | Never: the shared key proves nothing about who wrote |

Delete still removes the message from every Pombo client in all four cases. In a sealed channel the owner or a moderator can erase what an author cannot.

## Moderators

The owner of a contract-backed channel can appoint moderators. They manage the allowlist, hide messages, erase them from storage and ban at the client level. They cannot ban on the contract, act on the owner or on each other, appoint anyone, or rotate keys. Open and protected channels have no contract, so no moderator role: their owner moderates alone.

Only the owner can write to the admin stream, so a moderator's actions travel as **signed deltas** on the message stream, and clients render the owner's snapshot with the unabsorbed deltas applied on top. Moderation keeps working while the owner is away, and the owner has the last word on return: **Confirm Moderator Actions** absorbs the deltas into the owner's snapshot, and dismissing a moderator dissolves whatever they left pending. What was already absorbed stays.

## Discovery and curation

Explore lists the channels that opted in. **Listed** is a choice at creation, channels are unlisted by default, and closed channels are never listed.

Gated and paid channels can be listed as storefronts: the card shows name, description, image, the access condition or price, and whether authors are visible on the wire, so someone sees what they would be joining before acquiring anything. The conversation itself stays encrypted. An unlisted channel publishes no name or description on-chain; only the owner address and creation time are visible.

On top of that, the Pombo interface applies a curation manifest: a list of pinned channels and channels hidden from discovery. Hiding is interface-level only, and a hidden channel remains reachable by direct link. The protocol is neutral; the interface curates what it presents.
