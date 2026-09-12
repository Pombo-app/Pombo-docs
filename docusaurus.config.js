// @ts-check
// Docusaurus config for docs.pombo.cc
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pombo Docs',
  tagline: 'Own your communications',
  favicon: 'favicon/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.pombo.cc',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Pombo-app',
  projectName: 'pombo-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    'docusaurus-plugin-image-zoom',
    [
      '@docusaurus/plugin-client-redirects',
      {
        // The tree is organized by subject: tasks in Use Pombo, the machinery
        // in The protocol, lookups in Reference. Every URL ever published
        // must still land somewhere.
        redirects: [
          {from: '/getting-started/install', to: '/use/install'},
          {from: '/getting-started/identity', to: '/use/account'},
          {from: '/getting-started/first-steps', to: '/use/first-steps'},
          {from: '/guides/managing-channels', to: '/use/channels'},
          {from: '/guides/direct-messages', to: '/use/direct-messages'},
          {from: '/guides/file-sharing', to: '/use/files'},
          {from: '/guides/backup-and-recovery', to: '/use/backup'},
          {from: '/help/faq', to: '/use/faq'},
          {from: '/help/troubleshooting', to: '/use/troubleshooting'},
          {from: '/help/glossary', to: '/reference/glossary'},
          {from: '/concepts/client', to: '/protocol/overview'},
          {from: '/concepts/architecture', to: '/protocol/overview'},
          {from: '/concepts/channel-anatomy', to: '/protocol/streams'},
          {from: '/concepts/channel-access', to: '/protocol/access'},
          {from: '/concepts/channels-and-ownership', to: '/protocol/access'},
          {from: '/concepts/gated-and-paid-channels', to: '/protocol/access'},
          {from: '/concepts/ownership-and-moderation', to: '/protocol/moderation'},
          {from: '/concepts/encryption', to: '/protocol/encryption'},
          {from: '/concepts/privacy-model', to: '/protocol/identity'},
          {from: '/concepts/storage-and-sync', to: '/protocol/storage-and-sync'},
          {from: '/concepts/storage-and-persistence', to: '/protocol/storage-and-sync'},
          {from: '/concepts/notifications', to: '/protocol/notifications'},
          {from: '/guides/notifications', to: '/protocol/notifications'},
        ],
      },
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'favicon/og-banner.png',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Pombo',
        logo: {
          alt: 'Pombo logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://app.pombo.cc',
            label: 'Open App',
            position: 'right',
          },
          {
            href: 'https://github.com/Pombo-app/Pombo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Pombo',
            items: [
              {label: 'Website', href: 'https://pombo.cc'},
              {label: 'Open App', href: 'https://app.pombo.cc'},
              {label: 'Privacy policy', to: '/legal/privacy-policy'},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'GitHub', href: 'https://github.com/Pombo-app/Pombo'},
              {label: 'X', href: 'https://x.com/app_Pombo'},
            ],
          },
          {
            title: 'Built on',
            items: [
              {label: 'Streamr Network', href: 'https://streamr.network'},
              {label: 'Polygon', href: 'https://polygon.technology'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Pombo. Own your communications.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
      zoom: {
        selector: '.markdown img',
        background: {
          light: 'rgba(255, 255, 255, 0.95)',
          dark: 'rgba(9, 9, 11, 0.95)',
        },
      },
    }),
};

export default config;
