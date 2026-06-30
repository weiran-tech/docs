---
description: '该最佳实践涵盖代码审查、查询优化、请求校验、规范编写、测试用例、Composer配置、安全策略、数据映射及IDE项目配置等关键环节，确保代码质量与安全性。'
lastUpdated: '2026-06-30 11:04:26'
head:
  - - meta
    - name: 'og:title'
      content: '最佳实践'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该最佳实践涵盖代码审查、查询优化、请求校验、规范编写、测试用例、Composer配置、安全策略、数据映射及IDE项目配置等关键环节，确保代码质量与安全性。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/project/best-practice.html'
---
# 最佳实践

::: info ℹ️
<p>扩展阅读</p><ul><li>[Jetbrains 系 IDE 常用技巧](https://www.wulicode.com/development/tools/ide-jetbrain-tips.html)</li></ul>
:::

## 配置

对于文件目录 & 网址, 我们不建议在右侧添加 `/` 作为后缀, 例如

```Plaintext
URL_SITE=http://v4.wulicode.com
```

## Inspect

Inspect 是开发过程中的工具, 用来检查项目中的文件注释, 文件命名, seo 命名, 权限等是否都满足项目定义

```Plaintext
$ php artisan py-core:inspect > inspect.txt
```

- [必须] 完成 seo 校验
- [必须] 完成 validation 校验
- [必须] 完成 class 加载校验
- [建议] 完成代码注释

## 代码

### 使用 firstOrFail 替代查询

使用 `firstOrFail` 在未查到匹配的数据后会抛出 `ModelNotFoundException` 异常并且此异常可以进行友好提示

参考 : 模型:友好提示

### 使用 Request 校验

使用 Request 校验可以减少逻辑代码对数据的依赖, 从而降低代码的耦合以便实现, 可以使用在控制器和 Action 中

参考 :

- [Laravel 表单验证](https://learnku.com/docs/laravel/6.x/validation/5144)
- [(内部)PamRoleRequest](https://codeup.aliyun.com/qyd/central/poppy/wulicode/blob/4.2/poppy/system/src/Http/Validation/PamRoleRequest.php)

### 代码编写符合规范

### 测试用例完善并且通过

## composer 配置

### 加入安全策略

项目根 `composer.json` 中加入安全建议

```JSON
{
    "require-dev": {
        "roave/security-advisories": "dev-latest"
    }
}
```

### 映射 Form , 需要在 composer 中加入数据

由于这里是继承的 “laravelcollective/html” 组件, 所以必须先禁用掉原生的自动发现

在 composer.json 文件中禁用自动发现

```Plaintext
"extra" : {
    "laravel" : {
        "dont-discover" : [
            "laravelcollective/html"
        ]
    }
},
```

在 `providers` 部分加入

```Plaintext
'providers' => [
    // ...
    Collective\Html\HtmlServiceProvider::class,
    // ...
];
```

更新并清空缓存

```Shell
composer dumpautoload && php artisan poppy:optimize
```

然后在 `app.php` 的 `aliases` 部分加入

```Plaintext
'aliases' => [
    // ...
    'Html' => Collective\Html\HtmlFacade::class,
    'Form' => System\Classes\Facade\FormFacade::class,
    // ...
];
```

### IDE 项目配置

**忽略掉的目录**

右键忽略掉即可, 这个是生成的文件, 不需要进行 php 索引

```Plaintext
public/assets/
storage/clockwork/
storage/phpunit/
```