console.log('editor start...')
require('./index.styl')

var template              = require('./template.html')
var PageBaseView          = require('../page.base.view')
var ievent                = require('../commons/ievent')
var Model                 = require('./model')
//var question_type         = require('./question_type')


var PageEditor = PageBaseView.extend({

  id: 'pageEditor',

  ename: 'page:editor',

  template: template,

  events: {
    'click .addQuestion' : 'questionTypeChoose'
  },

  initialize: function () {
    this._initialize(arguments)
  },


  questionTypeChoose:function(){
    var target=$(".questionType")
    if(target.hasClass('visible'))
      target.removeClass('visible')
    else{target.addClass('visible')}
  },

  render: function () {
    this._render()

    if (this.isFirstInit) {
      this.isFirstInit = false
    }

    console.log(this.template)

    return this
  }
})

var pageEditor = new PageEditor

module.exports = pageEditor