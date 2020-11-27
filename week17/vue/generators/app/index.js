var Generator = require('yeoman-generator');
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    super(args, opts);
  }
  // 创建package.json文件
  async initPackageJson () {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'your project name',
        default: this.appname
      }
    ])

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answers.name }
    )
    // 预制的package.json
    const pkgJson = {
      "name": answers.name,
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "dev": "webpack",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    // 执行npm install
    this.npmInstall(['vue'], { 'save-dev': false })
    this.npmInstall(['webpack', 'vue-loader', 'webpack-cli', 'vue-template-compiler',
      'css-loader', 'vue-style-loader', 'copy-webpack-plugin'], { 'save-dev': true })
  }
  initCopyTemp () {
    this.fs.copy(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue')
    )
    this.fs.copy(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )
  }

};
