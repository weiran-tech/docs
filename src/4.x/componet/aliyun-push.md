---
description: '通过composer require安装poppy/aliyun-push 4.0版本后，执行composer update或composer install更新依赖。推送消息时，extras参数会放入body中发送。'
lastUpdated: '2026-06-22 14:55:32'
head:
  - - meta
    - name: 'og:title'
      content: 'Aliyun 推送'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '通过composer require安装poppy/aliyun-push 4.0版本后，执行composer update或composer install更新依赖。推送消息时，extras参数会放入body中发送。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/componet/aliyun-push.html'
---
# Aliyun 推送

## 安装

```Plaintext
composer require poppy/aliyun-push 4.0.*
```

更新你的依赖包 `composer update` 或者全新安装 `composer install`。

## 注意

在使用推送的时候如果发送的是消息, 则 extras 会放到 body 中来进行发送