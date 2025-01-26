---
description: '~/phpstan.neon 中增加运行'
lastUpdated: '2023-12-28 15:21:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Phpstan'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '~/phpstan.neon 中增加运行'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/extension/phpstan.html'
---
# Phpstan



> since 4.1 为了在项目中增加 phpstan 的静态检测

## 安装

```
composer require poppy/ext-phpstan 4.2.*
```

`~/phpstan.neon`  中增加

```
includes:
    - vendor/poppy/ext-phpstan/extension.neon
```

运行

```shell
$ phpstan analyse -c phpstan.neon
```



