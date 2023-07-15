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

当分类删除的时候会触发一个 `SysCategoryDeleteEvent(SysCategory $item)` 事件, 用于分类的引用拦截

## 引用

**页面引用**

当需要新建一个类别的时候直接引入一个地址是最为方便的, 可以传递 `_hide=scope` 来隐藏分类数据

例如 : `mgr-page/py-category/category?_scope=default&_hide=scope` 展示出来的界面如下

![](https://file.huowanes.com/doc/20230715/1689385337172.png)

**钩子引用**

内置钩子和参数用于引用分类, 该钩子为树形选择类型

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