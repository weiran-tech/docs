# Phpstan

::: danger

使用 Jetbrain 的 Inspection 检测替代, 不推荐使用本项目

:::

> since 4.1
> 为了在项目中增加 phpstan 的静态检测

## 安装

```
composer require poppy/ext-phpstan 4.2.*
```

`~/phpstan.neon` 中增加

```
includes:
    - vendor/poppy/ext-phpstan/extension.neon
```