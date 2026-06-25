import { defineConfig } from 'vitepress'
import { withSidebar } from "vitepress-sidebar";

const nav = [
    {
        text: 'wr-1.x-dev',
        activeMatch: `^/wr-(1\.x)/`,
        link: '/wr-1.x/'
    },
    {
        text: '4.x',
        activeMatch: `^/(4\.x)/`,
        link: '/4.x/'
    },
    {
        text: '开发',
        activeMatch: `^/(develop)/`,
        items: [
            { text: '规约', link: '/develop/spec' },
            { text: 'Change Log', link: '/develop/changelog' },
            { text: '升级说明', link: '/develop/upgrade' },
            { text: 'FAQ', link: '/develop/faq' },
        ]
    },
    {
        text: '其他',
        activeMatch: `^/(1\.x)|(2\.x)|(3.x)/`,
        items: [
            { text: '1.x', link: '/1.x/' },
            { text: '2.x', link: '/2.x/' },
            { text: '3.x', link: '/3.x/' },
            { text: '4.x', link: '/4.x/' },
        ]
    }
]


// Placeholder of the i18n config for @vuejs-translations.
const i18n = {
    toc: '页内导航'
}

const vitePressConfig = {
    lang: 'zh-CN',
    title: 'Weiran Framework',
    description: '基于 Laravel 的模块化加载框架',
    srcDir: 'src',
    sitemap: {
        hostname: 'https://weiran.tech'
    },
    head: [
        [
            'script',
            {
                "async": "true",
                'src': 'https://www.googletagmanager.com/gtag/js?id=G-NRV7JE4X54'
            }
        ],
        [
            'script',
            {},
            `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NRV7JE4X54');
          `
        ]
    ],
    themeConfig: {
        logo: 'https://file.wulicode.com/static/images/logo.png',
        nav,
        outline: 'deep',
        search: {
            provider: 'algolia',
            options: {
                appId: 'S0E822B8FP',
                apiKey: '2bca470e6dcaf21bfbb0fa7554e3c32d',
                indexName: 'weiran'
            }
        },
        // Placeholder of the i18n config for @vuejs-translations.
        i18n,

        footer: {
            copyright: `Copyright © 2015-${new Date().getFullYear()} duoli <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备13016276号-9</a>`
        }
    },

    vite: {
        server: {
            host: true,
            port: 9428
        },
        json: {
            stringify: true
        }
    }
};

// https://vitepress.dev/reference/site-config
export default defineConfig(withSidebar(vitePressConfig, [
    {
        documentRootPath: 'src/',
        collapsed: false,
        scanStartPath: 'wr-1.x',
        basePath: '/wr-1.x/',
        resolvePath: '/wr-1.x/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'src/',
        collapsed: false,
        scanStartPath: '1.x',
        basePath: '/1.x/',
        resolvePath: '/1.x/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'src/',
        collapsed: false,
        scanStartPath: '2.x',
        basePath: '/2.x/',
        resolvePath: '/2.x/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'src/',
        collapsed: false,
        scanStartPath: '3.x',
        basePath: '/3.x/',
        resolvePath: '/3.x/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'src/',
        collapsed: false,
        scanStartPath: '4.x',
        basePath: '/4.x/',
        resolvePath: '/4.x/',
        useTitleFromFileHeading: true
    },
    {
        documentRootPath: 'src/',
        collapsed: false,
        scanStartPath: 'develop',
        basePath: '/develop/',
        resolvePath: '/develop/',
        useTitleFromFileHeading: true
    },
]));