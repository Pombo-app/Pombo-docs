---
id: run-a-relay
title: Run a push relay
description: Run a Pombo push relay, the easiest way to contribute infrastructure to the network.
---

# Run a push relay

The push relay bridges Streamr wake signals to Web Push and FCM. It is deliberately blind, it never sees message content or user identities (see [Notifications](../protocol/notifications.md)), and deliberately cheap to run. This is the easiest piece of Pombo infrastructure to operate.

## Requirements

- Node.js 18 or newer
- About 50 to 100 MB of RAM and 100 MB of disk. SQLite is embedded; there is no database server.
- A stable internet connection

That is Raspberry Pi territory. A home PC, a free-tier cloud VM, or the cheapest VPS you can find all work.

## Setup

```bash
git clone https://github.com/Pombo-app/Pombo-push
cd Pombo-push
npm install
cp .env.example .env
npx web-push generate-vapid-keys
npm start
```

Fill in `.env` before starting: paste the generated VAPID keys, and set `RELAY_PRIVATE_KEY` to a fresh Ethereum private key. Use a dedicated key, not a personal wallet.

| Variable | Purpose |
|---|---|
| `RELAY_PRIVATE_KEY` | The relay's Streamr identity |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` | Web Push (VAPID) keypair |
| `VAPID_EMAIL` | Contact email included in push requests |
| `POW_DIFFICULTY` | Proof-of-work requirement for wake signals, default 4 |
| `PUSH_STREAM_ID` | The Streamr stream to listen on. For the live Pombo network it must be `0xae340e799e8151f6a4999d245e466197aa217667/push`. The code's fallback default is a placeholder: with it the relay starts cleanly, listens to an empty stream, and never delivers anything |
| `ADMIN_PORT` | Admin API port, default 8000. Set `0` to disable the admin API entirely |

One consequence of sealed registrations: clients encrypt the registration to the relay key published in the push stream's on-chain metadata, and verify it against the relay address configured in the app. A relay with a different key never receives readable registrations on the live stream. Today, running your own relay means running it against your own push stream and client configuration, not piggybacking on the live one. Contributing a relay to the main network is a coordination step with the project rather than a config value.

## Keeping it running

Use PM2:

```bash
pm2 start index.js --name pombo-relay
pm2 save && pm2 startup
```

The admin API (`GET /admin/stats`, `GET /admin/registrations`, `GET /admin/events`) shows registration counts and delivery stats. To confirm the relay works end to end: enable notifications on a device in Pombo, check that `curl localhost:8000/admin/stats` shows the registration, then send yourself a message from another account.

:::caution
The admin API is unauthenticated, binds to all interfaces, allows any origin, and includes a destructive `DELETE` endpoint. Firewall the port to localhost, or set `ADMIN_PORT=0` and use the offline `admin-cli.js` tool instead.
:::

## Operational notes

- **VAPID keys are the relay's identity to browsers.** If you rotate them or users switch relays, their devices must re-register for push. Back up your `.env` and `data/tokens.db`.
- The relay stores only push subscriptions (endpoint and tag), never message data.
- Resource usage grows very slowly with users; a single small instance comfortably serves thousands of registrations.
