---
description: '基于纯真的本地化 IP 库转换工具，支持多种 IP 类型，默认采用最全面的 mon17 格式。该工具基于 weiran/framework 框架，可在 Laravel 中通过添加 Service Provider 使用，并遵循 MIT 开源许可。'
lastUpdated: '2026-06-21 16:51:41'
head:
  - - meta
    - name: 'og:title'
      content: 'Ip Store'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '基于纯真的本地化 IP 库转换工具，支持多种 IP 类型，默认采用最全面的 mon17 格式。该工具基于 weiran/framework 框架，可在 Laravel 中通过添加 Service Provider 使用，并遵循 MIT 开源许可。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//wr-1.x/extension/ip-store.html'
---
# Ip Store

> 基于纯真的本地化 ip 库转换工具

## Ip 库说明

支持的IP类型, mon17是最全面的, 默认是这种类型

```Plaintext
qqwry   :  http://www.cz88.net/
mon17   :  https://www.ipip.net/
```

## 配置

本扩展拓展于 `weiran/framework` 框架. 添加/更改配置

```Plaintext
// weiran.php
'ip_store' => [
    'type' => 'mon17'
]
```

## For Laravel

如果 Laravel 中使用, 需要添加 Service Provider 到 app providers 数组

```Plaintext
Weiran\Extension\IpStore\ExtensionServiceProvider.php
```

你可以加入 facade 或者直接使用这个函数

```Plaintext
app('weiran.ext.ip_store')->area('39.71.122.222')
```

### License

The plugin is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).