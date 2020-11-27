学习笔记
1、yeoman
搭建脚手架的工具
命名必须以 generator-开头
全局安装 npm i -g yo
安装 npm i yeoman-generator
generator 里面的方法是从上到下的顺序执行
重复的方法会进行覆盖，但执行的时候还是先找到先执行
2、npm link:在本地开发 npm 模块的时候，我们使用 npm link 命令，将 npm 模块链接到对应的运行项目中区，方便对模块进行调试和测试； mac 电脑要使用 sudo npm link;
3、常用的方法介绍
// 与用户进行交互-prompt
async prompting () {
const answers = await this.prompt([
{
type: 'input',
name: 'name',
message: 'your project name',
default: this.appname
}, {
type: 'confirm',
name: 'cool',
message: 'would you like to enable the cool feature'
}
])
this.log('app name', answers.name)
this.log('cool feature', answers.cool)
}

// 使用模版并填充数据-
// templatePath
// destinationPath
useTemplate () {
this.fs.copyTpl(
// 引入模版
this.templatePath('index.html'),
// 输出路径
this.destinationPath('public/index.html'),
// 填充数据
{ title: 'Templating with Yeoman' }
);
}

// 创建 package.json 文件
createPkgJson () {
// 预制的 package.json
const pkgJson = {
devDependencies: {
eslint: '^3.15.0'
},
dependencies: {
react: '^16.2.0'
}
};
// 创建文件
this.fs.extendJSON(this.destinationPath('package.json'),pkgJson);
}

执行 npm-install：npmInstall
内容输出：log()
4、运行优先级

1. initializing：初始化方法，检查当前项目状态、获取配置
2. prompting：与用户进行交互的位置，与 this.prompt()使用
3. configuring：保存配置并配置项目，创建.editorconfig 文件和其他元数据文件
4. default：其他与预制方法不同名的方法，都放到这里面，进行执行
5. writing：写入生产特定文件（路由、控制器等）的位置
6. conflicts：处理冲突的地方（内部使用）
7. install：运行安装的位置
8. end：最后的位置，说再见等的地方

5、vue 脚手架搭建
制作 vue 脚手架准备的文件，

1. package.json 文件（通过 npm init 初始化可得到）
2. HelloWorld.vue 文件，创建项目后，演示使用
3. index.html 文件，创建项目后，演示使用
4. webpack.config.js 文件，项目的 webpack 的配置文件
5. main.js 文件，项目运行的开始文件

要创建一个，需要输入项目名称，自动安装依赖，项目创建后可以直接运行演示的项目
搭建脚手架，
在 generator/app/index.js，引入 Generator，使用官网的基础配置，

1. 输入项目名称部分
   创建一个异步方案 async initPackageJson(),在方法内调用 this.prompt 方法，实现获取用户输入的功能；
2. 整理项目的 package.json 文件
   将用户输入的名称与准备好的 package.json 的内容，通过 this.fs.extendJSON(this.destinationPath('package.json'), pkgJson),输出到创建的项目当中
3. 安装依赖
   通过 this.npmInstall(['vue'], { 'save-dev': false }),配置需要安装的依赖项
   'webpack'、'webpack-cli'：打包工具
   'vue-loader'、'vue-template-compiler'：解析.vue 文件
   'css-loader'、'vue-style-loader'：解析 css 文件
   'copy-webpack-plugin'：打包的时候将文件输出到产出文件夹中
4. 复制展示文件
   通过 this.fs.copy(this.templatePath('HelloWorld.vue'),this.destinationPath('src/HelloWorld.vue'))，将文件放到项目的指定位置
5. 生产 npm 包，供本地演示使用
   通过 npm link 创建 npm 包
6. 创建运行
   yo vue
   webpack

npm init 获取一个模版
通过 prompt 获取输入信息，如项目名称
安装 webpack vue-loader
添加 js 文件 helloword.vue
模版复制，将 helloword.vue 复制到新项目到路径中
配置 webpack
创建 webpack.config.js，进行配置
复制 webpack.config.js 到新项目
创建 mian.js
复制 mian.js 到新项目
安装 vue-template-compiler、css-loader、vue-style-loader
创建 html，用于访问 dist 中到 main.js
安装 copy-webpack-plugin

6、webpack
webpack：模块打包工具，找出模块之间的依赖关系，按照一定的规则把这些模块组织合并为一个 js 文件
npx：本地运行命令
loader:预处理器，帮助 webpack 处理各种类型文件，执行顺序由后向前

7、babel
babel:将最新版的 js 代码转化为老版的 js 代码
babel 官方的三个包：@babel/cli,@babel/core,@babel/preset-env
@babel/cli:是 babel 命令行转码工具，使用命令行进行 babel 转码就需要安装，@babel/cli 依赖@babel/core
@babel/core:是 babel 的核心 npm 包
@babel/preset-env:是提供 ES6 转化 ES5 的语法规则，在 babel 配置文件中指定使用它，

babel 的配置文件由以下 4 种，里面是 json 格式，输出 presets 和 plugin
babel.config.js module.exports={presets:['@babel/env'],plugin:[]}
.babelrc
.babelrc.js
配置到 package.json 中
8、babel polyfill
@babel/polyfill:补齐目标环境缺失的特性，Promise、Map、Symbol、Proxy、Iterator 等这些方法，要用 polyfill 进行补齐，默认是 babel 只能是对语法的转化，如=>的转化，

perset:预设
plugin:插件
插件比预设要先执行，插件的执行顺序是由前向后，预设的执行顺序是由后向前
