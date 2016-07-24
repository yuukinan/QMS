console.log('editor start...')
require('./index.styl')

var template      = require('./template.html')
var index         = require('./index.html')
var PageBaseView  = require('../page.base.view')
var ievent        = require('../commons/ievent')
var server        = require('../commons/server')
var Model         = require('./model')
var question      = require('./question')

var PageEditor = PageBaseView.extend({

  id: 'pageEditor',

  ename: 'page:editor',

  template: template,

  events: {
    'change .title'         : 'titleHandler',
    'change #deadline'      : 'deadlineHandler',
    'click .oneChoice'      : 'oneChoiceHandler',
    'click .multipleChoice' : 'multipleChoiceHandler',
    'click .text'           : 'textHandler',
    'click .addQuestion'    : 'addQuestionHandler',
    'click .save'           : 'saveHandler',
    'click .publish'        : 'publishHandler'
  },

  initialize: function () {
    this._initialize(arguments)

    // this.model = new Model()
    // this.number = this.model.get('list').length
  },

  titleHandler: function (evt) {
    this.model.set('title', evt.target.value)
  },

  deadlineHandler: function (evt) {
    this.model.set('deadline', evt.target.value)
  },

  oneChoiceHandler: function () {
    this.number = this.model.get('list').length + 1

    var oneChoice = new question.oneChoice({
      number: this.number,
      model: this.model
    })

    // 视图增加
    this.container.append(oneChoice.render().$el)
    // model 增加，保持同步
    this.model.addQuestion({
      type: 'oneChoice',
      title: '',
      value: []
    })
  },

  multipleChoiceHandler: function () {
    this.number = this.model.get('list').length + 1

    var multipleChoice = new question.multipleChoice({
      number: this.number,
      model: this.model
    })

    this.container.append(multipleChoice.render().$el)
    this.model.addQuestion({
      type: 'multipleChoice',
      title: '',
      value: []
    })
  },

  textHandler: function () {
    this.number = this.model.get('list').length + 1

    var text = new question.text({
      number: this.number,
      model: this.model
    })

    this.container.append(text.render().$el)
    this.model.addQuestion({
      type:'text',
      required: false,
      title: '',
      value: ''
    })
  },

  addQuestionHandler: function () {
    var target = $(".questionType")

    if (target.hasClass('visible')) {
      target.removeClass('visible')
    } else {
      target.addClass('visible')
    }
  },

  titleHandler: function (){
    var title = $(".title").val()
    this.model.set("title", title)
  },

  deadlineHandler: function (){
    var endTime = $(".deadline").val()
    this.model.set("endTime",endTime)
  },

  saveHandler: function (){
    console.log(this.model.toJSON())
  },

  publishHandler: function () {
    var date = new Date()
    var data = {
      //id: 1,
      title: "x",
      endTime: date
    }
  },

  render: function (action, id) {
    var self = this
    this._render()

    // if (this.isFirstInit) {
    //   this.isFirstInit = false
    // }

    this.model = new Model()
    this.number = this.model.get('list').length

    this.container = this.$el.find('.container')

    if (id) {
      // 请求数据，构造数据，array
      // test
      var data = {
        title: '这真的是问卷的名字',
        deadline: '2016-01-01'
      }
      data.list = [{
        title: '这是一个单选',
        type: 'oneChoice',
        value: [1111, 222, 333]
      }, {
        title: '这是一个多选',
        type: 'multipleChoice',
        value: ['aaa', 'bbbb', 'cccc', 'dddd']
      }, {
        title: '这是一个文本输入',
        type: 'text',
        required: true,
        value: '这是一段文字'
      }]

      this.model.set('list', data.list)
      this.model.set('title', data.title)
      this.$el.find('.title').val(data.title)
      this.model.set('deadline', data.deadline)
      this.$el.find('#deadline').val(data.deadline)
      this.number = this.model.get('list').length

      var temp = null

      _.each(data.list, function (ele, idx) {
        temp = new question[ele.type]({
          number: idx+1,
          model: self.model,
          title: ele.title,
          data: ele.value,
          required: ele.required
        })

        self.container.append(temp.render().$el)
      })
    }

    return this
  }
})

var pageEditor = new PageEditor

module.exports = pageEditor