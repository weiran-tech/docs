---
description: '安装 sentry/sentry-laravel 包新建异常监听这里文件位置放置在 modules/misc/src/http/foundation 下在 composer 中注册 psr-4 的类的位置运行命令完成类的注册使用 Handler将错误监听修改为自定义的错误监控类这样便可以注册并收到异常因为框架在注册异常之前需要知晓异常类的位置, 否则出现异常的时候无法进行异常报错'
lastUpdated: '2024-01-29 15:18:00'
head: 
  - - meta
    - name: 'og:title'
      content: '常见问题'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '安装 sentry/sentry-laravel 包新建异常监听这里文件位置放置在 modules/misc/src/http/foundation 下在 composer 中注册 psr-4 的类的位置运行命令完成类的注册使用 Handler将错误监听修改为自定义的错误监控类这样便可以注册并收到异常因为框架在注册异常之前需要知晓异常类的位置, 否则出现异常的时候无法进行异常报错'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/3.x/faq.html'
---
# 常见问题



## 1. 在模块中对接 sentry

**安装**  **`sentry/sentry-laravel`**  **包**

```
composer require sentry/sentry-laravel
```

**新建异常监听**

这里文件位置放置在  `modules/misc/src/http/foundation`  下

```php
// Handler.php
<?php

namespace Misc\Http\Foundation;

use Exception;

/**
 * poppy handler
 */
class Handler extends \Poppy\System\Http\Exception\Handler
{
    public function report(Exception $exception)
    {
        if (app()->bound('sentry') && $this->shouldReport($exception)) {
            if (!in_array(config('app.env'), ['local', 'test'])){
                app('sentry')->captureException($exception);
            }
        }
        parent::report($exception);
    }
}
```

**在 composer 中注册 psr-4 的类的位置**

```json
// composer.json
{
     "autoload": {
        "psr-4": {
            ...
            "Misc\\Http\\Foundation\\": "modules/misc/src/http/foundation",
            ...
        }
     }
}
```

运行命令完成类的注册

```shell
$ composer dumpautoload
```

**使用 Handler**

将错误监听修改为自定义的错误监控类

```php
// storage/bootstrap/app.php
$app->singleton(
	Illuminate\Contracts\Debug\ExceptionHandler::class,
	Misc\Http\Foundation\Handler::class
);
```

这样便可以注册并收到异常

因为框架在注册异常之前需要知晓异常类的位置, 否则出现异常的时候无法进行异常报错

> 2021/09/27 15:38:44 [error] 46887#0: *12 FastCGI sent in stderr: "PHP message: PHP Fatal error: Uncaught ReflectionException: Class Miscdoes not exist in /Users/duoli/Documents/workbench/dl.wulicode/poppy/vendor/laravel/framework/src/Illuminate/Container/Container.php:803



