---
description: '文档集合包含Webhook、IP存储、PHPStan扩展以及支付宝支付等主题，涵盖了网络钩子、IP地址管理、静态分析工具配置与支付接口集成相关内容。'
lastUpdated: '2026-06-29 23:02:35'
head:
  - - meta
    - name: 'og:title'
      content: '扩展'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '文档集合包含Webhook、IP存储、PHPStan扩展以及支付宝支付等主题，涵盖了网络钩子、IP地址管理、静态分析工具配置与支付接口集成相关内容。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/extension/index.html'
---
# 扩展

## 如何开发

### Composer 文件生成

composer.json 文件解释

```Plain Text
{
    # 包名称, 可以自定义 package 名称, 蛇形写法
    "name": "poppy/ext-{package}",
    # 描述, 必须是英文
    "description": "Poppy frontEnd support",
    "type": "poppy-extension",
    # 作者
    "authors": [
        {
            "name": "Mark Zhao",
            "email": "zhaody901@126.com"
        }
    ],
    # 依赖包 不依赖则留空
    "require": {
        "php": ">=7.0.0",
        # 加载第三方包
        "sabberworm/php-css-parser": "^8.1"
    },
    # 自动加载命名空间
    # 命名空间 {Package} 应当和 name 相匹配
    "autoload": {
        "psr-4": {
            "Poppy\\Extension\\{Package}\\": "src/"
        }
    },
    "config": {
        "preferred-install": "dist"
    },
    "minimum-stability": "dev"
}
```

根目录文件生成方式 - 初始化 第一步: 创建 创建: 如果没有  `ext-{package}/composer.json`  中的时候

```Plain Text
$ composer init
```

composer 文件加载

生成 autoload 文件

```Plain Text
$ composer update -vvv
```

清空进行 poppy 优化,重置缓存, 加载当前包

```Plain Text
$ php artisan poppy:optimize
```

至此命名空间可以自动加载成功

## 扩展清单

- [webhook](/4.x/extension/webhook.md)
- [Ip Store](/4.x/extension/ip-store.md)
- [Phpstan](/4.x/extension/phpstan.md)
- [支付宝支付](/4.x/extension/alipay.md)