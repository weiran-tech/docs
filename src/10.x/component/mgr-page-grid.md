---
description: '单文件列表是基于快速模型的列表展现方式, 支持以下几个部分单文件列表的创建, 单文件列表继承自 Poppy\MgrPage\Classes\Grid\ListBase, 如下在控制器中使用 :列是数据展示的定义, 对于列支持项目我们对于列支持多种快捷方式以下对于列进行简要的说明添加列操作列操作的类型对于列操作都有一些通用的设定项下拉列表用于在页面内生成下拉列表, 并设置当前显示数据的颜色Iframe对于模型的快速搜索条件快捷操作用于列表右上角, 在列表的右上角, 例如新增, 设置等使用场景批量操作在列表左上方, 便于批量操作数据'
lastUpdated: '2025-01-23 00:25:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'MgrPage - 动态表格'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '单文件列表是基于快速模型的列表展现方式, 支持以下几个部分单文件列表的创建, 单文件列表继承自 Poppy\MgrPage\Classes\Grid\ListBase, 如下在控制器中使用 :列是数据展示的定义, 对于列支持项目我们对于列支持多种快捷方式以下对于列进行简要的说明添加列操作列操作的类型对于列操作都有一些通用的设定项下拉列表用于在页面内生成下拉列表, 并设置当前显示数据的颜色Iframe对于模型的快速搜索条件快捷操作用于列表右上角, 在列表的右上角, 例如新增, 设置等使用场景批量操作在列表左上方, 便于批量操作数据'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/10.x/component/mgr-page-grid.html'
---
# MgrPage - 动态表格



## 单文件列表

单文件列表是基于快速模型的列表展现方式, 支持以下几个部分

- 标题
- 列, 列操作
- 快捷操作
- 批量操作

单文件列表的创建, 单文件列表继承自  `Poppy\MgrPage\Classes\Grid\ListBase` , 如下

```php
<?php

use Poppy\MgrPage\Classes\Grid\ListBase;

class ListSysSensitiveWord extends ListBase
{

}

```

在控制器中使用 :

```php
<?php

declare(strict_types = 1);

namespace Poppy\SensitiveWord\Http\Request\Backend;

use Poppy\MgrPage\Classes\Grid;
use Poppy\MgrPage\Http\Request\Backend\BackendController;
use Poppy\SensitiveWord\Http\MgrPage\ListSysSensitiveWord;
use Poppy\SensitiveWord\Models\SysSensitiveWord;

/**
 * 敏感词控制器
 */
class WordController extends BackendController
{
    /**
     * 列表
     */
    public function index()
    {
        return (new Grid(new SysSensitiveWord()))
            ->setLists(ListSysSensitiveWord::class)
            ->render();
    }
}

```

## 添加列

列是数据展示的定义, 对于列支持项目我们对于列支持多种快捷方式

```php
class ListSysSensitiveWord extends ListBase
{

    public $title = '敏感词';

    public function columns()
    {
        $this->column('id', "ID")->sortable()->width(80);
        $this->column('word', "敏感词");
        $this->addColumn(Column::NAME_ACTION, '操作')->displayUsing(Actions::class, [function (Actions $actions) {
            /** @var SysSensitiveWord $item */
            $item = $actions->row;
            $actions->request('删除', route('py-sensitive-word:backend.word.delete', [$item->id]))->icon('bi:trash')->danger();
        },
        ])->width(70)->fixed();
    }
}

```

以下对于列进行简要的说明

```php
$this->column('id', 'ID')    // 设定字段和标题
    ->sortable()             // 设定列支持排序
    ->width(80)              // 设置列宽
    ->fixed()                // 是否固定列

```

## 列操作

添加列操作

```php
$this->addColumn(Column::NAME_ACTION, '操作')->displayUsing(Actions::class, [function (Actions $actions) {
    // 添加 actions 的动作
}

```

**列操作的类型**

```php
request()      // 请求
iframe()       // 页面弹窗
page()         // 另外一个页面打开
dropdown()     // 下拉操作方式
copy()         // 复制

```

对于列操作都有一些通用的设定项

```php
$action
    ->bare()          // 素颜, 不进行样式修饰
    ->primary()       // 主要
    ->normal()        // 默认
    ->warm()          // 暖色
    ->danger()        // 危险
    ->disabled()      // 禁用
    ->default()       // 默认

    ->lg()            // 大型
    ->sm()            // 小型
    ->xs()            // 迷你

    ->round()         // 圆角
    ->only()          // 仅仅显示图标

    ->icon()          // 指定图标, 默认支持 bootstrap icon, 如果想使用 layui 图标加入 lay: 前缀, 不建议使用 fa 字体图标(5.0 会移除)
    ->plain()         // 无背景, 仅仅有边线样式
    ->fluid()         // 流体样式(充满)

    ->confirm()       // 确认操作框可以填充提示语
    ->tooltip()       // 鼠标滑过之后的提示语

```

**下拉列表**

用于在页面内生成下拉列表, 并设置当前显示数据的颜色

```php
$actions
    // 可设定下拉菜单
    ->dropdown('下拉框 Danger', function (Operations $operations) {
        $operations->request('请求1', DemoDef::REQ_SUCCESS_RELOAD);
        $operations->request('弹窗 1', DemoDef::IFRAME_INBOX_NONE);
    })
    // 设置下拉菜单的颜色
    ->color('danger');

```

**Iframe**

```php
$actions->iframe('弹窗打开', DemoDef::IFRAME_INBOX_NONE)
    ->width(428)      // 可设定宽度
    ->height(428);    // 可设定高度

```

## 筛选器

对于模型的快速搜索条件

```php
<?php

declare(strict_types = 1);

class ListSysSensitiveWord extends ListBase
{

    public function filter(): Closure
    {
        return function (Filter $filter) {
            $filter->column(1 / 12, function (Filter $column) {
                $column->like('word', '敏感词');
            });
        };
    }
}

```

## 快捷操作

快捷操作用于列表右上角, 在列表的右上角, 例如新增, 设置等使用场景

```php
<?php

declare(strict_types = 1);

class ListSysSensitiveWord extends ListBase
{

    public function batchAction(): Closure
    {
        return function (Operations $operations) {
            $operations->toolbarDelete(route_url('py-sensitive-word:backend.word.delete'));
        };
    }
}

```

## 批量操作

批量操作在列表左上方, 便于批量操作数据

```php
<?php

declare(strict_types = 1);

class ListSysSensitiveWord extends ListBase
{
    public function batchAction(): Closure
    {
        return function (Operations $operations) {
            $operations->toolbarDelete(route_url('py-sensitive-word:backend.word.delete'));
        };
    }
}
```

