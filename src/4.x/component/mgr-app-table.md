---
description: '列渲染, 列采用如下方式进行列的添加列渲染展示, 添加列若是模型存在的数据, 则原样展示, 如果没有, 或者需要对数据进行组合, 格式化, 可以采用自定义的渲染方式如果存在 ID, 则展示为 ID如果想把用户的手机号进行隐藏展示, 并且手机号是存在的字段如果想组合两个字段的展示, 例如用户的姓名和部门是两个字段这里也定义快捷的渲染方法, 渲染方法使用 asXx 格式支持行内编辑, 文本模式, 开关模式, 选择模式, 如果不指定地址, 则采用模型的数据进行修改, 此功能对于不敏感的数据进行编辑, 如果涉及到业务逻辑的数据, 建议使用自定义地址进行修改当前支持的几个'
lastUpdated: '2024-01-29 18:56:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'MgrApp Table'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '列渲染, 列采用如下方式进行列的添加列渲染展示, 添加列若是模型存在的数据, 则原样展示, 如果没有, 或者需要对数据进行组合, 格式化, 可以采用自定义的渲染方式如果存在 ID, 则展示为 ID如果想把用户的手机号进行隐藏展示, 并且手机号是存在的字段如果想组合两个字段的展示, 例如用户的姓名和部门是两个字段这里也定义快捷的渲染方法, 渲染方法使用 asXx 格式支持行内编辑, 文本模式, 开关模式, 选择模式, 如果不指定地址, 则采用模型的数据进行修改, 此功能对于不敏感的数据进行编辑, 如果涉及到业务逻辑的数据, 建议使用自定义地址进行修改当前支持的几个'
---
# MgrApp Table



列渲染, 列采用如下方式进行列的添加

## 添加列

```php
public function table(TablePlugin $table)
{
    $table->add('id', 'ID')->quickId();
}
```

## 设置基础属性

```php
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

```php
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

```php
$table->add('id', 'ID')
```

如果想把用户的手机号进行隐藏展示, 并且手机号是存在的字段

```php
$table->add('mobile', '用户手机号')->display(function($value){
    return substr($value, 0, 3) .'****'.substr($value, 8);
})
```

如果想组合两个字段的展示, 例如用户的姓名和部门是两个字段

```php
// 这里 $this 返回的是模型的一行数据
$table->add('info', '姓名(部门)')->display(function($value){
    return $this->truename."({$this->department})";
})
```

## 快捷渲染

这里也定义快捷的渲染方法, 渲染方法使用  `asXx`  格式

### link

```php
// 渲染为可点击的链接地址
$table->add('url', '用户主页')->->asLink();
```

### Html

```php
// 渲染为Html
$table->add('color', 'Html')->asHtml(function () {
    return "<div style='{$this->style}'>$this->title</div>";
})
```

### Image

```php
// 图片, 将存储的图片地址以图片的形式展示到数据行中
$table->add('image', '图片')->asImage();
```

### Download

```php
// 可下载, 渲染为下载按钮
$table->add('pdf', 'Pdf')->asDownload();

```

### OnOff

```php
// 显示为快捷开关
$table->add('loading', 'Loading')->asOnOff();
```

### Kv

```php
// 使用定义的状态字段来返回
$table->add('status', 'usingKv')->asKv(DemoWebapp::kvStatus());
```

### Date

```php
// 显示为可以格式化的时间
$table->add('date', '创建时间')->asDate('m-d h:i');

// 根据语言显示为 距今 xxx 形式
$table->add('date', '创建时间')->asDiffForHumans();
```

### Util

```php
// 根据语言显示为 距今 xxx 形式
$table->add('filesize', '文件体积')->asFilesize();

// 显示为隐藏数据, 并可以自定义接口来返回数据并显示在列表中
$table->add('filesize', '文件体积')->asHidden();
```

## 列编辑

支持行内编辑, 文本模式, 开关模式, 选择模式, 如果不指定地址, 则采用模型的数据进行修改, 此功能对于不敏感的数据进行编辑, 如果涉及到业务逻辑的数据, 建议使用自定义地址进行修改

```php
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

```php
$table->add('status-alt', '行内编辑(字段更名)')->editAsSelect(function () {
    return $this->status;
})->query('status')->options(DemoWebapp::kvStatus());
```

### OnOff

开关

```php
$table->add('loading', '行内编辑(字段更名)')->editAsOnOff(function () {
    return $this->loading;
});
```

### Text

文字变更

```php
$table->add('sort-alt', '行内编辑(字段更名)')->copyable()->editAsText(function () {
    return $this->sort;
})->query('sort');
```

