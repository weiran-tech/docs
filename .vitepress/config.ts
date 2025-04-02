import { defineConfig } from 'vitepress'

/**
 * Create Simple Link
 * @param title
 * @param url
 */
const createLink = (title: string, url: string) => {
    return { text: title, link: url }
}

const nav = [
    {
        text: 'wr-1.x-dev',
        activeMatch: `^/(10\.x)/`,
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
            { text: '扩展', link: '/develop/extension' },
        ]
    },
    {
        text: '其他',
        activeMatch: `^/(1\.x)|(2\.x)|(3.x)/`,
        items: [
            { text: '1.x', link: '/1.x/tree' },
            { text: '2.x', link: '/2.x/' },
            { text: '3.x', link: '/3.x/' },
            { text: '4.x', link: '/4.x/' },
        ]
    }
]

export const sidebar = {
    '/1.x': [
        {
            text: '1.x',
            items: [
                createLink('模型', '/1.x/model'),
                createLink('文件目录树', '/1.x/tree'),
            ]
        }
    ],
    '/2.x': [
        {
            text: '2.x',
            items: [
                createLink('入门手册', '/2.x/index'),
                createLink('开发者模式/ACL', '/2.x/acl'),
                createLink('Action 业务逻辑封装', '/2.x/action'),
                createLink('Api文档 1.0', '/2.x/apidoc'),
                createLink('compass - LemonCMS', '2.x/compass'),
                createLink('Env 环境配置', '/2.x/env'),
                createLink('多语言', '/2.x/i18n'),
                createLink('模型 v2.0', '/2.x/model'),
                createLink('策略(Policy)', '/2.x/policy'),
                createLink('RBAC 角色控制', '/2.x/rbac-in-project'),
                createLink('rbac 在项目中的实现', '/2.x/rbac'),
                createLink('路由 / 控制器', '/2.x/route-controller'),
                createLink('后台模块', '/2.x/mgr-page'),
                createLink('服务器环境配置', '/2.x/op'),
                createLink('图片上传', '/2.x/upload'),
            ]
        }
    ],
    '/3.x': [
        {
            text: '入门',
            items: [
                createLink('Poppy Framework 3.0', '/3.x/index'),
                createLink('常见问题', '/3.x/faq'),
                createLink('Readme', '/3.x/readme'),
            ]
        },
        {
            text: '框架',
            items: [
                createLink('README', '/3.x/framework/readme'),
                createLink('配置', '/3.x/framework/config'),
                createLink('开发计划', '/3.x/framework/plan'),
                createLink('错误码', '/3.x/framework/resp'),
                createLink('文件树', '/3.x/framework/tree'),
            ]
        },
        {
            text: '组件',
            items: [
                createLink('CanalEs', '/3.x/component//canal-es'),
                createLink('核心', '/3.x/component/core'),
                createLink('管理后台', '/3.x/component/mgr-page'),
                createLink('系统', '/3.x/component/system'),
            ]
        },
        {
            text: '项目',
            items: [
                createLink('最佳实践', '/3.x/project/best-practice'),
                createLink('Code Review', '/3.x//project/code-review'),
                createLink('前后端分离项目约定', '/3.x/project/mgr-app-spec'),
                createLink('[WIP] Laravel-Mix', '/3.x/project/laravel-mix'),
                createLink('安装', '/3.x/project/install'),
                createLink('说明', '/3.x/project/readme'),
            ]
        },
        {
            text: '模型',
            items: [
                createLink('业务逻辑', '/3.x/module/action'),
                createLink('事件', '/3.x/module/event'),
                createLink('服务和钩子', '/3.x/module/hook'),
                createLink('国际化', '/3.x/module/i18n'),
                createLink('菜单', '/3.x/module/menus'),
                createLink('模型', '/3.x/module/model'),
                createLink('权限', '/3.x/module/permission'),
                createLink('策略', '/3.x/module/policy'),
                createLink('批次更新', '/3.x/module/progress'),
            ]
        }
    ],
    '/4.x': [
        {
            text: '前言',
            items: [
                createLink('版本说明', '/4.x/'),
                createLink('升级说明', '/4.x/upgrade'),
                createLink('常见问题', '/4.x/faq'),
            ]
        },
        {
            text: '项目',
            items: [
                createLink('说明', '/4.x/project/readme'),
                createLink('最佳实践', '/4.x/project/best-practice'),
            ]
        },
        {
            text: '框架',
            items: [
                createLink('介绍', '/4.x/framework/readme'),
                createLink('配置', '/4.x/framework/config'),
                createLink('Resp', '/4.x/framework/resp'),
                createLink('验证', '/4.x/framework/validation'),
            ]
        },
        {
            text: '模块',
            items: [
                createLink('介绍', '/4.x/module/readme'),
                createLink('菜单和权限', '/4.x/module/menu-and-permission'),
                createLink('服务和钩子', '/4.x/module/hook'),
                createLink('模型', '/4.x/module/models'),
                createLink('策略', '/4.x/module/policy'),
                createLink('事件', '/4.x/module/event'),
                createLink('更新', '/4.x/module/progress'),
            ]
        },
        {
            text: '组件',
            items: [
                createLink('Core', '/4.x/component/core'),
                createLink('System', '/4.x/component/system'),
                createLink('Aliyun Oss', '/4.x/component/aliyun-oss'),
                createLink('Aliyun Push', '/4.x/component/aliyun-push'),
                createLink('Category', '/4.x/component/category'),
                createLink('App', '/4.x/component/app'),
                createLink('Sms', '/4.x/component/sms'),
            ]
        },
        {
            text: '组件:后台',
            items: [
                createLink('Mgr Page', '/4.x/component/mgr-page'),
                createLink('动态表格', '/4.x/component/mgr-page-grid.md'),
                createLink('组件', '/4.x/component/mgr-page-component.md'),
            ]
        },
        {
            text: '扩展',
            items: [
                createLink('支付宝支付', '/4.x/extension/alipay'),
                createLink('Ip Store', '/4.x/extension/ip-store'),
                createLink('Phpstan', '/4.x/extension/phpstan'),
                createLink('Webhook', '/4.x/extension/webhook'),
            ]
        },
    ],
    '/wr-1.x': [
        {
            text: '前言',
            items: [
                createLink('版本说明', '/wr-1.x/'),
                createLink('升级说明', '/wr-1.x/upgrade'),
                createLink('常见问题', '/wr-1.x/faq'),
            ]
        },
        {
            text: '项目',
            items: [
                createLink('说明', '/wr-1.x/project/readme'),
                createLink('最佳实践', '/wr-1.x/project/best-practice'),
            ]
        },
        {
            text: '框架',
            items: [
                createLink('介绍', '/wr-1.x/framework/readme'),
                createLink('配置', '/wr-1.x/framework/config'),
                createLink('Resp', '/wr-1.x/framework/resp'),
                createLink('验证', '/wr-1.x/framework/validation'),
            ]
        },
        {
            text: '模块',
            items: [
                createLink('介绍', '/wr-1.x/module/readme'),
                createLink('介绍', '/wr-1.x/module/api-spec'),
                createLink('菜单和权限', '/wr-1.x/module/menu-and-permission'),
                createLink('服务和钩子', '/wr-1.x/module/hook'),
                createLink('模型', '/wr-1.x/module/models'),
                createLink('策略', '/wr-1.x/module/policy'),
                createLink('事件', '/wr-1.x/module/event'),
                createLink('更新', '/wr-1.x/module/progress'),
            ]
        },
        {
            text: '组件',
            items: [
                createLink('Core', '/wr-1.x/component/core'),
                createLink('System', '/wr-1.x/component/system'),
                createLink('Mgr Page', '/wr-1.x/component/mgr-page'),
                createLink('Aliyun Oss', '/wr-1.x/component/aliyun-oss'),
                createLink('Sms', '/wr-1.x/component/sms'),


            ]
        },
        {
            text: '组件:WIP',
            items: [
                createLink('Category', '/wr-1.x/component/category'),
                createLink('App', '/wr-1.x/component/app'),
                createLink('Aliyun Push', '/wr-1.x/component/aliyun-push'),
            ]
        },
        {
            text: '扩展',
            items: [
                createLink('支付宝支付', '/wr-1.x/extension/alipay'),
                createLink('Ip Store', '/wr-1.x/extension/ip-store'),
                createLink('Phpstan', '/wr-1.x/extension/phpstan'),
                createLink('Webhook', '/wr-1.x/extension/webhook'),
            ]
        },
    ],
    '/develop': [
        {
            text: '开发',
            items: [
                createLink('开发规范', '/develop/spec'),
                createLink('ChangeLog', '/develop/changelog'),
                createLink('扩展开发', '/develop/extension'),
            ]
        }
    ]
}

// Placeholder of the i18n config for @vuejs-translations.
const i18n = {
    toc: '页内导航'
}

export default defineConfig({
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
        sidebar,
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
})
