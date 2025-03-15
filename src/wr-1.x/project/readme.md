---
description: '默认项目中没有 .env 文件复制 .env.example 为 .env配置数据库信息配置域名生成 app key, jwt key执行数据库 migrate系统安装并创建用户安装完成访问 https://weiran-v1.wulicode.com/mgr-page/login登录之后的界面项目的 .env 文件配置, 文件遵循 laravel 配置, 这里只列出框架需要注意的配置项目项目中使用 jwt 进行项目授权, 必须要生成 JWT_SECRET项目中缓存约定支持 redis, 不使用可能会导致部分功能不可用演示模式下不允许修改主账'
lastUpdated: '2025-03-15 13:43:00'
head: 
  - - meta
    - name: 'og:title'
      content: '说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '默认项目中没有 .env 文件复制 .env.example 为 .env配置数据库信息配置域名生成 app key, jwt key执行数据库 migrate系统安装并创建用户安装完成访问 https://weiran-v1.wulicode.com/mgr-page/login登录之后的界面项目的 .env 文件配置, 文件遵循 laravel 配置, 这里只列出框架需要注意的配置项目项目中使用 jwt 进行项目授权, 必须要生成 JWT_SECRET项目中缓存约定支持 redis, 不使用可能会导致部分功能不可用演示模式下不允许修改主账'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/project/readme.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/f5/f53a8afd99f025382325d96e3460377c.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 说明



## 安装

### 配置项目环境

默认项目中没有  `.env`  文件

### 项目配置文件

复制  `.env.example`  为  `.env`

```
$ cp .env.example .env
```

配置数据库信息

```
DB_HOST=127.0.0.1
DB_DATABASE=weiran_v1
DB_USERNAME=root
DB_PASSWORD=null
```

配置域名

```
URL_SITE=https://weiran.domain.com
```

生成 app key, jwt key

```
$ php artisan key:generate
$ php artisan jwt:secret
```

### 项目初始化以及安装

执行数据库 migrate

```
$ php artisan weiran:migrate
```

系统安装并创建用户

```
$ php artisan system:install
Start Install Weiran Framework!
Init UserRole Ing...
Init Role success
Install User Roles Success
Init Rbac Permission...
[poppy.core.PermissionCommand] Import permission Success!
Init Rbac Permission Success

$ php artisan system:user create_user

 Please input username!:
 > root_user

 Please input password!:
 > 123456

 Please input role name!:
 > root

User root_user created
```

安装完成访问  `https://weiran-v1.wulicode.com/mgr-page/login`

![](https://file.wulicode.com/notion/f5/f53a8afd99f025382325d96e3460377c.png)

登录之后的界面

![](https://file.wulicode.com/notion/ad/ad47e08654f004ab4af6a667aefd296d.png)

## 项目说明

### 项目目录树

```
├── config              # 配置文件
├── modules             # 模块名称, 这里以system 模块 作为说明, 详细见 模块目录树
│   ├── finance
│   ├── order
│   └── ...
├── public
│   ├── docs            # 文档
│   ├── modules         # 模块资源
│   └── resources       # 资源项目 / 公共
│       ├── css
│       ├── js
│       └── scss
├── resources           # 资源源文件
│   ├── assets
│   ├── docs
│   ├── lang
│       ├── en
│       └── zh
├── storage             # 存储目录
│   ├── app             # 应用资源
│   ├── bootstrap       # 启动项目
│   ├── bower           # bower 文档
│   ├── clockwork       # 调试文件
│   ├── console         # 控制器
│   ├── framework       # 框架缓存
│   │   ├── cache
│   │   ├── sessions
│   │   └── views
│   ├── logs            # 日志
│   ├── phplint
│   ├── purifier
│   ├── sami
├── tests               # 测试目录
│   ├── MerchantApi
│   │   └── User
│   └── WebApi
│       └── User
└── vendor              # 第三方文档(只是预览, 不做详细说明)

```

## 配置

项目的  `.env`  文件配置, 文件遵循 laravel 配置, 这里只列出框架需要注意的配置项目

### jwt-secret

项目中使用 jwt 进行项目授权, 必须要生成  `JWT_SECRET`

```
$ php artisan jwt:secret
```

### cache

项目中缓存约定支持 redis, 不使用可能会导致部分功能不可用

```
CACHE_DRIVER=redis
```

### 演示模式

演示模式下不允许修改主账号账密

```
IS_DEMO=true
```

### env

框架对 env 环境的约定,

```
# local|本地;test|测试;develop|开发;production|生产
APP_ENV=local
```

