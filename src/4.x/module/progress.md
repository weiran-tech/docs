---
description: '此类更新一般用于批次对数据进行修改, 且在用户可以操作的入口, 一般的开发者需要操作的入口可以放置在命令行, 更方便进行数据管理定义 fixHandle 方法, 需要引入 FixTrait 方法在控制器中使用如下方式定义即可'
lastUpdated: '2024-01-29 15:52:00'
head: 
  - - meta
    - name: 'og:title'
      content: '更新'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '此类更新一般用于批次对数据进行修改, 且在用户可以操作的入口, 一般的开发者需要操作的入口可以放置在命令行, 更方便进行数据管理定义 fixHandle 方法, 需要引入 FixTrait 方法在控制器中使用如下方式定义即可'
---
# 更新



此类更新一般用于批次对数据进行修改, 且在用户可以操作的入口, 一般的开发者需要操作的入口可以放置在命令行, 更方便进行数据管理

## 编写

定义 fixHandle 方法, 需要引入  `FixTrait`  方法

```php
class Area
{
    use FixTrait;

    public function fixHandle($view = true)
    {
        $this->fixInit();
        // 重新清理掉缓存
        if (!$this->fix['cached']) {
            $this->fix['cached'] = 1;
        }
        $Db = new SysArea();
        $this->total($Db->count());
        $this->max($Db->max('id'));
        $this->min($Db->min('id'));
        $this->section(100);

        // ↑↑↑↑↑↑↑↑↑↑↑   获取参数

        // 剩余数
        $this->left(
            $Db->whereRaw('id > ?', [$this->fix['start']])->count('id')
        );

        $this->fix['lastId'] = $this->fix['start'];
        if ($this->fix['left']) {
            $left_items = SysArea::whereRaw('id >= ?', [$this->fix['start']])
                ->take($this->fix['section'])
                ->orderBy('id')
                ->get(['id', 'title']);

            foreach ($left_items as $item) {
                (new self())->fix($item->id);
                // hasChild 子集 level 等级
                (new self())->hasChild($item->id);
                (new self())->level($item->id);
                $this->fix['lastId'] = $item->id + 1;
            }
        }

        if ($view) {
            return $this->fixView();
        }

        return $this->fixResp();
    }
}
```

## 控制器中使用

在控制器中使用如下方式定义即可

```php
/**
 * 地区管理控制器
 */
class ContentController extends BackendController
{
    /**
     * 更新
     */
    public function fix()
    {
        return (new Area())->fixHandle();
    }
}
```

