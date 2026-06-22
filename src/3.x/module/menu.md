---
description: '该系统包含后台、开发和前台三部分。后台广告管理模块配置了图标和分组，通过注入点“poppy.mgr-page/backendsetting”插入，子模块包括广告位管理，需权限backend:poppy-ad.place.manage。'
lastUpdated: '2026-06-22 14:12:52'
head:
  - - meta
    - name: 'og:title'
      content: '菜单'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该系统包含后台、开发和前台三部分。后台广告管理模块配置了图标和分组，通过注入点“poppy.mgr-page/backendsetting”插入，子模块包括广告位管理，需权限backend:poppy-ad.place.manage。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//3.x/module/menu.html'
---
# 菜单

## 支持的类型

key 包含 backend(后端), develop(开发), web(前台)这几个部分.

```YAML
backend:
    title: 广告管理
    icon: "fa fa-audio-description"
    groups:
        - title: 广告管理
          icon: "fa fa-audio-description"
          injection: "poppy.mgr-page/backend||setting"
          children:
              - title: 广告位管理
                route: py-ad:backend.place.index
                permission: backend:poppy-ad.place.manage
develop: ...
```

## key 说明

```Plaintext
title     : 标题
icon      : 支持的图标
groups    : 分组(数组)
injection : 分组的插入目标地 'poppy.mgr-page/backend||setting' 代表放置到 mgr-page/backend setting 那个 key 下模块的后台分组
match     : 用于路由的第三级别, 页面中内容区域和右侧菜单项目的匹配,不设置可能会导致页面菜单为空
```