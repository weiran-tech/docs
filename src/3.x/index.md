---
description: 'Poppy Framework 3.x 的相关文档集合，包括入门指南、常见问题、项目说明、框架、模块与组件等内容。'
lastUpdated: '2026-06-22 17:36:18'
head:
  - - meta
    - name: 'og:title'
      content: '3.x'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Poppy Framework 3.x 的相关文档集合，包括入门指南、常见问题、项目说明、框架、模块与组件等内容。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//3.x/index.html'
---
# 3.x

> 基于 Laravel 的模块化开发框架

系统要求

- 3.x 项目是基于 Laravel 6 拓展
- composer 2.x
- php >= 7.4

## 模块

### 框架

- 支持模块化开发并预制常用函数

### 核心

- Redis 封装
- 常用文档工具与规范

### 系统

- rbac 用户管理以及权限系统
- 对接口签名扩展
- 对用户密码加密扩展
- 系统配置项目扩展

### 管理(layui-base)

- 基于 jquery/layui 的后台管理框架
- 基于 apidoc 的接口请求平台

### 扩展

- aliyun-push (阿里云推送)

项目为了便于管理, 对代码进行模块化分组分为 框架, 核心, 管理, 组件 四部分构成, 使用 composer 进行模块化安装

## 功能

使用本项目可以快速的完成项目业务逻辑的开发, 其中包含

- RBAC 权限管理
- 后台登录登出
- 用户禁用, 启用
- 接口安全加密
- 用户密码安全自定义
- 接口跨域白名单
- 后台管理框架
- 快速表单生成

项目是在公司内部的业务逻辑的基础之上剥离出来, 并且应用在公司快速开发的项目中, 内涵丰富的功能，可满足日常 80% 的开发需求

## 发展方向

项目以快速开发作为目标, 以后端快速分离开发来做性能的优化方向

## 反馈

[Github Issues](https://github.com/dadi-cn/poppy-framework/issues)

## Thanks To

- [Layui](https://www.layui.com/)
- [~~Notadd~~](https://xueyuanjun.com/post/7092)