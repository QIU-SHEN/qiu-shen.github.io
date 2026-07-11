---
title: Solidity学习笔记
tags: Solidity
date: 2026-03-28
---

# Solidity

 ```solidity
 pragma solodity ^0.8.0  //声明版本
 
 contract MyTest{  //声明合约名字 在大括号中编写所有代码
 
 }
 ```

## 数据类型

> 静态类型语言 声明变量时必须声明其类型

string bool uint int address

```solidity
pragma solodity ^0.8.0 

contract MyTest{
	string name = "Bob";
	string private name4 = "David"; //只能在合约内部访问
	string internal name3 = "Tom";  //可在合约内部访问 可被继承
		string public name2 = "Alice";  //可在合约内外部和被继承的合约中访问 
}
```

## 函数

```solidity
pragma solodity ^0.8.0 

contract MyTest{
	string name = "Bob";
	//写入函数
	//public表示可以在合约外部被调用
	function setName(string memory _name) public{ //这个函数表示更新内部的name
	name=_name;
	}
	//读取函数
	function getName() public views returns(string memory){  //读取内部的name
	//memory 关键字只适用于引用类型 string、bytes、array、struct
	return name;
	}
	//internal 表示只能内部使用
	function resetName() internal{
	name="Bob";
	}
}
```

 “为何比特币的总数量只有2100 万个，而且于2140年左右基本全部挖完”？

比特币通过**区块奖励减半机制**控制发行速度：

2.1 编写合约，计算两个正整数的和、差、积、商并输出，包括： 正常Case：输入、输出全部在整型范围内； 异常Case：变量不在其值域范围内，同时解析输出结果的机理；

```solidity
contract Calculator {

    function calculateSafe(uint a, uint b) public pure returns (uint, uint, uint, uint) {
        require(a > 0 && b > 0, "Must be positive");
        
        uint sum = a + b;
        uint diff = a - b;
        uint product = a * b;
        uint quotient = a / b;
        
        return (sum, diff, product, quotient);
    }
}
```

 2.2 编写合约，计算两个正整数的取余结果，并输出； 
```solidity
contract Modulo {
    function getRemainder(uint a, uint b) public pure returns (uint) {
        require(b > 0, "Cannot divide by zero");
        return a % b;
    }
}
```
2.3 练习左移运算符和右移运算符；

```solidity
contract ShiftExample {
    function shift(uint a) public pure returns (uint, uint) {
        return (a << 1, a >> 1);  // 左移1位(×2)，右移1位(÷2)
    }
}
```
3.1 进行两个整型之间的比较运算，包括大于、小于、等于，并获得输出结果； 

```solidity
contract Compare {
    function compare(uint a, uint b) public pure returns (bool, bool, bool) {
        return (a > b, a < b, a == b);  // 大于、小于、等于
    }
}
```
3.2 练习枚举变量和整形数据类型的默认转换； 
```solidity
contract EnumConvert {
    enum Status { Pending, Approved, Rejected }
    
    function convert() public pure returns (uint, Status) {
        Status s = Status.Pending;
        uint num = uint(s);        // 枚举转uint: 0
        Status back = Status(num); // uint转枚举
        return (num, back);
    }
    
    function getValues() public pure returns (uint, uint, uint) {
        return (uint(Status.Pending), uint(Status.Approved), uint(Status.Rejected));
        // 返回: (0, 1, 2)
    }
}
```
4.1 创建多个具有不同长度的定长字节数组，并对这个数组进行赋值和取值操作 （注意字节数组的长度）； 

```solidity
contract BytesArray {
    // 不同长度的定长字节数组
    bytes1 public b1 = 0x01;
    bytes2 public b2 = 0x0102;
    bytes3 public b3 = 0x010203;
    bytes4 public b4 = 0x01020304;
    bytes32 public b32 = 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20;
    
    // 赋值
    function setBytes1(bytes1 _b) public {
        b1 = _b;
    }
    
    // 取值
    function getBytes1() public view returns (bytes1) {
        return b1;
    }
    
    // 获取长度
    function getLength(bytes32 data) public pure returns (uint) {
        return data.length;  // 固定为32
    }
}
```
4.2 将一个字符串转换为定长字节数组；
```solidity
contract StringToBytes {
    // 字符串转bytes32
    function stringToBytes32(string memory str) public pure returns (bytes32) {
        require(bytes(str).length <= 32, "String too long");
        bytes32 result;
        assembly {
            result := mload(add(str, 32))
        }
        return result;
    }
}
/*str 是字符串，在内存中存储为：[长度][实际数据]

add(str, 32) 跳到字符串数据开始的位置（跳过前32字节的长度信息）

mload(...) 从该位置读取32字节数据

赋值给 result

简单说：从字符串中读取前32字节内容。*/
```
5.1 编写Solidity 智能合约，获取链账户地址，打印输出，并与蚂蚁联盟链托 管的链账户地址进行比较； 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountCompare {
    address public owner;
    address public constant ADMIN = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    
    constructor() {
        owner = msg.sender;
    }
    
    // 获取当前账户地址
    function getOwner() public view returns (address) {
        return owner;
    }
    
    // 比较是否等于管理员地址
    function compareWithAdmin() public view returns (bool) {
        return owner == ADMIN;
    }
    
    // 比较任意地址
    function compareAddress(address _addr1, address _addr2) public pure returns (bool) {
        return _addr1 == _addr2;
    }
}
```
5.2 使用区块链浏览器查询交易详情； 
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transaction {
    event Tx(address indexed from, uint value);
    
    function send() public payable {
        emit Tx(msg.sender, msg.value);
        // 交易哈希会在 Remix 或钱包中显示
    }
}
```
6.1 使用数据位置关键字对状态变量，局部变量进行强制指定；

```solidity
contract DataLocation {
    // 状态变量（默认 storage）
    uint public stateVar = 10;
    string public stateStr = "Hello";
    uint[] public stateArray = [1, 2, 3];
    
    // 局部变量强制指定位置
    function testLocations() public pure {
        // memory: 临时存储，函数执行完消失
        string memory memStr = "I am in memory";
        uint[] memory memArr = new uint[](3);
        memArr[0] = 1;
        
        // calldata: 只读参数（仅用于 external 函数）
        // 不能在这里创建 calldata 变量
    }
    
    // calldata 示例
    function testCalldata(uint[] calldata data) external pure returns (uint) {
        return data[0];  // 只读，不能修改
    }
    
    // storage 引用状态变量
    function testStorage() public view {
        uint[] storage arr = stateArray;  // 引用状态变量
        // arr[0] = 100;  // 会修改 stateArray
    }
}
```
 6.2 尝试分析Storage和Memory的区别；

| 特性     | **Storage**    | **Memory**     |
| :------- | :------------- | :------------- |
| 存储位置 | 区块链（永久） | 内存（临时）   |
| 生命周期 | 合约存在期间   | 函数执行期间   |
| 修改成本 | 高（消耗gas）  | 低（少量gas）  |
| 数据持久 | ✅ 永久保存     | ❌ 函数结束销毁 |
| 引用类型 | 默认使用       | 必须显式指定   |
| 修改影响 | 影响状态变量   | 不影响原数据   |

7.1 创建定长整型数组，并获取该定长整型数组元素；

```solidity
int[5] public num=[1,2,3,4,5];

function getNum(int i) public view returns (int){
	return num[i];
}
```
7.2 创建动态字符串数组，并向该数组中插入两个字符串：“Hello”，“World”

```solidity
string[] str;

constructor() {
	str.push("Hello");
	str.push("World");
}
```
7.3 练习变长字节数组和字符串之间的转换；

```solidity
function tranBytesToStr(bytes memory b) public pure returns (string memory){
	return string(b);
}
```
8.1 创建一个mapping，并往该映射中填充数据；

```solidity
mapping(int=>string) map;

constructor(){
	map[1] = "Bob";
	map[2] = "Alice";
}
```
8.2 练习使用identity作为key创建一个mapping，并往该映射中填充数据；

```solidity
mapping(address=>string) map;

constructor(){
	map[address(this)] = "My";
}
```

9.1 练习创建一个结构体来描述“车”；

```solidity
struct Car{
	string brand;
	string year;
	uint price;
	string color;
}
```

9.2 练习创建一个“车”的数组； 
```solidity
struct Car{
	string brand;
	string year;
	uint price;
	string color;
}

Car[] cars;
```
9.3 练习创建一个“车”的映射； 
```solidity
struct Car{
	string brand;
	string year;
	uint price;
	string color;
}

mapping(string=>Car) mapCar;
```
9.4 以实际的应用场景（比如停车场管理系统、员工人事管理系统、学生花名册 管理系统）为例，对应用场景的需求进行描述，并实现包含数组、结构体、映射 3 种类型变量的嵌套定义、变量的读、写操作

```solidity
//停车场管理系统
struct Car{
	string brand;
	string year;
	uint price;
	string color;
	string id;
}
uint num = 100;
mapping(string=>Car) cars;
//进车
function addCar(Car memory _car) public {
	require(num>0,"没有空余车位");
	cars[_car.id] = _car;
	num--;
}
//出车
function delCar(Car memory _car) public {
	delete cars[_car.id];
	num++;
}
```

10.1 练习在Solidity合约中获取当前时间戳；

```solidity
function getTime() public view returns(uint){
	return block.timestamp;
}
```

 10.2 练习对普通整型变量和时间单位进行运算；

```solidity
  // 1. 时间转换：小时 → 秒
    function hoursToSeconds(uint hours) public pure returns (uint) {
        return hours * 60 * 60;
    }
```
11.1 创建接收两个无符号整型参数的函数，并返回这两个无符号整型参数的乘
积；

```solidity
function multy(int a,int b) public pure returns (int) {
	return a*b;
}
```
11.2 编写一个函数，使用命名函数的方式来调用函数并返回值；


```solidity
function multy(int a,int b) public pure returns (int) {
	return a*b;
}

function multy2(int a,int b)public pure returns(int){
	return multy({a:1,b:2});
}

```

11.3 编写internal 函数、external函数和public函数并体验他们的区别

| 可见性       | 合约内部调用 | 子合约调用 | 外部调用 | 默认     |
| :----------- | :----------- | :--------- | :------- | :------- |
| **public**   | ✅ 可以       | ✅ 可以     | ✅ 可以   | ❌        |
| **external** | ❌ 不可以     | ❌ 不可以   | ✅ 可以   | ❌        |
| **internal** | ✅ 可以       | ✅ 可以     | ❌ 不可以 | ✅ 是默认 |

12.1 创建一个打分函数： 如果分数大于等于90，输出“优秀”； 如果分数小于90且大于等于60，输出“良好”； 如果分数小于60且大于等于30，输出“一般”； 否则，输出“差”；

```solidity
function givePoint(uint point)public pure returns(string memory){
	if(point>=90){
		return "优秀";
	}else if(point>=60){
		return "良好";
	}else if(point>=30){
		return "一般";
	}else{
		return "差";
	}
}
```

13.1 分别使用三种循环语句计算`1*2*3*...*100`的值，并输出； 

```solidity
function f1() public pure returns(uint){
    uint num = 1;
	for(uint i=1;i<=10;i++){
		num*=i;
	}
	return num;
}
function f2() public pure returns(uint){
    uint num = 1;
    int i=1;
	while(i<=10){
		num*=i;
		i++;
	}
	return num;
}
function f3() public pure returns(uint){
    uint num = 1;
    int i=1;
	do{
		num*=i;
		i++;
	}while(i<=10);
	return num;
}
```

13.2 练习使用 break和continue跳出循环；

```solidity
function f2() public pure returns(uint){
    uint num = 1;
    int i=1;
	while(true){
		i++;
		if(i<5) continue;
		num*=i;
		if(i>10) break;
	}
	return num;
}
```

14.1 使用区块接口函数，获取系统中的gas最大值并输出； 

```solidity
function getGasMax()public view returns (uint){
	return block.gaslimit;
}
```

14.2 使用加密接口函数对数据进行加密，并输出加密后的结果；

```solidity
function hash(string memory data) public pure returns(bytes32){
	return keccak256(abi.encodePacked(data));
}
```

