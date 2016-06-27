console.log('editor start...')
require('./index.styl')

var template      = require('./template.html')
var index         = require('./index.html')
var PageBaseView  = require('../page.base.view')
var ievent        = require('../commons/ievent')
var Model         = require('./model')
var question      = require('./question')
var server        = require('../commons/server')

var PageEditor = PageBaseView.extend({

  id: 'pageEditor',

  ename: 'page:editor',

  template: template,

  events: {
    'click .oneChoice'      : 'oneChoiceHandler',
    'click .multipleChoice' : 'multipleChoiceHandler',
    'click .text'           : 'textHandler',
    'click .addQuestion'    : 'questionTypeChoose',
    'click .save'           : 'saveHandler',
    'blur .title'           : 'titleHandler',
    'blur .deadline'        : 'deadlineHandler'
  },

  initialize: function () {
    this._initialize(arguments)

    this.model = new Model()
    this.number = this.model.get('list').length
  },

  oneChoiceHandler: function () {
    this.number = this.model.get('list').length + 1

    var oneChoice = new question.OneChoice({
      number: this.number,
      model: this.model
    })

    this.container.append(oneChoice.render().$el)
    this.model.addQuestion({
      type: 'oneChoice',
      value: []
    })
  },

  multipleChoiceHandler: function () {
    this.number = this.model.get('list').length + 1

    var multipleChoice = new question.MultipleChoice({
      number: this.number,
      model: this.model
    })

    this.container.append(multipleChoice.render().$el)
    this.model.addQuestion({
      type: 'multipleChoice',
      value: []
    })
  },

  textHandler: function () {
    this.number = this.model.get('list').length + 1

    var text = new question.Text({
      number: this.number,
      model: this.model
    })

    this.container.append(text.render().$el)
    this.model.addQuestion({
      type:'text',
      value: []
    })
  },

  questionTypeChoose: function () {
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

    var data = this.model.toJSON()
      server.addNew(data, function (){

    })
  },

  render: function (id) {
    this._render()

    if (this.isFirstInit) {
      this.isFirstInit = false
    }

    this.container = this.$el.find('.container')

    var self = this

    if(id){
      server.edit({id: id}, function(res){
        self.$el.html(index(res.data[0]))
      })
    }

    return this
  }
})

var pageEditor = new PageEditor

module.exports = pageEditor