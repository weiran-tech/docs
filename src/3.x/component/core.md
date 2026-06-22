---
description: '该文档涵盖核心操作、权限管理（RBAC）、API文档生成（php apidoc）、代码检查、运维工具及缓存定义与示例。用户可下载后运行配置，实现自动化文档生成、邮件操作（op_mail）及权限检查。'
lastUpdated: '2026-06-22 13:51:54'
head:
  - - meta
    - name: 'og:title'
      content: '核心'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档涵盖核心操作、权限管理（RBAC）、API文档生成（php apidoc）、代码检查、运维工具及缓存定义与示例。用户可下载后运行配置，实现自动化文档生成、邮件操作（op_mail）及权限检查。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//3.x/component/core.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/2ebb2f342c8f9c9b6a066405a002840f.png'
---
# 核心

## 操作

> Poppy 核心模块, system 基于本模块

### 权限操作

```Plaintext
php artisan py-core:permission {slug}
{slug}:
    - list   : 获取权限列表
    - init   : 权限初始化
    - menus  : 检查菜单[todo Undefined index: children]
    - assign : 将权限赋值给指定的用户组
    - check  : 权限检测
```

### 文档以及检查工具

```Plaintext
php artisan py-core:doc {slug}
{slug}:
    - api   : 生成api文档[apidoc 生成目录]
    - cs    : code style - fix , 代码格式修复(todo 以后IDE 来做)
    - cs-pf :
    - lint  : 安装检测PHP语法错误的工具
    - php   : 生成 php api 文档
    - log   : 查看当天的 storage 日志
```

**关于 phplint**

[phplint](https://github.com/overtrue/phplint)是一个快速检测 php 语法错误的工具, 此工具无需安装在项目中, 全局安装即可.

```Plaintext
$ composer global require overtrue/phplint -vvv
$ php artisan py-core:doc lint
$ phplint /path/of/code -c /framework/path/.phplint.yml
```

### 检查代码

```Plaintext
php artisan py-core:inspect {slug}
{slug} :
    - apidoc     : 检查api文档(需要指定目录)
    - class      : 方法检测
    - pages      : 检测页面Key[todo 以后会删掉]
    - file       : 检测文件命名[文件类和文件位置不匹配]
    - database   : 检测数据库配置
    - controller : 列出所有功能点
    - action     : 列出所有业务逻辑
    - seo        : 生成 seo 项目
    - db_seo     : 生成数据库SEO 数据
```

### 运维工具

```Plaintext
php artisan py-core:op {slug}
{slug} :
    - mail   : 发送运维邮件
```

### 生成 php api 文档

> 先睹为快, 使用 sami 生成的 php api 地址 PhpApi For Poppy

**生成配置文件**

```Plaintext
$ php artisan vendor:publish --tag=poppy
...
Copied File [/modules/system/resources/config/sami.php] To [/storage/sami/config.php]
Publishing complete.
```

**下载 sami**

首先下载 sami , 放到 `storage/sami/sami.phar` 这个位置 或者使用命令来下载, 如果不知道命令可以运行 `php artisan py-core:doc php` 来查看下载文件的命令

```Plaintext
$ php artisan py-core:doc php

Please Run Command To Install Sami.phar:
curl http://get.sensiolabs.org/sami.phar --output /data/workbench/www/wulicode/storage/sami/sami.phar

# 下载之后再运行

$ php artisan py-core:doc php
Please Run Command:
php /data/workbench/www/wulicode/storage/sami/sami.phar update /data/workbench/www/wulicode/storage/sami/config.php
```

我们运行命令来生成 php 文档

由于 sami 最新版是基于 php7.1 版本的, 所以我们必须以正确版本来运行. 如果版本不正确则无法运行

```Plaintext
$ php71 /data/workbench/www/wulicode/storage/sami/sami.phar update /data/workbench/www/wulicode/storage/sami/config.php
 Updating project

Version master
  Parsing   done
  Rendering done

 Version    Updated C    Removed C
   master         1224            0

 Version    Updated C    Updated N    Removed C    Removed N
   master            2            0            0            0
```

运行完成后会在 `public/docs/php` 文件夹下生成标准的 html 文档, 这样我们就可以进行访问了.

如果默认的配置无法满足你的要求可以编辑 `resources/sami/sami.php` 文件来修改需要生成文档的文件夹和目标路径.

生成文档如下

![](https://file.wulicode.com/feishu-images/2ebb2f342c8f9c9b6a066405a002840f.png)

Sami 配置文件查看 : [sami-config.php](https://github.com/imvkmark/poppy-core/blob/3.0/resources/config/sami-config.php)

## 配置

文件位置 : `config/poppy.php`

### apidoc

- Type : `array`

api 接口文档配置, 改文档可以使用 `php artisan py-core:doc api` 来生成文档, 定义如下

```Plaintext
'apidoc' => [
    ...
    'web' => [
        // 标题
        'title'            => '前台接口',
        // 方法
        'method'           => 'post',
        // 默认访问地址
        'default_url'      => 'api_v1/system/auth/login',
        // 其他参数  签名验证
        'sign_certificate' => [
            'name'         => 'timestamp',
            'title'        => 'TimeStamp',
            'type'         => 'String',
            'is_required'  => 'Y',
        ],
        // 签名生成
        'sign_generate'    => DefaultApiSignProvider::js(),
        // 源文件夹
        'origin'           => 'modules',
        // 接口测试构建器[未实现]
        'factory'          => WebApiFactory::class,
        // 生成目录
        'doc'              => 'public/docs/web',
    ],
    ...
]
```

### op_mail

- Type : `string`
- Default : `env('CORE_OP_MAIL', '')`

后台可支持发送测试邮件, 这里配置发送人的邮箱

### rbac

- Type : `array`

设置 RBAC 模型以及外键 KEY, 这里默认设定的是 `poppy/system` 模块的模型, 不使用此模块可以自行实现模型定义以及关联关系

```Plaintext
'rbac'       => [
    // 角色模型
    'role'            => \Poppy\System\Models\PamRole::class,
    // 账号模型
    'account'         => \Poppy\System\Models\PamAccount::class,
    // 角色账号模型
    'role_account'    => \Poppy\System\Models\PamRoleAccount::class,
    // 权限模型
    'permission'      => \Poppy\System\Models\PamPermission::class,
    // 角色权限模型
    'role_permission' => \Poppy\System\Models\PamPermissionRole::class,
    // 角色外键
    'role_fk'         => 'role_id',
    // 账号外键
    'account_fk'      => 'account_id',
    // 权限外键
    'permission_fk'   => 'permission_id',
],
```

## 缓存

### 缓存定义

缓存使用扁平化管理, 缓存函数是在 laravel 的基础上加了一层标签, 用法遵循 laravel 缓存使用

缓存一般采用如下命名

```Plaintext
sys_tag('{slug}')->get('{name}')
slug    : 根据模块目录来进行判定
    例如 poppy system 模块命名为 py-system
    例如 poppy core 模块命名为 py-core
    例如 poppy core rbac 模块命名为 py-core-rbac(因为需要用到 flush 方法, 这里采用标签来区分, 而不是使用 type)
name    : 代表的是缓存的名称
```

为了保证缓存名称的唯一性我们约定, 对于缓存来讲存在可删除的缓存也存在不可删除的缓存(例如用户的登录 Token, 涉及到单点登录)

- `slug`

poppy 模块 : `py-{module}`, 如果是需要持久化的缓存, 我们使用 `py-{module}-persist` 来作为标签, 对于缓存定义, 不建议在 `{Module}Def` 文件中添加 `tag:{module}` 标识, 而是应当使用 `slug + name` 方式进行缓存的约定 - `name` : name 使用静态方法定义, 支持传参

### 示例

例如 Area 模块的我们定义缓存函数

```PHP
<?php namespace Poppy\Area\Classes;

class PyAreaDef
{
    /**
     * ID -> PID 映射
     * @return string
     */
    public static function ckMatchIdPid(): string
    {
        return 'match_id_pid';
    }
}
```

使用

```PHP
/**
 * @param bool $clear 是否清除
 * @return mixed
 */
function matchKv($clear = false)
{
    if ($clear) {
        sys_tag('py-area')->del(PyAreaDef::ckMatchIdPid());
    }

    return sys_tag('py-area')->remember(PyAreaDef::ckMatchIdPid(), 10, function () {
        return AreaContent::pluck('parent_id', 'id')->toArray();
    });
}
```