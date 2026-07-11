---
title: C++ 学习笔记
tags: C++, 编程
date: 2024-08-02
---

# C++ 学习笔记

+++

# 第一章 语言基础

### 1.1 C++的基本格式与常用方法

```c++
#include <iostream>
#include <bits/stdc++.h>
using namespace std;  //省去写std::
using ll = long long;
```

#### 1.2 VScode里一些常用快捷键

|       快捷键        |           效果            |
| :-----------------: | :-----------------------: |
|      ctrl + x       |  剪切此行（常用作删除）   |
|     alt + ⬆ / ⬇     |     将此行上移 / 下移     |
|      ctrl + /       |      /将此行变为注释      |
| alt + shift + ⬆ / ⬇ | 将此行复制到上面/下面一行 |

#### 1.3 循环中控制输出空格与换行

```c++
for(int i=1;i<=n;i++)
	cout<<a<<" \n"[i == n];  //仅在结束时输出换行
```

#### 1.4 简便输出struct中数

```c++
·struct node{
  int a,b,c,d,e,f,g;
  void init(){
    cin <<a<<b<<c<<d<<e<<f<<g;
  }aa;
}
int main(){
  aa.init();
}
```

#### 1.5 各种函数

|          函数          |                   效果                    |
| :--------------------: | :---------------------------------------: |
|      abs() fabs()      |                绝对值函数                 |
| sqrt() sqrtf() sqrtl() | 平方根函数返回 double  float  long double |

#### 1.6 三种控制方式

- **文件尾结束**控制 while(myinFile)
- **旗帜**控制 while(isdangerous)
- **哨兵**控制 while(n<9)

#### 1.7 C++中三种引用：

##### 1.7.1 返回引用：

```c++
char s[] = "Hello world";
  char &replace(int i){ 
    return s[i];
  }
```

##### 1.7.2 独立引用：

```c++
 void main(){
    int a = 1,b = 2;
    int &ref = a;    //使用时必须先初始化
    ref = 10;
    cout<<"new a: "<<a<<endl;
  }
```

##### 1.7.3 引用参数：

```c#
void swap(int &x, int &y){
    int tmp;
    tmp = x;
    x = y;
    y = tmp;
  }
```

#### 1.8 其他

- %只能对**整形**操作

- 运算符两侧类型不同时：**从低向高，从右向左**(仅当"="时)

- ##### 操作符重载

  void operator =(const Myclass &original);
  
  
  
  void Myclass::operator =(const Myclass &original){
  
  a1 = original.a1 + 100;
  
  a2 = original.a2 + 100;
  
  }
  
  +++

## 二.cin 与 cout

### 2.1 自动判断变量类型

```c++
cin >> a >> b;   //输入a.b
cout << a << b;   //输出a.b
```

### 2.2 控制输出保留小数点位数、占位

```c++
 #include <iomanip>
  cout << fixed << setprecision(3) << a <<endl;   //保留3位小数，永久性 注意：会四舍五入！！  fixed 固定，防止输出科学计数法
  cout << setw(fieldwidth) << dataitem;   //输出占fieldwidth位空间(会在前补空格右对齐)，一次性
  cout << setw(4) << setfill('*') << left << p; //以*进行填充，左对齐，均为对后面的永久性操作
```

### 2.3 输入字符串

```c++
  string s; //string函数建立字符串变量

  getline(cin,s,#);  //遇到#停止读取，默认'\n'，会读下#，但不会放入s中

  cout << s;  //输入字符串(可读取空格)
		      //getline的返回值只要读到'\n'就是true，while(getline())需手动跳出循环

```

>    **notice 1**: cin输入字符串也是遇到空格就结束

>    **notice 2**: 理解cin >> s+1;   //从1开始输入

peek()

### 2.4 取消同步流

**作用**：优化程序运行时间

```c++
  ios::sync_with_stdio(0),cin.tie(0),cout.tie(0);
```

>   getchar() ，要**换成cin.get()** ；这个不知情的话，会在字符串题目造成许多困扰；

>   用了之后while(cin >> a) 这种就会变成**全结束后在同一输出**



### 2.5 跳过字符

```c++
cin.ignore(howMany, whatChar); 
```

> 忽略**前howMany**个字符 或 忽略**whatChar前**的字符（<u>谁先达到按照谁</u>）

## 三. string

### 3.1 声明与初始化

```c++
1> string str2=str1.substr(0,5);   //从str1中截取从0开始取5个字符

2> string str3(5,'A');        //使用重复的字符初始化字符串

3> char *arr = 'hello';

   string str4(arr);         //使用字符数组初始化
```

### 3.2 各种基本操作

####   3.2.1 使用printf输出string时要进行转化

```c++
  printf("%s",str.c_str());   //c_str()返回const char*类型字符串
```

#### 3.2.2 获取字符串长度

```c++
  1> int length = str.length();  

  2> int length2 = str.size();
```

#### 3.3.3 拼接字符串(+ 或 append())

```c++
1> string str3 = str2 + "," + str1;

2> str3 = str2.append(",").append(str1);
```

#### 3.3.4 字符串查找(find)

```c++
 size_t pos = str.find("world");  //返回第一个字符所在位置(不是迭代器！！),找不到时返回-1

  size_t pos = str.find("world", 3); //从位置3开始找
```

#### 3.3.5字符串替换(replace)

```c++
str.replace( , , );   //replace(起始位置,字符长度,"替换字符")；
```

####   3.3.6 提取子字符串(substr)

```c++
str.substr( , );     //substr(起始位置,字符长度);
```

####   3.3.7 字符串比较(< > compare)

```c++
  int result = str1.compare(str2);

  str1 > str2;
```

####  3.3.8 常用遍历string方法

- for循环枚举(迭代器)

- auto枚举  (&表示取引用类型，此时修改会改变原来值)

  ```c++
  for(auto i : str)
    {
      cout << i;
      i = 'a';  //此处修改无效
    }
    for(auto &i : str)  //多个用（auto &[x,y] : str)
    {
      cout << i;
      i = 'a';  //此处修改会改变str值
    }
  ```


  //位置获取

  x = prev(x) //获取x位置的前一个

  x = next(x) //获取下一个

## 四.常用库函数

###   4.1 排序 sort

- **sort(**起始地址，结束地址的下一位，*比较函数**);**  //默认**从小到大**排序

- **自定义比较函数**

  ```c++
  bool cmp(const int &a,const int &b)
    {
      return a>b;
    }
    sort(  ,  ,cmp);  //此处即按照从大到小排序
    //也可以使用匿名函数（即仅用一次）(将cmp换为 [](int ,int ){ return  }; )
  ```

###   4.2 最值查找

#### 4.2.1 min和max函数

- 只能传入两个值或传入一个列表

  ```c++
  min(3,4)=3
  max({1,2,3,4})=4
  ```

#### 4.2.2 min_element和max_element函数

```c++
  min_element(st,ed);//返回[st,ed)中最小的地址(迭代器)

  vector<int> v ={1,2,3,4,5};

  cout<< *max_element(v.begin(),v,end())<<'\n';  // *将地址转为数字
```

#### 4.2.3 nth_element函数

```c++
  nth_element(st,k,ed);

  //k号位置的参数是正确的，其他地址的参数随意排列，但前面的都小于它，后面的都大于它
```

###   4.3 二分查找

> 前提：**·1·** 只能对数组  **·2·** 默认单调不减

####   4.3.1 binary_search函数

```c++
//返回bool值

  binary_search(st,target,ed);

  2> lower_bound和upper_bound

  //前提:数组必须非降序

  lower_bound(st,ed,x);//返回[st,ed)中第一个大于等于x的地址

  upper_bound(st,ed,x);//返回[st,ed)中第一个大于x的地址

 ·得到下标：返回地址-首地址
```

####   4.3.2大小写转换

#####   1> islower和isupper函数

- 返回bool类型，**判断是否大小写字母**

#####   2> tolower与toupper函数

- 将小写转大写，大写转小写

#####   3> ascii码

####   4.3.5 全排列

- **next_permutation() **函数

  按照字典序生成下一个排列，返回ture，若已是最大的排列，则生成第一个排列并返回false

- **prev_permutation()** 函数

    与next相反，生成上一个排列

#### 4.3.6 其他库函数

#####   1> memset() 函数

```c++
 int arr[10];
 memset(arr,0,sizeof(arr));  //对数组arr进行初始化(一般只能初始化 0 和 -1 )
```

>  **notice:** memset会对每个字节赋值, 因此对于非char类型可能会产生未定义的行为

#####   2> swap()

>  **交换**任意类型变量

```c++
  int a=10,b=20;

  swap(a,b);
```

#####   3> reverse()

> 用于**反转**容器中元素顺序

```c++
  int arr[5];
  reverse(arr,arr+5);
```

#####   4> unique()

> 用于**去除容器中相邻重复元素**，返回一个指向去重后范围的尾后迭代器

```c
int a[10]={1,1,2,2,2,3,3,4,4,5};
  auto it=unique(a,a+10);   //此时a变为{1,2,3,4,5,1,2,2,3,4},返回it为5后面1的迭代器
```

## 五.文件读写

### 5.1 代码

```c++
  #include<fstream>

  ifstream myInfile; // declarations  创建ifstream对象

  ofstream myOutfile;

  myInfile.open(“A:\\myIn.dat”); // open files

  myOutfile.open(“A:\\myOut.dat”);

  myInfile.close( ); // close files

  myOutfile.close( );
```

### 5.2 在**运行时输入**打开的文件名

  ```c++
\#include <string> // contains conversion function c_str

  ifstream inFile;

  string fileName;

  cout << “Enter input file name : “ << endl ; // prompt

  cin >> fileName ;

  // convert string fileName to a C string type

  inFile.open( fileName.c_str( ) );
  ```

### 5.3 **ofstream** 类的主要成员函数:

| 函数       | 效果                           |
| ---------- | ------------------------------ |
| open()     | 打开文件                       |
| close()    | 关闭文件                       |
| is_open()  | 检查文件是否已经成功打开       |
| good()     | 检查文件流是否处于一个有效状态 |
| bad()      | 检查文件流是否处于一个错误状态 |
| operator<< | 将数据写入到文件流中           |
| seekp()    | 设置写入位置                   |
| flush()    | 刷新输出缓冲区                 |
| rdbuf()    | 获取缓冲区指针                 |

### 5.4 **ifstream类**的主要成员函数:

| 函数       | 效果                               |
| ---------- | ---------------------------------- |
| open()     | 打开文件                           |
| close()    | 关闭文件                           |
| is_open()  | 检查文件是否已经成功打开           |
| good()     | 检查文件流是否处于一个有效状态     |
| bad()      | 检查文件流是否处于一个错误状态     |
| operator>> | 从文件流中读取数据                 |
| tellg()    | 返回当前文件指针的位置（读取位置） |
| seekg()    | 设置读取位置                       |
| peek()     | 查看下一个字符，但不提取它         |
| ignore()   | 忽略一定数量的字符                 |

## 六.STL

###  6.1 pair

- 作为容器储**存一对值**

  ```c 
    pair<T1,T2> p1(1,3.14);  //T1,T2为pair中第一第二个值的类型
  ```

#####   6.1.1 嵌套使用

```c++
pair<int,pair<int,int>> p2(3,make_pair(6,7));  //这样p2便可储存三个值
```

#####   6.1.2 访问成员变量

```c++
  cout<<p1.firt<<' '<<p1.second<<' '<<p2.second.first<<endl;//输出：1 3.14 6
```

#####   6.1.3 pair自带排序规则

  sort()   //按照**first成员升序排序**，若相同则按照second

###   6.2 vector

- 动态数组容器，储存一系列相同数组元素

  ```c++
  vector<T> vec(size);  //T为vec数组储存元素类型
  ```

####   6.2.1 vector的常用函数

| 函数           | 效果                                                   |
| -------------- | ------------------------------------------------------ |
| push_back()    | 将元素添加到vector末尾                                 |
| pop_back()     | 删除vector末尾元素                                     |
| begin()和end() | 返回vector指向第一个元素和最后一个元素之后位置的迭代器 |
| erase()        | 删除某个位置或某段元素                                 |
| empty()        | 检查向量是否为空                                       |
| clear()        | 清空向量                                               |
| size()         | 获取向量中元素数量                                     |

####   6.2.2 vector排序去重

```c++
排序: sort(vec.begin(),vec.end());

去重: auto last = unique(vec.begin(),vec.end());
     		 vec.erase(last,vec.end());  //当然，也可以直接将unique嵌套入erase中
```

#### 6.2.3 c++使用vector创建二维数组的方法

- 此种方法适用于每一行的列数都相等的二维数组的定义（与初始化）。

- 使用vector一次性完成二维数组的定义（注意：此种方法适用于每一行的列数相等的二维数组）

    ```c++
vector<vector<int>> matrix(m, vector<int>(n, -1));
    ```

- 以下是拆分理解

  ```c++
  //创建一维数组matirx，这个数组里有m个元素，元素是int型vector。
      vector<vector<int>> matrix(m);
  
  //除了定义数组类型及数组大小外，同时给数组中的元素赋值：将元素赋值为大小为n的int型vector。
      vector<vector<int>> matrix(m, vector<int>(n));
  
  //除了定义数组类型、数组大小、列的大小，同时给数组列中的元素（或者说，数组中的所有元素）赋值为-1。
      vector<vector<int>> matrix(m, vector<int>(n, -1));
  ```

### 6.3 list

- 双向链表容器(双向性，动态大小，不连续存储)

- 插入元素时间复杂度低，读取复杂度高

  ```c++
    list<int> mylist;
  ```

####    6.3.1 常用函数

  · push_back(): 将元素插入到链表的末尾

  · push_front(): 将元素插入到链表的开头

  · pop_back(): 移除链表末尾的元素

  · pop_front(): 移除链表开头的元素

  · size(): 返回链表中元素的个数

  · empty(): 检查链表是否为空6.

  · clear(): 清空链表中的所有元素

  · front(): 返回链表中第一个元素的引用

  · back(): 返回链表中最后一个元素的引用

  · begin(): 返回指向链表第一个元素的迭代器

  · end():返回指向链表末尾的下一个位置的迭代器

  · insert()在指定位置之前插入一个或多个元素

  · erase():从链表中移除指定位置的一个或多个元素

  · push_back(elem);//在容器尾部加入一个元素

  · pop_back();//删除容器中最后一个元素

  · push_front(elem);//在容器开头插入一个元素

  · pop_front();//从容器开头移除第一个元素

  · insert(pos,elem);//在pos位置插elem元素的拷贝，返回新数据的位置。

  · insert(pos,n,elem);//在pos位置插入n个elem数据，无返回值。

  · insert(pos,beg,end);//在pos位置插入[beg,end)区间的数据，无返回值。

  · clear();//移除容器的所有数据 erase(beg,end);//删除[beg,end)区间的数据，返回下一个数据的位置。

  · erase(pos);//删除pos位置的数据，返回下一个数据的位置。

  · remove(elem);//删除容器中所有与elem值匹配的元素。

### 6.4 stack

- **先进后出**的数据结构

- stack不能遍历

```c++
stack<int> mystack;
```

|  函数   |        效果        |
| :-----: | :----------------: |
| push()  |  在栈顶插入元素 x  |
|  pop()  |    弹出栈顶元素    |
|  top()  |    返回栈顶元素    |
| empty() |   检查栈是否为空   |
| size()  | 返回栈中元素的个数 |

- **tips:** 将一个数组的元素依次放入栈，再依次取出，即可实现数组的翻转

### 6.5 queue

#### 6.5.1 queue队列

- **先进先出**的数据结构

|  函数   |         效果         |
| :-----: | :------------------: |
| push(x) |   在队尾插入元素 X   |
|  pop()  |     弹出队首元素     |
| front() |     返回队首元素     |
| back()  |     返回队尾元素     |
| empty() |   检查队列是否为空   |
| size()  | 返回队列中元素的个数 |

####  6.5.2 priority_queue优先队列

- **最大**的元素位于最前面

|  函数   |         效果         |
| :-----: | :------------------: |
| push(x) |   在队尾插入元素 X   |
|  pop()  |     弹出队首元素     |
|  top()  |     返回队首元素     |
| back()  |     返回队尾元素     |
| empty() |   检查队列是否为空   |
| size()  | 返回队列中元素的个数 |

  几种优先队列修改比较方法:

**·1·**

```c++
struct Compare {
   bool  operator()(int a,int b){
     //自定义的比较函数，按照逆序排列
     return a > b;
   }
 }

 int main(){
    priority_queue<int, vector<int>, Compare> pq;
 }
```

  **·2·**

```c++
auto compare = [](int a,int b){
    return a > b;
}
priority_queue<int, vector<int>, decltype(compare)> pq(compare);
```

  **·3·**

  如果元素类型比较简单, 可以直接用greater<T>来修改比较方法

```c++
priority_queue<int, vector<int>, greater<int>> pq;
```

#### 6.5.3 deque双端队列

- 允许两端进行高效的插入和删除

  push_front()  push_back()

  pop_front()  pop_back()

- 其余同queue

###   6.6 set

#### 6.6.1 set集合

- 存储一组**唯一**的元素，默认按照**升序**排序

| 函数          | 效果                                                         |
| ------------- | ------------------------------------------------------------ |
| insert(x)     | 插入x                                                        |
| erase(x)      | 去除x                                                        |
| find(x)       | 返回x位置的迭代器，没找到则返回end()                         |
| lower_bound() | 二分查找，返回第一个大于等于x的数，如果没找到，返回末尾的迭代器位置 |
| upper_bound() | 二分查找，返回第一个小于等于x的数，如果没找到，返回末尾的迭代器位置 |
| empty()       | 检查队列是否为空                                             |
| clear()       | 移除容器的所有数据                                           |

####  6.6.2 修改set比较方法

**·1·** greater<T>

```c++
set<int,greater<int>> myset;
```

**·2·** 仿函数

```c++
struct MyCompare {
    bool operator()(int& a,int& b) const {
      //自定义比较逻辑
      return a > b; //改为逆序
    }
};
int main(){
    set<int,MyCompare> mySet;
    mySet.insert(25);
} 
```

####   6.6.3 set的遍历

```c++
for(auto it=st.begin();it!=st.end();++it)
	cout<<*it<<' ';
```

 **multiset多重集合**

- 类似set，但**允许存储重复元素**

  **notice:** 使用erase(x)时会删掉全部的x, 因此使用st.erase(st.find(x))返回第一个x的迭代器

**unordered_set无序集合**

- 平均时间复杂度为O(1)，但也可退化为O(n)

  intsert() erase() find() count()(返回元素在集合中出现的次数)  size()

### 6.7 map

#### 6.7.1 map

- 关联容器，**储存一对键值对**，**根据键自动排序**，通过键查找对应值

- **映射**关系 x -> f(x)

```c++
map<int,string> mp = {{1, "cat"}};
map[2] = "dog";  //若已存在键2，覆盖
map.insert(make_pair(2, "dog"));  //若已存在键2，忽略
cout << mp[2] << endl;
```

  · count() 	统计元素个数(判断key是否存在)

  erase(成功返回1, 失败返回0) find count size begin end clear empty lower_bound upper_bound

**2> multimap**

  //类似map，允许多对相同键值对存在

**3> unordered_map**

  //无序

---

# 第二章 基础算法

## 一.基础算法

###   1.时空复杂度

####   1> 时间复杂度

  //衡量算法执行时间随输入规模增长的增长率

  O(n). O(log n). O(n^2)

####   2> 空间复杂度

###   2.枚举

  暴力枚举解空间

### 3.递归

指函数直接或间接调用自身的过程

![屏幕截图 2024-08-02 154431](/notes/cpp-notes/screenshot-2024-08-02.png)

### 4.进制转换

#### 4.1 任意进制转换为10进制

```c++
int x = 0;
for(int i=1; i<=n; ++i){
    x = x*k + a[i];
}
cout << x << endl;
```

#### 4.2 10进制转换为任意进制

```c++
int x;cin >> x;
while(x) a[++ cnt] = x % k, x/= k;
reverse(a+1, a+1+cnt);//翻转使高位在前
```

### 5.前缀和

#### 5.1 原理和特点

**prefix**表示前缀和，由一个用户输入的数组生成。

> 对于数组a[]（下标从1开始），**定义**前缀和数组prefix[]，满足：

​												<font size = 5>$prefix[i] = \sum_{j=1}^{i} a[j]$</font>

> 快速生成prefix：

​					<font size = 5>$prefix[i] = \sum_{j=1}^{i} a[j] + a[i] = prefix[i-1] + a[i]$</font>

> 求数组a[]的一段区间的和：

​									<font size = 5>$sum(l,r) = prefix[r] - prefix[l-1]$</font>

- **notice: ** prefix仅适用于a数组为静态数组。

#### 5.2 实现前缀和

```c++
for(int i=1; i<=n; ++ i)
    prefi[i] = prefix[i - 1] + a[i];
//求区间和
	sum(l,r) = prefix[r] - prefix[l-1]
```



# 数据结构

## 一. class

### 1.1 类模板

```c++
template <class Type> 
Type Abs(Type n)
{
	return n<0 ? -n : n;
}
int main(){
	cout << "Absolute value of -5 is " << Abs(-5);
	cout << endl;
	cout << "Absolute value of -5.6 is " << Abs(-5.6);
	cout << endl;
}
template <class List_entry>
List<List_entry> :: List( ) //这里加上<List_entry>
{
	count = 0;
}
```

### 1.2 基类和派生类

![派生类](/notes/cpp-notes/derived-class.png)

```c++
class Father{
protected:
	int a1;
private:
	int a2;
public:
	Father();
	void printFather();
	void printFather(Father & f);  //函数重载overload
};

Father::Father(){
	a1=1; 
	a2=2;
}
void Father::printFather(){ 
	cout<<a1<<" "<<a2;
}
void Father::printFather(Father & f){
	cout<<f.a1<<" "<<f.a2;
}
class Child:public Father{
protected:
	int b1;
private:
	int b2;
public:
	Child();
	void printChild();
//void printFather(Father & f); //函数重写 override
	void printChild(Child & c);
};
//重写后调用基类中函数需用域操作符::
//例：Chi.Father::printFather(Father & f);
```

### 1.3 友元函数

是在某类中说明的一个函数，**它不是该类的成员**，但允许访问该类的所有对象的私有成员和保护成员。

```c++
class Myclass{
	protected:
	int a1;
	private:
	int a2;
	public:
	Myclass();
	friend void printMyclass();   //它不是类的成员函数，所以没有this指针。
	friend void printMyclass(Myclass m);
};
void printMyclass(Myclass m){
	cout<<m.a1<<" "<<m.a2;
}
```

- 友元可直接访问对象的私有成员，省去调用类成员函数的开销，但破坏了类的封装和数据隐藏，因此不能滥用友元。

- 可以将一个**类**说明为另一个类的友元。

  ```c++
  class Stack;
  class Node{
  	friend Stack;
  	int entry;
  	Node *next;
  };  //这样写可以使Node进行一个半放开，仅Stack可以访问
  ```

- 友元关系**不**具有**传递性**和**交换性**。

### 1.4 虚函数

```c++
class base{
	int a;
public:
	void printbase(){cout<<"This is class base: printbase.\n";}
	virtual void vprint(){cout<<"This is class base: virtual function vprint.\n";}
	};
class derived: public base{
	int b;
public:
	void printbase(){cout<<"This is class derived: printbase.\n";} 
	//overwrite base's method.
	void vprint(){cout<<"This is class derived: virtual function vprint.\n";}
	void others(){cout<<"Others of class derived.\n";}
};
```

- 对于虚函数，程序在运行时，根据指针P所指向的实际对象，来调用该对象的成员函数。

- 派生类中的虚函数不再需要关键字Virtual修饰，但函数的原型必须完全匹配在基类中说明的原型，即参数个数和类型都需一致。

- 虚函数必须是所属类的成员函数，不能是友元。

**纯虚函数**

- 有时，基类不能为虚函数说明一个有意义的定义，可将其说明为纯虚函数，它的定义留给派生类来做。

- 包含纯虚函数的类称为抽象类，抽象类只能作为基类，不能说明抽象类的对象。

```c++
 virtual void draw() = 0; // 纯虚函数
```

