let callbacks = new Map()
let reactivies = new Map()
let tempArr = []

let obj = {
  a: { b: 4 },
  b: 2
}

function effset (callback) {
  tempArr = []
  callback()
  console.log('tempArr: ', tempArr);
  for (let item of tempArr) {
    if (!callbacks.get(item[0])) {
      callbacks.set(item[0], new Map())
    }
    if (!callbacks.get(item[0]).get(item[1])) {
      callbacks.get(item[0]).set(item[1], [])
    }
    callbacks.get(item[0]).get(item[1]).push(callback)
  }

}

function reactive (obj) {
  if (reactivies.get(obj)) {
    return reactivies.get(obj)
  } else {
    let tem = new Proxy(obj, {
      set (obj, prop, val) {
        console.log('obj, prop, val: ', obj, prop, val);
        obj[prop] = val
        if (callbacks.get(obj) && callbacks.get(obj).get(prop)) {
          for (let callback of callbacks.get(obj).get(prop)) {
            callback()
          }
        }
        return obj[prop]
      },
      get (obj, prop) {
        // console.log('obj, prop: ', obj, prop);
        tempArr.push([obj, prop])
        if (typeof obj[prop] === 'object') {
          return reactive(obj[prop])
        }
        return obj[prop]
      }
    })
    reactivies.set(obj, tem)
    return tem
  }
}

let po = reactive(obj)

effset(() => {
  console.log('po.a', po.a.b)
})
console.log('po: ', po);