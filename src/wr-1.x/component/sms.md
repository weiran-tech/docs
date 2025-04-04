---
description: '因为此扩展包仅仅为了封装 weiran framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装Aliyun更新你的依赖包 composer update 或者全新安装 composer install。'
lastUpdated: '2025-04-02 17:58:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Sms / 短信'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '因为此扩展包仅仅为了封装 weiran framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装Aliyun更新你的依赖包 composer update 或者全新安装 composer install。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/component/sms.html'
---
# Sms / 短信



::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  配置说明 : 需要 packeton 的私有包权限, 并且再 composer 中配置如下代码


```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packeton.kejinxia.com"
    }
  ]
}
```
:::

## 安装

```
composer require weiran/sms 1.0.x-dev
```

## 安装附加扩展

因为此扩展包仅仅为了封装 weiran framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装

**Aliyun**

```
    ...
    "alibabacloud/client": "^1.5",
    "alibabacloud/dysmsapi": "1.8.*",
    ...
```

## 更新相关包或者重新安装

更新你的依赖包  `composer update`  或者全新安装  `composer install` 。

