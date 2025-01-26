---
description: '支持的IP类型, mon17是最全面的, 默认是这种类型本扩展拓展于 poppy/framework 框架. 添加/更改配置如果 Laravel 中使用, 需要添加 Service Provider 到 app providers 数组你可以加入 facade 或者直接使用这个函数The plugin is open-sourced software licensed under the MIT license.'
lastUpdated: '2025-01-23 00:26:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Ip Store'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '支持的IP类型, mon17是最全面的, 默认是这种类型本扩展拓展于 poppy/framework 框架. 添加/更改配置如果 Laravel 中使用, 需要添加 Service Provider 到 app providers 数组你可以加入 facade 或者直接使用这个函数The plugin is open-sourced software licensed under the MIT license.'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/10.x/extension/ip-store.html'
---
# Ip Store



> 基于纯真的本地化 ip 库转换工具

## Ip 库说明

支持的IP类型, mon17是最全面的, 默认是这种类型

```
qqwry   :  http://www.cz88.net/
mon17   :  https://www.ipip.net/
```

## 配置

本扩展拓展于  `poppy/framework`  框架. 添加/更改配置

```
// extension.php
'ip_store' => [
    'type' => 'mon17'
]
```

## For Laravel

如果 Laravel 中使用, 需要添加 Service Provider 到 app providers 数组

```
Poppy\Extension\IpStore\ExtensionServiceProvider.php
```

你可以加入 facade 或者直接使用这个函数

```
app('ext.ip_store')->area('39.71.122.222')
```

### License

The plugin is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

