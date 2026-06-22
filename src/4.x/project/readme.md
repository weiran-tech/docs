---
description: '该项目说明包括环境安装、配置和初始化，涉及项目目录结构、JWT密钥、缓存设置及演示模式。支持本地、测试、开发和生产四种环境配置。'
lastUpdated: '2026-06-22 14:35:29'
head:
  - - meta
    - name: 'og:title'
      content: '说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该项目说明包括环境安装、配置和初始化，涉及项目目录结构、JWT密钥、缓存设置及演示模式。支持本地、测试、开发和生产四种环境配置。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/project/readme.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ed74be29fa0336dd1cc70cf387078915.png'
---
# 说明

## 安装

### 配置项目环境

默认项目中没有 `.env` 文件

### 项目配置文件

复制 `.env.example` 为 `.env`

```Plaintext
$ cp .env.example .env
```

配置数据库信息

```Plaintext
DB_HOST=127.0.0.1
DB_DATABASE=poppy_v1
DB_USERNAME=root
DB_PASSWORD=Poppy123456
```

配置域名

```Plaintext
URL_SITE=https://poppy.domain.com
```

生成 app key, jwt key

```Plaintext
$ php artisan key:generate
$ php artisan jwt:secret
```

### 项目初始化以及安装

执行数据库 migrate

```Plaintext
$ php artisan poppy:migrate
```

系统安装并创建用户

```Plaintext
$ php artisan py-system:install
Start Install Lemon Framework!
Init UserRole Ing...
Init Role success
Install User Roles Success
Init Rbac Permission...
[poppy.core.PermissionCommand] Import permission Success!
Init Rbac Permission Success

$ php artisan py-system:user create_user

 Please input username!:
 > root_user

 Please input password!:
 > 123456

 Please input role name!:
 > root

User root_user created
```

安装完成访问 `https://v4.wulicode.com/mgr-page/login`

![](https://file.wulicode.com/feishu-images/ed74be29fa0336dd1cc70cf387078915.png)

登录之后的界面

![](https://file.wulicode.com/feishu-images/92f24eb91583b0db06c7924608ce7f51.png)

## 项目说明

### 项目目录树

```Plaintext
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

项目的 `.env` 文件配置, 文件遵循 laravel 配置, 这里只列出框架需要注意的配置项目

### jwt-secret

项目中使用 jwt 进行项目授权, 必须要生成 `JWT_SECRET`

```Plaintext
$ php artisan jwt:secret
```

### cache

项目中缓存约定支持 redis, 不使用可能会导致部分功能不可用

```Plaintext
CACHE_DRIVER=redis
```

### 演示模式

演示模式下不允许修改主账号账密

```Plaintext
IS_DEMO=true
```

### env

框架对 env 环境的约定,

```Plaintext
# local|本地;test|测试;develop|开发;production|生产
APP_ENV=local
```