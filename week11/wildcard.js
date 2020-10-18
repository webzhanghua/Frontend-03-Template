// *：任何字符且任意个
// ？：任何字符仅一个
function find (source, pattern) {
  let startCount = 0
  // 查找到*号到个数
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      startCount++
    }
  }
  // 没有*号到进行匹配
  if (startCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== '?') {
        return false
      }
    }
    return
  }
  let i = 0;
  let lastIndex = 0;
  // 第一个*号前到字符串进行匹配
  for (i = 0; pattern[i] !== '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') {
      return false
    }
  }
  lastIndex = i
  for (let p = 0; p < startCount - 1; p++) {
    i++
    let subPattern = ''
    // 截取两个星号之间到字符串
    while (pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }
    let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), 'g')
    reg.lastIndex = lastIndex
    // 匹配失败 退出
    if (!reg.exec(source)) {
      return false
    }
    lastIndex = reg.lastIndex
  }
  // 最后一个*，从后向前进行匹配
  for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j++) {
    if (pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - 1] !== '?') {
      return false
    }
  }
  return true
}

var b = find('abcabcabxaac', 'bcabx')
// var b = find('abcabcabxaac', 'b*bx*c')
console.log('b: ', b);