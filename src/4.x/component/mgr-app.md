---
description: '该文档介绍了前端框架的安装、开发与集成流程，涵盖数据管理、路径配置及多种组件（如Action、Dashboard、Form、Table、Cascader等）的使用。详细说明了表单创建方式、表格列编辑与自定义展示、模型操作（如get、edit、getPrimaryKey），以及Scope、PanelForm、Motion等高级功能，旨在帮助开发者快速搭建功能完善的前端应用。'
lastUpdated: '2026-06-25 19:26:10'
head:
  - - meta
    - name: 'og:title'
      content: '⚠️ MgrApp'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该文档介绍了前端框架的安装、开发与集成流程，涵盖数据管理、路径配置及多种组件（如Action、Dashboard、Form、Table、Cascader等）的使用。详细说明了表单创建方式、表格列编辑与自定义展示、模型操作（如get、edit、getPrimaryKey），以及Scope、PanelForm、Motion等高级功能，旨在帮助开发者快速搭建功能完善的前端应用。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/component/mgr-app.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ebb911467b89f0668906b6e0e5f7ac0b.png'
---
# ⚠️ MgrApp

::: warning ⚠️

前后端分离的项目包, 因低代码平台不符合业务逻辑
- 前端部分组合复杂度高
- 后端编写和前端耦合度较高

:::

## 安装

后端需要添加包 `poppy/mgr-app` 当前版本是开发版, 版本是 `4.0.x-dev`, 因为授权返回的地址是有此包支持, 所以需要添加此扩展包

### 前端访问

mgr-app 文件内置在 mgr-page 包的 resources 目录下, 当前是属于开发过程中, 包放置在 [GitHub Release](https://github.com/imvkmark/poppy-dev-mgr-app/releases)

nginx 进行如下配置

*mgr-app.conf*

```Plaintext
server {
    listen 9101;
    server_name localhost;
    index index.html;
    root /path/of/mgr-app;

    location / {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        try_files $uri $uri/ /index.html?$query_string;
    }

    access_log off;
    error_log off;
}
```

*domain.conf*

```Plaintext
server {
    # ...
    location /mgr-app {
        rewrite "mgr-app/(.*)" /$1 break;
        proxy_pass http://127.0.0.1:9101;
    }
    # ...
}
```

如果需要自定义目录, 从源码编译并自行配置包目录即可

### 开发

数据准备

```Plaintext
# demo 集成
$ php artisan poppy:migrate module.demo

# 创建数据
$ php artisan poppy:seed module.demo --class='\Demo\Database\Seeds\DemoWebappDatabaseSeeder'
$ php artisan poppy:seed module.demo --class='\Demo\Database\Seeds\DemoUserDatabaseSeeder'

# 还原数据
$ php artisan poppy:migrate:rollback
```

### 路径配置

路径是生成前端所用导航的入口文件, 告诉前端如何加载数据, 渲染页面, 文件位于 `modules/{module}/configurations/path.yaml`

```YAML
# [1]
backend:
    # [2]
    default:
        title: 菜单
        # [3]
        icon: picture-rounded
        # [4]
        children:
            - title: 分组
              children:
                  - title: 链接
                    # {type}/{route}/{route_params|explode by ,}/{query|gen_key}
                    path: form/demo:api.mgr_app.form/field-textarea
```

**[1]类型** backend 代表和用户类型想匹配的定义, 分为 user/develop/backend 三种

**[2]注入** 这里的 KEY 作为注入项目 module.demo/backend||default, 可以将配置注入到这个地方, 例如在 mgr-page 模块下存在 key `backend.setting` 这个 key, 我们使用 injection 可以将模块配置注入到另外一个模块中达到不同的导航菜单的功能, 对于模块之间的顺序, 我们可以通过模块 `manifest.json` 文件中的 `order` 字段来进行定义, 按照从小到大的顺序进行排列

```YAML
backend:
    area:
        title: 地区管理
        # 将当前模块下所有 children 追加到指定key 的 children 中
        injection: "poppy.mgr-app/backend||setting"
        children:
            - title: 地区管理
              children:
                  - title: 地区管理
                    path: grid/py-area:api-backend.content.index
                    permission: "backend:py-area.main.manage"
```

**[3]图标**

图标我们使用 [element-plus 图标库](https://element-plus.org/zh-CN/component/icon.html), 图标名称格式支持 `kebab-case` 和 `CamelCase` 命名, 例如 `CircleCheck` 图标, 我们也可以写为 `circle-check`

**[4]菜单** 对于以上层级我们进行如下定义

```Plaintext
导航 : 在顶部作为主导航
分组 : 对链接进行分组
链接 : 可以更改路由地址的链接
```

**[5]链接**

链接的组成规范

```Plaintext
form   / demo:api.mgr_app.form / field-textarea / name|my
{type} / {route}               / {route_params} / {query}
```

- type : 链接支持的格式, form : 表单, setting : 设置, grid : 列表
- route : 路由, 通过 Laravel 定义的路由
- route_params : 路由参数, 使用 , 分隔
- query : 使用 `\Poppy\Framework\Helper\ArrayHelper::genKey()` 方式把字串解析成数组

# 组件

## Action

项目中的操作项, 操作可分为 `request(请求)`, `page(页面)`, `copy(复制)`, `progress(进度)`, \`\`

### 基本样式

```PHP
$action
    // 弹出确认弹窗
    ->confirm()
    // 设置图标
    // 完整图标地址 : https://element-plus.org/zh-CN/component/icon.html#图标集合
    ->icon('Close') // 设置图标名称
    ->only()        // 设置是否仅仅显示图标
    // 设置风格
    ->primary()    // 主题样式
    ->default()    // 默认
    ->success()    // 成功
    ->info()       // 信息
    ->warning()    // 警告
    ->danger()     // 危险
    ->disabled()   // 禁用
    // 朴素样式
    ->plain()
    // 文本样式
    ->link()
    // 圆形图标
    ->circle()
```

### 图标

对于操作的图标,我们支持两种类型

1. [ElementIcon](https://element-plus.org/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88)

使用 ElementUI 的图标需要填入指定的名称即可

```PHP
$action->icon('Bell')
```

1. [Material Symbols](https://fonts.google.com/icons?selected=Material+Icons&icon.style=Outlined&icon.set=Material+Symbols)

使用 Material 图标, 需要选择 MaterialSymbols 图标, 为了样式实现简约, 只能使用 Outline 样式图标, 为了区分不同的图标库, 需要在图标前加上前缀 `mu:`

这里的图标名称需要填写图标的蛇形写法, 在图标详情中可以查询到

```PHP
$action->icon('mu:notifications')
```

### 使用场景

**Grid 表格**

```PHP
class GridTableActions extends GridBase
{
    public function table(TablePlugin $table)
    {
        // 添加 Action
        $table->add('handle', '操作')->asAction(function (GridActions $actions) {
            // 获取单行数据
            $row = $actions->getRow();
            $actions->request('错误', route('demo:api.mgr_app.grid_request', ['error']));
            $actions->page('页面', route('demo:api.mgr_app.grid_form', ['detail']), 'form');
            $actions->copy('复制', '复制自定义的内容' . $row['id']);
        });
    }
}
```

**Grid 操作**

```PHP
class GridLayout extends GridBase
{
    public string $title = '布局';

    public function quick(Interactions $actions)
    {
        $actions->page('快捷操作', route('demo:api.mgr_app.grid_form', ['detail']), 'form')->icon('Plus');
    }

    public function batch(Interactions $actions)
    {
        $actions->request('批量操作', route('demo:api.mgr_app.grid_request', ['success']));
    }
}
```

### request

Ajax 请求

对服务器发起一个 ajax 请求, 并根据服务端返回内容进行前端页面的操作, 这里根据服务端的返回触发全局 Motion, 操作返回的 data 的数据作为 Motion 数据

```PHP
$actions->request('成功', route('demo:api.mgr_app.grid_request', ['success']));
```

### page

以内部页面方式打开指定类型数据

使用侧边栏方式打开一个页面, 当前支持 `form`, `grid` 两种数据内容

```PHP
$actions->page('页面', route('demo:api.mgr_app.grid_form', ['detail']), 'form');
```

### dialog

使用对话框的形式来打开一个页面, 当前支持 `form`, `grid` 两种数据内容

```PHP
$actions->dialog('页面', route('demo:api.mgr_app.grid_form', ['detail']), 'form');
```

### copy

复制自定义数据

复制按钮, 点击此按钮可已复制自定义的数据

```PHP
$actions->copy('复制', '复制自定义的内容' . $row['id']);
```

### target

在新窗口打开链接

新窗口打开, 打开自定义的链接地址

```PHP
$actions->target('Target(百度)', 'https://www.baidu.com');
```

### iframe

在当前窗口打开对话框, 对话框中展示允许嵌入的 iframe

```PHP
$actions->iframe('Iframe', 'https://poppy-framework.com/');
```

## Dashboard

Dashboard 意思是仪表盘, 目的是集中多个部分放到一个页面中进行展示, 可用于不同 `scope` 之间的配置和主页仪表盘

![](https://file.wulicode.com/feishu-images/ebb911467b89f0668906b6e0e5f7ac0b.png)

类之间的关系如下

![](https://file.wulicode.com/feishu-images/d038455d7c9581c3d0b3b31a9a3b0b85.png)

`Dashboard` 是仪表板, `Panel` 定义为仪表盘的部件

### 使用

**定义路径**

这里的 url 类型是 `dashboard`

```YAML
- title: 表单仪表盘
  path: dashboard/demo:api.mgr_app.dashboard/form
```

**定义控制器**

```PHP
class DashboardController {
    public function form()
    {
        $dashboard = new DashboardForm();
        return $dashboard->resp();
    }
}
```

**定义仪表盘**

```PHP
/**
 * 表单仪表盘
 */
class DashboardForm extends DashboardWidget
{

    // 标题
    public string $title = '仪表盘';

    public function __construct()
    {
        parent::__construct();
        // 定义 Scope
        $this->scope('test', 'TEST');
        $this->scope('mark', 'Mark');
    }

    // 定义仪表盘面板
    public function panels(): array
    {
        // 获取当前的Scope
        $scope = $this->getCurrentScope();

        // 定义面板
        $form1 = (new PanelForm('site', 12))->form(function (FormPlugin $form) use ($scope) {
            $form->text($scope->value . ':Title', $scope->label . '标题')->rules([
                Rule::required(),
            ]);
        })->handle(function ($data) {
            return Resp::success('返回成功' . var_export($data, true));
        });
        return [$form1];
    }
}
```

### Scope

Scope 定义为 Dashboard 分类, 根据不同的类型区分不同的仪表盘的数据展示, 这里引用的是 trait `\Poppy\MgrApp\Classes\Traits\UseScopes` , 提供的方法有

```PHP
trait UseScopes
{

    /**
     * 添加全局范围, 在添加全局范围之后, 如果不传入 Scope, 则默认为第一个 Scope
     */
    public function scope(string $key, string $label)

    /**
     * 范围结构
     * @return Collection
     */
    public function getScopesStruct(): Collection

    /**
     * 获取当前的Scope,
     * 支持未传入
     */
    public function getCurrentScope(): ?Scope
}
```

### PanelForm

表单面板, 定义为表单提交类型

```PHP
// 定义标题以及宽度
(new PanelForm('site', 12))
    // 定义表单项目, 这里的类型和 Form 一致
    ->form(function (FormPlugin $form) {
        $form->text('Title', '标题')->rules([
            Rule::required(),
        ]);
    })
    // 定义表单数据接收的处理方式
    ->handle(function ($data) {
        return Resp::success('返回成功' . var_export($data, true));
    });
```

## Setting

设置用于支持分组的配置

## Motion

> Motion 用于触发全局的动作, 使用后端返回内容来用于前端的不同操作

编写: Motion 使用 Resp 返回 Motion 格式如下, 如果使用 Resp 返回, 则也可使用 kv 方式来编写 `motion|grid:reload;time|200`

解析之后的对象如下所示

```JavaScript
{
        motion: "grid:reload";
        time: 200;
        path: "";
}
```

设置用于在表单中加入操作, 在 Grid 渲染中加入操作, 批处理, 表单的快速操作

参数说明

**motion** : 全局操作

- `grid:reload` 加载当前请求条件下的数据
- `grid:reset` 请求搜索条件并重置到第一页
- `grid:filter` 更新请求条件
- `window:reload` 刷新当前页面

**time** : 等待时长来执行函数, 单位(ms) **path** : 匹配路径 当页面中存在多个组件的时候, 组件的请求地址是不同的, 可以根据请求路径的 path 来判定是否允许更新, path 不存在时候不进行限制

为了项目中方便使用, 已经对 Motion 进行了封装

```PHP
Motion::windowReload()
Motion::gridFilter()
Motion::gridReset()
Motion::gridReload()
```

# Form

表单支持对数据的创建以及编辑

## 创建表单

### 继承方式

表单继承了 `FormWidget`

```PHP
class FormBanEstablish extends FormWidget
{
    // 设置标题
    protected string $title = '新增';

    // 获取路由参数或者 Query 参数用于初始化
    public function __construct()
    {
        parent::__construct();
        $this->id = Route::input('id');
    }

    // 对数据的处理, 这里的执行在表单验证过之后触发
    public function handle()
    {
        $scope                 = input(Scope::QUERY_NAME);
        $input                 = input();
        $input['account_type'] = $scope;

        $Ban = new Ban();
        if (!$Ban->establish($input)) {
            return Resp::error($Ban->getError());
        }

        return Resp::success('操作成功', 'motion|grid:reload');
    }

    // 返回模型数据
    public function data(): array
    {
        if ($this->id) {
            $pam = PamBan::findOrFail($this->id);
            return Arr::pluck($pam, ['type', 'value', 'note']);
        }
        return [];
    }

    // 定义表单
    public function form()
    {
        $this->select('type', '类型')->options(PamBan::kvType())->rules([
            Rule::required()
        ]);
        $this->text('value', '限制值')->rules([
            Rule::required()
        ])->help("如果是Ip支持如下几种格式 :  固定IP(192.168.1.1) ; IP段 : (192.168.1.1-192.168.1.21);  IP 掩码(192.168.1.1/24); IP 通配符(192.168.1.*)");
        $this->text('note', '备注');
    }
}
```

### 简易方式

简易方式是允许在控制器中编写定义, 从而简化编写 form 的方式

```PHP
$form = new FormWidget();
$form->text('name', '姓名');
$form->data([
    'name' => '多厘',
]);
$form->on(function () {
    return Resp::error(var_export(input(), true));
});
return $form->resp();
```

## 分组方式

对于模型中有些数据可能需要多个数据来支持, 根据字段再去拆分结构, 使用 `.` 来进行拆分字段, 这里的渲染和标准的 html 有所不同

```PHP
class FormFieldGroupEstablish extends FormWidget
{

    public function handle(){}

    /**
     */
    public function data(): array
    {
        return [
            'group' => [
                1   => '1-value',
                'a' => 'a-value',
            ],
        ];
    }

    public function form()
    {
        $this->text('group.1', '1Value');
        $this->text('group.a', 'Group Val');
    }
}
```

下面对组件进行相应的介绍, 所有使用方式以以上两种方式为主

## 组件

### Table - 表格

表格组件, 支持行内编辑

```PHP
// 这个表格支持编辑模式
class FormTableEstablish extends FormWidget
{
    // 设置标题
    protected string $title = '表格';

    // 返回模型数据
    public function data(): array
    {
        return [
            'table' => [
                [ 'id'   => 1, 'name' => '多厘',],
                [ 'id'   => 2, 'name' => '晴天',],
            ]
        ];
    }

    // 定义表单
    public function form()
    {
        $this->table('table', '表格')
            // 定义列
            ->cols(function (TablePlugin $table) {
                $table->add('id', 'ID');
                $table->add('name', '用户名');
            });
    }
}
```

### EzTable - 表格预览

表格预览组件仅仅用于渲染数据, 当前支持文字, 图片渲染

```PHP
use Poppy\MgrApp\Classes\Table\EzTable;
// ...
$this->ezTable('ez-table', '表格')->easy([
    ['Header', 'Title', 'Value', '图片'],
    ['网站', '地址', 'https://www.baidu.com', EzTable::image('https://start.wulicode.com/img/428x280/wulicode')],
    ['网站', '名称', '百度'],
]);
// ...
```

### Cascader - 级联选择

级联选择可用于级联选择, 数据返回以数组为主

```PHP
class FormFieldCascaderEstablish extends FormWidget
{
    protected string $title = '级联选择';

    public function handle(){}

    /**
     */
    public function data(): array
    {
        return [
            'province'    => [1],
            'city'        => [3, 35],
            'area'        => [3, 36, 468],
            'area-filter' => [3, 36, 468],
            'area-sub'    => [3, 36],
            'area-lazy'   => [3, 36],
        ];
    }

    public function form()
    {
        // 选择地区
        $this->cascader('province', '地区')->options(SysArea::cascader());
        $this->cascader('city', '城市')->options(SysArea::cascader('city'));

        // 指定宽度
        $this->cascader('area', '地区')->options(SysArea::cascader('area'))->width(300);

        // 指定可筛选
        $this->cascader('area-filter', '地区(可筛选)')->options(SysArea::cascader('area'))->filterable();

        // 开启父选项可选择
        $this->cascader('area-sub', '地区(选择两级)')->options(SysArea::cascader('area'))->width(300)->checkStrictly();

        // 开启多选
        $this->cascader('area-muti', '地区(选择两级)')->options(SysArea::cascader('area'))
            ->width(300)->checkStrictly()->multi();

        // 开启懒加载模式(当前模式下暂时无法恢复数据)
        $this->cascader('area-lazy', '地区(懒加载)')->options(SysArea::cascader('city'))->width(300)->lazy(
            route('demo:api.form.cascader')
        );
        $this->disableReset();
    }
}
```

# Grid

Grid 是项目的数据展示工具, 各个部件如下所示

![](https://file.wulicode.com/feishu-images/21787f7fe2c47923b6f428da90427c9f.png)

## 编写

编写方式支持两种, 一种是单文件的方式, 就是将文件的内容按照约定填写到指定的列表中, 使用起来更加独立, 另外一种就是小的列表写入到单个控制器中使用起来更加灵活

### 单文件方式

```PHP
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

```PHP
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

操作 Action 是触发全局动作, 参考 Action 部分

```PHP
$table->add('handle', '操作')->asAction(function (ActionsRender $actions) {
    $actions->request('成功', route('demo:api.mgr_app.grid_request', ['success']));
    $actions->page('页面', route('demo:api.mgr_app.grid_form', ['detail']), 'form');
    $actions->target('Target(百度)', 'https://www.baidu.com');
});
```

## 模型 Model

![](https://file.wulicode.com/feishu-images/e9f41d3d653addde2055897786d93572.png)

有些情况下单模型或者简单模型的查询不会满足要求或者数据量过大导致性能异常, 这里扩展出来一个类 `QueryCustom` 进行自定义查询

```PHP
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

# Table

列渲染, 列采用如下方式进行列的添加

## 添加列

```PHP
public function table(TablePlugin $table)
{
    $table->add('id', 'ID')->quickId();
}
```

## 设置基础属性

```PHP
public function table(TablePlugin $table)
{
    $table->add('id', 'ID')
        // 定义最小宽度
        ->width(100)
        // 固定最小宽度
        ->width(100, true)
        // 设置展示位置, 默认 left, 可选 [left,center,right]
        ->align('left')
        // 标识列为可排序
        ->sortable()
        // 标识列为可fix 显示, 默认是右侧, 可以设置为 [left, right], 例如操作按钮可固定在右侧展示
        ->fixed('right')
        // 文字显示为一行, 并且多余使用省略号
        ->ellipsis()
        // 纯文本可复制
        ->copyable()
}
```

## 快捷样式

```PHP
public function table(TablePlugin $table)
{
    $table->add('id', 'ID')
        // 渲染为ID, 固定宽度, 并将ID 居中, 普通模式 5位数值, large模式 7 位数字
        ->quickId()
        ->quickId(true)

        // 渲染为标题, 默认显示 15个汉字, large 模式显示 20个汉字左右
        ->quickTitle()
        ->quickTitle(true)

        // 渲染为 Y-m-d h:i:s 宽度并居中
        ->quickDatetime()

        // 定义 Icon 的快捷数量, 宽度根据数量来进行计算
        ->quickIcon($num = 3)
}
```

## 自定义展示

列渲染展示, 添加列若是模型存在的数据, 则原样展示, 如果没有, 或者需要对数据进行组合, 格式化, 可以采用自定义的渲染方式

如果存在 ID, 则展示为 ID

```PHP
$table->add('id', 'ID')
```

如果想把用户的手机号进行隐藏展示, 并且手机号是存在的字段

```PHP
$table->add('mobile', '用户手机号')->display(function($value){
    return substr($value, 0, 3) .'****'.substr($value, 8);
})
```

如果想组合两个字段的展示, 例如用户的姓名和部门是两个字段

```PHP
// 这里 $this 返回的是模型的一行数据
$table->add('info', '姓名(部门)')->display(function($value){
    return $this->truename."({$this->department})";
})
```

## 快捷渲染

这里也定义快捷的渲染方法, 渲染方法使用 `asXx` 格式

### link

```PHP
// 渲染为可点击的链接地址
$table->add('url', '用户主页')->->asLink();
```

### Html

```PHP
// 渲染为Html
$table->add('color', 'Html')->asHtml(function () {
    return "<div style='{$this->style}'>$this->title</div>";
})
```

### Image

```PHP
// 图片, 将存储的图片地址以图片的形式展示到数据行中
$table->add('image', '图片')->asImage();
```

### Download

```PHP
// 可下载, 渲染为下载按钮
$table->add('pdf', 'Pdf')->asDownload();
```

### OnOff

```PHP
// 显示为快捷开关
$table->add('loading', 'Loading')->asOnOff();
```

### Kv

```PHP
// 使用定义的状态字段来返回
$table->add('status', 'usingKv')->asKv(DemoWebapp::kvStatus());
```

### Date

```PHP
// 显示为可以格式化的时间
$table->add('date', '创建时间')->asDate('m-d h:i');

// 根据语言显示为 距今 xxx 形式
$table->add('date', '创建时间')->asDiffForHumans();
```

### Util

```PHP
// 根据语言显示为 距今 xxx 形式
$table->add('filesize', '文件体积')->asFilesize();

// 显示为隐藏数据, 并可以自定义接口来返回数据并显示在列表中
$table->add('filesize', '文件体积')->asHidden();
```

## 列编辑

支持行内编辑, 文本模式, 开关模式, 选择模式, 如果不指定地址, 则采用模型的数据进行修改, 此功能对于不敏感的数据进行编辑, 如果涉及到业务逻辑的数据, 建议使用自定义地址进行修改

```PHP
// 支持编辑, 并支持字段更换名称
$table->add('loading-alt', '行内编辑(字段更名)')->editAsOnOff(function () {
    return $this->loading;
})->query('loading');

// 禁用指定行的数据进行编辑
$table->add('loading-disable', '行内编辑(禁用部分)')->editAsOnOff(function () {
    return $this->loading;
}, function () {
    return $this->id % 3 === 0;
})->query('loading');

// 自定义Url进行编辑
$table->add('loading-url', '行内编辑(自定义Url)')->editAsOnOff(function () {
    return $this->loading;
})->query('loading', route('demo:api.mgr_app.grid_modify_loading'));
```

当前支持的几个类型为

### Select

选择数据进行提交

```PHP
$table->add('status-alt', '行内编辑(字段更名)')->editAsSelect(function () {
    return $this->status;
})->query('status')->options(DemoWebapp::kvStatus());
```

### OnOff

开关

```PHP
$table->add('loading', '行内编辑(字段更名)')->editAsOnOff(function () {
    return $this->loading;
});
```

### Text

文字变更

```PHP
$table->add('sort-alt', '行内编辑(字段更名)')->copyable()->editAsText(function () {
    return $this->sort;
})->query('sort');
```