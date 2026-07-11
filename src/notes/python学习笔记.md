---
title: Python学习笔记
tags: Python, 编程
date: 2026-03-28
---

# python学习笔记

---

单行注释 #

## 1 原始数据类型和运算符 

> 这里只讲python特有的

 ```python
 7 % 3 # => 1
 # i % j 结果的正负符号会和 j 相同，而不是和 i 相同
 -7 % 3 # => 2
 ```

```python
# x 的 y 次方
2**4 # => 16
```

```python
# 布尔值 (注意: 首字母大写)
True   # => True
False  # => False

# 用 not 取非
not True   # => False
not False  # => True
```

```python
# True 和 False 实质上就是数字 1 和0
True + True # => 2
True * 8    # => 8
False - 5   # => -5
```

```python
# 判断一个值是否在范围里
1 < 2 and 2 < 3  # => True
2 < 3 and 3 < 2  # => False
# 大小比较可以连起来！
1 < 2 < 3  # => True
2 < 3 < 2  # => False
```

- (is 对比 ==) is 判断两个变量是否引用同一个对象,
  而 == 判断两个对象是否含有相同的值

```python
a = [1, 2, 3, 4]  # 变量 a 是一个新的列表, [1, 2, 3, 4]
b = a             # 变量 b 赋值了变量 a 的值
b is a            # => True, a 和 b 引用的是同一个对象
b == a            # => True, a 和 b 的对象的值相同
b = [1, 2, 3, 4]  # 变量 b 赋值了一个新的列表, [1, 2, 3, 4]
b is a            # => False, a 和 b 引用的不是同一个对象
b == a            # => True, a 和 b 的对象的值相同
```

- 字符串可以使用加号连接成新的字符串

```python
"Hello " + "world!"  # => "Hello world!"
```
- 非变量形式的字符串甚至可以在没有加号的情况下连接

```python
"Hello " "world!"    # => "Hello world!"
```

字符串可以被当作字符列表
```python
"Hello world!"[0]  # => 'H'
```
你可以获得字符串的长度
```python
len("This is a string")  # => 16
```
### f-strings 格式化字符串

（python3.6+）

```python
name = "Reiko"
f"She said her name is {name}." # => "She said her name is Reiko"
```

- 你可以在大括号内几乎加入任何 python 表达式，表达式的结果会以字符串的形式返回
```python
f"{name} is {len(name)} characters long." # => "Reiko is 5 characters long."
```
### 用 .format 来格式化字符串
```python
"{} can be {}".format("strings", "interpolated")
```
可以重复参数以节省时间
```python
"{0} be nimble, {0} be quick, {0} jump over the {1}".format("Jack", "candle stick")
# => "Jack be nimble, Jack be quick, Jack jump over the candle stick"
```
如果不想数参数，可以用关键字
```python
"{name} wants to eat {food}".format(name="Bob", food="lasagna") 
# => "Bob wants to eat lasagna"
```

```python
# None是一个对象
None  # => None

# 当与 None 进行比较时不要用 ==，要用 is。is 是用来比较两个变量是否指向同一个对象。
"etc" is None  # => False
None is None  # => True
```

## 2 变量和集合

```python
print("I'm Python. Nice to meet you!")
```

默认情况下，print 函数会在输出结果后加入一个空行作为结尾，可以使用附加参数改变输出结尾

```python
print("Hello, World", end="!")  # => Hello, World!
```
可以很简单的从终端获得输入数据
```python
input_string_var = input("Enter some data: ") # 返回字符串数值
```
- 在给变量赋值前不用提前声明
  习惯上变量命名是小写，用下划线分隔单词
```python
some_var = 5
some_var  # => 5
```
"if" 可以用作表达式，它的作用等同于 C 语言的三元运算符 "?:"
```python
"yay!" if 0 > 1 else "nay!"  # => "nay!"
```
### 列表
用列表 (list) 储存序列 创建列表时也可以同时赋给元素

```python
li = []
other_li = [4, 5, 6]
```
- 用append在列表最后追加元素
- 用pop从列表尾部删除
```python
li.append(1)    # li现在是[1]
li.append(2)    # li现在是[1, 2]
li.append(4)    # li现在是[1, 2, 4]
li.append(3)    # li现在是[1, 2, 4, 3]
li.pop()        # => 3 且li现在是[1, 2, 4]
li.append(3)    # li变回[1, 2, 4, 3]
```

- 列表存取跟数组一样
- 越界存取会造成 IndexError
```python
li[0]  # => 1
li[-1]  # => 3  取出最后一个元素
li[4]  # 抛出 IndexError
```
- 列表有切割语法
```python
li[1:3]    # => [2, 4]
# 取尾
li[2:]     # => [4, 3]
# 取头
li[:3]     # => [1, 2, 4]
# 隔一个取一个
li[::2]    # =>[1, 4]
# 倒排列表
li[::-1]   # => [3, 4, 2, 1]
# 可以用三个参数的任何组合来构建切割
# li[始:终:步伐]
```
- 简单的实现了单层数组的深度复制
```python
li2 = li[:]  # => li2 = [1, 2, 4, 3] ，但 (li2 is li) 会返回 False
```
- 用 del 删除任何一个元素

```python
del li[2]   # li 现在为 [1, 2, 3]
```

```python
# 删除第一个匹配的元素
li.remove(2)  # li 现在为 [1, 3]
li.remove(2)  # 抛出错误 ValueError: 2 is not in the list

# 在指定索引处插入一个新的元素
li.insert(1, 2)  # li is now [1, 2, 3] again

# 获得列表第一个匹配的值的索引
li.index(2)  # => 1
li.index(4)  # 抛出一个 ValueError: 4 is not in the list
```

- 列表可以相加
  注意：li 和 other_li 的值都不变
```python
li + other_li   # => [1, 2, 3, 4, 5, 6]
```
- 用 "extend()" 拼接列表
```python
li.extend(other_li)   # li 现在是[1, 2, 3, 4, 5, 6]
```

- 用 "in" 测试列表是否包含值

```python
1 in li   # => True
```

- 用 "len()" 取列表长度
```python
len(li)   # => 6
```

### 元组

**类似列表，但是不允许修改**

```python
tup = (1, 2, 3)
tup[0]   # => 1
tup[0] = 3  # 抛出 TypeError
```
- 如果元素数量为 1 的元组必须在元素之后加一个逗号
  其他元素数量的元组，包括空元组，都不需要
```python
type((1))   # => <class 'int'>
type((1,))  # => <class 'tuple'>
type(())    # => <class 'tuple'>
```

- 列表允许的操作元组大多都可以

```python
len(tup)   # => 3
tup + (4, 5, 6)   # => (1, 2, 3, 4, 5, 6)
tup[:2]   # => (1, 2)
2 in tup   # => True
```

- 一些简便的操作

```python
# 可以把元组合列表解包，赋值给变量
a, b, c = (1, 2, 3)     # 现在 a 是 1，b 是 2，c 是 3
# 也可以做扩展解包
a, *b, c = (1, 2, 3, 4)  # 现在 a 是 1, b 是 [2, 3]， c 是 4
# 元组周围的括号是可以省略的
d, e, f = 4, 5, 6 # 元组 4, 5, 6 通过解包被赋值给变量 d, e, f
# 交换两个变量的值就这么简单
e, d = d, e     # 现在 d 是 5，e 是 4
```

### 字典

存储 key 到 value 的映射关系

- 初始化的字典

```python
empty_dict = {}
filled_dict = {"one": 1, "two": 2, "three": 3}
```

- 字典的 key 必须为不可变类型。 这是为了确保 key 被转换为唯一的哈希值以用于快速查询
  不可变类型包括整数、浮点、字符串、元组
```python
invalid_dict = {[1,2,3]: "123"}  # => 抛出 TypeError: unhashable type: 'list'
valid_dict = {(1,2,3):[1,2,3]}   # 然而 value 可以是任何类型
```

- 用[ ]取值

```python
- filled_dict["one"]   # => 1
```

- 用 keys 获得所有的键,用 "values()" 获得所有的值。
  因为 keys 返回一个可迭代对象，所以我们需要把它包在 "list()" 里才能转换为列表。

- 注意: 对于版本 < 3.7 的 python, 字典的 key 的排序是无序的。你的运行结果
  可能与下面的例子不符，但是在 3.7 版本，字典中的项会按照他们被插入到字典的顺序进行排序
```python
list(filled_dict.keys())  # => ["three", "two", "one"] Python 版本 <3.7
list(filled_dict.keys())  # => ["one", "two", "three"] Python 版本 3.7+

list(filled_dict.values())  # => [3, 2, 1] Python 版本 < 3.7
list(filled_dict.values())  # => [1, 2, 3] Python 版本 3.7+
```

- 其他操作

```python
"one" in filled_dict   # => True
1 in filled_dict   # => False

filled_dict["four"]   # KeyError

# 用 "get()" 来避免KeyError
filled_dict.get("one")      # => 1
filled_dict.get("four")     # => None

# 当键不存在的时候 "get()" 方法可以返回默认值
filled_dict.get("one", 4)   # => 1
filled_dict.get("four", 4)  # => 4

# "setdefault()" 方法只有当键不存在的时候插入新值
filled_dict.setdefault("five", 5)  # filled_dict["five"] 设为5
filled_dict.setdefault("five", 6)  # filled_dict["five"] 还是5

# 字典赋值
filled_dict.update({"four":4}) # => {"one": 1, "two": 2, "three": 3, "four": 4}
filled_dict["four"] = 4        # 另一种赋值方法

# 用 del 删除项
del filled_dict["one"]  # 从 filled_dict 中把 one 删除
```

### 集合
- 用 set 表达集合

```python
empty_set = set()

some_set = {1, 1, 2, 2, 3, 4}   # some_set现在是 {1, 2, 3, 4}
```

```python
# 类似字典的 keys，set 的元素也必须是不可变类型
invalid_set = {[1], 1}  # => Raises a TypeError: unhashable type: 'list'
valid_set = {(1,), 1}
```

- 为集合添加元素
```python
filled_set.add(5)   # filled_set 现在是 {1, 2, 3, 4, 5}
# set 没有重复的元素
filled_set.add(5)   # filled_set 依然是 {1, 2, 3, 4, 5}
```

- "&" 取交集

```python
other_set = {3, 4, 5, 6}
filled_set & other_set   # => {3, 4, 5}
```

- "|" 取并集
```python
filled_set | other_set   # => {1, 2, 3, 4, 5, 6}
```

```python
# "-" 取补集
{1, 2, 3, 4} - {2, 3, 5}   # => {1, 4}

# "^" 取异或集（对称差）
{1, 2, 3, 4} ^ {2, 3, 5}  # => {1, 4, 5}

# 判断左边的集合是否是右边集合的超集
{1, 2} >= {1, 2, 3} # => False

# 判断左边的集合是否是右边集合的子集
{1, 2} <= {1, 2, 3} # => True
```

- in 测试集合是否包含元素
```python
2 in filled_set   # => True
```

- 单层集合的深度复制

```python
filled_set = some_set.copy()  # filled_set 是 {1, 2, 3, 4, 5}
filled_set is some_set        # => False
```

## 3 流程控制和迭代器

### if条件判断

```python
some_var = 5

# 这是个if语句。注意缩进在Python里是有意义的！
# 缩进要使用 4 个空格而不是 tabs。
# 这段代码会打印 "some_var is smaller than 10"
if some_var > 10:
    print("some_var is totally bigger than 10.")
elif some_var < 10:    # elif 语句是可选的
    print("some_var is smaller than 10.")
else:                  # else 也是可选的
    print("some_var is indeed 10.")
```

### for 循环 迭代

```python
for animal in ["dog", "cat", "mouse"]:
    # 你可以使用 format() 格式化字符串并插入值
    print("{} is a mammal".format(animal))
```

```python
"""
"range(number)" 返回数字列表从 0 到 number 的数字
打印:
    0
    1
    2
    3
"""
for i in range(4):
    print(i)
"""
"range(lower, upper)" 会返回一个包含从 lower 到 upper 的数字迭代器
prints:
    4
    5
    6
    7
"""
for i in range(4, 8):
    print(i)

"""
"range(lower, upper, step)" 会返回一个，从 lower 到 upper、并且间隔值为 step 的迭代器。
如果 step 未传入则会使用默认值 1
prints:
    4
    6
"""
for i in range(4, 8, 2):
    print(i)

```

### while 循环

```python
x = 0
while x < 4:
    print(x)
    x += 1
```

### try 异常处理

```python
用 try/except 块处理异常状况
try:
    # 用 raise 抛出异常
    raise IndexError("This is an index error")
except IndexError as e:
    pass    						 # pass 是无操作，但是应该在这里处理错误
except (TypeError, NameError):
    pass    						 # 可以同时处理不同类的错误
else:                    # else语句是可选的，必须在所有的except之后
    print("All good!")   # 只有当try运行完没有错误的时候这句才会运行
finally:								 # 在任何情况下都会执行
 		print("We can clean up resources here")
```

- 可以使用 with 语句来代替 try/finally 对操作进行结束的操作
```python
with open("myfile.txt") as f:
    for line in f:
        print(line)
```

### 写入文件

```python
contents = {"aa": 12, "bb": 21}
with open("myfile1.txt", "w+") as file:
    file.write(str(contents))        # 写入字符串到文件

with open("myfile2.txt", "w+") as file:
    file.write(json.dumps(contents)) # 写入对象到文件

# Reading from a file
with open("myfile1.txt", "r+") as file:
    contents = file.read()           # 从文件读取字符串
print(contents)
# print: {"aa": 12, "bb": 21}

with open("myfile2.txt", "r+") as file:
    contents = json.load(file)       # 从文件读取 json 对象
print(contents)
# print: {"aa": 12, "bb": 21}
```

> Windows 环境调用 open() 读取文件的默认编码为 ANSI，如果需要读取 utf-8 编码的文件，
>
> 需要指定 encoding 参数:
>
> open("myfile3.txt", "r+", encoding = "utf-8")

### 迭代器

-  Python 提供一个叫做可迭代 (iterable) 的基本抽象。一个**可迭代对象**是可以被当作序列的对象。比如说上面 range 返回的对象就是可迭代的。

```python
filled_dict = {"one": 1, "two": 2, "three": 3}
our_iterable = filled_dict.keys()
print(our_iterable) # => dict_keys(['one', 'two', 'three'])，是一个实现可迭代接口的对象
```

- 可迭代对象可以遍历 但是不能随机访问

```python
for i in our_iterable:
    print(i)    # 打印 one, two, three
    
our_iterable[1]  # 抛出TypeError
```

- 可迭代对象知道怎么生成迭代器  **迭代器是一个可以记住遍历的位置的对象**

```python
our_iterator = iter(our_iterable)

# 用 "next()" 获得下一个对象
next(our_iterator)  # => "one"

# 再一次调取 "next()" 时会记得位置
next(our_iterator)  # => "two"
next(our_iterator)  # => "three"

# 当迭代器所有元素都取出后，会抛出 StopIteration
next(our_iterator) # 抛出 StopIteration
```

- 我们还可以通过遍历访问所有的值，实际上，for 内部实现了迭代

```python
our_iterator = iter(our_iterable)
for i in our_iterator:
    print(i)  # 依次打印 one, two, three
```

- 可以用 list 一次取出迭代器或者可迭代对象所有的元素

```python
list(filled_dict.keys())  # => 返回 ["one", "two", "three"]
list(our_iterator)  # => 返回 [] 因为迭代的位置被保存了
```

## 4 函数

- 用def定义新函数

```python
def add(x, y):
    print("x is {} and y is {}".format(x, y))
    return x + y    # 用 return 语句返回

# 调用函数
add(5, 6)   # => 打印 "x is 5 and y is 6" 并且返回 11

# 也可以用关键字参数来调用函数
add(y=6, x=5)   # 关键字参数可以用任何顺序
```

- 我们可以定义一个可变参数函数

```python
def varargs(*args):
    return args

varargs(1, 2, 3)   # => (1, 2, 3)
```

- 我们也可以定义一个关键字可变参数函数

```python
def keyword_args(**kwargs):
    return kwargs

# 我们来看看结果是什么：
keyword_args(big="foot", loch="ness")   # => {"big": "foot", "loch": "ness"}
```

```python
# 这两种可变参数可以混着用
def all_the_args(*args, **kwargs):
    print(args)
    print(kwargs)
"""
all_the_args(1, 2, a=3, b=4) prints:
    (1, 2)
    {"a": 3, "b": 4}
"""
```

- 调用可变参数函数时可以做跟上面相反的，用 * 展开元组，用 ** 展开字典。

```python
args = (1, 2, 3, 4)
kwargs = {"a": 3, "b": 4}
all_the_args(*args)   # 相当于 all_the_args(1, 2, 3, 4)
all_the_args(**kwargs)   # 相当于 all_the_args(a=3, b=4)
all_the_args(*args, **kwargs)   # 相当于 all_the_args(1, 2, 3, 4, a=3, b=4)
```

- 使用返回多个数值（返回值为元组类型）

```python
def swap(x, y):
    return y, x  # 用不带括号的元组的格式来返回多个数值
                 # (注意: 括号不需要加，但是也可以加)

x = 1
y = 2
x, y = swap(x, y)     # => x = 2, y = 1
# (x, y) = swap(x,y)  # 同上，括号不需要加，但是也可以加
```



