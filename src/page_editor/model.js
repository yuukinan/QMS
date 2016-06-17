var EditorModel = Backbone.Model.extend({
  defaults: {
    // 存放 question
    list: []
  },

  addQuestion: function (question) {
    this.get('list').push(question)
  },

  removeQuestion:function(number, callback){
    this.get('list').splice(number-1, 1)
    callback()
  },

  // 改变单个选项的value
  changeValue: function (number, newVal) {
    this.get('list')[number - 1].value = newVal
  },

  upQuestion: function (number) {
    // 第一个不要上移
    if (number == 1) return

    var list   = this.get('list')
    var target = list.splice(number-1, 1)[0]
    list.splice(number-2, 0, target)
  },

  againQuestion: function(number) {
    var list = this.get('list')
    var again = list[number-1]
    list.splice(number,0,again)
  }
})

module.exports = EditorModel