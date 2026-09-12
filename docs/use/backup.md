---
id: backup
title: Backup and recovery
description: Export a portable encrypted backup, the only recovery mechanism that exists.
---

# Backup and recovery

:::danger[The one rule]
Nobody holds your key. There is no "forgot password", no account recovery and no support ticket that brings an account back. Your backup file *is* the recovery mechanism.
:::

## Export

**Settings → Account → Backup & Restore → Export** (on Android, **Settings → Backup & Restore → Export Account Backup**). You get a single file holding your encrypted key, your encrypted app state (contacts, channels, settings, sent messages) and the keys of the private channels you belong to.

The file is encrypted under your account password, verified before export. Treat it with the same care as the key itself.

It carries only what cannot be recovered from elsewhere. Anything the network still holds is left out and re-downloaded on restore. Media you sent in DMs lives only in the recipient's inbox, so it is included by default; **Include sent DM media** turns that off to keep the file small.

:::info[Why channel keys are in there]
Members re-distribute the keys they hold, but only while someone still holds them and the announcement anchoring each one is still in storage. Your backup is the recovery path that depends on nobody else.
:::

## Restore

On any device, **Import** the file (on Android, **Restore Account Backup**) and enter your account password. Identity and data come back exactly.

## What a backup does not cover

- **Received message history.** It lives on the network and re-downloads from storage nodes, within each channel's retention window. The same goes for images you received.
- **Anything after the export.** A backup is a snapshot.

## Multi-device

You do not need to shuttle files between devices you use actively. Import your account once on each, and from then on Pombo syncs state through your own DM inbox, private channel keys included, self-encrypted so only your key reads it. See [Storage and sync](../protocol/storage-and-sync.md).

## Practical advice

Export immediately after creating an account, before it has anything to lose. Re-export after big changes, such as new channels you own. And store the password as carefully as the file: losing it is the same as losing the backup.
