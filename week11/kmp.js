// 获取部分匹配表
function patternListFn (pattern) {
  const length = pattern.length
  // 创建一个等长的数组
  const table = new Array(length).fill(0)
  // 计数器
  let c = 0;
  // 指针
  let p = 1
  while (p < length) {
    if (pattern[c] === pattern[p]) {
      c++;
      p++;
      // 把本次比对的重复个数值，放到table数组中下一项的元素中
      table[p] = c;
    } else {
      if (c > 0) {
        // c大于0，说明前面pattern的前c项元素里面有重复，
        // table数组的第c项元素值表示前c项里面重复的个数，如果为0则没有重复了，如果有则表示有重复，减少比对次数
        c = table[c];
      } else {
        p++
      }
    }
  }
  console.log('table: ', table);
  return table
}

patternListFn('ababcbabc')


function kmp (source, pattern) {
  const patternList = patternListFn(pattern)
  const length = source.length
  let ps = 0;
  let pp = 0
  let flag = false
  while (ps < length) {
    if (source[ps] === pattern[pp]) {
      ps++;
      pp++
      if (pp === pattern.length) {
        flag = true
        break
      }
    } else {
      if (pp > 0) {
        pp = patternList[pp]
      } else {
        ps++
      }
    }
  }
  console.log(flag)
  return flag
}

kmp('ababcbabc', 'ababcbabc')
// kmp('', 'aabaabaacaab')
// [0, 0, 0, 1, 2, 0, 0, 1, 2]
// [0, 0, 0, 1, 2, 0, 0, 1, 2]
// abcabcd
// [0, 0, 1, 0, 1, 2, 3, 4, 5]
// [0, 0, 1, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3]
// [0, 0, 1, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3]


