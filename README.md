### 使用的技术栈

##### express

是nodejs当前最流行的后台框架。官网对express的描述，它是一个机遇Node.js平台，快
速、开放、极简的web开发框架。优点是易上手、高性能、扩展性强：
    
1. 易上手：nodejs最初是为了开发高兴能web服务器而被设计出来的，然而相对底层的API会让不少新手望而却步。express对web开发相关的模块进行了适度的封装，屏蔽了大量复杂繁琐的技术细节，让开发这个只需要专注于业务逻辑的开发，极大的降低了入门和学习的成本。
2. 高性能：express仅在web应用相关的nodejs模块上进行了适度的封装和扩展，较大程度避免了过度封装导致的性能损耗。
3. 扩展性强：基于中间件的开发模式，使得express应用的扩展、模块拆分非常简单，既灵活，扩展性又强。

##### create-react-app

react+redux和vue+vuex是现在最流行的两个构建webapp的前端构建框架，其中react背靠Facebook这个大树，在技术上最早实现了虚拟DOM和高效的Diff算法，使得其拥有较高的性能。同时，代码逻辑也非常简单。

create-react-app是Facebook官方提供的一套不需要配置的React开发方案，也是当前最流行的react应用构建方法。这个脚手架已经做好了基础webpack配置，带有自动更新，错误提示等功能，仅仅需要创建，启动就可以快速进行开发。

使用前我们需要在全局安装：

```
npm install creat-react-app -g
```

##### mongodb

MongoDB和Node.js特别般配，因为Mongodb是基于文档的非关系型数据库，文档是按BSON（JSON的轻量化二进制格式）存储的，增删改查等管理数据库的命令和JavaScript语法很像，比较适合前端同学使用。

##### yarn

由于是从头开始搭建一个开发环境，所有就考虑尝鲜使用Facebook今年推出的yarn。

Yarn和npm一样，是一款Nodejs包管理工具。

Yarn会缓存它下载的每个包，所有不需要重复下载。它还能并行化操作以最大化资源利用率，所以安装速度之快前所未有。

Yarn在每个安装包的代码执行前使用校验码验证包的完整性。

Yarn使用一个格式详尽简洁的lockfile和一个精确的算法来安装，能够确保能够在一个系统上的运行和安装过程也会以同样的方式运行在其他系统上。

### 开始创建

假设我们需要创建一个test-app项目：

1. 创建项目目录

```
create-react-app test-app
```
稍等片刻，yarn会为我们创建一个目录，拉去需要的依赖，webpack的配置通过yarn来调用，可以看到目录结构:

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720175558443-1951392885.png)

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720175613380-192736708.png)

安装完成后控制台会有清晰的提示信息：

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720175717208-672145219.png)

2. 开始开发

```
cd test-app && yarn start
```
这是会启动默认端口为3000的页面，如果端口冲突，会提示你是否选用另一个端口

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720175811146-2107531669.png)

进入src目录进行开发即可

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720175839427-886152235.png)

3. 开发完成需要发布时

运行 yarn build 进行编译，发布build目录

创建完成会自动生成build文件夹，将js，css文件放在static目录中

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720175932958-746516944.png)


基本的创建和发布react应用过程完成，中间省略了大量的配置问题，给需要快速构建项目带来了极大的便利。当然，默认配置也许不能够满足所有需求，create-react-app也提供了抛出所有配置项的yarn eject供给开发者使用，如果需要调整webpack的内容，就需要使用到这个命令。不过这样也会导致不能回滚。官方的更新比较快，如果不是需要的情况建议直接使用内置的行为。

### 配合express构建服务端应用

由于在项目开发过程中需要express构建server端应用，开发模式需要做一些小调整。

1. 创建一个叫server的文件夹和初始化package.json文件

```
mkdir server && cd server && yarn init
```
2. 增加依赖包

```
yarn add express body-parser nodemon babel-cli babel-preset-es2015
```
主要用到express, body-parser, nodemon（监测node.js改动兵自动重启， 适用于开发阶段），babel-cli和babel-preset-es2015（以便使用es6开发）

执行express

```
express
```
就会在server文件夹中生成express构建nodejs服务器模块。

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720180044505-1953641268.png)

3. 修改package.json

这里我在操作的时候nodemon模块并没有下载成功，需要单独执行：

```
yarn add nodemon
```
下载下来nodemon 模块。

express默认生成的scripts是：

```
"scripts": {
    "start": "node ./bin/www"
  }
```
将其改为：

```
"scripts": {
    "start": "nodemon --exec node ./bin/www"
  }
```

4. create-react-app 会启动一个静态资源服务器，那么同时需要进行server端的时候需要怎么做呢？

我们会鬼头来修改test-app目录下的package.json。

create-react-app会默认天机好4段scripts：


```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
}
```
我们需要对start 和 build做调整，以便可以同时启动前端开发页面以及后端服务。在这里引入concurrently这个包来执行两条命令：

```
yarn add concurrently
```
package.json:


```
"scripts": {
    "react-start": "node scripts/start.js",
    "start": "concurrently \"yarn react-start\" \"cd server && yarn start\"",
    "react-build": "node scripts/build.js",
    "build": "concurrently \"yarn react-build\" \"cd server && yarn build\"",
    "test": "node scripts/test.js --env=jsdom"
}
```
这样，我们只要执行yarn start 会同步启动 webpack 以及 server文件下的nodemon.

![image](http://images2015.cnblogs.com/blog/976007/201707/976007-20170720180304474-1763447630.png)

参考网址：

[https://segmentfault.com/a/1190000009857965](https://segmentfault.com/a/1190000009857965)

[http://www.cnblogs.com/xiaohuochai/p/7189074.html](http://www.cnblogs.com/xiaohuochai/p/7189074.html)