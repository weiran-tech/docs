---
description: '安装扩展包时，需先安装附加扩展，再更新相关包或重新安装。'
lastUpdated: '2026-06-25 19:26:28'
head:
  - - meta
    - name: 'og:title'
      content: 'Sms 扩展包'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '安装扩展包时，需先安装附加扩展，再更新相关包或重新安装。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/component/sms.html'
---
# Sms 扩展包

## 安装

```Plaintext
composer require poppy/sms
```

## 安装附加扩展

因为此扩展包仅仅为了封装 poppy framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装

**Aliyun**

```Plaintext
    ...
    "alibabacloud/client": "^1.5",
    "alibabacloud/dysmsapi": "1.8.*",
    ...
```

## 更新相关包或者重新安装

更新你的依赖包 `composer update` 或者全新安装 `composer install`。