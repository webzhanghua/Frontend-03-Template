学习笔记
1、正则拆分四则运算：
正则：
const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g
const result=regexp.exec('5 + 6 - 3')
// ["5","5",null,null,null,null,null,null];
// regexp 中的括号与 result 的（n+1）相匹配
2、产生式
<Expression>::=<AdditiveExpression><EOF>
<AdditiveExpression>::=<MultiplicativeExpression>
|<AdditiveExpression><+><MultiplicativeExpression>
|<AdditiveExpression><-><MultiplicativeExpression>
<MultiplicativeExpression>::=<Number>
|<MultiplicativeExpression><_><Number>
|<MultiplicativeExpression></><Number>
终结符：<EOF> <Number> <+> <-> <_><Number> </><Number>
AdditiveExpress 展开
<AdditiveExpress>::=<Number>
|<AdditiveExpression><+><MultiplicativeExpression>
|<AdditiveExpression><-><MultiplicativeExpression>
|<MultiplicativeExpression><\_><Number>
|<MultiplicativeExpression></><Number>
3、拆解思路
'25 + 34 - 6'处理后得到的数据格式：
{"type":"Expression","children":[{"type":"AdditiveExpression","operator":"+","children":[{"type":"AdditiveExpression","children":[{"type":"MultiplicativeExpression","children":[{"type":"Number","value":"25"}]}]},{"type":"+","value":"+"},{"type":"MultiplicativeExpression","operator":"_","children":[{"type":"MultiplicativeExpression","children":[{"type":"Number","value":"34"}]},{"type":"_","value":"\*"},{"type":"Number","value":"6"}]}]},{"type":"EOF"}]}

根据产生式的关系得出<MultiplicativeExpression>属于最小结构，处理<MultiplicativeExpression>的方式是，
将表达式数组，通过递归调用的方法将<Number>格式化为{type:'MultiplicativeExpression',children:['当前表达式']}、<MultiplicativeExpression><->和<MultiplicativeExpression></>格式化为{type:'MultiplicativeExpression',operator:'-'|'/',children:['前三个表达式']},
处理<AdditiveExpression>和<MultiplicativeExpression>类似主要主要处理被加数/被加数时要先调用 MultiplicativeExpression 方式处理
<Expression>只包能含<AdditiveExpression>和<EOF>这两个元素，直接格式化
