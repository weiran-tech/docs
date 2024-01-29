---
description: '前后端分离的项目包后端需要添加包 poppy/mgr-app 当前版本是开发版, 版本是 4.0.x-dev, 因为授权返回的地址是有此包支持, 所以需要添加此扩展包mgr-app 文件内置在 mgr-page 包的 resources 目录下, 当前是属于开发过程中, 包放置在 GitHub Releasenginx 进行如下配置mgr-app.confdomain.conf如果需要自定义目录, 从源码编译并自行配置包目录即可数据准备路径是生成前端所用导航的入口文件, 告诉前端如何加载数据, 渲染页面, 文件位于 modules/{module}/conf'
lastUpdated: '2024-01-29 19:10:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'MgrApp'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '前后端分离的项目包后端需要添加包 poppy/mgr-app 当前版本是开发版, 版本是 4.0.x-dev, 因为授权返回的地址是有此包支持, 所以需要添加此扩展包mgr-app 文件内置在 mgr-page 包的 resources 目录下, 当前是属于开发过程中, 包放置在 GitHub Releasenginx 进行如下配置mgr-app.confdomain.conf如果需要自定义目录, 从源码编译并自行配置包目录即可数据准备路径是生成前端所用导航的入口文件, 告诉前端如何加载数据, 渲染页面, 文件位于 modules/{module}/conf'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/e4/e45454d40e6c55821b1f2f08be2b502f.png?x-oss-process=image/resize,m_mfit,w_400'
---
# MgrApp



前后端分离的项目包

## 安装

后端需要添加包  `poppy/mgr-app`  当前版本是开发版, 版本是  `4.0.x-dev` , 因为授权返回的地址是有此包支持, 所以需要添加此扩展包

### 前端访问

mgr-app 文件内置在 mgr-page 包的 resources 目录下, 当前是属于开发过程中, 包放置在 [GitHub Release](https://github.com/imvkmark/poppy-dev-mgr-app/releases)

nginx 进行如下配置

_mgr-app.conf_

```
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

_domain.conf_

```
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

```
# demo 集成
$ php artisan poppy:migrate module.demo

# 创建数据
$ php artisan poppy:seed module.demo --class='\Demo\Database\Seeds\DemoWebappDatabaseSeeder'
$ php artisan poppy:seed module.demo --class='\Demo\Database\Seeds\DemoUserDatabaseSeeder'

# 还原数据
$ php artisan poppy:migrate:rollback
```

### 路径配置

路径是生成前端所用导航的入口文件, 告诉前端如何加载数据, 渲染页面, 文件位于  `modules/{module}/configurations/path.yaml`

```yaml
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

**[1]类型**  backend 代表和用户类型想匹配的定义, 分为 user/develop/backend 三种

**[2]注入**  这里的 KEY 作为注入项目 module.demo/backend||default, 可以将配置注入到这个地方, 例如在 mgr-page 模块下存在 key  `backend.setting`  这个 key, 我们使用 injection 可以将模块配置注入到另外一个模块中达到不同的导航菜单的功能, 对于模块之间的顺序, 我们可以通过模块  `manifest.json`  文件中的  `order`  字段来进行定义, 按照从小到大的顺序进行排列

```yaml
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

图标我们使用 [element-plus 图标库](https://element-plus.org/zh-CN/component/icon.html), 图标名称格式支持  `kebab-case`  和  `CamelCase`  命名, 例如  `CircleCheck`  图标, 我们也可以写为  `circle-check`

**[4]菜单**  对于以上层级我们进行如下定义

```
导航 : 在顶部作为主导航
分组 : 对链接进行分组
链接 : 可以更改路由地址的链接
```

**[5]链接**

链接的组成规范

```
form   / demo:api.mgr_app.form / field-textarea / name|my
{type} / {route}               / {route_params} / {query}
```

- type : 链接支持的格式, form : 表单, setting : 设置, grid : 列表
- route : 路由, 通过 Laravel 定义的路由
- route_params : 路由参数, 使用 , 分隔
- query : 使用  `\Poppy\Framework\Helper\ArrayHelper::genKey()`  方式把字串解析成数组

## Action

项目中的操作项, 操作可分为  `request(请求)` ,  `page(页面)` ,  `copy(复制)` ,  `progress(进度)` , ``

### 基本样式

```php
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

- [ElementIcon](https://element-plus.org/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88)

使用 ElementUI 的图标需要填入指定的名称即可

```php
$action->icon('Bell')
```

- [Material Symbols](https://fonts.google.com/icons?selected=Material%20Icons&icon.style=Outlined&icon.set=Material%20Symbols)

使用 Material 图标, 需要选择 MaterialSymbols 图标, 为了样式实现简约, 只能使用 Outline 样式图标, 为了区分不同的图标库, 需要在图标前加上前缀  `mu:`

这里的图标名称需要填写图标的蛇形写法, 在图标详情中可以查询到

```php
$action->icon('mu:notifications')
```

### 使用场景

**Grid 表格**

```php
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

```php
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

```php
$actions->request('成功', route('demo:api.mgr_app.grid_request', ['success']));
```

### page

以内部页面方式打开指定类型数据

使用侧边栏方式打开一个页面, 当前支持  `form` ,  `grid`  两种数据内容

```php
$actions->page('页面', route('demo:api.mgr_app.grid_form', ['detail']), 'form');
```

### dialog

使用对话框的形式来打开一个页面, 当前支持  `form` ,  `grid`  两种数据内容

```php
$actions->dialog('页面', route('demo:api.mgr_app.grid_form', ['detail']), 'form');
```

### copy

复制自定义数据

复制按钮, 点击此按钮可已复制自定义的数据

```php
$actions->copy('复制', '复制自定义的内容' . $row['id']);
```

### target

在新窗口打开链接

新窗口打开, 打开自定义的链接地址

```php
$actions->target('Target(百度)', 'https://www.baidu.com');
```

### iframe

在当前窗口打开对话框, 对话框中展示允许嵌入的 iframe

```php
$actions->iframe('Iframe', 'https://poppy-framework.com/');
```

## Dashboard

Dashboard 意思是仪表盘, 目的是集中多个部分放到一个页面中进行展示, 可用于不同  `scope`  之间的配置和主页仪表盘

![](https://file.wulicode.com/notion/e4/e45454d40e6c55821b1f2f08be2b502f.png)

类之间的关系如下

![](https://file.wulicode.com/notion/97/97643ce84090cedf95d41445e35a4c49.png)

`Dashboard`  是仪表板,  `Panel`  定义为仪表盘的部件

### 使用

**定义路径**

这里的 url 类型是  `dashboard`

```yaml
- title: 表单仪表盘
  path: dashboard/demo:api.mgr_app.dashboard/form
```

**定义控制器**

```php
class DashboardController {
    public function form()
    {
        $dashboard = new DashboardForm();
        return $dashboard->resp();
    }
}
```

**定义仪表盘**

```php
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

Scope 定义为 Dashboard 分类, 根据不同的类型区分不同的仪表盘的数据展示, 这里引用的是 trait  `\Poppy\MgrApp\Classes\Traits\UseScopes`  , 提供的方法有

```php
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

```php
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

编写: Motion 使用 [Resp](./../framework/resp.md) 返回 Motion 格式如下, 如果使用 Resp 返回, 则也可使用 kv 方式来编写  `motion|grid:reload;time|200`

解析之后的对象如下所示

```javascript
{
	motion: "grid:reload";
	time: 200;
	path: "";
}
```

设置用于在表单中加入操作, 在 Grid 渲染中加入操作, 批处理, 表单的快速操作

参数说明

**motion**  : 全局操作

-  `grid:reload`  加载当前请求条件下的数据
-  `grid:reset`  请求搜索条件并重置到第一页
-  `grid:filter`  更新请求条件
-  `window:reload`  刷新当前页面

**time**  : 等待时长来执行函数, 单位(ms)  **path**  : 匹配路径 当页面中存在多个组件的时候, 组件的请求地址是不同的, 可以根据请求路径的 path 来判定是否允许更新, path 不存在时候不进行限制

为了项目中方便使用, 已经对 Motion 进行了封装

```php
Motion::windowReload()
Motion::gridFilter()
Motion::gridReset()
Motion::gridReload()
```

