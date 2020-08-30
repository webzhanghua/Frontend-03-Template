
// 编写一个 match 函数。它接受两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。这个元素你可以认为它一定会在一棵 DOM 树里面。通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。（不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）以下是一个调用的例子。
/*
// html 片段
<div>
    <span id="id" class="class1">div #id.class</span>
</div>
*/


// 对简单选择器进行判断
function matchCore (element, selector) {
  if (selector.charAt(0) === '#') {
    let attr = element.attributes.id.nodeValue
    if (attr === selector.replace('#', '')) {
      return true
    }
  } else if (selector.charAt(0) === '.') {
    let attr = element.attributes.class.nodeValue
    if (attr === selector.replace('.', '')) {
      return true
    }
  } else {
    if (element.tagName.toLocaleLowerCase() === selector) {
      return true
    }
  }
  return false
}

// 拆解复合选择器为简单选择器，再对简单选择器进行判断
function matchCSS (selector, element) {
  if (!selector || !element.attributes) {
    return false
  }
  let selectors = selector.replace('#', ' #').replace('.', ' .').split(' ').filter(item => item)
  return selectors.every(item => matchCore(element, item))
}

function match (selector, element) {
  if (!selector || !element.attributes) {
    return false
  }
  let cssArr = []
  // 将复杂选择器进行拆分为数组
  if (selector.match(/ /)) {
    cssArr = selector.split(' ')
  } else {
    cssArr.push(selector)
  }
  cssArr.reverse()
  let tempObj = element
  for (let i = 0; i < cssArr.length; i++) {
    if (!matchCSS(cssArr[i], tempObj)) {
      return false
    }
    tempObj = element.parentNode
    if (!tempObj) {
      return false
    }

  }
  return true;
}

match("div #id.class", document.getElementById("id"));