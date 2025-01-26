---
description: '表单支持对数据的创建以及编辑表单继承了 FormWidget简易方式是允许在控制器中编写定义, 从而简化编写 form 的方式对于模型中有些数据可能需要多个数据来支持, 根据字段再去拆分结构, 使用 . 来进行拆分字段, 这里的渲染和标准的 html 有所不同下面对组件进行相应的介绍, 所有使用方式以以上两种方式为主表格组件, 支持行内编辑表格预览组件仅仅用于渲染数据, 当前支持文字, 图片渲染级联选择可用于级联选择, 数据返回以数组为主'
lastUpdated: '2024-01-29 18:57:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'MgrApp Form'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '表单支持对数据的创建以及编辑表单继承了 FormWidget简易方式是允许在控制器中编写定义, 从而简化编写 form 的方式对于模型中有些数据可能需要多个数据来支持, 根据字段再去拆分结构, 使用 . 来进行拆分字段, 这里的渲染和标准的 html 有所不同下面对组件进行相应的介绍, 所有使用方式以以上两种方式为主表格组件, 支持行内编辑表格预览组件仅仅用于渲染数据, 当前支持文字, 图片渲染级联选择可用于级联选择, 数据返回以数组为主'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/4.x/component/mgr-app-form.html'
---
# MgrApp Form



表单支持对数据的创建以及编辑

## 创建表单

### 继承方式

表单继承了  `FormWidget`

```php
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

```php
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

对于模型中有些数据可能需要多个数据来支持, 根据字段再去拆分结构, 使用  `.`  来进行拆分字段, 这里的渲染和标准的 html 有所不同

```php
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

```php
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

```php
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

```php
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

