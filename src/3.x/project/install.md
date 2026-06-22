---
description: '完成项目环境配置的安装与初始化，包括配置项目文件、运行安装命令，确保基础环境就绪。'
lastUpdated: '2026-06-22 13:49:47'
head:
  - - meta
    - name: 'og:title'
      content: '安装'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '完成项目环境配置的安装与初始化，包括配置项目文件、运行安装命令，确保基础环境就绪。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//3.x/project/install.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ed74be29fa0336dd1cc70cf387078915.png'
---
# 安装

## 配置项目环境

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
URL_SITE=https://poppy-demo.wulicode.com
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

安装完成访问 `https://poppy-demo.wulicode.com/mgr-page/login`

![](https://file.wulicode.com/feishu-images/ed74be29fa0336dd1cc70cf387078915.png)

登录之后的界面

![](https://file.wulicode.com/feishu-images/92f24eb91583b0db06c7924608ce7f51.png)