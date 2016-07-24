require('./index.styl')

var template  = require('./template.html')

var text = Backbone.View.extend({
  tagName: 'div',

  className: 'question-number',

  events:{
    'change .ques-title' : 'changeTitleHandler',
    'change textarea' : 'changeValueHandler',
    'click .up'       : 'upHandler',
    'click .down'     : 'downHandler',
    'click .remove'   : 'removeHandler',
    'click .again'    : 'againHandler'
  },

  initialize: function (options) {
    this.number   = options.number
    this.model    = options.model
    this.data     = options.data
    this.title    = options.title
    this.required = options.required
  },

  changeValueHandler: function () {
    var newVal = this.$el.find('textarea').val()
    var number = parseInt(this.$el.find('.number').text())
    var required = this.$el.find('label input')[0].checked

    this.model.changeValue(number, newVal, required)
  },

  changeTitleHandler: function (evt) {
    var number = parseInt(this.$el.find('.number').text())
    var value = evt.target.value

    this.model.changeTitle(number, value)
  },

  upHandler: function () {
    var self = this
    var number = parseInt(this.$el.find('.number').text())

    this.model.upQuestion(number, function(){
      var now = self.$el
      var pre = self.$el.prev()

      now.insertBefore(pre)
      self.changeQuestionNumber()
    })
  },

  downHandler: function () {
    var self = this
    var number = parseInt(this.$el.find('.number').text())

    this.model.downQuestion(number, function(){
      var now = self.$el
      var after = self.$el.next()

      now.insertAfter(after)
      self.changeQuestionNumber()
    })
  },

  removeHandler: function () {
    var self = this
    var number = parseInt(this.$el.find('.number').text())

    this.model.removeQuestion(number, function () {
      self.$el.remove()
      self.changeQuestionNumber()
    })
  },

  againHandler: function () {
    var self = this
    var number = parseInt(this.$el.find('.number').text())

    this.model.againQuestion(number, function () {
      var now = self.$el
      now.clone().insertAfter(now)
      self.changeQuestionNumber()
    })
  },

  changeQuestionNumber: function () {
    var number = $(".number")

    for(var i = 0; i < number.length; i++) {
      number[i].innerText = i+1
    }
    // return number
  },

  render: function () {
    this.$el.html(template({
      number: this.number
    }))

    this.title && this.$el.find('.ques-title').val(this.title)
    this.data && this.$el.find('textarea').val(this.data)
    this.$el.find('.require')[0].checked = !!this.required

    return this
  }
})

module.exports = text