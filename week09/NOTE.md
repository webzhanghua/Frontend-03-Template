学习笔记

1、地图编辑器：使用 html 配合鼠标华滑动事件，实现地图编辑器
2、广度优选算法：使用栈的方式，把数据由近及远的一层一层的放到栈里面，在出栈进行处理
3、可视化寻路：使用异步渲染的方式，可以直观的看到寻路过程，不断的寻找周围的数据一层一层直到找到目标
4、寻路：将当前找到的路径点，存放到下一个有效节点对应数组中的位置，通过反向查找这个位置，一级一级的回到起点
5、启发式搜索：核心是一个排序算法，返回一个最优的节点，再进行继续计算；
