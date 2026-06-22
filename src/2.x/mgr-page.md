---
description: '根据后台访问模块开发流程，依次创建模型、完成字段映射、生成缓存、创建控制器、定义路由、加入菜单组、创建模板，最终实现数据的显示。'
lastUpdated: '2026-06-22 13:44:26'
head:
  - - meta
    - name: 'og:title'
      content: '后台访问模块'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '根据后台访问模块开发流程，依次创建模型、完成字段映射、生成缓存、创建控制器、定义路由、加入菜单组、创建模板，最终实现数据的显示。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/mgr-page.html'
---
# 后台访问模块

## 创建模型

在 `~/app/Models/` 下创建模型类 - 继承Eloquent类，类名和表明相同并且遵循驼峰命名法，按照表名的格式命名 - 需要写表名`$table`,主键`$primaryKey`和填充字段数组`$fillable`(三者都是`protected`类型)

## 完成字段映射

参见字段映射文件

## 生成缓存

## 创建控制器

在 `~/app/Http/Controllers/` 相应app模块分组(`Desktop`,`Front`等) 下创建控制器类

- 遵循命名空间规则
- 类名遵循驼峰命名法,根据表名+Controller命名 如：表名为base_banword ,控制器名BaseBanwordController
- 方法名遵循驼峰命名法，根据提交方式前面加get或post
- 分配到模板用 `view()` 函数，返回值用`return $this->end()`来返回信息

## 路由定义

在 `~/app/Http/Routes/` 分组对应文件 增加路由定义

文件 `desktop.php`

```Plaintext
Route::controller('dsk_app_version', 'AppVersionController', [
    'getIndex'    => 'dsk_app_version.index',
    'getCreate'   => 'dsk_app_version.create',
    ...
    'postDestroy' => 'dsk_app_version.destroy',
]);
```

## 加入菜单组

在 `~/app/Lemon/Suit/Acl` 相应app模块分组下创建菜单组文件

- 文件名根据路由命名 `dsk_app_version.php` 例如:

```Plaintext
return [
    'title'     => 'App版本管理',
    'route'     => 'dsk_app_version',
    'operation' => [
        'index' => [
            'title' => '版本管理',
            'menu'  => true,
        ],
    ]
];
```

在 `~/app/Lemon/Suit/Acl` 下的相应分组文件里加入菜单代码 例如:

```Plaintext
'app' => [
    'title'  => 'App 管理',
    'param'  => '',
    'group' => [
        'dsk_app_version',
    ],
],
```

## 创建模板, 显示数据

在 `~/resources/views/app`相应分组 / 下创建模型文件夹， - 模型文件夹和表名相同 - 模板文件命名 功能名.blade.php - 模板使用 Laravel 的 `blade` 语法