---
description: '对于文件目录 & 网址, 我们不建议在右侧添加 / 作为后缀, 例如phplint是一个快速检测 php 语法错误的工具, 此工具无需安装在项目中, 全局安装即可.运行 php artisan poppy:optimize 保障依赖组件均已经安装由于这里是继承的 “laravelcollective/html” 组件, 所以必须先禁用掉原生的自动发现在 composer.json 文件中禁用自动发现在 providers 部分加入生成自动加载类清空缓存的数据然后在 app.php 的 aliases 部分加入右键忽略掉即可, 这个是生成的文件, 不需要进'
lastUpdated: '2024-01-29 19:07:00'
head: 
  - - meta
    - name: 'og:title'
      content: '最佳实践'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '对于文件目录 & 网址, 我们不建议在右侧添加 / 作为后缀, 例如phplint是一个快速检测 php 语法错误的工具, 此工具无需安装在项目中, 全局安装即可.运行 php artisan poppy:optimize 保障依赖组件均已经安装由于这里是继承的 “laravelcollective/html” 组件, 所以必须先禁用掉原生的自动发现在 composer.json 文件中禁用自动发现在 providers 部分加入生成自动加载类清空缓存的数据然后在 app.php 的 aliases 部分加入右键忽略掉即可, 这个是生成的文件, 不需要进'
---
# 最佳实践



## 配置

对于文件目录 & 网址, 我们不建议在右侧添加  `/`  作为后缀, 例如

```
URL_SITE=https://wulicode.com
```

## phplint

[phplint](https://github.com/overtrue/phplint)是一个快速检测 php 语法错误的工具, 此工具无需安装在项目中, 全局安装即可.

```
$ composer global require overtrue/phplint -vvv
$ php artisan system:doc lint
$ phplint /path/of/code -c /framework/path/.phplint.yml
```

## 项目优化 optimize

运行  `php artisan poppy:optimize`  保障依赖组件均已经安装

## composer 配置

### 开发文件不需要自动加载

- 项目中使用 IDE Helper 生成浏览器提示文件, 此文件在正式项目下不需要进行加载
- Clockwork 不需要加载

```
"extra" : {
    "laravel" : {
        "dont-discover" : [
            "itsgoingd/clockwork",
            "barryvdh/laravel-ide-helper",
        ]
    }
},
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

生成自动加载类

```
composer dumpautoload
```

清空缓存的数据

```
php artisan poppy:optimize
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

## 模块配置 (config/module.php)

## IDE 项目配置

### 可以隐藏的目录

右键忽略掉即可, 这个是生成的文件, 不需要进行 php 索引

```
前端文件
========
public/assets/css
public/assets/font/fontawesome
public/assets/js/system_cp.js
public/assets/js/system_vendor.js
public/assets/easy-web
```

## 前端组件文档

### 多图片/视频上传

```
{!! Form::multiThumb('images', [], $options) !!}

options    类型      默认值    备注
---------- -------- -------- --------------------------------
pam        object   null     当前用户对象, 用于上传文件的授权
type       string   image    允许传入的文件类型支持 (image:图片;video:视频;picture:音视频)
sequence   bool     false    是否支持排序
number     int      3        本表单允许上传的最大数量
```

### PHP-CS-Fixer

[PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) is a tool to automatically fix PHP Coding Standards issues, We use it for Code Specification.

### 测试用例完善并且通过

### 注释完善并且通过

注释使用  `modules/system`  模块来检测

```
$ php artisan system:inspect class > fp.txt
```

### 代码清理过

```
ide:clean code
```

