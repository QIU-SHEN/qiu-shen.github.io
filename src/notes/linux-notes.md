---
title: linux学习笔记
tags: Linux, 命令行
date: 2024-10-11
---

# linux学习笔记

---

## 一、Linux 常用shell命令

### 1.1命令结构

![1.1](/notes/linux-notes/1.1.png)

- **查看命令的帮助信息**，了解参数的功能：

  • man 命令名

  • 命令名 --help

  • info 命令名

### 1.2 echo

**功能**：显示变量、字符

**转义字符**：（选项 -e）\a, \c, \n, \t 

**示例**：

![1.2](/notes/linux-notes/1.2.png)

### 1.3 uname

**功能**：显示操作系统信息

**主要选项**：

- -a 或 --all   显示全部的信息，包括内核名称、主机名、操作系统版本、处理器类型和硬件架构等。

- -n 或 --nodename 　显示主机名。
- -r 或 --release 　显示内核版本号。
- -s 或 --sysname 　显示操作系统名称。

### 1.4 who

**功能**：查看当前登录用户信息

**主要选项**：

- -a 或 --all    显示全部的信息 
- -b 或 --boot   time of laast system boot

### 1.5 date

**功能**：显示系统日期

**主要选项**：

- -d, --date=STRING：通过字符串显示时间。
- -s, --set=STRING：根据字符串设置系统时间。

## 二、Linux 文件

### 2.1 在Linux中，一切都是文件

- 内核、shell都是文件

#### 2.1.1 文件分类

- 普通文件：仅包含字符流的数据文件（文本文件、二进制文件）

- 目录文件：文件夹和子目录的详细信息（文件名和inode号）

- 设备文件：代表设备，完成对设备的读取和写入操作

#### 2.1.2 文件命名规则

- 字母和数字

- 符号：. , - , _ 

- 可以有扩展名，也可以没有

- 区分大小写

### 2.2 系统目录

/: 根目录（之后的/都是目录分隔符）

/home：用户目录

/bin: Unix常用命令，如bash, date, cat, tar等

/sbin: 管理员命令，如fdisk, mkfs等

/etc: 系统配置文件目录，如passwd, shadow（登录名和密码）等

/dev: 设备文件目录，如硬盘等

/lib: 库文件目录

/var: 可变文件目录，如打印和邮件等

/tmp: 临时文件目录

#### 路径

绝对路径名：从根目录开始

相对路径名：从当前目录开始

根目录: /

当前用户主目录: ~或者环境变量$HOME

当前目录：.

父目录：..

### 2.3 文件系统相关命令

#### 2.3.1 ls （list）

**命令功能**：列出文件

**命令格式**：ls option .. file .. 

**主要选项**：

- -a 显示以.开头的文件
- -F 用*标记可执行文件，用/标记目录，用@标记符号链接
- -l 以列表形式显示文件属性
- -t 按最后修改时间排序（降序）
- -u 按最后访问时间排序
- -r 逆序排序
- -R 递推显示子目录和文件

**示例**：

列出根目录(\)下的所有目录：

```shell
ls /
```

```shell
ls *.txt         # 列出所有扩展名为.txt的文件
ls file?.txt     # 列出文件名为file?.txt的文件，其中?表示任意一个字符
ls [abc]*.txt    # 列出以a、b或c开头、扩展名为.txt的文件
```

#### 2.3.2 cd (change directory)

**命令功能**：改变当前工作目录

**命令格式**：cd [dir]

**主要选项**：

- **换到绝对路径：**指定完整的目录路径来切换到目标目录。

```shell
cd /path/to/directory
```

- **切换到相对路径：**指定相对于当前目录的路径来切换到目标目录。

```shell
cd relative/path/to/directory
```

- **切换到上级目录：**使用 **..** 表示上级目录，可以通过连续多次使用 **..** 来切换到更高级的目录。

```shell
cd ..
cd ../../   # 切换到上上级目录
```

- **切换到用户主目录（home）：**使用 **~** 表示当前用户的主目录，可以使用 cd 命令直接切换到主目录。

```shell
cd ~
```

- **切换到上次访问的目录：**使用 **cd -** 可以切换到上次访问的目录。

```shell
cd -
```

- **切换到环境变量指定的目录：**可以使用环境变量来指定目标目录，并使用 **cd** 命令切换到该目录。

```shell
cd $VAR_NAME
```

#### 2.3.3 mkdir (make directory)

**命令功能**：创建目录（文件夹）

**主要选项**：

在工作目录下，建立一个名为 runoob 的子目录 :

```shell
mkdir runoob
```

在工作目录下的 runoob2 目录中，建立一个名为 test 的子目录。

若 runoob2 目录原本不存在，则建立一个。（注：**本例若不加 -p 参数，且原本 runoob2 目录不存在，则产生错误。**）

```shell
mkdir -p runoob2/test
```

#### 2.3.4 rmdir (remove directory)

**命令功能**：删除空目录

**常用选项**：**-p** 删除空目录树

- 将工作目录下，名为 AAA 的子目录删除 :

- ```shell
  rmdir AAA
  ```

- 在工作目录下的 BBB 目录中，删除名为 Test 的子目录。**若 Test 删除后，BBB 目录成为空目录，则 BBB 亦予删除**。

- ```shell
  rmdir -p BBB/Test
  ```

#### 2.3.5 cp (copy)

**命令功能**：复制文件

**命令格式**：cp [options] source dest

**常用选项**：

- -b 为已存在目标文件创建备份

- -n 不覆盖已有目标文件

- -i 覆盖时询问

- -R 递推复制子目录和文件

将文件 file.txt 复制到目录 /path/to/destination/ 中：

```shell
cp file.txt /path/to/destination/
```

使用指令 **cp** 将当前目录 **test/** 下的所有文件复制到新目录 **newtest** 下，输入如下命令：

```shell
cp –r test/ newtest          
```

注意：用户使用该指令复制目录时，必须使用参数 **-r** 或者 **-R** 。

复制文件，并在目标文件已存在时进行确认：

```shell
cp -i file.txt /path/to/destination/
```

#### 2.3.6 mv (move)

**命令功能**：移动文件，重命名文件

**命令格式**:   mv [options] source... directory

##### **常用选项**：

- -b 为已存在目标文件创建备份

- -n 不覆盖已有目标文件

- -i 覆盖时询问

将文件 aaa 改名为 bbb :

```shell
mv aaa bbb
```

将 info 目录放入 logs 目录中。注意，如果 logs 目录不存在，则该命令将 info 改名为 logs。

```shell
mv info/ logs 
```

再如将 **/usr/runoob** 下的所有文件和目录移到当前目录下，命令行为：

```shell
mv /usr/runoob/*  . 
```

#### 2.3.7 rm (remove)

**命令功能**：删除文件

**命令格式**：rm [options] name...

**常用选项**：

- -f 强制删除

- -i 删除时询问

- -R 递推删除子目录和文件

删除文件可以直接使用rm命令，若删除目录则必须配合选项"-r"，例如：

```shell
rm  test.txt 
rm：是否删除 一般文件 "test.txt"? y  
rm  homework  
rm: 无法删除目录"homework": 是一个目录  
rm  -r  homework  
rm：是否删除 目录 "homework"? y 
```

删除当前目录下的所有文件及目录，命令行为：

```shell
rm  -r  * 
```

文件一旦通过rm命令删除，则无法恢复，所以必须格外小心地使用该命令。

#### 2.3.8 cat (concatenation)

**命令功能**：在shell中显示文件内容

**命令格式**：cat [选项] [文件]

- `-n`：显示行号，会在输出的每一行前加上行号。
- `-b`：显示行号，但只对非空行进行编号。
- `-s`：压缩连续的空行，只显示一个空行。
- `-E`：在每一行的末尾显示 `$` 符号。
- `-T`：将 Tab 字符显示为 `^I`。
- `-v`：显示一些非打印字符。

**使用说明：**

- 显示文件内容：`cat filename` 会将指定文件的内容输出到终端上。
- 连接文件：`cat file1 file2 > combined_file` 可以将 file1 和 file2 的内容连接起来，并将结果输出到 combined_file 中。
- 创建文件：可以使用 `cat` 命令来创建文件，例如 `cat > filename`，然后你可以输入文本，按 `Ctrl+D` 来保存并退出。
- 在终端显示文件：可以将 `cat` 与管道（`|`）结合使用，用来显示其他命令的输出，例如 `ls -l | cat` 会将 `ls -l` 的输出通过 `cat` 打印到终端上。

##### **查看文件内容：**

显示文件 filename 的内容。

```shell
cat filename
```

##### **创建文件：**

将标准输入重定向到文件 filename，覆盖该文件的内容。

```shell
cat > filename
```

##### **追加内容到文件：**

将标准输入追加到文件 filename 的末尾。

```shell
cat >> filename
```

##### **连接文件：**

将 file1 和 file2 的内容合并到 file3 中。

```shell
cat file1 file2 > file3
```

##### **显示多个文件的内容：**

同时显示 file1 和 file2 的内容。

```shell
cat file1 file2
```

#### 2.3.8 tar (tape archiver)

**命令功能**：存档管理

**命令格式**：tar [options]  [files...]

**常用选项**：

- -c 创建存档

- -x 提取存档

- -t 显示存档中的文件

- -f 指定存档名称

- -v 显示执行过程

- -z 同时使用gzip压缩文档

##### **1、创建归档文件：**

将文件 file1、file2 和 directory 打包到一个名为 archive.tar 的归档文件中。

```
tar -cvf archive.tar file1 file2 directory
```

- `-c`: 创建新的归档文件
- `-v`: 显示详细输出，列出被添加到归档中的文件
- `-f`: 指定归档文件的名称

##### **2、解压归档文件：**

解压名为 archive.tar 的归档文件，还原其中包含的文件和目录。

```
tar -xvf archive.tar
```

- `-x`: 解压归档文件
- `-v`: 显示详细输出，列出被解压的文件
- `-f`: 指定要解压的归档文件的名称

##### **3、压缩归档文件：**

将名为 directory 的目录打包成一个归档文件，然后使用 gzip 进行压缩，生成名为 archive.tar.gz 的文件。

- `-c`: 创建新的归档文件
- `-z`: 使用 gzip 压缩归档文件
- `-v`: 显示详细输出，列出被添加到归档中的文件
- `-f`: 指定归档文件的名称

##### **4、列出归档文件中的内容：**

列出名为 archive.tar 的归档文件中包含的所有文件和目录。

```
tar -tvf archive.tar
```

- `-t`: 列出归档文件中的内容
- `-v`: 显示详细输出，列出归档文件中的所有文件和目录
- `-f`: 指定要列出内容的归档文件的名称

##### **5、追加文件到已存在的归档中：**

将名为 newfile 的文件添加到已存在的名为 archive.tar 的归档文件中。

```
tar -rvf archive.tar newfile
```

- `-r`: 向已存在的归档中追加文件
- `-v`: 显示详细输出，列出被添加到归档中的文件
- `-f`: 指定已存在的归档文件的名称

##### **6、创建一个经过 gzip 压缩的归档文件：**

打包 directory 目录下的所有文件和子目录，并使用 gzip 压缩，生成名为 archive.tar.gz 的归档文件。

```
tar -zcvf archive.tar.gz directory
```

- `-z`: 表示要使用 gzip 进行压缩。
- `-c`: 表示创建新的归档文件。
- `-v`: 表示详细输出，列出被添加到归档中的文件。
- `-f archive.tar.gz`: 指定归档文件的名称为 `archive.tar.gz`。

##### **7、解压一个已经被 gzip 压缩的归档文件：**

解压 example.tar.gz 文件，并在当前目录下恢复其中包含的文件和目录。

```
tar -zxvf example.tar.gz
```

- `-z`: 表示要使用 gzip 解压归档文件。
- `-x`: 表示解压操作。
- `-v`: 表示详细输出，列出被解压的文件。
- `-f example.tar.gz`: 指定要解压的归档文件的名称为 `example.tar.gz`。

##### 指定压缩格式

tar 可以结合不同的压缩程序来创建和解压压缩归档文件。

**z** : 使用 gzip 压缩。

```
tar -czvf archive.tar.gz directory
tar -xzvf archive.tar.gz
```

**j**: 使用 bzip2 压缩。

```
tar -cjvf archive.tar.bz2 directory
tar -xjvf archive.tar.bz2
```

**J**: 使用 xz 压缩。

```
tar -cJvf archive.tar.xz directory
tar -xJvf archive.tar.xz
```

#### 2.3.9 gzip

**命令功能**：压缩文件，解压缩文件

**命令格式**：gzip [options] [file...]

**常用选项**：

- -d 解压缩

- -k 保留原文件

- -l 显示压缩文件内容

- -r 递推压缩子目录和文件

##### **压缩文件**

```
gzip example.txt
```

此命令会将 example.txt 压缩为 example.txt.gz，并删除原始文件 example.txt。

##### **保留原始文件**

如果希望在压缩后保留原始文件，可以使用 -k 选项：

```
gzip -k example.txt
```

此命令会保留原始的 example.txt 文件，并生成 example.txt.gz。

##### **解压缩文件**

要解压缩 .gz 文件，可以使用 -d 选项或直接使用 gunzip：

```
gzip -d example.txt.gz
```

或

```
gunzip example.txt.gz
```

这会将 example.txt.gz 解压缩为原始的 example.txt 文件。

##### **递归压缩目录**

你可以使用 -r 选项递归压缩整个目录：

```
gzip -r directory/
```

此命令会压缩 directory 目录下的所有文件，并保留目录结构。

##### **显示压缩文件信息**

使用 -l 选项可以查看 .gz 文件的详细信息：

```
gzip -l example.txt.gz
```

此命令会显示文件的原始大小、压缩后大小、压缩率等信息。

>  gzip 主要用于压缩单个文件。如果需要压缩多个文件或整个目录，通常先用 tar 归档，再用 gzip 压缩。例如：

```
tar -cvzf archive.tar.gz directory/
```

### 2.4 用户管理相关命令

#### 2.4.1 sudo

**命令功能**：暂时以root权限执行命令

**命令格式**：sudo 想要执行的命令

**命令说明**：使用时会要求输入当前用户的密码

#### 2.4.2 adduser

**命令功能**：添加新用户

**命令格式**：adduser 用户名

**命令说明**：

以交互方式简单方便的添加用户

为用户设定密码

为用户创建同名用户组和主目录

#### 2.4.3 passwd

**命令功能**：修改用户密码

**命令格式**：passwd [options] [username]

**常用选项**：

- -d 删除用户密码

- -l 锁定用户，阻止登录

- -u 解锁用户

#### 2.4.4 usermod

命令功能：编辑用户信息

命令格式：

常用选项：

-c 账号说明

-d 修改主目录

-s 修改默认shell

-g 修改主群组

-G 修改附加群组

-L 锁定用户，阻止登录

-U 解锁用户

#### 2.4.5 deluser

**命令功能**：删除用户

**命令格式**：

**常用选项**：

--group 删除用户组

--remove-home 删除用户主目录

--remove-all-files 删除系统中owner是该用户的所有文件

#### 2.4.6 su

**命令功能**：切换用户

**命令格式**：

**常见选项**：

- 复制当前环境变量

-c 以该用户身份执行一条命令，不切换用户

### 2.5 文件属性

![2.5](/notes/linux-notes/2.5.png)

#### 2.5.1 文件类型属性

\- 表示普通文件

d 表示目录

l 表示符号链接

#### 2.5.2 文件权限属性

r 可读，w 可写，x 可执行，- 无权限

**权限字符串**：9位字符串

• 前三位表示所有者权限

• 中三位表示用户组权限

• 后三位表示其他用户权限

#### 2.5.3 文件所有权

文件所有者可以修改文件权限

#### 2.5.4 文件大小

- 文件的字符数，与实际占用空间不同

- 目录的大小取决于所包含的文件名，显示的是预期值

#### 2.5.5 chmod(控制用户权限)

**命令功能**：改变文件权限

**命令格式**：chmod [option] mode file...

**常用选项**：-R 递推改变所有子目录和文件权限

**mode**：

| **类别**   | **操作**       | 权限 |
| ---------- | -------------- | ---- |
| u  用户    | + 增加权限     | r    |
| g 用户组   | - 删除权限     | w    |
| o 其他用户 | = 指定绝对权限 | x    |
| a 全部     |                |      |

**例**：

将文件 file1.txt 设为所有人皆可读取 :

```shell
chmod ugo+r file1.txt
chmod a+r file1.txt
```

将文件 file1.txt 与 file2.txt 设为该文件拥有者，与其所属同一个群体者可写入，但其他以外的人则不可写入 :

```shell
chmod ug+w,o-w file1.txt file2.txt
```

将目前目录下的所有文件与子目录皆设为任何人可读取 :

```
chmod -R a+r *
```

#### 2.5.6 八进制权限表示

**绝对权限指定**

读权限：4 （100）

写权限：2 （010）

执行权限：1 （001）

![2.5.6](/notes/linux-notes/2.5.6.png)

##### 默认普通文件权限

666 rw-rw-rw-

##### 默认目录权限

777 rwxrwxrwx

#### 2.5.7 umask

**命令功能**：设定默认权限

**命令格式**：umask [八进制权限掩码]

**作用**：最终权限 = 默认权限码 - 权限掩码

#### 2.5.8 chown (change owner)

**命令功能**：改变文件所有者

**命令格式**：chown [option] owner [:group] file...

需要superuser权限才能执行

**示例**：

把 /var/run/httpd.pid 的所有者设置 root：

```shell
chown root /var/run/httpd.pid
```

将当前前目录下的所有文件与子目录的拥有者皆设为 runoob，群体的使用者 runoobgroup:

```sh
chown -R runoob:runoobgroup *
```

#### 2.5.9 chgrp (change group)

**命令功能**：改变文件用户组所有权

**命令格式**：chgrp [option] [所属群组] [文件或目录...]

需要super user权限

#### 2.5.10 文件与inode

Linux支持多个文件系统

每个文件都使用inode编号与一个inode表格相关联

inode表格包含了文件的**属性**：

类型，权限，链接数，所有者，用户组，文件大小，修改时间

一个指向文件存储磁盘区块的指针数组

文件在一个文件系统中有唯一的inode编号

**使用 ls –i 命令查看文件inode编号**

#### 2.5.11 文件链接

一个文件可以有**多个文件名**，

称为一个文件有多个链接

可以**通过任意一个链接访问该文件**

#### 2.5.12 ln

**命令功能**：创建一个链接(是为某一个文件在另外一个位置建立一个同步的链接)

- 硬链接：创建一个具有相同inode编号的文件名

- 符号链接：创建一个拥有独立inode的文件指向链接的文件

**命令格式**：ln [参数] [源文件或目录] [目标文件或目录]

**常用选项**：

-s 创建符号链接

-f 强制创建链接（当链接名已被使用时）

**示例**：

给文件创建软链接，为log2013.log文件创建软链接link2013，如果log2013.log丢失，link2013将失效：

```shell
ln -s log2013.log link2013
```

输出：

```shell
[root@localhost test]# ll
-rw-r--r-- 1 root bin      61 11-13 06:03 log2013.log
[root@localhost test]# ln -s log2013.log link2013
[root@localhost test]# ll
lrwxrwxrwx 1 root root     11 12-07 16:01 link2013 -> log2013.log
-rw-r--r-- 1 root bin      61 11-13 06:03 log2013.log
```

给文件创建硬链接，为log2013.log创建硬链接ln2013，log2013.log与ln2013的各项属性相同

```shell
ln log2013.log ln2013
```

输出：

```shell
[root@localhost test]# ll
lrwxrwxrwx 1 root root     11 12-07 16:01 link2013 -> log2013.log
-rw-r--r-- 1 root bin      61 11-13 06:03 log2013.log
[root@localhost test]# ln log2013.log ln2013
[root@localhost test]# ll
lrwxrwxrwx 1 root root     11 12-07 16:01 link2013 -> log2013.log
-rw-r--r-- 2 root bin      61 11-13 06:03 ln2013
-rw-r--r-- 2 root bin      61 11-13 06:03 log2013.log
```

##### 硬链接的作用

可以在**文件实际位置发生变化时**使用链接访问文件

假设程序中引用了如下位置的文件：file/data.txt

之后该文件**被移动**到了新目录：newfile/data.txt

为了**避免修改程序**，可以在file目录中创建一个newfile/data.txt的硬链接

可以**防止意外删除**：使用rm命令只是删除了一个链接

##### 符号链接的作用

符号链接类似于windows系统中的**快捷方式**

创建一个指向该文件的**指针**文件

支持跨文件系统建立链接

**硬链接**：硬链接是一个指向文件数据的直接指针，也就是说，硬链接和它所链接的文件共享同一个inode。因此，硬链接和原始文件在文件系统中是**等价的**，删除其中一个不会影响另一个的访问。但是，**硬链接不能跨文件系统，也不能链接到目录。**

 **符号链接**：符号链接（也被称为软链接）是一个指向另一个文件路径的特殊文件。符号链接有自己的inode，和它所链接的文件的inode是**不同的**。如果删除了符号链接所指向的原始文件，符号链接将变成一个指向不存在的文件的无效链接。**符号链接可以跨文件系统，也可以链接到目录。**

#### 2.5.13 stat

**命令功能**：查看文件属性

**命令格式**：stat [option] [文件或目录]

**常用选项**：-f 查看文件系统属性

**示例**：

查看 testfile 文件的inode内容内容，可以用以下命令：

```shell
stat testfile
```

执行以上命令输出结果：

```shell
# stat testfile                #输入命令
  File: `testfile'
  Size: 102             Blocks: 8          IO Block: 4096   regular file
Device: 807h/2055d      Inode: 1265161     Links: 1
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2014-08-13 14:07:20.000000000 +0800
Modify: 2014-08-13 14:07:07.000000000 +0800
Change: 2014-08-13 14:07:07.000000000 +0800
```

#### 2.5.14 touch

**命令功能**：修改文件时间戳，创建空文件

**命令格式**：touch [option] [文件或目录…]

**常用选项**：

-a 只改变访问时间

-c 不创建文件

-m 只改变修改时间

-t 使用YYMMDDhhmm更新时间

**示例**：

使用指令"touch"修改文件"testfile"的时间属性为当前系统时间，输入如下命令：

```shell
touch testfile                #修改文件的时间属性 
```

- 使用指令"touch"时，如果指定的文件不存在，则将创建一个新的空白文件。

#### 2.5.15 wc (word count)

**命令功能**：计算行数、字数和字符数

**命令格式**：wc [option] [文件...]

**常用选项**：

-c 计算字符数

-l 计算行数

-w 计算字数

**示例**：

在默认的情况下，wc将计算指定文件的行数、字数，以及字节数。使用的命令为：

```shell
wc testfile wc testfile     # testfile文件的统计信息  
3 92 598 testfile       # 行数为3、单词数92、字节数598 
```

#### 2.5.16 find 

**命令功能**：查找文件

**命令格式**：find path –option expression

**常用选项**：

-name 按文件名查找

-perm XXX 按权限查找

-type f, d, l 按类型查找

-user 按所有者查找

-group 按用户组所有者查找

-ctime -x +x 按创建时间查找

**示例**：

查找当前目录下名为 file.txt 的文件：

```shell
find . -name file.txt
```

将当前目录及其子目录下所有文件后缀为 **.c** 的文件列出来:

```shell
find . -name "*.c"
```

将当前目录及其子目录中的所有文件列出：

```shell
find . -type f
```

### 2.6 Shell命令元字符

#### 2.6.1 通配符

- 用来表示文件名的某种模式

- 在解释时被替换成其他字符

![2.6.1](/notes/linux-notes/2.6.1.png)

#### 2.6.2 转义符

在处理文件名中出现通配符的文件时，常常需要用转义符来防止通配符起作用

**在通配符前使用一个**\\：

\\*        \?       \\[ \\]      

\\[Enter] 换行继续输入

**使用引号**

双引号：禁止通配符替换

单引号：禁止通配符、变量名和命令替换

#### 2.6.3 命令替换

反引号 \`命令\`：使用命令的结果来**替换**命令

echo –e “The user list is \n \`who\`”

echo The current time is \`date\`

$(命令）：整个替换成括号中命令的结果

echo The current time is $(date)
