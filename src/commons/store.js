var storage = window.localStorage

var store = {}

var prefix = 'question-'

function computeLength () {
  var length = 0

  for (var i = 0; i < storage.length; i++) {
    if (storage.key(i).indexOf(prefix) == 0) {
      length += 1
    }
  }

  return length
}

store.save = function (val, callbck) {
  var id = prefix + (computeLength() + 1)
  val = JSON.stringify(val)

  storage.setItem(id, val)
  callbck && callbck(id)
}

store.update = function (id, val, callbck) {
  val = JSON.stringify(val)

  storage.setItem(id, val)
  callbck && callbck(id)
}

store.get = function (id, callbck) {
  var val = storage.getItem(id)
  val = JSON.parse(val)

  callbck && callbck(val)
  return val
}

store.del = function (id, callbck) {
  storage.setItem(id, null)

  callbck && callbck()
}

store.delSelected = function (arr, callbck) {
  _.each(arr, function (id) {
    storage.setItem(id, null)
  })

  callbck && callbck()
}

store.list = function (callbck) {
  var temp = null
  var result = []
  var length = computeLength()

  for (var i = 1; i <= length; i++) {
    temp = storage.getItem(prefix + i)
    temp = JSON.parse(temp)

    if (temp) {
      result.push(_.extend({
        id: prefix + i
      }, temp))
    }
  }

  callbck && callbck(result)

  return result
}

module.exports = store