---
id: notifications
title: Notifications
description: "Waking a device without learning who it belongs to: wake signals, k-anonymity, a blind relay."
---

# Notifications

Push is the hardest feature to do privately, because the platforms, Google FCM and Apple APNs, sit in the delivery path by construction. Pombo's goal is that **no party in that path learns who is messaging whom, or what was said.**

## How it works

1. When someone messages a channel or inbox you follow, their client broadcasts a **wake signal** on a dedicated Streamr push stream. It carries no content: a 1-byte tag derived from the destination, plus a small proof-of-work against spam, published under a throwaway key so it does not reveal the sender either. Anyone may publish to that stream; only the relay may subscribe.
2. The **relay**, an open-source server anyone can run, checks the proof-of-work and fires a Web Push to *every* device registered under that tag.
3. Your device wakes and checks whether there is really a message for it, by querying the channel's storage node over HTTPS. Only then does a notification render.

Push is opt-in per channel; your own DM inbox is registered automatically. The registration itself, the one message carrying your push endpoint, is **encrypted to the relay's public key**, published in the push stream's on-chain metadata and verified against the relay's known address before use, and it is sent under a throwaway key. Nothing on the stream links it to an account, and only the relay can read the endpoint inside.

![Push notifications with k-anonymity: registration and wake-signal phases across sender, relay, FCM and recipients](../assets/diagrams/push-k-anonymity.webp)

*Alice and Charlie share tag `0x75` for different channels, so both devices wake and each verifies locally; Bob's tag does not match, so his device never wakes.*

**The 1-byte tag is the trick.** With 256 possible tags, many users share each one, which is the k-anonymity: the relay knows "someone in bucket 173 has mail", not who. The cost is that your device occasionally wakes for someone else's message and goes back to sleep.

## What each party learns

| Party | Learns | Does not learn |
|---|---|---|
| Relay | Tag bucket, aggregate frequency | Content, sender, sender's IP, which user you are |
| Google or Apple | That your device runs Pombo | Content, sender, your channels or contacts |
| Network observer | Wake-signal timing | Content, sender, recipient beyond the tag bucket |

The residuals, stated plainly: platform push tokens inherently tell Google or Apple *that* you use Pombo. The relay stores your token keyed to your tags, so it can link the notifications one device receives over time, though not whose device it is. The wake-verification step shows the storage node which stream your device polls, and when. And wake signals travel unencrypted by design, since they must stay cheap and carry nothing sensitive: the subscribe restriction is network-level, so a determined observer running a modified node could watch their timing. The design assumes that, because even a full view yields only buckets and timestamps. Small user bases mean small anonymity sets.

## Platform notes

- **iOS**: push requires the PWA installed to the Home Screen, iOS 16.4 or newer. A Safari tab receives nothing.
- **Android**: Firebase Cloud Messaging. Battery optimizations can delay delivery by minutes; exempting Pombo helps.
- **Availability**: one community relay serves the network today. If it is down, push pauses and messages are unaffected, waiting on the network as usual. Anyone can [run a relay](../operators/run-a-relay.md).

Even when everything is right, push is best-effort and delivery can lag from seconds to minutes. [Troubleshooting](../use/troubleshooting.md) has the checklist.

## In-app notifications

Notifications *inside* Pombo, such as channel invites, do not use the push system at all. They travel through your DM inbox, end-to-end encrypted like any DM.
