---
id: run-a-storage-node
title: Run a storage node
description: Operate a Pombo storage node that channel owners can point their channels at.
---

# Run a storage node

Storage nodes archive stream history so channels and DM inboxes work when people are offline. A channel owner can point a channel at any provider, including yours. This is a heavier commitment than a [push relay](run-a-relay.md): a database-backed, always-on service whose uptime the channels assigned to it depend on.

The node software is [pombo-storage-node](https://github.com/Pombo-app/pombo-storage-node), a build of the Streamr storage node that validates writes at ingest, serves private history only to signed requests, stamps each message with a receipt time, deletes on request and enforces retention on its own. It stays a drop-in Streamr node otherwise. What each of those does for a channel is in [Storage and sync](../protocol/storage-and-sync.md).

## What you need

- A machine with Docker, 4 GB of RAM and a few tens of GB of disk, growing with the channels you host.
- A public IP with ports 80 and 443 (HTTPS endpoint) and 32200 (Streamr overlay) reachable from the internet.
- A hostname you control, with a DNS A record pointing at the machine. The web app runs in a browser and reads only from an `https://` endpoint with a valid certificate on a real hostname. An IP address or plain HTTP will not work.
- A little POL on the node's address, for the one transaction that registers it.

## Install

One command on a bare Debian, Ubuntu or RHEL-family machine:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/Pombo-app/pombo-storage-node/pombo/103.3.1/bootstrap.sh)
```

The installer installs Docker, fetches the node, and asks for what only you can provide: whether to generate a key or use yours, and your hostname. It pulls the prebuilt image, pauses for you to fund the node's address with POL and open the firewall ports, registers the node on-chain, and brings up the node, its Cassandra database and a Caddy proxy that obtains the certificate.

The same procedure by hand, for troubleshooting or a custom setup, is in the repository's [installation guide](https://github.com/Pombo-app/pombo-storage-node/blob/pombo/103.3.1/HOW_TO_INSTALL.md).

When it is up, from another machine:

```bash
curl https://node.example.org/capabilities
```

answers with the node's name and feature list. A channel owner who enters your node's address under **Storage Provider → Custom** when creating a channel, or later in the channel's settings, gets its history stored with you.

## Operating it

- **Retention is automatic.** The node prunes data past each stream's retention on its own timer. There is no cron to set up.
- **Back up the node's private key.** Its address is how streams are assigned to it; losing the key orphans every channel pointed at your node.
- **Snapshot Cassandra before risky changes** with `nodetool snapshot`.
- **Upgrades** are a `git pull` and a compose restart. Schema changes ship as files; the node refuses to start when a column it needs is missing and names the file to apply.
- **Uptime matters more than specs.** A modest VPS with reliable disk beats a big machine that reboots weekly.

## Running a cluster

Several nodes can share one replicated Cassandra database under one provider identity, splitting the write load while any node serves any read. The installer has a cluster branch that asks the cluster size, whether this machine is the seed, and the IPs. The manual procedure, and what to check when the Cassandra ring will not form across machines, is in the repository's [cluster guide](https://github.com/Pombo-app/pombo-storage-node/blob/pombo/103.3.1/deploy/CLUSTER.md).

Two things learned running Pombo's own cluster:

- Ports 7000 and 9042 must be reachable between the nodes and from nowhere else. Cassandra is unauthenticated in this setup.
- Schedule **full** repairs, `nodetool repair -full -pr`, daily and staggered across nodes. Incremental repair, the default, leaves tombstones unable to meet their data, so disk is never reclaimed, and unrepaired replicas silently diverge. The symptom is history that appears and disappears between reloads, because alternate reads hit alternate replicas.

## Registering more than one URL

A provider can register several HTTPS URLs at once, comma-separated at registration time, if it serves the same database from more than one hostname. Clients rotate across them and fail over when one stops answering.
