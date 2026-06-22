---
description: '这是一个基于纯真IP库的本地化IP转换工具，支持qqwry和mon17类型，后者最全面。工具扩展自poppy/framework框架，在Laravel中需添加Service Provider。可通过`app(''ext.ipstore'')-area(''IP'')`查询地理位置，开源协议为MIT。'
lastUpdated: '2026-06-22 14:56:21'
head:
  - - meta
    - name: 'og:title'
      content: 'Ip Store'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这是一个基于纯真IP库的本地化IP转换工具，支持qqwry和mon17类型，后者最全面。工具扩展自poppy/framework框架，在Laravel中需添加Service Provider。可通过`app(''ext.ipstore'')-area(''IP'')`查询地理位置，开源协议为MIT。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/extension/ip-store.html'
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

本扩展拓展于 `poppy/framework` 框架. 添加/更改配置

```Plaintext
// extension.php
'ip_store' => [
    'type' => 'mon17'
]
```

## For Laravel

如果 Laravel 中使用, 需要添加 Service Provider 到 app providers 数组

```Plaintext
Poppy\Extension\IpStore\ExtensionServiceProvider.php
```

你可以加入 facade 或者直接使用这个函数

```Plaintext
app('ext.ip_store')->area('39.71.122.222')
```

### License

The plugin is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).