---
id: contract
title: The gate contract
description: "PomboGate, one clone per contract-backed channel: what it answers, who may call what, and what is immutable."
---

# The gate contract

Creating a closed, gated or paid channel deploys a **PomboGate**: one [EIP-1167 clone](https://eips.ethereum.org/EIPS/eip-1167) per channel, from a shared factory, for a single transaction. Source: [pombo-contracts](https://github.com/Pombo-app/pombo-contracts).

It answers one question for the rest of the channel's life: **does this address have access right now?**

Two callers ask it, and they get the same answer:

| Caller | Function | Used for |
|---|---|---|
| Pombo clients | `checkAccess` | Handing out encryption keys, and what the interface shows you |
| The Streamr Network | `isValidSignature` ([ERC-1271]) | Accepting or refusing a message at ingest |

[ERC-1271]: https://eips.ethereum.org/EIPS/eip-1271

Because the contract is the grantee on every stream, adding or removing a member is a transaction on the gate, never a change to stream permissions. A closed channel created with ten members costs one batched transaction, not ten.

## The rule it enforces

| Mode | Access means |
|---|---|
| **Closed** | On the owner's allowlist |
| **Gated, token** | Holding at least a minimum balance of an ERC-20 |
| **Gated, NFT** | Holding at least one token of an ERC-721 |
| **Paid** | A subscription that has not expired |

The owner always has access; a banned address never does; moderators have access by role.

## Who may call what

| Action | Owner | Moderator |
|---|---|---|
| Add or remove allowlisted addresses | Yes | Yes |
| Ban and unban | Yes | No |
| Appoint moderators | Yes | No |
| Set price and duration | Yes | No |
| Publish in a read-only channel | Yes | Yes |

Moderators cannot act on the owner or on each other.

## Immutable after creation

`wireIdentity` (sealed or visible) and `readOnly` are set at creation and can never change. The contract is the authority on both; the copy in the stream metadata is a cache.

Price and duration are the owner's to change; the mode, the token and the minimum balance are not.

## Paid channels

- The payment is a **single transfer to the owner**. The contract takes no fee and never custodies the money.
- **Renewing early extends from the current expiry**, not from the moment you pay.
- **No grace period.** Access ends at the recorded timestamp; the app warns for three days before and shows a renew action after.
- **First-person only.** Paying for someone else is refused, because it would link payer and beneficiary on-chain forever.
- Tokens supporting [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612) permits, such as USDC on Polygon, pay in one transaction; others use approve-then-pay. Prices set in POL settle in wrapped POL, and the app wraps the shortfall for you.

## One deliberate asymmetry

`checkAccess` is strict: a gate token that reverts makes it revert, and clients treat that as fail-closed, because a broken token answering "yes" would hand out encryption keys.

`isValidSignature` fails **open** on the same fault: a broken token accepts the write. A frozen channel is unrecoverable, while the worst case here is unreadable ciphertext in storage.

The contracts are open source, small, not upgradeable once deployed, and **not audited**.
