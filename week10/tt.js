
const reg = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g
const regLable = ['Number', 'Whisespace', 'LineTerminator', '*', '/', '+', '-']


function* analysis (str) {
  let result = null
  let lastIndex = 0
  while (true) {
    lastIndex = reg.lastIndex
    result = reg.exec(str)
    if (!result) {
      break
    }
    if (reg.lastIndex - lastIndex > result[0].length) {
      break
    }
    const token = {
      type: null,
      value: null
    }
    for (let i = 1; i < regLable.length; i++) {
      if (result[i]) {
        token.type = regLable[i - 1]
        token.value = result[i]
        break
      }
    }
    // console.log('token: ', token);
    yield token
  }
  yield {
    type: 'EOF'
  }
}
let source = []
// analysis('25 + 34 * 6')
for (let token of analysis('25 + 34 * 6')) {
  if (token.type != 'Whisespace' && token.type != 'LineTerminator') {
    source.push(token)
  }
}
console.log('source: ', source);
function Expression (source) {
  if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === 'EOF') {
    let node = {
      type: "Expression",
      children: [source.shift(), source.shift()]
    }
    source.unshift(node)
    return node
  }
  AdditiveExpression(source)
  return Expression(source)
}

function AdditiveExpression (source) {

  if (source[0].type === 'MultiplicativeExpression') {
    let node = {
      type: 'AdditiveExpression',
      children: [source[0]]
    }
    source[0] = node
    return AdditiveExpression(source)
  }
  if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '+') {
    let node = {
      type: 'AdditiveExpression',
      operator: '+',
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }
  if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '-') {
    let node = {
      type: 'AdditiveExpression',
      operator: '-',
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }
  if (source[0].type === 'AdditiveExpression') {
    return source[0]
  }
  MultiplicativeExpression(source)
  return AdditiveExpression(source)
}

function MultiplicativeExpression (source) {
  if (source[0].type === 'Number') {
    let node = {
      type: 'MultiplicativeExpression',
      children: [source[0]]
    }
    source[0] = node
    return MultiplicativeExpression(source)
  }
  if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
    let node = {
      type: 'MultiplicativeExpression',
      operator: '*',
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }
  if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
    let node = {
      type: 'MultiplicativeExpression',
      operator: '/',
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }
  if (source[0].type === 'MultiplicativeExpression') {
    return source[0]
  }
  return MultiplicativeExpression(source)
}
var cc = Expression(source)
console.log(cc)