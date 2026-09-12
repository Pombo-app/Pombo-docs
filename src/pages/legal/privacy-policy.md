---
title: Privacy policy
description: What data leaves your device when you use Pombo, and who receives it.
---

# Privacy Policy

**Effective date:** 12 September 2026
**Last updated:** 12 September 2026

Pombo is built so that we cannot see your messages, your contacts, or who you
talk to. This document is the legal statement of what data leaves your device
and who receives it, and it states the limits as plainly as the protections.
If you want to know *how* the protections work rather than what they cover,
[Publisher identity](/protocol/identity) and [Storage and sync](/protocol/storage-and-sync)
explain the mechanisms and the [threat model](/security/threat-model) sets out
what an attacker can achieve. Where those documents and this one describe the
same thing, this one governs.

## 1. Who we are, and what this covers

"Pombo", "we" and "us" mean Vasco Branco, who publishes the Pombo web
application at `app.pombo.cc`, the Pombo Android application, and the websites
`pombo.cc` and `docs.pombo.cc`, and operates the services in section 4. Pombo
is an open source project rather than a company. This policy covers the
applications, websites and services named here.

It covers what we run, not what the code can be used for. The applications,
the contracts and the push relay are MIT-licensed; the storage node software
is a fork of the Streamr node under Streamr's open source license. If you build
any of it yourself, host it somewhere else, or run your own storage node or
relay, that is your service and not ours, and whoever operates it is
responsible for it.

Pombo is a client for open infrastructure that it does not own. The Streamr
Network, the Polygon blockchain, storage nodes and RPC providers are run by
whoever chooses to run them, under their own terms, and this policy does not
cover them. Where using Pombo causes data to reach them, section 3 says so.

## 2. What we collect

Nothing, by construction. Pombo has no accounts: your identity is a
cryptographic key pair generated on your device. We do not ask for an email
address, a phone number, a name, or any other identifier, and we do not assign
one to you. We have no user database and no way to look you up, which also
means that if you lose your key and your backup, nobody can restore your
identity, including us. Nothing about you is required in order to use Pombo;
there is no field you have to fill.

There is no analytics, telemetry, crash reporting or usage measurement; no
advertising, advertising identifiers, or tracking across sites or apps; no
profiling; no automated decision-making; and no selling or sharing of personal
data. The little we hold is listed in section 4, and none of it is passed on
to anyone.

Your private key (in an encrypted keystore), your messages, the channels you
have joined, your contacts and the local names you gave them, channel
encryption keys, cached ENS data and exported backups live on your device.
Uninstalling the application, or clearing site data in your browser, erases
all of it, and we cannot recover it. If you have a DM inbox, an encrypted copy
of most of that state, channel keys included, travels to it so your other
devices can pick it up; see "Syncing between your devices" in section 3.

## 3. What leaves your device, and who receives it

Most of these parties are outside the European Economic Area, so using Pombo
sends your IP address to countries whose data protection law differs from the
EU's. GitHub and Google are United States companies. For the rest we cannot
tell you where your data goes: an RPC or indexing gateway answers from
whichever edge location its network chooses, and the peer-to-peer network
connects you to whoever happens to be carrying the same channel, anywhere in
the world. Each party operates under its own terms and its own transfer
safeguards; we are not a party to that relationship.

| Party | What it receives | When |
| --- | --- | --- |
| Other network participants | Your IP address | Whenever the app is connected |
| The storage node a channel uses, ours by default | Your IP address; encrypted content, or plaintext for open channels; stream ids, sizes and arrival times; for private channels and your inbox, your account address, signed, on every history request; the account-signed key requests of contract-backed channels; in channels with visible authors, your account on each message | For channels with retention, and for DMs |
| The Polygon blockchain | Your address and transactions, permanently and publicly | On-chain actions |
| The Graph | Your IP address and channel queries | Browsing and opening channels |
| RPC providers | Your IP address and the addresses you query | Gate checks, ENS, transactions |
| Google (FCM) and browser push services | Delivery of an opaque wake signal, device push token | Only if notifications are enabled |
| A user's chosen image host, or a public IPFS gateway | Your IP address and browser information | Viewing anyone with an ENS profile picture |
| YouTube | Standard embedded player data | Only if you play a video |
| Hosting providers | Web server access logs | Loading the sites |

What the table cannot carry:

**The network.** Your device connects directly to other participants, who can
observe your IP address, as is inherent to any direct connection. There is no
proxy layer that would hide it for you; if your IP address must not be visible,
use Pombo through a VPN or a network that does not identify you.

**Storage nodes.** Anyone can run one; a channel uses ours unless its owner
picks another, and the choice is shown at creation. What a node stores is what
the network carried: encrypted content for protected channels, contract-backed
channels and DMs, which its operator cannot read, and signed plaintext for open
channels, which anyone can. Around the content the operator sees stream
identifiers, sizes, and the time each message arrived, which the node records.
History is kept for 1 to 365 days, set by the channel's owner and deleted by
the node when the window ends.

Three things about you reach a storage node beyond your IP address, and we
state them because they are the price of the protections they buy:

- **Reading a private channel, or your own inbox, identifies you.** A Pombo
  storage node serves the history of a closed, gated or paid channel, or of a
  DM inbox, only to a request signed by an account that has access at that
  moment. That is what keeps everyone else out; it also means the node
  receives your account address, with a signature proving it is yours, each
  time you open such a channel or your inbox. Open and protected channels are
  served to anyone and need no signature.
- **Membership of a contract-backed channel is visible to the node that stores
  it.** Entering such a channel publishes a key request signed by your account,
  and staying publishes a roster entry the same way. The node holding that
  stream can derive who is in the channel. It serves the stream only to
  members, but it holds it.
- **In a channel whose creator chose visible authors, your account signs every
  message.** The node, like every member, sees who wrote what. In the default,
  sealed mode, everyone publishes under one shared key and the node cannot
  tell authors apart.

A Pombo storage node also checks each message before storing it, and refuses
forged or unauthorized writes. Our own cluster keeps no record of the history
requests it serves beyond answering them: the signature is checked, the
request's one-time nonce is held in memory for ten minutes to reject replays,
and nothing is written down. Requests it refuses, writes it rejects and
deletions it performs are recorded in the node's service log with the account
that made them; that log is not kept beyond the life of the running node.

**The blockchain.** Creating a channel, being added to or removed from a closed
channel, being banned from a contract-backed channel, and paying for access are
Polygon transactions: public, permanent, and deletable by no one. The owner's
allowlist, bans, and paid subscriptions name your address on-chain. Addresses
are pseudonymous, not anonymous: anyone who links an address to a person sees
everything that address has done. Payments for paid channels go directly to
the channel owner; Pombo takes no fee.

**Channel discovery and blockchain access.** Browsing channels queries The
Graph, which receives your IP address and the queries you make; supplying your
own API key in Settings changes who your queries are attributed to, not that
they are made. Reading gate conditions and sending transactions use public RPC
endpoints, listed in the application and changeable in Settings. Looking up the
`.eth` name of someone you see is sent with cover traffic, so the provider
learns that you resolved some address but not which one. Looking up a name you
typed yourself, to start a DM or send an invitation, is **not** covered: the
provider sees the exact name, which reveals who you intend to contact. This is
inherent to resolving ENS through someone else's node; we say it because most
applications leave it unsaid.

**Push notifications** are off until you enable them. The platform push service
(Google's Firebase Cloud Messaging on Android, your browser's push service on
the web) can see that something was delivered to your device, but not its
content, sender or channel. The Pombo relay that triggers deliveries cannot
determine any of those either: what reaches it is an anonymous tag shared by
many devices. To deliver at all, the relay does store your device's push token,
with that tag and the registration times. A push token identifies a device, not
a person; it carries no name or account, and the relay holds nothing linking
it to your Pombo identity or channels. It is a persistent identifier, so we
name it. Turning notifications off removes it. On Android, the Firebase
Messaging component also sends an installation identifier to Google; that is a
property of the platform's push service.

**Profile pictures set by other users.** If someone has an ENS profile picture,
your device loads it from wherever their record points: a server of their
choosing, which receives your IP address and browser information (IPFS images
go through a public gateway, which receives the same). A person can point
their picture at a server they control precisely to learn who views their
messages; HTTPS is required, but that protects the request in transit, not who
made it. **Settings → Content → ENS Avatars** turns the fetch off entirely,
everywhere an avatar is drawn, and shows a locally generated image instead. It
is on by default.

**Embedded video** is loaded from YouTube in privacy-enhanced mode, and nothing
is loaded until you press play.

**The websites** are served by GitHub Pages, which keeps ordinary access logs,
including IP addresses, under its own privacy statement.

**Syncing between your devices.** If you create a DM inbox, Pombo publishes a
snapshot of your own state to it: your channel list and the keys of your
private channels, contacts and the local names you gave them, blocked peers,
cached ENS names, your display name, your settings, the messages you sent and
the images that went with them. This starts automatically once the inbox
exists and can be set to manual in Settings. The snapshot is encrypted to your
own key before it leaves the device; nobody else can read it, including us and
including the storage node your inbox uses (ours, unless you chose otherwise),
which holds an encrypted blob, its size, and when it arrived.

## 4. What we operate

Three places where the project holds data, and they are the only ones:

- **The storage cluster** that channels and inboxes use by default: channel
  history, encrypted except for open channels, and encrypted device-sync
  snapshots, for as long as their retention windows say, plus the service log
  described in section 3. We keep the history so that what a channel's owner
  asked for is there when its members come back, on our legitimate interest in
  running a usable service.
- **The push relay**: the device push tokens described in section 3, for as
  long as notifications stay enabled, kept only to deliver the notifications
  you asked for, on the basis of your consent. Turning notifications off
  withdraws it and deletes the token.
- **This mailbox**: writing to the address in section 9 means we hold your
  message and the address you sent it from, for as long as it takes to answer
  and keep a record of having done so, on our legitimate interest in answering
  people who write to us.

Web server logs are not on the list because we do not have them: GitHub keeps
the sites' logs for its own purposes, and we can neither read nor delete them.
None of the three is a component of the application; each can be replaced by
someone else's, or by your own.

## 5. Retention and deletion

Channel history stays on the storage nodes a channel uses until its retention
window expires; then each node deletes it. Before that, a Pombo storage node
deletes a specific message when asked by someone entitled to: the message's
author, while their client still holds the key that signed it; the channel's
owner or a moderator; or the owner of a DM inbox, for what is stored in it.
Our cluster honours those requests and no others. We do not delete a channel's
history early on our own initiative, because that would break the guarantee
the channel's owner chose, and on any other node we have no access at all.

What that reaches, and what it does not:

- Deleting a message in the application removes it from every Pombo client,
  and erases the stored copy from each of the channel's storage nodes that
  supports erasure. The application reports on how many it succeeded.
- In a channel whose authors are sealed, an author cannot prove which messages
  are theirs, so their own deletion reaches the clients but not the stored
  copy; the channel's owner or a moderator can erase it.
- A DM you sent is stored in the recipient's inbox, under their retention.
  You can erase it from there only during the session that sent it; after
  that, the deletion still hides it in every client, and the stored copy stays
  until their retention ends or they erase it.
- Blockchain transactions are permanent and cannot be deleted by anyone.
- Messages already delivered to other people's devices are theirs; we have no
  mechanism to reach into them.

## 6. Your rights

If you are in the European Economic Area or the United Kingdom, data protection
law gives you rights of access, correction, deletion, restriction, objection
and portability. These rights are exercised against whoever holds your data,
and in Pombo's case almost everything is held by you, on your own device, to
export, inspect and destroy without asking us. What our storage cluster holds
of yours, you can mostly erase yourself, from the application, under the rules
in section 5.

For what we do not hold, we cannot act on your behalf: we cannot delete
blockchain transactions, reach into a storage node run by someone else, or
retrieve messages from other people's devices. For the three services in
section 4 we take responsibility: if you want something removed that the
application cannot remove for you, ask (for the push token, turning
notifications off in the app is faster). If you think we have handled your
data badly, you can complain to the data protection authority of the country
where you live; the European Data Protection Board
[lists them all](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en).

## 7. Age

Pombo is not directed at children, and you must be at least 16 years old to use
it. We cannot verify your age: verifying it would require collecting exactly
the identifying information this application is designed not to collect. The
requirement is a condition of use, not something we enforce technically.

## 8. Changes to this policy

If this policy changes we will update the effective date above. The full
history of every change is public in the repository that publishes this page.

## 9. Contact

Questions about this policy, and any request relating to your data, go to
**privacy@pombo.cc**.
