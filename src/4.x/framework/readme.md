---
description: '模块分为模块(自定义)和官方模块, 为了区分, 所以 slug 的命名分为 module.{module} poppy.{poppy}Poppy Framework 附带一个 bin 命令 poppy, 可以执行 poppy 框架的清理函数, 运行方法建议在 composer.json 的 scrpits 字段中增加如下定义, 方便在框架更新之后可以快速的对框架进行缓存清理创建一个 Poppy 模块并启动它.列出所有的应用模块模块优化, 清空生成的缓存等操作生成器工具创建 seeder 文件注册 Seeder 以及生成 数据执行 seed生成的模型如'
lastUpdated: '2025-12-15 18:41:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'README'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '模块分为模块(自定义)和官方模块, 为了区分, 所以 slug 的命名分为 module.{module} poppy.{poppy}Poppy Framework 附带一个 bin 命令 poppy, 可以执行 poppy 框架的清理函数, 运行方法建议在 composer.json 的 scrpits 字段中增加如下定义, 方便在框架更新之后可以快速的对框架进行缓存清理创建一个 Poppy 模块并启动它.列出所有的应用模块模块优化, 清空生成的缓存等操作生成器工具创建 seeder 文件注册 Seeder 以及生成 数据执行 seed生成的模型如'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/framework/readme.html'
---
# README



> poppy 寓意为完美的

模块分为模块(自定义)和官方模块, 为了区分, 所以 slug 的命名分为  `module.{module}`   `poppy.{poppy}`

## Bin

Poppy Framework 附带一个 bin 命令 poppy, 可以执行 poppy 框架的清理函数, 运行方法

```
# 清理 packages.json , 删除 poppy.json
$ ./vendor/bin/poppy clear
```

建议在  `composer.json`  的  `scrpits`  字段中增加如下定义, 方便在框架更新之后可以快速的对框架进行缓存清理

```json
{
    "scripts": {
        "poppy": [
            "./vendor/bin/poppy",
            "php artisan poppy:optimize",
            "php artisan py-core:permission init"
        ]
    }
}
```

```shell
$ composer poppy
```

## 命令行/Console

### 创建模块

创建一个 Poppy 模块并启动它.

```
$ php artisan poppy:make {slug} [-Q|--quick]
```

### 列出模块

列出所有的应用模块

```
$ php artisan poppy:list

+------+------------+-------------------+----------------------------------------------------+---------+
| #    | Name       | Slug              | Description                                        | Status  |
+------+------------+-------------------+----------------------------------------------------+---------+
| 1000 | 核心       | poppy.core        | Poppy Core.                                        | Enabled |
| 9001 | site       | module.site       | This is the description for the poppy site module. | Enabled |
+------+------------+-------------------+----------------------------------------------------+---------+
```

### 启用/禁用模块

```
# 启用模块
$ php artisan poppy:enable {slug}


# 禁用模块
$ php artisan poppy:disable {slug}
```

### 优化模块

模块优化, 清空生成的缓存等操作

```
$ php artisan poppy:optimize
```

### 数据表管理

```
poppy:migrate {slug}          执行模块的数据库迁移文件
poppy:migrate:refresh {slug}  重新执行模块数据库迁移文件
poppy:migrate:reset {slug}    回滚所有执行的数据库迁移
poppy:migrate:rollback {slug} 回滚执行完的上一个数据库迁移
poppy:migration {slug}        创建一个指定模块的数据库迁移文件
```

## 文件生成器

生成器工具

```php
php artisan poppy:command {slug} {name}           # 生成命令文件
php artisan poppy:controller {slug} {api/web/backend} {name}
                                                  # 生成控制器文件
php artisan poppy:middleware {slug} {name}        # 生成中间件文件
php artisan poppy:model {slug} {name}             # 生成数据库模型文件
php artisan poppy:policy {slug} {name}            # 生成 policy 策略文件
php artisan poppy:provider {slug} {name}          # 生成服务提供者
php artisan poppy:request {slug} {name}           # 生成 request 文件
php artisan poppy:test {slug} {name}              # 生成测试文件
php artisan poppy:make {slug}                     # 生成模块
php artisan poppy:listener {slug} {name}          # 事件监听器(详细见下方)
php artisan poppy:event {slug} {name}             # 生成事件文件
```

### 监听文件

```shell
$ php artisan poppy:listener {slug} {name}
--event {event}: 事件名称, 使用 `\` 表明是全局的事件, 否则的话以为这是当前模块的事件
```

### 事件文件

```shell
$ php artisan poppy:event {slug} {name}
```

### 数据库 Seeder 和 Seed 命令

```shell
# 生成种子文件
$ php artisan poppy:seeder {slug} {name}

# 执行模块下种子主文件或者传递参数执行指定种子文件
$ php artisan poppy:seed {slug}
```

**创建 seeder 文件**

```php
# 生成模块的主 seeder 文件
$ php artisan poppy:seeder module.demo DemoDatabaseSeeder

# 生成模块的子 seeder 文件
$ php artisan poppy:seeder module.demo DemoDbDatabaseSeeder
```

注册 Seeder 以及生成 数据

```php
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

```shell
$ php artisan poppy:seed module.demo
Seeding: Demo\Database\Seeds\DemoDbDatabaseSeeder
Database seeding completed successfully.
```

### 数据库 Factory 生成

```
$ php artisan poppy:factory {slug} {name}
```

```shell
# 指定当前模块下的模型
$ php artisan poppy:factory module.demo DemoDbFactory --model="DemoDb"

# 指定已存在的模型
$ php artisan poppy:factory module.demo DemoDbFactory --model="\Demo\Models\DemoDb"

# 未指定模型
$ php artisan poppy:factory module.demo DemoDbFactory
```

生成的模型如下

```php
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

```
// Module Maked
Events\PoppyMake($slug)

// 模块启用
Events\PoppyEnabled

// 模块禁用
Events\PoppyDisabled

// 模块优化
Events\PoppyOptimized
```

## Helpers

```
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

```
@poppy
// You Can check if module is exist and enabled.
@endpoppy
```

## 验证

```
1.语言包
 - resource/lang/zh/validator.php
2.相应的验证规则
 - Rule 类
3.FrameworkServiceProvider.php 验证正则规则
```

使用 validator 验证

```php
/** @var PamConfirmedPasswordRequest $reqPwd */
$reqPwd = app(PamConfirmedPasswordRequest::class, [$request]);
if ($Pam->setPassword($this->pam, $reqPwd['password'])) {
    return Resp::success('设置密码成功', '_top_reload|1');
}
```

使用 form 表单验证

```php
$this->text('note', '姓名')->rules([
    Rule::string(),
    Rule::max(30),
]);
$this->text('expired_hour', '登录有效期')->rules([
    Rule::numeric(),
    Rule::between(3, 24),
])->help('登录有效期的时间为 3- 24 小时之间, 允许存在 1 位小数, 超过的小数位数将四舍五入, 默认的有效时间为(12 小时)');
```

## 文件树

Poppy Framework 文件树

```
├── README.md
├── composer.json
├── config
│   └── poppy.php
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
│   │       ├── AppTrait.php
│   │       ├── HasAttributesTrait.php
│   │       ├── KeyParserTrait.php
│   │       ├── MigrationTrait.php
│   │       ├── PoppyTrait.php
│   │       └── ViewTrait.php
│   ├── Console            # 命令行
│   │   ├── Commands
│   │   │   ├── PoppyDisableCommand.php
│   │   │   ├── PoppyEnableCommand.php
│   │   │   ├── PoppyListCommand.php
│   │   │   ├── PoppyMigrateCommand.php
│   │   │   ├── PoppyMigrateRefreshCommand.php
│   │   │   ├── PoppyMigrateResetCommand.php
│   │   │   ├── PoppyMigrateRollbackCommand.php
│   │   │   ├── PoppyOptimizeCommand.php
│   │   │   └── PoppySeedCommand.php
│   │   ├── ConsoleServiceProvider.php
│   │   ├── GeneratorCommand.php
│   │   ├── GeneratorServiceProvider.php
│   │   └── Generators
│   │       ├── MakeCommandCommand.php
│   │       ├── MakeControllerCommand.php
│   │       ├── MakeMiddlewareCommand.php
│   │       ├── MakeMigrationCommand.php
│   │       ├── MakeModelCommand.php
│   │       ├── MakePolicyCommand.php
│   │       ├── MakePoppyCommand.php
│   │       ├── MakeProviderCommand.php
│   │       ├── MakeRequestCommand.php
│   │       ├── MakeSeederCommand.php
│   │       ├── MakeTestCommand.php
│   │       └── stubs
│   ├── Database          # 数据库集成器
│   │   └── Migrations
│   │       └── Migrator.php
│   ├── Events            # 提供的事件
│   │   └── PoppyMake.php
│   ├── Exceptions        # 异常
│   │   ├── AjaxException.php
│   │   ├── ApplicationException.php
│   │   ├── ArithmeticException.php
│   │   ├── BaseException.php
│   │   ├── DoException.php
│   │   ├── FakerException.php
│   │   ├── LoadConfigurationException.php
│   │   ├── ModuleNotFoundException.php
│   │   ├── ParamException.php
│   │   ├── PolicyException.php
│   │   ├── PoppyException.php
│   │   ├── RbacException.php
│   │   ├── RuntimeException.php
│   │   ├── TestException.php
│   │   └── TransactionException.php
│   ├── Facade        # 门面
│   │   ├── IniFacade.php
│   │   ├── XmlFacade.php
│   │   ├── YamlFacade.php
│   ├── Filesystem        # 文件系统
│   │   └── Filesystem.php
│   ├── Foundation        # Kernal 以及异常处理
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
│   ├── Helper           # 帮助文件
│   │   ├── ArrayHelper.php
│   │   ├── CookieHelper.php
│   │   ├── EnvHelper.php
│   │   ├── FileHelper.php
│   │   ├── HtmlHelper.php
│   │   ├── ImageHelper.php
│   │   ├── RouterHelper.php
│   │   ├── SearchHelper.php
│   │   ├── StrHelper.php
│   │   ├── TimeHelper.php
│   │   ├── TreeHelper.php
│   │   └── UtilHelper.php
│   ├── Http            # 控制器相关, 中间件, 分页
│   │   ├── Middlewares
│   │   │   └── EnableCrossRequest.php
│   │   └── Pagination
│   │       └── PageInfo.php
│   │   └── BladeServiceProvider.php
│   ├── Parse           # 解析器
│   │   ├── Ini.php
│   │   ├── ParseServiceProvider.php
│   │   ├── Xml.php
│   │   └── Yaml.php
│   ├── Poppy           # poppy 加载的模块操作
│   │   ├── Abstracts
│   │   │   └── Repository.php
│   │   ├── Contracts
│   │   │   └── Repository.php
│   │   ├── Events
│   │   │   └── PoppyOptimized.php
│   │   ├── FileRepository.php
│   │   ├── Poppy.php
│   │   └── PoppyServiceProvider.php
│   ├── Support            # 支援文件
│   │   ├── Abstracts
│   │   │   └── Repository.php
│   │   ├── PoppyServiceProvider.php
│   │   └── functions.php
│   ├── Translation       # 多语言
│   │   ├── TranslationServiceProvider.php
│   │   └── Translator.php
│   └── Validation        # 验证规则
│       └── Rule.php
└── tests                 # 测试文件
```

## 配置

配置定义为框架中对 config 文件的注入, 命名建议如下:

- poppy.php
- module.php

```
# Poppy
poppy.framework.page_max

# 模块配置
module.order.xxx
```

## 参考 & Docs

- [Yaml](http://nodeca.github.io/js-yaml/)
- [EloquentFilter](https://github.com/Tucker-Eric/EloquentFilter)
- [Doctum](https://github.com/code-lts/doctum)
- [Carbon](https://github.com/briannesbitt/Carbon)
- [Laravel Html & Form - Html/Form 封装](https://segmentfault.com/a/1190000011580448)
- [hieu-le/active-Url 状态组件](https://laravel-china.org/topics/2858/extended-recommendation-hieu-leactive-according-to-the-url-generated-corresponding-navigation-active-state)
- [hashids/hashids - 对 ID 进行 Hash 加密](https://github.com/vinkla/laravel-hashids)

