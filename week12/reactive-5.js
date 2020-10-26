// 存储要监听的数据
let callbacks = new Map()
// 每次创建监听要监听的数据
let useReactivies = []
// get的时候是对象，就要进行递归，对reactive里面对实例统一管理，减少重复实例化
let reactivies = new Map()

// 创建监听函数
function effset (callback) {
  useReactivies = []
  callback()
  for (let item of useReactivies) {
    if (!callbacks.get(item[0])) {
      callbacks.set(item[0], new Map())
    }
    if (!callbacks.get(item[0]).get(item[1])) {
      callbacks.get(item[0]).set(item[1], [])
    }
    callbacks.get(item[0]).get(item[1]).push(callback)
  }
}

// 创建代理
function reactive (object) {
  if (reactivies.get(object)) {
    return reactivies.get(object)
  }
  const proxy = new Proxy(object, {
    set (obj, prop, val) {
      obj[prop] = val
      if (callbacks.get(obj) && callbacks.get(obj).get(prop)) {
        for (let callback of callbacks.get(obj).get(prop)) {
          callback()
        }
      }
      return obj[prop]
    },
    get (obj, prop) {
      useReactivies.push([obj, prop])
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop])
      }
      return obj[prop]
    }
  })
  reactivies.set(object, proxy)
  return reactivies.get(object)
}

let object = {
  a: { b: 99 },
  b: 2,
  r: ''
}

let po = reactive(object)

// 创建监听
effset(() => {
  console.log(po.a.b, '####')
})

console.log(po)