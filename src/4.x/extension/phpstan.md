---
description: '从4.1版本起，通过composer引入poppy/ext-phpstan 4.2，在phpstan.neon配置文件中添加includes，并运行phpstan analyse进行静态检测。'
lastUpdated: '2026-06-22 14:56:31'
head:
  - - meta
    - name: 'og:title'
      content: 'Phpstan'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '从4.1版本起，通过composer引入poppy/ext-phpstan 4.2，在phpstan.neon配置文件中添加includes，并运行phpstan analyse进行静态检测。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/extension/phpstan.html'
---
# Phpstan

> since 4.1 为了在项目中增加 phpstan 的静态检测

## 安装

```Plaintext
composer require poppy/ext-phpstan 4.2.*
```

`~/phpstan.neon` 中增加

```Plaintext
includes:
    - vendor/poppy/ext-phpstan/extension.neon
```

运行

```Bash
$ phpstan analyse -c phpstan.neon
```