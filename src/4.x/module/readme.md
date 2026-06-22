---
description: '本文档说明如何创建配置文件树、注册服务，并介绍其他约定及模块定义文件的相关规范。'
lastUpdated: '2026-06-22 15:01:08'
head:
  - - meta
    - name: 'og:title'
      content: '说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档说明如何创建配置文件树、注册服务，并介绍其他约定及模块定义文件的相关规范。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/module/readme.html'
---
# 说明

模块是开发的基础组成部分, 各个项目都是有多个不同的模块组合而成, 模块是组件模的子单元

## 创建

使用如下命令来创建模块, 创建的模块如下树状结构

```Plaintext
$ php artsian poppy:make {slug} -Q
```

在模块创建完成后会在模块的根目录下创建一个 `manifest.json` 文件, 用来对项目中的模块进行加载

```JSON
{
    "name": "系统",
    "slug": "system",
    "version": "1.1",
    "order": 10,
    "description": "Core Support Module For Basic Pam"
}
```

这里的 `order` 是对于模块进行排序的, 该项目可以控制模块中间菜单的顺序, 模块的加载顺序, 如果要调整各个模块菜单的加载顺序可以通过此参数进行调整, 排序规则 : 递增

## 配置

模块配置文件 :`config/module.php`

模块配置依据模块命名进行设置

```PHP
return [
    'module1' => [
        'some-config': true
    ],
    
    //...
    'module2' => [
        'some-config': true
    ],
],
```

## 文件树

```Plaintext
├── configurations       # 配置文件
│   ├── permissions.yaml # 权限定义
│   ├── menus.yaml       # 菜单定义
│   ├── services.yaml    # 服务定义文件
│   ├── hooks.yaml       # 服务钩子定义文件
├── docs                 # 技术文档
├── resources            # 资源
│   ├── config           # 发布的配置文件
│   ├── lang             # 多语言支持包的位置
│   │   └── zh
│   └── views            # 视图文件
│       ├── backend      # 视图 - 后台
│       ├── develop      # 视图 - 开发者平台
│       ├── email        # 视图 - email
│       └── tpl          # 视图 - 核心模板
├── src
│   ├── Action           # 业务逻辑文件
│   ├── Classes          # 基础类
│   │   ├── Auth
│   │   ├── {Model}Def.php      # 模块定义文件
│   │   └── Traits       # traits
│   ├── Commands         # 命令
│   ├── Events           # 事件, 事件使用 Event 后缀
│   ├── Http             # 路由和中间件
│   │   ├── Request      # 控制器
│   │   ├── Middleware   # 中间件
│   │   └── Routes       # 路由
│   ├── Listeners        # 事件 - 监听器
│   ├── Models           # 模型
│   │   ├── Policies     # 模型 - 策略
│   │   └── Resources    # 模型 - 资源
│   └── Notifications    # 通知
└── tests                # 单元测试
```

## 注册服务

```PHP
<?php 

declare(strict_types = 1);

namespace Demo;

use Poppy\Framework\Support\PoppyServiceProvider;
use Poppy\System\Events\PassportVerifyEvent;

class ServiceProvider extends PoppyServiceProvider
{
    /**
     * 定义模块名称
     * 模块使用 module.{module}
     */
    protected $name = 'poppy.system';

    // 注册事件监听器
    protected $listens = [
        \Illuminate\Auth\Events\Failed::class               => [
            Listeners\AuthFailed\LogListener::class,
        ],
    ];

    // 注册策略
    protected $policies = [
        PamRole::class    => PamRolePolicy::class,
        PamAccount::class => PamAccountPolicy::class,
    ];

    /**
     * 启动
     */
    public function boot()
    {
        parent::boot($this->name);

        // 注册 api 文档配置
        $this->publishes([
            __DIR__ . '/../resources/config/sami.php'   => storage_path('sami/config.php'),
            __DIR__ . '/../resources/config/module.php' => base_path('config/module.php'),
        ], 'poppy-module');

        $path = poppy_path($this->name);

        // 配置文件
        $this->mergeConfigFrom($path . '/resources/config/module.php', 'module');

        $this->bootConfigMail();
    }

    // 注册服务
    public function register()
    {
        $this->app->register(Http\MiddlewareServiceProvider::class);
        // ...
        $this->app->register(Permission\PermissionServiceProvider::class);

        $this->registerConsole();

        $this->registerSchedule();
    }

    // 计划任务
    private function registerSchedule()
    {
        app('events')->listen('console.schedule', function (Schedule $schedule) {
            $schedule->command('py-system:user', ['auto_enable'])
                ->everyFiveMinutes()->appendOutputTo($this->consoleLog());
        });
    }

    // 注册命令
    private function registerConsole()
    {
        $this->commands([
            Commands\UserCommand::class,
            // ...
        ]);
    }

    // config 覆盖
    private function bootConfigMail()
    {
        config([
            'mail.driver'       => sys_setting('system::mail.driver') ?: config('mail.driver'),
        ]);
    }
}
```

## 其他约定

### 模块定义文件

模块定义文件一般放置在 `{module}/src/Classes` 目录下, 文件名称为 `{Module}Def.php` , 用以放置项目中通用的缓存定义等通用型的定义数据的 name 值, 不包含 `slug`, slug 在使用的时候定义

- 缓存KEY定义
- 错误码

```PHP
<?php

declare(strict_types = 1);

namespace Demo\Classes;

class DemoDef
{

    public static function ckDemoCache(string $key) : string
    {
        return 'demo_cache_'.$key;
    }
}
```