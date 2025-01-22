---
description: '提供便捷的分类管理, 分类管理支持分类类型, 项目中默认存在一个 default 类型, 其他的类型自行定义当分类删除的时候会触发一个 SysCategoryBeforeDeleteEvent(SysCategory $item) 事件, 用于分类的引用拦截页面引用当需要新建一个类别的时候直接引入一个地址是最为方便的, 可以传递 _hide=scope 来隐藏分类数据例如 : mgr-page/py-category/category?_scope=default&_hide=scope 展示出来的界面如下路由访问地址 route_url(py-category:'
lastUpdated: '2025-01-23 00:24:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Category(分类管理)'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '提供便捷的分类管理, 分类管理支持分类类型, 项目中默认存在一个 default 类型, 其他的类型自行定义当分类删除的时候会触发一个 SysCategoryBeforeDeleteEvent(SysCategory $item) 事件, 用于分类的引用拦截页面引用当需要新建一个类别的时候直接引入一个地址是最为方便的, 可以传递 _hide=scope 来隐藏分类数据例如 : mgr-page/py-category/category?_scope=default&_hide=scope 展示出来的界面如下路由访问地址 route_url(py-category:'
  - - meta
    - name: 'og:url'
      content: 'https://www.weiran.tech16449524-d1e0-8199-9ed5-f60802645580.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/f4/f4a2ea67ba6a494e0b0f276575bf6f03.png?x-oss-process=image/resize,m_mfit,w_400'
---
# Category(分类管理)



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

例如 :  `mgr-page/py-category/category?_scope=default&_hide=scope`  展示出来的界面如下

![](https://file.wulicode.com/notion/f4/f4a2ea67ba6a494e0b0f276575bf6f03.png)

路由访问地址  `route_url('py-category:backend.category.index', null, ['_scope'=>'default', '_hide' => 'scope'])`

**钩子引用**

内置钩子和参数用于引用分类, 该钩子为树形选择类型

![](https://file.wulicode.com/notion/47/47d972d2af06c28abf94dd7fb86b9b2f.png)

```
name : poppy.category.form_category_select
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

