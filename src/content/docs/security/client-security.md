---
title: Client security
description: How the official web and Android apps protect your key and data, and where they fall short.
---

What the protocol exposes is in the [Threat model](/security/threat-model/). This page covers the official apps.

## Your key

| | Web | Android |
| --- | --- | --- |
| Stored | An encrypted keystore (scrypt) in the browser's local storage | Encrypted preferences, under a key held by the Android Keystore |
| Unlocked with | Your password | Nothing: the app can always use it |
| Stays unlocked | Until you disconnect; there is no automatic lock | |
| Screen lock asked for | | Revealing the key, deleting or switching accounts, approving transactions |

On the web, the rest of your account's state is encrypted with a key derived from a signature by your account.

## Not encrypted on the device

- **Web:** the last message of each conversation, shown in the channel list; channel images; files kept for seeding; and the service worker's list of channels, with names and your The Graph key.
- **Android:** the last message of each conversation, received images, and the ENS cache, in the app's private storage. The app does not opt out of Android's automatic backup, which can copy these files to your Google account.

Anyone with access to your browser profile or an unlocked phone can read these.

## Android: the signing bridge

The Streamr SDK runs in a hidden WebView with file access, content access and navigation turned off. In normal use it knows only your address and public key; a native signer answers every signing request.

- New, imported and guest keys are created inside the WebView, so the key passes through it at those moments.
- The signer signs any message the WebView asks for. Transactions need your confirmation with the screen lock; the signer checks their format, not their contents.

## Web: what the page can run

- One bundle, served from the app's own origin. The content security policy allows scripts only from there, and connections and images from any HTTPS source, so you can use RPCs and storage nodes of your choice.
- The policy is set in the page itself: the host, GitHub Pages, sends no security headers. A script stops the app from running inside another site's frame.
- Messages are sanitized with DOMPurify. Links must be `http` or `https` and open with `noopener`; the only embeds allowed are YouTube videos, from its no-cookie domain.

## Checks on what arrives

- Every message's signature and publish permission, and each author's proof.
- Key announces only from the channel owner, and keys only if they match the announced hash.
- Access checks against two RPC providers; if they disagree, the app refuses and warns you.
- A direct message's recipient key must belong to the recipient's address.

## Privacy settings

- The Streamr SDK's telemetry is off.
- ENS names are looked up with two decoy lookups each.
- **ENS Avatars** is on by default. Avatar images come from third-party hosts, which see your IP address; turn it off in Settings › Content.
- There are no link previews.
- You choose your RPC endpoints and can use your own The Graph key: [Troubleshooting](/use/troubleshooting/).
