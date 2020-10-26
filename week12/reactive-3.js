// 创建代理
function reactive (object) {
  return new Proxy(object, {
    set (obj, prop, val) {
      obj[prop] = val
      return obj[prop]
    },
    get (obj, prop) {
      return obj[prop]
    }
  })
}

let object = {
  a: 1,
  b: 2
}

let po = reactive(object)
