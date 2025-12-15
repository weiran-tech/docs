---
description: '对于文件目录和网址, 我们不建议在右侧添加 / 作为后缀, 如下这种配置方便于我们在组合 Url 地址 / 目录的的时候存在统一使用 Request 校验可以减少逻辑代码对数据的依赖, 从而降低代码的耦合以便实现, 可以使用在控制器和 Action 中参考 :在项目中我们使用 qodana, 来进行静态代码扫描, 在IDE 中操作 Problems → Server Side Analysis → Run LocallyInspect 是开发过程中的工具, 用来检查项目中的文件注释, 文件命名, seo 命名, 权限等是否都满足项目定义在浏览器标题栏中生成 SEO '
lastUpdated: '2025-05-09 11:20:00'
head: 
  - - meta
    - name: 'og:title'
      content: '最佳实践'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '对于文件目录和网址, 我们不建议在右侧添加 / 作为后缀, 如下这种配置方便于我们在组合 Url 地址 / 目录的的时候存在统一使用 Request 校验可以减少逻辑代码对数据的依赖, 从而降低代码的耦合以便实现, 可以使用在控制器和 Action 中参考 :在项目中我们使用 qodana, 来进行静态代码扫描, 在IDE 中操作 Problems → Server Side Analysis → Run LocallyInspect 是开发过程中的工具, 用来检查项目中的文件注释, 文件命名, seo 命名, 权限等是否都满足项目定义在浏览器标题栏中生成 SEO '
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/project/best-practice.html'
---
# 最佳实践



## 代码编写

### Laravel 框架

对于文件目录和网址, 我们不建议在右侧添加  `/`  作为后缀, 如下

```
APP_URL=http://weiran-v1.wulicode.com
```

这种配置方便于我们在组合 Url 地址 / 目录的的时候存在统一

### 使用 Request 校验

使用 Request 校验可以减少逻辑代码对数据的依赖, 从而降低代码的耦合以便实现, 可以使用在控制器和 Action 中

参考 :

- [https://learnku.com/docs/laravel/10.x/validation/14856](https://learnku.com/docs/laravel/10.x/validation/14856)
- [weiran-tech/system/blob/1.0/src/Http/Request/Web/Validation/AuthLoginRequest.php](https://github.com/weiran-tech/system/blob/1.0/src/Http/Request/Web/Validation/AuthLoginRequest.php)

### 静态代码扫描

在项目中我们使用 qodana, 来进行静态代码扫描, 在IDE 中操作  `Problems`  →  `Server Side Analysis`  →  `Run Locally`

## Inspect

Inspect 是开发过程中的工具, 用来检查项目中的文件注释, 文件命名, seo 命名, 权限等是否都满足项目定义

### SEO 优化

在浏览器标题栏中生成 SEO 标题

```shell
$ php artisan core:inspect seo
```

### Validation 校验

用来验证项目的 validation 是否完善, 如果不完善则会出现  `validation.mobile`  的错误

```shell
$ php artisan core:inspect validation
```

### File 文件名称校验

用来规范项目中指定目录的文件命名

```shell
$ php artisan core:inspect file
```

### Util 提示校验

用来规范项目中指定目录的文件命名

```shell
$ php artisan core:inspect util
```

使用  `firstOrFail`  在未查到匹配的数据后会抛出  `ModelNotFoundException`  异常并且此异常可以进行友好提示

例如这个提示 :  `user::util.classes.models.tao_bao_center_user`  文件应当放置在

`user/resources/lang/util.php` , 内容是:

```php
<?php
return [
	'classes' => [
		'models' => [
			'tao_bao_center_user' => '中心场用户'
		]
	]
]
```

## composer 配置

### 加入安全策略

项目根  `composer.json`  中加入安全建议

```
{
    "require-dev": {
        "roave/security-advisories": "dev-latest"
    }
}
```

### 映射 Form , 需要在 composer 中加入数据

由于这里是继承的 “laravelcollective/html” 组件, 所以必须先禁用掉原生的自动发现

在 composer.json 文件中禁用自动发现

```
"extra" : {
    "laravel" : {
        "dont-discover" : [
            "laravelcollective/html"
        ]
    }
},
```

在  `providers`  部分加入

```
'providers' => [
    // ...
    Collective\Html\HtmlServiceProvider::class,
    // ...
];
```

更新并清空缓存

```shell
$ composer dumpautoload && php artisan weiran:optimize
```

然后在  `app.php`  的  `aliases`  部分加入

```
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

```
public/assets/
storage/clockwork/
storage/phpunit/
```

## 参考

- [<img src="https://file.wulicode.com/notion/ee/eed3050655bce80417c1b4d05fe4855a.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  JetBrains 系插件和技巧](https://www.wulicode.com/development/ide/jetbrains-plugins.html) 



