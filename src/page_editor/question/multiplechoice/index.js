require('./index.styl')

var template  = require('./template.html')
var optTemplate = require('./optTemplate.html')

var multipleChoice = Backbone.View.extend({
  tagName: 'div',

  className: 'question-number',

  events:{
    'change .ques-title' : 'changeTitleHandler',
    'change .checkbox'   : 'changeValueHandler',
    'click .up'          : 'upHandler',
    'click .down'        : 'downHandler',
    'click .remove'      : 'removeHandler',
    'click .again'       : 'againHandler',
    'click .addOpt'      : 'addOptHandler',
    'click .rmOpt'       : 'rmOptHandler'
  },

  initialize: function (options) {
    this.number = options.number
    this.model = options.model
    this.data = options.data
    this.title = options.title
  },

  initData: function (data) {
    var container = this.$el.find('.optContainer')

    container.html({})
    _.each(data, function (ele, idx) {
      container.append(optTemplate({
        value: ele,
        number: idx+1
      }))
    })
  },

  changeValueHandler: function () {
    var inputs = this.$el.find('.checkbox')
    var newVal = []
    var temp   = null
    var number = parseInt(this.$el.find('.number').text())

    for (var i = 0; i < inputs.length; i++) {
      temp = inputs[i].value
      temp && newVal.push(temp)
    }

    this.model.changeValue(number, newVal)
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

    this.model.againQuestion(number, function (ele) {
      var now = self.$el
      // now.clone().insertAfter(now)

      var temp = new self.constructor({
        number: number+1,
        model: self.model,
        title: ele.title,
        data: ele.value,
        required: ele.required
      })

      temp.render().$el.insertAfter(now)

      self.changeQuestionNumber()
    })
  },

  addOptHandler: function () {
    var container = this.$el.find('.optContainer')
    var label = this.$el.find('label')

    if (label.length == 10) return

    var tmpl = [
      '<label>',
        '<input type="checkbox" name="multiplechoice_question" value="选项',
          label.length+1, '"/> ',
        '<input type="text" class="checkbox" placeholder="选项', label.length+1, '">',
      '</label>'
    ].join('')

    container.append($(tmpl))

    this.changeValueHandler()
  },

  rmOptHandler: function () {
    var container = this.$el.find('.optContainer')
    var opt = container.find('input:checked')

    opt.parent().remove()

    var opts = container.find('.checkbox')
    _.each(opts, function (ele, idx) {
      $(ele).attr('placeholder', '选项'+(idx+1))
    })

    this.changeValueHandler()
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

    this.data && this.initData(this.data)
    this.title && this.$el.find('.ques-title').val(this.title)

    return this
  }
})

module.exports = multipleChoice