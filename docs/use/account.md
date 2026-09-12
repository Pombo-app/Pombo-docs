---
id: account
title: Account
description: Create an account, protect its key, use several accounts, import an existing wallet.
---

# Account

A Pombo account is an Ethereum keypair generated on your device. It costs nothing, requires no email or phone number, and never touches a server. Your address (`0x…`) is your identity: how people DM you, how channel permissions reach you, how your channels are owned.

## Create one

On first launch the app opens **Connect Account**:

- **Create New Account** generates a new key. On the web you choose a password that encrypts it on this device.
- **Import Private Key** uses an existing Ethereum key instead.

There is no sign-up step and nothing to confirm.

:::danger[There is no "forgot password"]
Nobody holds your key. Lose your device with no backup and the account, plus everything encrypted with it, is gone permanently. [Export a backup](backup.md) as soon as you create the account.
:::

## How the key is protected

| | Where the key lives | Unlocked by |
|---|---|---|
| **Web** | A scrypt-encrypted keystore | The password you chose |
| **Android** | Encrypted preferences under a hardware-backed key | The device itself, no password |

Android's trade-off is that anything running *as the Pombo app* on an unlocked device can use the key, which is what lets push notifications decrypt in the background. Sensitive screens are gated by your device lock.

Everything else the app stores, contacts and channels and settings, is encrypted separately per account. The mechanisms are in [Encryption](../protocol/encryption.md).

## Several accounts

You can keep several accounts on one device and switch between them; each has isolated data. **Guest mode** gives you a throwaway account that persists nothing and has no DM inbox.

Switching accounts is Pombo's answer to pseudonymity. There is no per-channel anonymous mode; [Publisher identity](../protocol/identity.md) explains why.

## External wallets

Importing an existing private key works. Connecting an external wallet such as MetaMask or a hardware wallet without importing the key is not available today.

## ENS names

If your address has an ENS name, Pombo resolves and displays it. How lookups are protected is in [Publisher identity](../protocol/identity.md).

## Settings

Under **Settings → Account** you set your display name, see your address and POL balance, export or import a [backup](backup.md), and choose the [device sync](../protocol/storage-and-sync.md) mode.
