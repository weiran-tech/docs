---
description: '本文档阐述了路由与控制器的加载机制，包括加载流程图、分组模式、路由位置、路由文件名称、子路由位置和路由命名规则，以及控制器的定义方式。'
lastUpdated: '2026-06-22 17:37:45'
head:
  - - meta
    - name: 'og:title'
      content: '路由控制器'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档阐述了路由与控制器的加载机制，包括加载流程图、分组模式、路由位置、路由文件名称、子路由位置和路由命名规则，以及控制器的定义方式。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/route-controller.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/25c007e9fe64302bac1adef86d38ee91.png'
---
# 路由控制器

## 加载机制

### 加载流程图

![](https://file.wulicode.com/feishu-images/25c007e9fe64302bac1adef86d38ee91.png)

### 分组模式

| 文件名 | 前缀 | 备注 |
|-|-|-|
| front.php | front\_ | 网站前台 |
| desktop.php | dsk\_ | 网站后台 |
| api.php | api\_ | app /接口部分 |
| develop.php | dev\_ | 开发者平台 |
| wap.php | wap\_ | wap 端 |
| support.php | support\_ | 公用的支持类函数 |

## 路由

### 路由位置

`~/app/Http/routes.php`

### 路由文件名称

`routes.php` 是框架加载路由的入口文件

### 子路由位置

目录 \~/app/Http/Routes/

### 路由命名规则

路由命名的基本规则是 `前缀` + `控制器蛇形写法` + `.` + `方法名的蛇形写法` 例如：

```Plaintext
Route::group([
    'namespace' => 'Front',
], function () {
    # 这里的路由命名是 front_test.show  front_ + test + . + show
    Route::controller('test', 'TestController', [
        # 方法名          # 路由的名称
        'getShow'         => 'front_test.show',
    ]);
});
```

## 控制器

### 控制器定义

- 控制器位置位于 `～/app/Http/Controllers/` 目录下
- 控制器命名采用分组模式， 首字母大写
- 路由名称和控制器名称匹配