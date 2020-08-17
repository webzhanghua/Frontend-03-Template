学习笔记
本周的学习内容是 html 解析和 css 计算
html:通过状态机对后端返回的字符串进行拆分，拆分出标签（开始标签、结束标签、自闭和标签）、拆分出属性；在拆分的过程中，创建带有属性的 element 对象，通过栈来创建 htmlDOM 树
css:在 element 对象出栈时，收集 css 规则（css 样式表的写在了 head 标签里的 style 标签），然后在入栈的时候，根据 element 的 id、class、tagName 属性及栈内信息计算当前元素和 css 样式表的数据进行比对，比对的同时计算优先级，比对成功后，添加到 computedStyle 属性中，

关键点
状态机的应用
标签的拆分
css 规则与 css 样式表的比对
css 优先级的处理

弄清了什么
1、为什么要把 css 样式写到前面
2、为什么 js 会阻断 html、css 渲染
3、html 和 css 的处理是同时的
