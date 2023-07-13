# 服务和钩子

服务的位置: `modules/{module}/configurations/services.yaml`

hook 位置: `modules/{module}/configurations/hooks.yaml`

## 服务和钩子的概念

我们来解释一下 service：

1.  service 是多个 module 之间扩展的重要方式。
2.  我们将 service 和 hook 看作是插槽与插头的关系。一个插槽可以插多个插头。
3.  每个模块下都会有一个 service.yaml 的文件，来描述本模块的可以提供的服务插槽。

## 使用

由于服务使用缓存机制, 所以在添加服务/钩子之后需要进行相应的缓存清理

```
$ php artisan poppy:optimize
```

### Array 类型

**定义 service**

首先在 services.yaml 中定义如下内容

```yaml
poppy.system.api_info:
    title: 系统接口
    type: array
    description: 系统信息接口调用, 系统信息返回的灵活数据
```

`poppy.system.api_info` 分为三个部分

```
poppy    : 命名空间
system   : 模块
api_info : 自定义名称
```

**定义 hooks**

然后再 hooks.yaml 文件中,注册调用 hook 方法, Hooks 命名方式推荐

```
{模块名称}/Hooks/{定义模块}/{名称}
{Module}/Hooks/System/ApiInfo
```

```yaml
- name: "poppy.system.api_info"
  hooks:
      - '\Poppy\System\Hooks\System\ApiInfo'
```

编写实现对应的 key()/data()方法

```php
<?php
class ApiInfo
{
    public function key()
    {
        return 'api';
    }

    public function data()
    {
        return 'info';
    }
}
```

执行 ServiceFactory 的 parse 方法

```php
sys_hook('poppy.system.api_info');

[
    'api' => 'info'
]
```

### Form

定义 service, 这个 Service 是单选 首先再 services.yaml 中定义如下内容

```yaml
poppy.ad.place_selection:
    title: 广告位选择
    type: form
    description: 选择广告位
```

注册 hook 方法

```yaml
- name: "poppy.ad.place_selection"
  builder: '\Poppy\Ad\Services\Hooks\AdPlaceSelection'
```

实现 builder 方法

```php
public function builder($params = [])
{
   $name    = $params['name'];
   $value   = $params['value'] ?? null;
   $options = $params['options'] ?? [];

   $options  += [
      'class'       => 'layui-input',
      'placeholder' => '请选择广告位',
   ];
   $places = AdPlace::pluck('title', 'id');
   return \Form::select($name, $places, $value, $options);
}
```

调用执行

```php
sys_hook('poppy.ad.place_selection', $param)
```

