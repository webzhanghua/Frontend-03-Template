学习笔记
1、proxy 代理
通过代理的方式来改变对象的属性
好处是：可以在获取和设置的过程中，进行修改
坏处是：不能明确的知道获取和设置的结果
2、reactive
半成品的双向绑定，从数据到 Dom 元素一条线的监听，从 Dom 元素到数据的监听使用 addEventListener;
重点看一下 reactive-3.js 到 reactive-6.js，主要是进行回调事件的注册及调用
3、使用 mouse 事件实现拖拽
把 mousemove 和 mouseup 的事件绑定写到 mousedown 里面，要比写成并列的三个绑定事件要少一些计算
4、range 的使用,cssom
创建 range: let range=document.createRange()
设置 range: range.setStart()、range.setEnd()
插入节点: range.insertNode(node)
5、阻止文本选中
document.addEventListener('selectstart',e=>e.preventDefault())
