var EditorModel = Backbone.Model.extend({
  defaults: {
    // 存放 question
    list: [],
    // 问卷名字
    title: '',
    // 截止日期
    deadline: '',
    status: 'published'
  },

  initialize: function () {
    this.set('list', new Array)
  },

  // 改变单个选项的value
  changeValue: function (number, newVal, required) {
    var target = this.get('list')[number - 1]

    target.value = newVal

    if (target.type == 'text') {
      target.required = required
    }

    console.log(this.toJSON())
  },

  // 改变单个选项的title
  changeTitle: function (number, newTitle) {
    var target = this.get('list')[number - 1]

    target.title = newTitle

    console.log(this.toJSON())
  },

  addQuestion: function (question) {
    this.get('list').push(question)
  },

  removeQuestion:function(number, callback){
    this.get('list').splice(number-1, 1)
    callback && callback()
  },

  // 上移
  upQuestion: function (number, callback) {
    // 第一个不要上移
    if (number == 1) return

    var list   = this.get('list')
    var target = list.splice(number-1, 1)[0]

    list.splice(number-2, 0, target)
    callback && callback()
    console.log(this.toJSON())
  },

  // 下移
  downQuestion: function (number, callback) {
    var list = this.get('list')

    // 最后一个不要下移
    if (number == list.length) return

    var target = list.splice(number-1, 1)[0]
    list.splice(number, 0, target)
    callback && callback()

    console.log(this.toJSON())
  },

  // 复制
  againQuestion: function (number, callback) {
    var list = this.get('list')
    var again = list[number-1]

    list.splice(number, 0, again)
    callback && callback(again)

    console.log(this.toJSON())
  }
})

module.exports = EditorModel