---
description: '该分类管理支持分组、name映射、启用禁用和删除操作。删除时会触发SysCategoryBeforeDeleteEvent事件以拦截引用。页面引用可通过直接访问地址并传递hide=scope来隐藏分类数据，也支持路由和钩子引用，提供树形选择类型。'
lastUpdated: '2026-06-25 19:26:17'
head:
  - - meta
    - name: 'og:title'
      content: 'Category(分类管理)'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该分类管理支持分组、name映射、启用禁用和删除操作。删除时会触发SysCategoryBeforeDeleteEvent事件以拦截引用。页面引用可通过直接访问地址并传递hide=scope来隐藏分类数据，也支持路由和钩子引用，提供树形选择类型。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/component/category.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/94c2811708da56821eaaf6c752ce776f.png'
---
# Category(分类管理)

提供便捷的分类管理, 分类管理支持

- 分组(分组在配置中定义)
- name 映射, 用于通过 name 获取到分类 ID
- 启用禁用, 删除管理

## 配置

分类类型, 项目中默认存在一个 default 类型, 其他的类型自行定义

```PHP
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

当分类删除的时候会触发一个 `SysCategoryBeforeDeleteEvent(SysCategory $item)` 事件, 用于分类的引用拦截

## 引用

**页面引用**

当需要新建一个类别的时候直接引入一个地址是最为方便的, 可以传递 `_hide=scope` 来隐藏分类数据

例如 : `mgr-page/py-category/category?_scope=default&_hide=scope` 展示出来的界面如下

![](https://file.wulicode.com/feishu-images/94c2811708da56821eaaf6c752ce776f.png)

路由访问地址 `route_url('py-category:backend.category.index', null, ['_scope'=>'default', '_hide' => 'scope'])`

**钩子引用**

内置钩子和参数用于引用分类, 该钩子为树形选择类型

![](https://file.wulicode.com/feishu-images/b4d59dbdc1fc74d32b4806042ede58d5.png)

```Plaintext
name : poppy.category.form_category_select
params:
    - type : 类别
```

在 form 中引用

```PHP
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

```Plaintext
{!! sys_hook($service, [
    'type' => 'default',
    'name' => 'category_id',
    'value' => $value
]) !!}
```