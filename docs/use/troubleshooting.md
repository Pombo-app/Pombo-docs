---
id: troubleshooting
title: Troubleshooting
description: Common issues and how to resolve them.
---

# Troubleshooting

## Push notifications do not arrive

In order:

1. **iOS**: push works only when Pombo is installed to the Home Screen, iOS 16.4 or newer. A Safari tab receives nothing. Reinstall through *Share → Add to Home Screen* and re-enable notifications.
2. **Android**: battery optimization, Doze and Adaptive Battery, delays or drops background pushes. Exempt Pombo in system settings.
3. **Both toggles**: the in-app setting and the OS-level permission.
4. **The relay may be down.** Push depends on a community relay being online. Messages still arrive when you open the app; only the wake-up is affected.

Even when everything is right, push is best-effort and can lag from seconds to minutes.

## Channel history is missing or incomplete

- History older than the channel's retention has expired from storage. That is by design.
- If *recent* messages appear and disappear between reloads, the provider has replica-consistency trouble between its servers. Nothing to fix client-side; it resolves when the operator repairs it. Messages you watched arrive live are unaffected on your device.
- Channels on custom storage providers depend on that provider being up and correctly configured. If it is unreachable, history will not load until it returns.

## A transaction failed

On-chain actions need a little POL for gas:

- Check your balance. The app estimates the cost up front and blocks creation below the estimate, so "nothing happens" usually means insufficient balance rather than a failure.
- Make sure you are not rejecting the wallet prompt.
- Public RPC endpoints occasionally rate-limit. Retrying usually succeeds, and the app rotates between several endpoints.

## I forgot my password, or lost my device

With a [backup file](../use/backup.md), import it and enter your account password: everything comes back. Without one, the account cannot be recovered by anyone, including us. That is the flip side of nobody else holding your keys.

## My devices are out of sync

Sync propagates through your DM inbox and applies on app open, so give both devices a moment online. If a device has been offline longer than your inbox's retention it may have missed intermediate snapshots; re-importing a fresh backup resyncs it fully.
