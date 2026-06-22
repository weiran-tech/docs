---
description: 'Weiran 1.x 是一个模块化框架，包含插件模块、扩展模块和项目模块，支持灵活扩展。提供反馈机制，并致谢贡献者。'
lastUpdated: '2026-06-22 17:35:01'
head:
  - - meta
    - name: 'og:title'
      content: 'Weiran - 1.x'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Weiran 1.x 是一个模块化框架，包含插件模块、扩展模块和项目模块，支持灵活扩展。提供反馈机制，并致谢贡献者。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//wr-1.x/index.html'
---
# Weiran - 1.x

> 基于 Laravel 的模块化开发框架

**版本要求**

```Plaintext
Laravel : 10.*
Php : ^8.2
```

## 框架

> 支持模块化开发并且预制常用的函数, 方法, 异常处理

## 模块

模块作为框架的组成部分, 是重要的项目单元

### 插件模块

官方维护的, 对常用的数据出具解决方案的工具包

**core**

- redis
- 权限管理
- 文档生成

**system**

- rbac 权限系统
- 对接口签名扩展
- 系统配置项目扩展
- 用户管理
- 快速列表/表单

**mgr-page**

> 基于 layui 的后台管理框架

- 支持后端认证
- 基于 RBAC 的权限管理系统

### 扩展模块

扩展为插件提供功能, 并且不包含数据库部分的服务模块, 能够用于多个不同的的项目

---

### 项目模块

项目根据不同的业务逻辑来进行开发的支持业务逻辑的模块

## 反馈

[Github Issues](https://github.com/weiran-tech/weiran/issues)

## Thanks To

- [Layui](https://layui.gitee.io/v2/)
- [Laravel](https://laravel.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [EloquentFilter](https://github.com/Tucker-Eric/EloquentFilter)
- [Doctum](https://github.com/code-lts/doctum)
- [Carbon](https://github.com/briannesbitt/Carbon)
- [Laravel Html & Form - Html/Form 封装](https://segmentfault.com/a/1190000011580448)
- [hashids/hashids - 对 ID 进行 Hash 加密](https://github.com/vinkla/laravel-hashids)