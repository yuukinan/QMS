console.log('detail start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')

var ievent       = require('../commons/ievent')
var server       = require('../commons/server')

var question = require('./question')

var PageDetail = PageBaseView.extend({

  id: 'pageDetail',

  ename: 'page:detail',

  template: template,

  events: {
  },

  initialize: function () {
    this._initialize(arguments)
  },

  render: function (action, id) {
    this._render()

    // if (this.isFirstInit) {
    //   this.isFirstInit = false
    // }

    var self = this

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

    this.$el.find('h1').text(data.title)

    var container = this.$el.find('.container')
    _.each(data.list, function (ele, idx) {
      if (ele.type == 'text') {
        ele.number = idx+1
        container.append(question.text(ele))
      } else {
        ele.number = idx+1
        container.append(question.oneChoice(ele))
      }
    })

    server.detail({id: id}, function (res) {
      // 渲染
    })

    return this
  }
})

var pageDetail = new PageDetail

module.exports = pageDetail