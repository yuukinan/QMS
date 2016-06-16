console.log('editor start...')
require('./index.styl')

var template      = require('./template.html')
var PageBaseView  = require('../page.base.view')
var ievent        = require('../commons/ievent')
var Model         = require('./model')
var question      = require('./question')

var PageEditor = PageBaseView.extend({

  id: 'pageEditor',

  ename: 'page:editor',

  template: template,

  events: {
    'click .oneChoice'      : 'oneChoiceHandler',
    'click .multipleChoice' : 'multipleChoiceHandler',
    'click .text'           : 'textHandler',
    'click .addQuestion'    : 'questionTypeChoose'
  },

  initialize: function () {
    this._initialize(arguments)

    this.number = 0
    this.model = new Model()
  },

  oneChoiceHandler: function () {
    this.number += 1

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
    this.number += 1

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
    this.number +=1
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

  render: function () {
    this._render()

    if (this.isFirstInit) {
      this.isFirstInit = false
    }

    this.container = this.$el.find('.container')

    return this
  }
})

var pageEditor = new PageEditor

module.exports = pageEditor