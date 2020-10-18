const $ = Symbol('$')
class Trie {
  constructor() {
    this.root = Object.create(null)
  }
  inset (word) {
    let node = this.root
    for (let i of word) {
      if (!node[i]) {
        node[i] = Object.create(null)
      }
      node = node[i]
    }
    if (!($ in node)) {
      node[$] = 0
    }
    node[$]++
  }
  most () {
    let max = 0
    let maxWord = null
    let visit = (node, word) => {
      if (node[$] && node[$] > max) {
        max = node[$]
        maxWord = word
      }
      for (let p in node) {
        visit(node[p], word + p)
      }
    }
    visit(this.root, '')
    console.log(maxWord, max)
  }
}

function bb (num) {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt()))
  }
  return arr.join('')
}
var trie = new Trie()
for (let i = 0; i < 10000; i++) {
  trie.inset(bb(4))
}
console.log(trie)