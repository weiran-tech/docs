---
description: '演示地址 : http://v4.wulicode.com/mgr-page后台管理支持密码登录和验证码登录, 默认情况下开启用户名密码登录, 如果有需要可以在 ENV 设置此参数, 用来开启验证码登录在资源开发过程中, 我们使用如下命令进行资源监听, webpack.mix.js 本不存在, 需要在 poppy/mgr-page/resources/libs/目录下复制 webpack.mix.sample.js 文件并更改名称,将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主在资源变动之后我们需要将打包后的文件反向复制到 mgr-page 这个包中, 用'
lastUpdated: '2025-02-05 11:23:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'MgrPage - 后台管理'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '演示地址 : http://v4.wulicode.com/mgr-page后台管理支持密码登录和验证码登录, 默认情况下开启用户名密码登录, 如果有需要可以在 ENV 设置此参数, 用来开启验证码登录在资源开发过程中, 我们使用如下命令进行资源监听, webpack.mix.js 本不存在, 需要在 poppy/mgr-page/resources/libs/目录下复制 webpack.mix.sample.js 文件并更改名称,将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主在资源变动之后我们需要将打包后的文件反向复制到 mgr-page 这个包中, 用'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/10.x/component/mgr-page.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/4c/4c16ed8fb727a00b146e9849a2a3ba86.png?x-oss-process=image/resize,m_mfit,w_400'
---
# MgrPage - 后台管理



> 基于 layui 的后台管理工具包,

演示地址 : [http://v4.wulicode.com/mgr-page](http://v4.wulicode.com/mgr-page)

## 配置

### captcha_login

> since 4.2

- Type :  `bool` 
- Default :  `false` 

后台管理支持密码登录和验证码登录, 默认情况下开启用户名密码登录, 如果有需要可以在 ENV 设置此参数, 用来开启验证码登录

```
'captcha_login' => (bool) env('PY_MGR_CAPTCHA_LOGIN', false),
```

## 资源打包

### 开发监听

在资源开发过程中, 我们使用如下命令进行资源监听,  `webpack.mix.js`  本不存在, 需要在  `poppy/mgr-page/resources/libs/` <br />
目录下复制  `webpack.mix.sample.js`  文件并更改名称,<br />
将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主

```
$ mix watch --mix-config=poppy/mgr-page/resources/libs/webpack.mix.js

```

在资源变动之后我们需要将打包后的文件反向复制到  `mgr-page`  这个包中, 用到以下命令

```
$ php artisan py-mgr:mix

```

这样进行包提交即可

### 发布到项目

MgrPage 管理后台使用的是 js 加载方式, 如果使用 MgrPage, 则需要在更新 composer 组件之后运行以下命令进行强制更新

```
$ php artisan vendor:publish --force --tag=poppy-mix

```

建议将此命令加入 composer.json 文件中, 每次更新完成 composer 的时候都会自动进行一次发布

```json
{
    "scripts" : {
        "post-update-cmd" : [
            "php artisan vendor:publish --force --tag=poppy-mix"
        ]
    }
}

```

## Pjax

Pjax 用于在页面中请求时候参数异常进行的友好提示

![](https://file.wulicode.com/notion/4c/4c16ed8fb727a00b146e9849a2a3ba86.png)

使用方式

```php
use Poppy\\System\\Classes\\Traits\\PjaxTrait;

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

```
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
{!! mgr_actions(function (\\Poppy\\MgrPage\\Classes\\Operations $operations) use ($item){
    $operations->iframe('跳转', '#')->icon('pencil')->primary();
}) !!}

// 调用下拉菜单
{!! mgr_dropdown('状态', function (\\Poppy\\MgrPage\\Classes\\Operations $dd) use ($item){
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

                    {!! mgr_actions(function (\\Poppy\\MgrPage\\Classes\\Operations $operations) use ($item){
                        $operations->iframe('跳转', '#')->icon('pencil')->primary();
                    }) !!}

                    {!! mgr_dropdown('状态', function (\\Poppy\\MgrPage\\Classes\\Operations $dd) use ($item){
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
    {!! $items->render('py-mgr-page::vendor.pagination-layui') !!}
</div>

```

