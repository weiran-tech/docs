import { defineConfigWithTheme } from 'vitepress'

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
        text: '4.x',
        activeMatch: `^/(4\.x)/`,
        link: '/4.x/'
    },
    {
        text: '开发约定',
        activeMatch: `^/develop\/spec/`,
        link: '/develop/spec'
    },
    {
        text: 'Change Log',
        activeMatch: `^/develop\/changelog/`,
        link: '/develop/changelog'
    },
    {
        text: '其他',
        activeMatch: `^/(develop)(1\.x)|(2\.x)|(3.x)/`,
        items: [
            { text: '1.x', link: '1.x/tree' },
            { text: '2.x', link: '2.x/' },
            { text: '3.x', link: '3.x/' }
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
                createLink('开发者模式/ACL', '/2.x/acl'),
                createLink('Action 业务逻辑封装', '/2.x/action'),
                createLink('Api文档 1.0', '/2.x/api'),
                createLink('compass - LemonCMS', '2.x/compass'),
                createLink('Env 环境配置', '/2.x/env'),
                createLink('入门手册', '/2.x/index'),
                createLink('多语言', '/2.x/lang'),
                createLink('模型 v2.0', '/2.x/model'),
                createLink('策略(Policy)', '/2.x/policy'),
                createLink('RBAC 角色控制', '/2.x/rbac-role'),
                createLink('rbac 在项目中的实现', '/2.x/rbac'),
                createLink('路由 / 控制器', '/2.x/route'),
                createLink('sample - 创建后台访问模块', '/2.x/sample'),
                createLink('服务器环境配置', '/2.x/server'),
                createLink('图片上传', '/2.x/upload'),
            ]
        }
    ],
    '/3.x': [
        {
            text: '入门',
            items: [
                createLink('Readme', '/3.x/index'),
            ]
        },
        {
            text: '框架',
            items: [
                createLink('配置', '/3.x/framework/config'),
                createLink('扩展开发', '/3.x/framework/extension'),
                createLink('开发计划', '/3.x/framework/plan'),
                createLink('README', '/3.x/framework/readme'),
                createLink('错误码', '/3.x/framework/resp'),
                createLink('文件树', '/3.x/framework/tree'),
            ]
        },
        {
            text: '组件',
            items: [
                createLink('CanalEs - 同步导入监听组件', '/3.x/components//canal-es'),
                createLink('核心', '/3.x/components/core'),
                createLink('管理后台', '/3.x/components/mgr-page'),
                createLink('系统', '/3.x/components/system'),
            ]
        },
        {
            text: '项目',
            items: [
                createLink('最佳实践', '/3.x/project/best-practice'),
                createLink('Code Review', '/3.x//project/code-review'),
                createLink('前后端分离项目约定', '/3.x/project/fe-backend'),
                createLink('[WIP] Laravel-Mix', '/3.x/project/fe-mix'),
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
                createLink('国际化', '/3.x/module/lang'),
                createLink('菜单', '/3.x/module/menus'),
                createLink('模型', '/3.x/module/models'),
                createLink('权限', '/3.x/module/permission'),
                createLink('策略', '/3.x/module/policy'),
                createLink('批次更新', '/3.x/module/progress'),
                createLink('常见问题', '/3.x/module/qa'),
                createLink('说明', '/3.x/module/readme'),
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
                createLink('验证', '/4.x/framework/rules'),
                createLink('配置', '/4.x/framework/config'),
                createLink('Resp', '/4.x/framework/resp'),
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
            text: '系统模块',
            items: [
                createLink('Core', '/4.x/poppy/core'),
                createLink('System', '/4.x/poppy/system'),
                createLink('Mgr Page', '/4.x/poppy/mgr-page'),
                createLink('Aliyun Oss', '/4.x/poppy/aliyun-oss'),
                createLink('Aliyun Push', '/4.x/poppy/aliyun-push'),
                createLink('App', '/4.x/poppy/app'),
                createLink('Sms', '/4.x/poppy/sms'),
            ]
        },
        {
            text: '扩展模块',
            items: [
                createLink('介绍', '/4.x/extension/readme'),
                createLink('支付宝支付', '/4.x/extension/alipay'),
                createLink('Ip Store', '/4.x/extension/ip_store'),
                createLink('Phpstan', '/4.x/extension/phpstan'),
                createLink('Webhook', '/4.x/extension/webhook'),
            ]
        },
    ],
    '/develop': [
        {
            text: '开发',
            items: [
                createLink('ChangeLog', '/develop/changelog'),
                createLink('开发规范', '/develop/spec'),
            ]
        }
    ]
}

// Placeholder of the i18n config for @vuejs-translations.
const i18n = {
    toc: '页内导航'
}

export default defineConfigWithTheme({
    lang: 'zh-CN',
    title: 'Poppy Framework',
    description: '基于 Laravel 的模块化加载框架',
    srcDir: 'src',
    head: [['meta', { name: 'theme-color', content: '#3c8772' }]],
    mpa: false,
    themeConfig: {
        logo: 'https://file.wulicode.com/static/images/logo.png',
        nav,
        sidebar,
        search: {
            provider: 'local'
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
