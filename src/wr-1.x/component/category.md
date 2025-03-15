---
description: '提供便捷的分类管理, 分类管理支持分类类型, 项目中默认存在一个 default 类型, 其他的类型自行定义当分类删除的时候会触发一个 SysCategoryBeforeDeleteEvent(SysCategory $item) 事件, 用于分类的引用拦截页面引用当需要新建一个类别的时候直接引入一个地址是最为方便的, 可以传递 _hide=scope 来隐藏分类数据例如 : mgr-page/weiran-category/category?_scope=default&_hide=scope 展示出来的界面如下路由访问地址 route_url(py-categ'
lastUpdated: '2025-03-15 13:36:00'
head: 
  - - meta
    - name: 'og:title'
      content: '[WIP] Category(分类管理)'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '提供便捷的分类管理, 分类管理支持分类类型, 项目中默认存在一个 default 类型, 其他的类型自行定义当分类删除的时候会触发一个 SysCategoryBeforeDeleteEvent(SysCategory $item) 事件, 用于分类的引用拦截页面引用当需要新建一个类别的时候直接引入一个地址是最为方便的, 可以传递 _hide=scope 来隐藏分类数据例如 : mgr-page/weiran-category/category?_scope=default&_hide=scope 展示出来的界面如下路由访问地址 route_url(py-categ'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/component/category.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/15/154b9d3cac5ef58f3a48a7e844f0a54b.png?x-oss-process=image/resize,m_mfit,w_400'
---
# [WIP] Category(分类管理)



提供便捷的分类管理, 分类管理支持

- 分组(分组在配置中定义)
- name 映射, 用于通过 name 获取到分类 ID
- 启用禁用, 删除管理

## 配置

分类类型, 项目中默认存在一个 default 类型, 其他的类型自行定义

```php
// config/poppy.php
[
    'category' => [
        'types' => [
            [
                'type'  => 'steam-pubg',
                'title' => 'STEAM(Pubg)',
            ],
        ],
    ],
]
```

## 事件

当分类删除的时候会触发一个  `SysCategoryBeforeDeleteEvent(SysCategory $item)`  事件, 用于分类的引用拦截

## 引用

**页面引用**

当需要新建一个类别的时候直接引入一个地址是最为方便的, 可以传递  `_hide=scope`  来隐藏分类数据

例如 :  `mgr-page/weiran-category/category?_scope=default&_hide=scope`  展示出来的界面如下

![](https://file.wulicode.com/notion/15/154b9d3cac5ef58f3a48a7e844f0a54b.png)

路由访问地址  `route_url('py-category:backend.category.index', null, ['_scope'=>'default', '_hide' => 'scope'])`

**钩子引用**

内置钩子和参数用于引用分类, 该钩子为树形选择类型

![](https://file.wulicode.com/notion/18/183905c5ec140982e6fa0f180350e9ca.png)

```
name : weiran.category.form_category_select
params:
    - type : 类别
```

在 form 中引用

```php
class FormHook extends FormBaseWidget
{
    public function form(): void
    {
        $this->hook('category_id', '选择类别')->service('poppy.category.form_category_select', [
            'type' => 'default'
        ]);
    }
}
```

在 html 中引用

```
{!! sys_hook($service, [
    'type' => 'default',
    'name' => 'category_id',
    'value' => $value
]) !!}
```

