var storage = window.localStorage

var store = {}

store.save = function (val, callbck) {
  var id = storage.length + 1
  val = JSON.stringify(val)

  storage.setItem(id, val)
  callbck && callbck(id)
}

store.update = function (id, val, callbck) {
  varl = JSON.stringify(val)

  storage.setItem(id, val)
  callbck && callbck()
}

store.get = function (id) {
  var val = storage.getItem(id)

  return JSON.parse(val)
}

store.list = function () {
  var temp = null
  var result = []

  for (var i = 1; i <= storage.length; i++) {
    temp = storage.getItem(i)
    temp && result.push({
      id: i,
      data: temp
    })
  }

  return result
}

module.exports = store