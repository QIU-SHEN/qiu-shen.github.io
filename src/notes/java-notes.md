---
title: Java学习笔记
tags: Java, 编程
date: 2026-03-28
---

# Java学习笔记

+++

## 一、一些前置知识

### 1.1 常用cmd命令

| 命令           | 效果                                                         |
| -------------- | ------------------------------------------------------------ |
| ·盘符名称+冒号 | D: 切换到D盘下                                               |
| ·dir           | 查看当前路径下文件信息                                       |
| ·cd            | 进入单级目录： cd 目录名                                     |
| ·cd            | 进入单级目录： cd 目录名<br />进入多级目录： cd D:\名\名<br />回退到上一级目录： cd..<br />回退到盘符根目录： cd\ |
| ·cls           | 清屏                                                         |

### 1.2 IDEA 常用快捷键

| **快捷键**                        | **功能效果**               |
| --------------------------------- | -------------------------- |
| main/psvm、sout、…                | 快速键入相关代码           |
| Ctrl + D                          | 复制当前行数据到下一行     |
| Ctrl + Y                          | 删除所在行，建议用Ctrl + X |
| Ctrl + ALT + L                    | 格式化代码                 |
| ALT + SHIFT + ↑ , ALT + SHIFT + ↓ | 上下移动当前代码           |
| Ctrl + / , Ctrl + Shift + /       | 对代码进行注释             |

步骤: 编写, 编译(javac), 运行(Java)

要求: 文件名称必须与代码的类名称一致

## 二、Java基础语法

### 2.1注释

```java
1.单行注释	
	//后面根解释文字
2.多行注释
    /*
    这里写注释文字
    可以写多行
    */
3.文档注释
    /**
    这里写文档注释
    也可以写多行，文档注释可以利用JDK的工具生成帮助文档
    */
```

|      快捷键      |             效果             |
| :--------------: | :--------------------------: |
|     Ctrl + /     | 单行注释（对当前行进行注释） |
| Ctrl + Shift + / |   对选中的代码进行多行注释   |

### 2.2 不同进制在Java程序中的书写格式

```java
System.out.pirntln('a'+1); //98
System.out.pirntln(0b01100001); //97
System.out.pirntln(0141); //97
System.out.pirntln(0x61); //97
```

### 2.3 数据类型详解

#### 2.3.1八种数据类型

```java
public class TypeDemo1 {
    public static void main(String[] args) {
        // 目标：掌握8种基本数据类型，用来定义变量。
        1> 整型
        byte number = 98;  //一字节
        System.out.println(number);

        short number2 = 9000;  //两字节

        int number3 = 12323232; // 默认  //四字节

        // 注意：随便写一个整型字面量，默认是int类型的，73642422442424虽然没有超过long的范围，但是它超过了本身int的范围了。
        // 如果希望随便写一个整型字面量是long类型的，需要在其后面加上L/l
        long number4 = 73642422442424L;  //八字节

        2> 浮点型
        //注意:
        //随便写一个小数字面量，默认当成double类型对待的，
        //如果希望这个小数是float类型的，需要在后面加上：F/f
        float score1 = 99.5F;  //四字节
        double score2 = 99.8; // 默认  //八字节

        3> 字符型
        char ch1 = 'a';  //二字节
        char ch2 = '中';
        char ch3 = '国';

        4> 布尔型
        boolean b1 = true;  //一字节
        boolean b2 = false;

        引用数据类型：String.
        // String代表的是字符串类型，定义的变量可以用来记住字符串。
        String name = "黑马";
        System.out.println(name);
    }
}
```

#### 2.3.2 自动类型转换

- **从低向高，从右向左**

- **表达式的自动类型转换**（==重要==）

  ```java
  1.多种数据类型参与运算，其结果以大的数据类型为准
  2.byte,short,char 三种类型数据在和其他类型数据运算时，都会转换为int类型再运算
  ```

- **强制类型转换**

  强制类型转换的原理，其实就是**强行把前面几个字节砍掉，但是有数据丢失的风险**。（java中必须进行）

  ```java
  int a = 20;
  byte b = (byte) a;  // ALT + ENTER 强制类型转换。
  ```

```java
问题1：下面的代码否有问题？
    byte x = 10;
    byte y = 30;
	x = x + y;  //这句代码有问题，因为两个byte类型数据相加，会提升为int类型;
	
问题2：下面的代码是否有问题？
	byte x = 10;
	byte y = 30;
	x+=y; //这句代码没有问题，因为这里有隐含的强制类型转换
		  //x+=y; 等价于 byte x = (byte)(x+y);
```

> **仅对于这八种数据类型**，当执行如下语句：
>
> ```java
> int a = 5;
> int b = a;
> ```
>
> 是将重新复制a的内容并将b指向此区域；而对于其他类型，是将变量直接指向a。

#### 2.3.3 命名规范

Java变量的基本命名法则：
	1、**以下划线、字母、美元符开头。**
	2、后面跟下划线、字母、美元符以及数字。
	3、 没有长度限制（但也不能太长！）。
	4、对大小写敏感（意思是大小写代表不同含义）

### 2.4 java的输入输出

#### 2.4.1 输入 Scanner

```java
【第1步】：在class类上导包：一般不需要我们自己做，idea工具会自动帮助我们 导包的。
	import java.util.Scanner;
	
【第2步】：得到一个用于键盘扫描器对象（照抄代码就行，固定格式）
	//Scanner是键盘扫描器对象(你就把它理解成一个东西)，这个东西有录入的功能
	//sc是给这个东西取的名字
	Scanner sc = new Scanner(System.in);

【第3步】：开始调用sc的功能，来接收用户键盘输入的数据。
	//sc这个东西有键盘录入整数的功能，这个功能的名字叫nextInt()
	//.表示表示调用的意思
	int age = sc.nextInt();
	System.out.println("我的年龄是:"+age);

	//sc这个东西还有键盘录入字符串的功能，这个功能的名字叫next
	String name = sc.next();
	System.out.println("我的姓名是:"+name);
```

|                            next()                            |                          nextLine()                          |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| 1、一定要读取到有效字符后才可以结束输入。<br /> 2、对输入有效字符之前遇到的空白，next() 方法会自动将其去掉。<br /> 3、只有输入有效字符后才将其后面输入的空白作为分隔符或者结束符。 next() 不能得到带有空格的字符串。 | 1、以Enter为结束符,也就是说 nextLine()方法返回的是输入回车之前的所有字符。<br /><br />2、可以获得空白。 |

#### 2.4.2 输出 

```java
public class test {
    public static void main(String[] args) {
        System.out.println(msg);//输出一个字符串并换行
        System.out.print(msg);//输出一个字符串不换行
        System.out.printf(format,msg);//格式化输出
    }
}
值得注意的是，由于println与print输出一个字符串，因此可以用+来将不同类型的变量一次性以字符串输出。
```

- println输出的内容自带\n，print不带\n。
- printf的格式化输出方式和C语言中的printf基本是一致的。

## 三、程序流程控制

### 3.1 分支结构

if switch	//注意switch不支持double、float、long double

### 3.2 循环结构

#### 3.2.1 for 与 foreach

for循环执行的次数是在执行前就确定的。语法格式如下：

```java
for(初始化; 布尔表达式; 更新) {
    //代码语句
}
```

foreach 语法格式如下：

```java
for(元素类型t 元素变量x : 遍历对象obj){ 
     引用了x的java语句; 
} 
```

switch:

可以作为switch参数数据类型的有：int、type、short、char、String、枚举**（整数、枚举、字符、字符串）**

不能作为switch参数的有：long、float、double、boolean、复杂的表达式

- 与c++中一致，不再赘述

### 3.3 随机数

```java
// 目标：掌握使用Random生成随机数的步骤。
// 1、导包。import java.util.Random; (idea会自动完成)
import java.util.Random;
public class RandomDemo1 {
    public static void main(String[] args) {
        // 2、创建一个Random对象，用于生成随机数。
        Random r = new Random();
        // 3、调用Random提供的功能：nextInt得到随机数。
        for (int i = 1; i <= 20; i++) {
            int data = r.nextInt(10); // 0 - 9
            System.out.println(data);
        }
    }
}
```

## 四、java数组

```java
int[] array = {20,10,80,60,90};
String[] names = {"牛二", "西门", "全蛋"};
```

### 4.1 定义和访问

#### 4.1.1 数组的静态初始化

**1. 静态初始化标准格式：**

```java
数据类型[] 变量名 = new 数据类型[]{元素1,元素2,元素3};
```

```java
//定义数组，用来存储多个年龄
int[] ages = new int[]{12, 24, 36}
//定义数组，用来存储多个成绩
double[] scores = new double[]{89.9, 99.5, 59.5, 88.0};
```

**2. 静态初始化简化格式**

Java语言的设计者为了简化定义数组的写法，还为静态初始化提供了一种简化写法

```java
数据类型[] 变量名 = {元素1,元素2,元素3};
```

```java
//以下两种写法是等价的。但是建议大家用第一种，因为这种写法更加普遍
int[] ages = {12, 24, 36};
int ages[] = {12, 24, 36};
```

#### 4.1.2 数组的元素访问

基本与c++中相同，而java中数组有更多功能：

```java
// 访问数组的元素个数：数组名.length
System.out.println(arr.length);

// 技巧：获取数组的最大索引: arr.length - 1(前提是数组中存在数据)
System.out.println(arr.length - 1);

int[] arr2 = {};
System.out.println(arr2.length - 1);
```

#### 4.1.3 数组的动态初始化

```java
//数据类型[]  数组名 = new 数据类型[长度];
int[] arr = new int[3];
```

- **notice:**

  a是一个变量，在栈内存中，**a**变量中存储的数据就是**10**这个值。

  **arr**也是一个变量，在栈中，存储的是数组对象在堆内存中的地址值。

**值得注意的是**，由于notice中第二点，我们在执行如下语句时:

```java
int[] arr1 = {11, 22, 33};
int[] arr2 = arr1;
```

会使多个变量（arr1, arr2）指向同一个数组，而不是新建一个数组。

## 五、方法

**方法是一种语法结构，它可以把一段代码封装成一个功能，以便重复调用。**

```java
//目标：掌握定义方法的完整格式，搞清楚使用方法的好处。
public class MethodDemo1 {
    public static void main(String[] args) {
        // 需求：假如现在很多程序员都要进行2个整数求和的操作。
        // 1、李工。
        int rs = sum(10, 20);
        System.out.println("和是：" + rs);

        // 2、张工。
        int rs2 = sum(30, 20);
        System.out.println("和是：" + rs2);
    }

    public static int sum(int a,int b) {
        int c = a + b;
        return c;
    }
}
```

其余操作与c++中函数相同。

## 六、面向对象 class

### 6.1 类对象

> **第一条**：一个代码文件中，可以写多个class类，但是只能有一个是public修饰，且public修饰的类必须和文件名相同。

假设文件名为`Demo1.java`，这个文件中假设有两个类`Demo1类和Student类`，代码如下

```java
//public修饰的类Demo1，和文件名Demo1相同
public class Demo1{
    
}

class Student{
    
}
```

> **第二条：**对象与对象之间的数据不会相互影响，但是多个变量指向同一个对象会相互影响。

### 6.2 this关键字

**哪一个对象调用方法方法中的this就是哪一个对象。**

![1662301823320](/notes/java-notes/1662301823320.png)

**通过this在方法中可以访问本类对象的成员变量。**（或者说必须用this来访问）

![1662303254161](/notes/java-notes/1662303254161.png)

### 6.3 构造器

#### 6.3.1 什么是构造器？

一种特殊的方法，但是这个方法没有返回值类型，方法名必须和类名相同。（与c++中**构造函数**大致相同）

![1662304435504](/notes/java-notes/1662304435504.png)

关于构造器的特点，我们记住一句话：**new 对象就是在执行构造方法**

#### 6.3.2 构造器的注意事项？

```java
1.在设计一个类时，如果不写构造器，Java会自动生成一个无参数构造器。
2.一定定义了有参数构造器，Java就不再提供空参数构造器，此时建议自己加一个无参数构造器。
```

- **可以这样调用构造函数：**

  ```java
  this(    ,    );
  ```

### 6.4 封装性

**合理隐藏、合理暴露**

#### 6.4.1 封装在代码中的体现

这里需要用到一个修饰符，叫private，**被private修饰的变量或者方法，只能在本类中被访问。**

![1662307191295](/notes/java-notes/1662307191295.png)

**这时只能通过对外暴露的方法去对score进行修改或读取。**

### 6.5 实体JavaBean

#### 6.5.1 什么是实体类？

![1662335204398](/notes/java-notes/1662335204398.png)

所以实体类仅仅只是**用来封装数据**用的。

仅仅只用来封装数据，而对数据的处理交给其他类来完成，以实现数据和数据业务处理相分离。

### 6.6 其他注意

值得注意的是，当我们想要用类来创建数组时：

```java
Movie [] movies = new Movie[3];
```

这里只这样写仅仅创建了三个栈内存中的变量，指向为null，因此我们需要对这三个变量进行初始化：

```java
for (int i = 0; i < 3; i++) {
	movies[i] = new Movie();
}
```

- 抽象类：有方法未实现，定义为抽象类

## 七、Java常用API

### 7.1 包

包其实类似于文件夹，一个包中可以放多个类文件。如下图所示

![1662605881879](/notes/java-notes/1662605881879.png)

建包的语法格式：

```java
//类文件的第一行定义包
package com.itheima.javabean;

public class 类名{
    
}
```

**2. 在自己的程序中，调用其他包中的程序，需要注意下面一个问题**

- 如果当前程序中，要调用自己所在包下的其他程序，可以直接调用。（同一个包下的类，互相可以直接调用）

- 如果当前程序中，要调用其他包下的程序，则必须在当前程序中导包, 才可以访问！

  导包格式：` import 包名.类名`

- 如果当前程序中，要调用Java.lang包下的程序，不需要我们导包的，可以直接使用。

- 如果当前程序中，要调用多个不同包下的程序，而这些程序名正好一样，此时默认只能导入一个程序，另一个程序必须带包名访问。

### 7.2 String类

#### 7.2.1 如何创建String类对象

```java
String s1 = "abc"; //这里"abc"就是一个字符串对象，用s1变量接收
```

第二种方式

![1662608166502](/notes/java-notes/1662608166502.png)

```java
String rs1 = new String();
System.out.println(rs1); // ""

String rs2 = new String("itheima");
System.out.println(rs2);

char[] chars = {'a', '黑', '马'};
String rs3 = new String(chars);
System.out.println(rs3);

byte[] bytes = {97, 98, 99};
String rs4 = new String(bytes);
System.out.println(rs4);
```

#### 7.2.2 String类的常用方法

![1662609378727](/notes/java-notes/1662609378727.png)

#### 7.2.3 String的注意事项

- **注意事项1：String类的对象是不可变的对象**

![1662610347618](/notes/java-notes/1662610347618.png)

- **注意事项2：字符串字面量和new出来字符串的区别**

1. 只要是以`“...”`方式写出的字符串对象，会存储到字符串常量池，且相同内容的字符串只存储一份。如下图一所示
2. 但通过`new`方式创建字符串对象，每new一次都会产生一个新的对象放在堆内存中。如下图二所示

![1662618688215](/notes/java-notes/1662618688215.png)

![1662618651517](/notes/java-notes/1662618651517.png)

- **注意事项3：根据2的特性，我们来说明 == 与 equal() 的区别**

   **"=="操作符的作用**：

  1、用于基本数据类型的比较

  2、判断引用是否指向堆内存的同一块地址。

  **equals的作用：**

  用于判断两个变量是否是对同一个对象的引用，即堆中的内容是否相同，返回值为布尔类型

**String类型比较不同对象内容是否相同，应该用equals，因为==用于比较引用类型和比较基本数据类型时具有不同的功能。**

```java
String s1 = new String("java");
String s2 = new String("java");
 
System.out.println(s1==s2);            //false
System.out.println(s1.equals(s2));    //true
```

### 7.3 ArrayList类

- 集合是大小可变的，想要存储几个元素就存储几个元素

#### 7.3.1 ArrayList常用方法

![1662620389155](/notes/java-notes/1662620389155.png)

```java
ArrayList<String> list = new ArrayList<String>();
//创建一个ArrayList的集合对象
list.add("java");
list.add(1, "MySQL");//往集合中的某个索引位置处添加一个数据
```

## 八、面向对象高级

### 8.1 静态

#### 8.1.1 static修饰成员变量

Java中的成员变量按照有无static修饰分为两种：**类变量、实例变量**。

![1663977705413](/notes/java-notes/1663977705413.png)

由于静态变量是属于类的，只需要通过类名就可以调用：**`类名.静态变量`**

实例变量是属于对象的，需要通过对象才能调用：**`对象.实例变量`**

#### 8.1.2 static修饰成员方法

成员方法根据有无static也分为两类：**类方法、实例方法.**

![1664004813041](/notes/java-notes/1664004813041.png)

#### 8.1.3 工具类

> 如果一个类中的方法**全都是静态**的，那么这个类中的方法就全都可以被类名直接调用，由于调用起来非常方便，就像一个工具一下，所以把这样的类就叫做**工具类**。

> 在补充一点，工具类里的方法全都是静态的，推荐用类名调用。为了**防止使用者用对象调用**，我们可以把工具类的构造方法私有化。

```java
public class MyUtils{
    //私有化构造方法：这样别人就不能使用构造方法new对象了
    private MyUtils(){
        
    }
    
    //类方法
    public static String createCode(int n){
       ...
    }
}
```

#### 8.1.4 static的注意事项

![1664007168869](/notes/java-notes/1664007168869.png)

```java
public class Student {
    static String schoolName; // 类变量
    double score; // 实例变量

    // 1、类方法中可以直接访问类的成员，不可以直接访问实例成员。
    public static void printHelloWorld(){
        // 注意：同一个类中，访问类成员，可以省略类名不写。
        schoolName = "黑马";
        printHelloWorld2();

        System.out.println(score); // 报错的
        printPass(); // 报错的

        ystem.out.println(this); // 报错的
    }
    
	// 类方法
    public static void printHelloWorld2(){

    }
    
    // 实例方法
    public void printPass2(){

    }
    
    // 实例方法
    // 2、实例方法中既可以直接访问类成员，也可以直接访问实例成员。
    // 3、实例方法中可以出现this关键字，类方法中不可以出现this关键字的
    public void printPass(){
        schoolName = "黑马2"; //对的
        printHelloWorld2(); //对的

        System.out.println(score); //对的
        printPass2(); //对的

        System.out.println(this); //对的
    }
}
```

#### 8.1.5 static应用（代码块）

代码块根据有无static修饰分为两种：**静态代码块、实例代码块**

1> 静态代码块：

![1664007549583](/notes/java-notes/1664007549583.png)

- 重点注意：**静态代码块，随着类的加载而执行，而且只执行一次。**

2> **实例代码块**

![1664008215853](/notes/java-notes/1664008215853.png)

- 实例代码块：实例代码块会执行在每一个构造方法之前

### 8.2 继承

#### 8.2.1 继承快速入门

![1664009338913](/notes/java-notes/1664009338913.png)

这里我们只需要关注一点：**子类对象实际上是由子、父类两张设计图共同创建出来的。**

关于继承的好处我们只需要记住：**继承可以提高代码的复用性**

#### 8.2.2 权限修饰符

public（公有的）、private（私有的）、protected（受保护的）、缺省的（不写任何修饰符）。

![1664012151488](/notes/java-notes/1664012151488.png)

#### 8.2.3 单继承、Object

**Java语言只支持单继承，不支持多继承，但是可以多层继承**。

在Java中，子类**可以通过多层继承关系来调用父类的父类的方法**。

Java 类默认继承 Java.lang.Object

```java
class A {} //extends Object{}
class B extends A{}
// class C extends B , A{} // 报错
```

#### 8.2.4 方法重写

当子类觉得父类方法不好用，或者无法满足父类需求时，子类可以重写一个方法名称、参数列表一样的方法，去覆盖父类的这个方法，这就是方法重写。

> **注意：重写后，方法的访问遵循就近原则**。

```java
- 1.重写的方法上面，可以加一个注解@Override,用于标注这个方法是复写的父类方法
- 2.子类复写父类方法时，访问权限必须大于或者等于父类方法的权限
	public > protected > 缺省
- 3. 重写的方法返回值类型，必须与被重写的方法返回值类型一样，或者范围更小
- 4. 私有方法、静态方法不能被重写，如果重写会报错。
```

#### 8.2.4子类中访问成员的特点

- **原则：在子类中访问其他成员（成员变量、成员方法），是依据就近原则的**
- 如果子类和父类出现同名变量或者方法，优先使用子类的；此时如果一定要在子类中使用父类的成员，可以加this或者super进行区分。

> **super和this有什么区别?**

***super\***是一个关键字，代表父类的**存储空间标识**。(可以理解为父亲的引用)

super和this的用法相似。

this代表**对象的引用**(谁调用就代表谁)；
super代表**当前子类**对**父类**的引用。

**使用场景**

- 当子父类出现同名成员时，可以用super进行区分；
- 子类要调用父类构造函数时，可以使用super语句。

#### 8.2.5 子类中访问构造器的特点

> **子类中访问构造器的语法规则**

- 首先，子类全部构造器，都会先调用父类构造器，再执行自己。

  ![1664160225526](/notes/java-notes/1664160225526.png)

> **子类访问构造器的应用场景**

- 可以手动使用`super(参数)`调用父类有参数构造器。

  ![1664163881728](/notes/java-notes/1664163881728.png)

> **在本类中访问自己的构造方法**

```java
this(): 调用本类的空参数构造器
this(参数): 调用本类有参数的构造器
```

![1664170865036](/notes/java-notes/1664170865036.png)

> **注意：this和super访问构造方法，只能用到构造方法的第一句，否则会报错。**0

### 8.3 抽象类和接口

#### 8.3.1 抽象类

有方法未实现，定义为抽象类

抽象类就是为了继承而存在的，如果你定义了一个抽象类，却不去继承它，那么等于白白创建了这个抽象类，因为你不能用它来做任何事情。

```java
public abstract class Shape{
	int area;
    public abstract void cakArea();
}
```

- 抽象类关键字**abstract**声明

- 抽象类**不能**用来**创建对象**；
- 如果一个类继承于一个抽象类，则子类**必须实现父类的抽象方法**。如果子类没有实现父类的抽象方法，则必须将子类也定义为为 abstract 类。

#### 8.3.2 接口

> 如果类的所有方法都没有实现，则这个类算作接口**interface**

接口不算类，或是特殊的类

```java
public interface Animal{
    public void eat();
    public void move();
}
```



- 一个类只能继承一个抽象类，而一个类却可以实现多个接口。

- 抽象类可以提供成员方法的实现细节，而接口中只能存在public abstract 方法；

- 抽象类有构造函数，接口没有

### 8.4 转型、多态和契约设计

#### 8.4.1 类转型

- 变量支持相互转化，如int a = (int)3.5
- 有继承关系的类可以相互转型：只有子类可以转换为父类（**向上转型**）

```java
Human obj1 = new Man();
```

- 父类转为子类的一种例外：即这个父类本身是由子类转化过来

```java
Human obj1 = new Man();
Man obj2 = (Man) obj1;
```

#### 8.4.2 多态和契约设计

类型转换，带来的作用就是多态。

• 子类继承父类的所有方法，但子类可以重新定义一个名字、

参数和父类一样的方法，这种行为就是重写。

• 子类的方法的优先级高于父类的。

继承链中对象方法的调用的优先级：this.show(O)、super.show(O)、this.show((super)O)、super.show((super)O)。

**多态的作用**

–**以统一的接口来操纵某一类中不同的对象的动态行为**

–**对象之间的解耦**

**契约设计：**类不会直接使用另外一个类，而是采用接口的

形式，外部可以“空投”这个接口下的任意子类对象
