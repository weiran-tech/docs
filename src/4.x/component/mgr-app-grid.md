---
description: 'Grid 是项目的数据展示工具, 各个部件如下所示编写方式支持两种, 一种是单文件的方式, 就是将文件的内容按照约定填写到指定的列表中, 使用起来更加独立, 另外一种就是小的列表写入到单个控制器中使用起来更加灵活列显示的渲染操作 Action 是触发全局动作, 参考 Action 部分有些情况下单模型或者简单模型的查询不会满足要求或者数据量过大导致性能异常, 这里扩展出来一个类 QueryCustom 进行自定义查询以下模型的几个方法说明如下获取的数据即可用于行内编辑获取组件用于导出数据时候批量读取数据用于在读取数据的时候引用查询对象和查询列数据'
lastUpdated: '2024-01-29 18:57:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'MgrApp Grid'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Grid 是项目的数据展示工具, 各个部件如下所示编写方式支持两种, 一种是单文件的方式, 就是将文件的内容按照约定填写到指定的列表中, 使用起来更加独立, 另外一种就是小的列表写入到单个控制器中使用起来更加灵活列显示的渲染操作 Action 是触发全局动作, 参考 Action 部分有些情况下单模型或者简单模型的查询不会满足要求或者数据量过大导致性能异常, 这里扩展出来一个类 QueryCustom 进行自定义查询以下模型的几个方法说明如下获取的数据即可用于行内编辑获取组件用于导出数据时候批量读取数据用于在读取数据的时候引用查询对象和查询列数据'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/component/mgr-app-grid.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/38/38e242839636bef17b4522bd4da0b2f8.png?x-oss-process=image/resize,m_mfit,w_400'
---
# MgrApp Grid



Grid 是项目的数据展示工具, 各个部件如下所示

![](https://file.wulicode.com/notion/38/38e242839636bef17b4522bd4da0b2f8.png)

## 编写

编写方式支持两种, 一种是单文件的方式, 就是将文件的内容按照约定填写到指定的列表中, 使用起来更加独立, 另外一种就是小的列表写入到单个控制器中使用起来更加灵活

### 单文件方式

```php
use Poppy\MgrApp\Classes\Filter\FilterPlugin;
use Poppy\MgrApp\Classes\Grid\GridBase;
use Poppy\MgrApp\Classes\Grid\Tools\Interactions;
use Poppy\MgrApp\Classes\Table\Render\GridActions;
use Poppy\MgrApp\Classes\Table\TablePlugin;

class GridLayout extends GridBase
{
    public string $title = '布局';

    /**
     * @inheritDoc
     */
    public function table(TablePlugin $table)
    {
        // 自定义样式
        $table->add('id', 'ID')->quickId()->sortable();
        $table->add('title', '标题');
        $table->add('user.nickname', 'Nickname(联合查询)')->quickTitle();
        $table->add('created_at')->quickDatetime();
        $table->add('handle', '操作')->asAction(function (GridActions $actions) {
            $actions->quickIcon();
            $row = $actions->getRow();
            $actions->request('错误', route('demo:api.grid.request', ['error']))->icon('Close')->danger();
            $actions->request('成功', route('demo:api.grid.request', ['success']))->icon('Check')->success();
            $actions->request('确认', route('demo:api.grid.request', ['success']))->confirm()->icon('QuestionFilled')->warning();
            $actions->request('Disabled', route('demo:api.grid.request', ['success']))->disabled()->icon('Minus');
            $actions->page('页面', route('demo:api.form.auto', ['field-color']), 'form')->icon('Edit')->info();
            $actions->copy('复制', '复制自定义的内容' . $row['id']);
        })->quickIcon(6);
    }


    /**
     * @inheritDoc
     */
    public function filter(FilterPlugin $filter)
    {
        $filter->action(6, true);
        $filter->like('title', '标题')->width(4);
    }

    public function quick(Interactions $actions)
    {
        $actions->page('快捷操作', route('demo:api.form.auto', ['field-color']), 'form')->icon('Plus');
    }

    public function batch(Interactions $actions)
    {
        $actions->request('批量操作', route('demo:api.grid.request', ['success']));
    }
}
```

### 控制器方式

```php
// 第一列显示id字段，并将这一列设置为可排序列
$grid = new GridWidget(new QueryDemoWebapp());
$grid->table(function (TablePlugin $table) {
    $table->add('id', 'ID');
    $table->add('title', '标题');
});
$grid->batch(function (Interactions $actions) {
    $actions->request('批量删除', '');
});
$grid->quick(function (Interactions $actions) {
    $actions->page('添加', '', 'form');
});
$grid->filter(function (FilterPlugin $filter) {
    $filter->gt('status', '状态')->asText();
});
return $grid->resp();
```

## Filter

> 表的搜索工具

## Batch

> 对数据的批处理

## Render

列显示的渲染

## Action

操作 [Action](about:blank#action) 是触发全局动作, 参考 Action 部分

```php
$table->add('handle', '操作')->asAction(function (ActionsRender $actions) {
    $actions->request('成功', route('demo:api.mgr_app.grid_request', ['success']));
    $actions->page('页面', route('demo:api.mgr_app.grid_form', ['detail']), 'form');
    $actions->target('Target(百度)', 'https://www.baidu.com');
});
```

## 模型 Model

![](https://file.wulicode.com/notion/5c/5c07261260c8d225717876f375cc2aec.png)

有些情况下单模型或者简单模型的查询不会满足要求或者数据量过大导致性能异常, 这里扩展出来一个类  `QueryCustom`  进行自定义查询

```php
class QueryDemoWebapp extends QueryCustom
{

    public function get(): Collection
    {
        // 参数
        $params = $this->params;
        $Object = DemoWebapp::whereRaw('id % 3 =0');
        // 总数
        $this->total = $Object->count();
        // 返回自定义的数据
        return $Object->take($this->pagesize)->offset($this->pageOffset)->get();
    }
}
```

以下模型的几个方法说明如下

### get

获取的数据即可

### edit

用于行内编辑

### getPrimaryKey

获取组件

### chunk

用于导出数据时候批量读取数据

### prepare

用于在读取数据的时候引用查询对象和查询列数据

