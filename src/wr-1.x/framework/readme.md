---
description: '这是一个框架的模块化命令行工具，提供模块创建、启用/禁用、优化、数据表管理、文件生成、数据库Seeder与Factory管理、事件、Blade语法、验证、文件树及配置等功能。'
lastUpdated: '2026-06-21 16:52:23'
head:
  - - meta
    - name: 'og:title'
      content: '框架 README'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这是一个框架的模块化命令行工具，提供模块创建、启用/禁用、优化、数据表管理、文件生成、数据库Seeder与Factory管理、事件、Blade语法、验证、文件树及配置等功能。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//wr-1.x/framework/readme.html'
---
# 框架 README

模块分为模块(自定义)和官方模块, 为了区分, 所以 slug 的命名分为 `module.{module}` 和 `weiran.{weiran}`

## Bin

框架附带一个 bin 命令 `weiran`, 可以执行框架的清理函数, 用来清理缓存文件

- 清理 `storage/framework/*.php` 缓存文件
- 删除 `storage/app/weiran.json` 模块缓存文件

```Bash
$ ./vendor/bin/weiran clear
```

建议在 `composer.json` 的 `scrpits` 字段中增加如下定义, 方便在框架更新之后可以快速的对框架进行缓存清理

```JSON
{
    "scripts": {
        "weiran": [
            "./vendor/bin/weiran",
            "php artisan weiran:optimize",
            "php artisan core:permission init"
        ]
    }
}
```

```Bash
$ composer run weiran
```

## 命令行/Console

### 创建模块

创建一个模块并启动它.

```Bash
$ php artisan weiran:make {slug} [-Q|--quick]
```

### 列出模块

列出所有的应用模块

```Plaintext
$ php artisan weiran:list

+------+----------------------+--------------------+--------------------------------------------+---------+
| #    | Name                 | Slug               | Description                                | Status  |
+------+----------------------+--------------------+--------------------------------------------+---------+
| 5    | Weiran Core Module   | weiran.core        | Weiran core module for util tools          | Enabled |
| 10   | Weiran System Module | weiran.system      | Weiran system module for basic pam         | Enabled |
+------+----------------------+--------------------+--------------------------------------------+---------+
```

### 启用/禁用模块

```Plaintext
# 启用模块
$ php artisan weiran:enable {slug}

# 禁用模块
$ php artisan weiran:disable {slug}
```

### 优化模块

模块优化, 清空生成的缓存等操作

```Plaintext
$ php artisan weiran:optimize
```

### 数据表管理

```Plaintext
weiran:migrate {slug}          执行模块的数据库迁移文件
weiran:migrate:refresh {slug}  重新执行模块数据库迁移文件
weiran:migrate:reset {slug}    回滚所有执行的数据库迁移
weiran:migrate:rollback {slug} 回滚执行完的上一个数据库迁移
weiran:migration {slug}        创建一个指定模块的数据库迁移文件
```

## 文件生成器

生成器工具

```PHP
php artisan weiran:command {slug} {name}           # 生成命令文件
php artisan weiran:controller {slug} {api/web/backend} {name}
                                                  # 生成控制器文件
php artisan weiran:middleware {slug} {name}        # 生成中间件文件
php artisan weiran:model {slug} {name}             # 生成数据库模型文件
php artisan weiran:policy {slug} {name}            # 生成 policy 策略文件
php artisan weiran:provider {slug} {name}          # 生成服务提供者
php artisan weiran:request {slug} {name}           # 生成 request 文件
php artisan weiran:test {slug} {name}              # 生成测试文件
php artisan weiran:make {slug}                     # 生成模块
php artisan weiran:listener {slug} {name}          # 事件监听器(详细见下方)
php artisan weiran:event {slug} {name}             # 生成事件文件
```

### 监听文件

```Bash
$ php artisan weiran:listener {slug} {name}
--event {event}: 事件名称, 使用 `\` 表明是全局的事件, 否则的话以为这是当前模块的事件
```

### 事件文件

```Bash
$ php artisan weiran:event {slug} {name}
```

### 数据库 Seeder 和 Seed 命令

```Bash
# 生成种子文件
$ php artisan weiran:seeder {slug} {name}

# 执行模块下种子主文件或者传递参数执行指定种子文件
$ php artisan weiran:seed {slug}
```

**创建 seeder 文件**

```PHP
# 生成模块的主 seeder 文件
$ php artisan weiran:seeder module.demo DemoDatabaseSeeder

# 生成模块的子 seeder 文件
$ php artisan weiran:seeder module.demo DemoDbDatabaseSeeder
```

注册 Seeder 以及生成 数据

```PHP
# DemoDatabaseSeeder

public function run()
{
    $this->call([
        DemoDbDatabaseSeeder::class,
    ]);
}

# DemoDbDatabaseSeeder
public function run()
{
    $faker = py_faker();
    for ($start = 0; $start < 50; $start++) {
        $item = [
            'tiny_integer' => $faker->numberBetween(0, 100),
            'u_integer'    => $faker->numberBetween(100, 500),
            'var_char_20'  => $faker->words(8, true),
            'char_20'      => $faker->words(10, true),
            'text'         => $faker->sentence(30),
            'decimal'      => $faker->numberBetween(100, 6),
        ];
        DemoDb::create($item);
    }
}
```

执行 seed

```Bash
$ php artisan weiran:seed module.demo
Seeding: Demo\Database\Seeds\DemoDbDatabaseSeeder
Database seeding completed successfully.
```

### 数据库 Factory 生成

```Plaintext
$ php artisan weiran:factory {slug} {name}
```

```Bash
# 指定当前模块下的模型
$ php artisan weiran:factory module.demo DemoDbFactory --model="DemoDb"

# 指定已存在的模型
$ php artisan weiran:factory module.demo DemoDbFactory --model="\Demo\Models\DemoDb"

# 未指定模型
$ php artisan weiran:factory module.demo DemoDbFactory
```

生成的模型如下

```PHP
<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Demo\Models\DemoDb;
use Faker\Generator as Faker;

$factory->define(DemoDb::class, function (Faker $faker) {
    return [
        //
    ];
});
```

## 事件

```Plaintext
// Module Maked
Events\WeiranMake($slug)

// 模块启用
Events\WeiranEnabled

// 模块禁用
Events\WeiranDisabled

// 模块优化
Events\WeiranOptimized

// 计划任务
Events\WeiranSchedule
```

## Helpers

```Plaintext
ArrayHelper
EnvHelper
FileHelper
HtmlHelper
ImgHelper
CookieHelper
RouterHelper
SearchHelper
StrHelper
TimeHelper
TreeHelper
UtilHelper
```

## 解析器

支持 Xml,Ini,Yaml

## Blade 语法

```Plaintext
@weiran
// You Can check if module is exist and enabled.
@endweiran
```

## 验证

```Plaintext
1.语言包
 - resource/lang/zh/validator.php
2.相应的验证规则
 - Rule 类
3.FrameworkServiceProvider.php 验证正则规则
```

## 文件树

框架文件结构树

```Plaintext
├── README.md
├── composer.json
├── config
├── docs                   # 文档
│   └── build.md
├── phpunit.xml            # 单元测试文件
├── resources
│   ├── lang               # 语言包
│   ├── stubs              # make 文件生成
│   └── views              # 默认视图
│       └── template
│           ├── default.blade.php
│           └── message.blade.php
├── src
│   ├── Application        # 基本控制器继承
│   │   ├── ApiController.php
│   │   ├── Controller.php
│   │   ├── Event.php
│   │   ├── Job.php
│   │   ├── Request.php
│   │   └── TestCase.php
│   ├── Classes            # 基础加载器, Number, Resp, Traits
│   │   ├── ClassLoader.php
│   │   ├── Number.php
│   │   ├── Resp.php
│   │   └── Traits
│   ├── Console            # 命令行
│   │   ├── Commands       # 命令
│   │   ├── ConsoleServiceProvider.php
│   │   ├── GeneratorCommand.php
│   │   ├── GeneratorServiceProvider.php
│   │   └── Generators     # 生成器
│   │       └── stubs
│   ├── Database           # 数据库集成器
│   ├── Events             # 提供的事件
│   ├── Exceptions         # 异常
│   ├── Facade             # 门面
│   ├── Filesystem         # 文件系统
│   │   └── Filesystem.php
│   ├── Foundation         # Kernal 以及异常处理
│   │   ├── Application.php
│   │   ├── Console
│   │   │   └── Kernel.php
│   │   ├── Contracts
│   │   │   └── Bootstrap.php
│   │   ├── Exception
│   │   │   └── Handler.php
│   │   └── Http
│   │       └── Kernel.php
│   ├── FrameworkServiceProvider.php
│   ├── Helper             # 帮助文件
│   ├── Http               # 控制器相关, 中间件, 分页
│   │   ├── Middlewares
│   │   │   └── EnableCrossRequest.php
│   │   └── Pagination
│   │       └── PageInfo.php
│   │   └── BladeServiceProvider.php
│   ├── Parse              # 解析器 Ini / Xml / Yaml
│   ├── Weiran             # 加载的模块操作工具以及事件
│   │   ├── Abstracts
│   │   ├── Contracts
│   │   ├── Events
│   │   ├── FileRepository.php
│   ├── Support            # 支援文件
│   ├── Translation        # 多语言
│   │   ├── TranslationServiceProvider.php
│   │   └── Translator.php
│   └── Validation         # 验证规则
└── tests                  # 测试文件
```

## 配置

配置定义为框架中对 config 文件的注入, 命名如下:

1. `weiran.php`
2. `module.php`

```Plaintext
# Weiran
weiran.framework.page_max

# 模块配置
module.order.xxx
```