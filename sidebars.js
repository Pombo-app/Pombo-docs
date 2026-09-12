// @ts-check
// Explicit sidebar for docs.pombo.cc
//
// Organised by subject, not by document genre. "The protocol" is the trunk
// and reads in dependency order: what Pombo composes, the streams a channel
// is made of, who you are on the wire, who gets in, how it is encrypted,
// where it is kept, who moderates, how you are notified. Tasks live in
// "Use Pombo" so an evaluator can skip them, and Reference holds only what
// people look up rather than read.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'welcome',
    {
      type: 'category',
      label: 'Use Pombo',
      collapsed: true,
      items: [
        'use/install',
        'use/account',
        'use/first-steps',
        'use/channels',
        'use/direct-messages',
        'use/files',
        'use/backup',
        'use/faq',
        'use/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'The protocol',
      collapsed: true,
      items: [
        'protocol/overview',
        'protocol/streams',
        'protocol/identity',
        'protocol/access',
        'protocol/contract',
        'protocol/encryption',
        'protocol/storage-and-sync',
        'protocol/moderation',
        'protocol/notifications',
      ],
    },
    {
      type: 'category',
      label: 'Security and privacy',
      collapsed: true,
      items: [
        'security/privacy-at-a-glance',
        'security/threat-model',
        'security/client-security',
        { type: 'link', label: 'Privacy policy', href: '/legal/privacy-policy' },
      ],
    },
    {
      type: 'category',
      label: 'Run infrastructure',
      collapsed: true,
      items: [
        'operators/run-a-storage-node',
        'operators/run-a-relay',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/channel-types',
        'reference/limits',
        'reference/glossary',
      ],
    },
  ],
};

export default sidebars;
