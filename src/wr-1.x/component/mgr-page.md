---
description: '后台管理支持密码登录和验证码登录, 默认情况下开启用户名密码登录, 如果有需要可以在 ENV 设置此参数, 用来开启验证码登录在资源开发过程中, 我们使用如下命令进行资源监听, webpack.mix.js 本不存在, 需要在 weiran/mgr-page/resources/libs/目录下复制 webpack.mix.sample.js 文件并更改名称,将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主在资源变动之后我们需要将打包后的文件反向复制到 mgr-page 这个包中, 用到以下命令这样进行包提交即可MgrPage 管理后台使用的是 js 加'
lastUpdated: '2025-04-02 17:52:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'MgrPage / 后台管理'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '后台管理支持密码登录和验证码登录, 默认情况下开启用户名密码登录, 如果有需要可以在 ENV 设置此参数, 用来开启验证码登录在资源开发过程中, 我们使用如下命令进行资源监听, webpack.mix.js 本不存在, 需要在 weiran/mgr-page/resources/libs/目录下复制 webpack.mix.sample.js 文件并更改名称,将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主在资源变动之后我们需要将打包后的文件反向复制到 mgr-page 这个包中, 用到以下命令这样进行包提交即可MgrPage 管理后台使用的是 js 加'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/component/mgr-page.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/4c/4c16ed8fb727a00b146e9849a2a3ba86.png?x-oss-process=image/resize,m_mfit,w_400'
---
# MgrPage / 后台管理



> 基于 layui 的后台管理工具包, 部分组件存在版权限制, 无法对外开放

::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  配置说明 : 需要 packeton 的私有包权限, 并且再 composer 中配置如下代码


```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packeton.kejinxia.com"
    }
  ]
}
```
:::

## 配置

### captcha_login

- Type :  `bool` 
- Default :  `false` 

后台管理支持密码登录和验证码登录, 默认情况下开启用户名密码登录, 如果有需要可以在 ENV 设置此参数, 用来开启验证码登录

```
'captcha_login' => (bool) env('WEIRAN_CAPTCHA_LOGIN', false),
```

## 资源打包

### 开发监听

在资源开发过程中, 我们使用如下命令进行资源监听,  `webpack.mix.js`  本不存在, 需要在  `weiran/mgr-page/resources/libs/` <br />
目录下复制  `webpack.mix.sample.js`  文件并更改名称,<br />
将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主

```
$ mix watch --mix-config=weiran/mgr-page/resources/libs/webpack.mix.js
```

在资源变动之后我们需要将打包后的文件反向复制到  `mgr-page`  这个包中, 用到以下命令

```
$ php artisan mgr-page:mix
```

这样进行包提交即可

### 发布到项目

MgrPage 管理后台使用的是 js 加载方式, 如果使用 MgrPage, 则需要在更新 composer 组件之后运行以下命令进行强制更新

```
$ php artisan vendor:publish --force --tag=weiran-asset
```

建议将此命令加入  `composer.json`  文件中, 每次更新完成 composer 的时候都会自动进行一次发布

```json
{
    "scripts" : {
        "post-update-cmd" : [
            "php artisan vendor:publish --force --tag=weiran-asset"
        ]
    }
}
```

## Pjax

Pjax 用于在页面中请求时候参数异常进行的友好提示

![](https://file.wulicode.com/notion/4c/4c16ed8fb727a00b146e9849a2a3ba86.png)

使用方式

```php
use Weiran\System\Classes\Traits\PjaxTrait;

/**
 * 内容生成器
 */
class JsController extends WebController
{

    use PjaxTrait;

    /**
     * Pjax Error
     * @return Factory|JsonResponse|RedirectResponse|Response|View
     */
    public function pjax()
    {
        if (!check_js_time(input('start_at'))) {
            return $this->pjaxError('Pjax 请求错误 : 提交的时间和日期不符');
        }
        return view('demo::js.fe');
    }
}

```

## Splash

> splash 是前后端交互的约定方式, splash 使用返回的 json 的 data 属性作为 json 进行数据的传递

例如: 服务端返回

```php
class JsController extends WebController
{
    /**
     * 前台代码
     * @return Factory|JsonResponse|RedirectResponse|Response|View
     */
    public function index()
    {
        if ($type === 'top-request') {
            return Resp::error('错误信息', [
                '_top' => [
                    'operation' => 'doWhat',
                ],
            ]);
        }
    }
}

```

服务器返回的数据格式为

```json
{
    "status": 1,
    "message": "[local]错误信息",
    "data": {
        "_top": {
            "operation": "doWhat"
        }
    }
}

```

### _top

定义为调用  `top.window._app(resp)`  这个函数, 数据为完整的状态数据, 此数据使用在同源策略下的前后端数据约定调用情况

### _captcha_reload

触发前端  `.J_captcha`  的点击事件

### _top_location

top 页面的 window 对象进行 location 跳转

### _parent_location

打开当前页面的父页面的 window 对象进行 location 跳转

### _location

当前页面的 window 对象进行 location 跳转

### _top_reload

top 页面的 window 对象进行 reload 刷新

### _parent_reload

打开当前页面的父页面的 window 对象进行 reload 刷新

### _reload

当前页面的 window 对象进行 reload 刷新

## 静态表格渲染

为了保障设计的唯一性解决方式, 我们推荐使用一致性的渲染方式, layui 提供了一种方式可以将静态表格转换为更加优雅的表格方式

### 设定渲染 ID

我们首先需要在表格  `table`  中加入  `lay-filter="default"`  来标示这是一个layui 可以渲染的表格

```
<table class="layui-table" {!! mgr_table_open() !!}>
    ...
</table>
```

在页面底部, 我们需要调用 layui 的 table 初始化方法, 为了方便, 封装了一个函数来达到快速输出的效果

```
{!! mgr_table_close() !!}
```

如果列表中有多个表格, 可以传入  `mgr_table_open(string $filter)`  参数来进行多个列表的初始化

### 列定义

为了方便列的渲染, layui 需要在每个列上都定义唯一的字段标识, 我们提供了一个方法来快速生成字段, 宽度以及其他属性

```
function mgr_col(int $width = 0, string $fixed = '', string $append = '')
{
    //...
}
```

在列中可以跨苏插入定义

```
<th {!! mgr_col() !!}>
    标题
    {!! Form::order('title') !!}
</th>
```

### 列操作

诚然, 你可以使用标准的 html 来生成标签

这里我们封装了操作方法方便快捷的生成标签, 这里的操作和以上列表中标书的列操作方法一致, 只是在快捷操作中做了封装方法使用.

```php
// 调用复制按钮
{!! mgr_op()->copy('复制', $item->title)->primary()->bare()->only()->render(); !!}

// 调用 iframe 编辑
{!! mgr_op()->iframe('编辑', '/path/of/id')->only()->primary()->bare()->render(); !!}

// 调用多个动作
{!! mgr_actions(function (\Weiran\MgrPage\Classes\Operations $operations) use ($item){
    $operations->iframe('跳转', '#')->icon('pencil')->primary();
}) !!}

// 调用下拉菜单
{!! mgr_dropdown('状态', function (\Weiran\MgrPage\Classes\Operations $dd) use ($item){
       $dd->iframe('下拉1-'.$item->id, '#');
       $dd->iframe('下拉2-'.$item->id, '#');
}) !!}
```

以下是完整的示例

```php
<table class="layui-table" {!! mgr_table_open() !!}>
    <thead>
    <tr>
        <th {!! mgr_col() !!}>ID</th>
        <th {!! mgr_col() !!}>
            标题
            {!! Form::order('title') !!}
        </th>
        <th {!! mgr_col() !!}>创建时间</th>
        <th {!! mgr_col() !!}>更新时间</th>
        <th {!! mgr_col_actions(170) !!}>操作</th>
    </tr>
    </thead>
    <tbody>
    @if($items->total())
        @foreach($items as $item)
            <tr>
                <td>{{ $item->id }}</td>
                <td>{{ $item->title }}</td>
                <td>{{ $item->created_at }}</td>
                <td>{{ $item->updated_at }}</td>
                <td>
                    {!! mgr_op()->copy('复制', $item->title)->primary()->bare()->only()->render(); !!}
                    {!! mgr_op()->iframe('icon', '3')->icon('fa:comment-alt')->only()->primary()->bare()->render(); !!}
                    {!! mgr_actions(function (\Weiran\MgrPage\Classes\Operations $operations) use ($item){
                        $operations->iframe('跳转', '#')->icon('pencil')->primary();
                    }) !!}
                    {!! mgr_dropdown('状态', function (\Weiran\MgrPage\Classes\Operations $dd) use ($item){
                           $dd->iframe('下拉1-'.$item->id, '#');
                           $dd->iframe('下拉2-'.$item->id, '#');
                    }) !!}
                </td>
            </tr>
        @endforeach
    @else
        <tr>
            <td colspan="100" align="center">暂无数据</td>
        </tr>
    @endif
    </tbody>
</table>

{!! mgr_table_close() !!}
<div class="clearfix layui-card-pager" align="right">
    {!! $items->render('weiran-mgr-page::vendor.pagination-layui') !!}
</div>

```

## 组件

::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  1.0 版本调整了组件的加载方式, 来避免Js 文件混淆在 html 中, 在文档底部调用


```php
{!! \Weiran\MgrPage\Classes\Widgets\FormWidget::assetsStrAppendBody('builder') !!}
```
:::

### 图片上传

- 文件超出服务器最大上传限制应当显示友好的提示 [WIP - layui 组件限制]

## Grid / 动态表格

### 单文件列表

单文件列表是基于快速模型的列表展现方式, 支持以下几个部分

- 标题
- 列, 列操作
- 快捷操作
- 批量操作

单文件列表的创建, 单文件列表继承自  `Weiran\MgrPage\Classes\Grid\ListBase` , 如下

```php
<?php

use Weiran\MgrPage\Classes\Grid\ListBase;

class ListSysSensitiveWord extends ListBase
{

}
```

在控制器中使用 :

```php
<?php

declare(strict_types = 1);

namespace Weiran\SensitiveWord\Http\Request\Backend;

use Weiran\MgrPage\Classes\Grid;
use Weiran\MgrPage\Http\Request\Backend\BackendController;
use Weiran\SensitiveWord\Http\MgrPage\ListSysSensitiveWord;
use Weiran\SensitiveWord\Models\SysSensitiveWord;

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

### 添加列

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

### 列操作

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

### 筛选器

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

### 快捷操作

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

### 批量操作

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

