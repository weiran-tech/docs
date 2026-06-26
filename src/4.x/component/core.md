---
description: '提供核心权限操作、文档生成与检查工具，涵盖代码、数据库、运维。下载后需配置apidoc、op_mail、RBAC及缓存，支持数据持久化（insert/update）到数据库。'
lastUpdated: '2026-06-25 19:26:38'
head:
  - - meta
    - name: 'og:title'
      content: '核心'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '提供核心权限操作、文档生成与检查工具，涵盖代码、数据库、运维。下载后需配置apidoc、op_mail、RBAC及缓存，支持数据持久化（insert/update）到数据库。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/component/core.html'
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

**PHP-CS-Fixer**

[PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) is a tool to automatically fix PHP Coding Standards issues, We use it for Code Specification.

### 检查代码

```Plaintext
php artisan py-core:inspect {type}
{type} :
    - class      : 方法检测
    - file       : 检测文件命名[文件类和文件位置不匹配]
    - controller : 列出所有功能点
    - action     : 列出所有业务逻辑
    - permission : 检测未在控制器使用的权限和已使用但是未定义的权限
    - seo        : 生成 seo 项目
    - trans      : 对 trans 数据进行导入验证
    - validation : 对通用验证项目进行校验
```

### 数据库

```Plaintext
php artisan py-core:db {action}
{action} :
    - fields      : 生成数据库 db 缓存
    - suggest     : 生成数据库建议项目, 便于简单规则的验证
    - friendly    : 检查 Friendly trans 是否已定义
```

### 运维工具

```Plaintext
php artisan py-core:op {slug}
{slug} :
    - mail   : 发送运维邮件
```

### 生成 php api 文档

> 先睹为快, 使用 doctum 生成的 php api 地址 [PoppyV4 Api](http://v4.poppy-framework.com/docs/php/)

**生成配置文件**

```Plaintext
$ php artisan vendor:publish --tag=poppy
...
Copied File [/modules/system/resources/config/doctum-config.php] To [/storage/doctum/config.php]
Publishing complete.
```

**下载 doctum**

```Plaintext
$ php artisan py-core:doc php

Please Run Command To Install doctum.phar:
curl https://doctum.long-term.support/releases/latest/doctum.phar --output /path/of/doctum/doctum.phar

# 下载之后再运行

$ php artisan py-core:doc php
Please Run Command:
php /path/of/doctum/doctum.phar update /path/of/doctum/config.php
```

我们运行命令来生成 php 文档

```Plaintext
$ php /path/of/doctum/doctum.phar update /path/of/doctum/config.php
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

如果默认的配置无法满足你的要求可以编辑 `resources/doctum/doctum.php` 文件来修改需要生成文档的文件夹和目标路径.

生成文档如下

![](https://file.wulicode.com/feishu-images/2ebb2f342c8f9c9b6a066405a002840f.png)

配置文件 : [doctum-config.php](https://github.com/dadi-cn/poppy-core/blob/4.1/resources/config/doctum-config.php)

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
        // 匹配 src/Http/Request 的文件目录来生成文件, 使用 glob 规则匹配
        'match'      => 'api.*/web|ApiWeb|api/web|ApiV1',
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

为了保证缓存名称的唯一性我们约定 slug : poppy 模块 : `py-{module}`

name : name 使用静态方法定义, 支持传参

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
        sys_tag('py-area')->forget(PyAreaDef::ckMatchIdPid());
    }

    return sys_tag('py-area')->remember(PyAreaDef::ckMatchIdPid(), 10, function () {
        return AreaContent::pluck('parent_id', 'id')->toArray();
    });
}
```

## 持久化

持久化的流程是将数据放入到缓存, 然后所有的操作都会缓存起来, 然后通过计划任务将数据同步到数据库

### 缓存

持久化使用的缓存是 `tag:py-core:persist` KEY

```Plaintext
tag:py-core:persist:
    {table}_insert : redis 列表
        [{
            key,    # id
            insert  # 插入的条件语句
        }]
    {table}_update : redis hash
        [{
            where,  # 查询条件
            update  # 更新内容
        }]
```

### insert 持久化

这里适用的场景是单条插入可以延迟的情况采用统一插入

```Plaintext
RdsPersist::insert('pam_log', $items);
```

### update 持久化

这里支持从数据库初始化数据, 如果数据不存在, 则创建一条数据并初始化到缓存中

2.24.1 版本之后持久化数据可以不进行初始化, 默认必须初始化

```Plaintext
RdsPersist::update('gift_collection', $where, [
    'gift_num[+]' => 8,
]);
```

持久化使用的基本用法, 因为 persist 加入 facade, 所以可以使用 `Persist` 全局 Facade 来进行使用

```Plaintext
$init = [
    'add' => 0,
];

$update = [
    'append' => 5,
];
$result = RdsPersist::calcUpdate($init, $update);
```

另外这里 update 支持额外的语法

```Plaintext
<?php
$init = [
    'add'      => 0,
    'subtract' => 0,
    'preserve' => 0,
    'force'    => 0,
];¶

$update = [
    'add[+]'      => 5,   # 加语法, 保留两位小数, 使用 Number 来计算
    'subtract[-]' => 5,   # 减语法, 保留两位小数, 使用 Number 来计算
    'force'       => 8,   # 覆盖语法, 覆盖之前数据
                            # 不传值代表保留
];

$result = RdsPersist::calcUpdate($init, $update);
$result = [
    "add" => "5.00"
    "subtract" => "-5.00"
    "preserve" => 0
    "force" => 8
]
```

### 持久化到数据库

如果需要持久化到数据库则需要执行相关命令

```Plaintext
Usage:
py-core:persist `<table>`

Arguments:
table  Table to exec. [pam_log...|all]
```

```Plaintext
$this->app['events']->listen('console.schedule', function (Schedule $schedule) {
    ...
    $schedule->command('py-core:persist', ['chat_room'])
        ->daily()->appendOutputTo($this->consoleLog());
    ...
})
```