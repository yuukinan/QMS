console.log('list start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')
var ievent       = require('../commons/ievent')
var server       = require('../commons/server')

// 列表项
var Item         = require('./item')

var PageList = PageBaseView.extend({

  id: 'pageList',

  ename: 'page:list',

  template: template,

  events: {
//    'click .data'  :  'dataHandler'
  },

  initialize: function () {
    this._initialize(arguments)
  },

  render: function () {
    this._render()

    if (this.isFirstInit) {
      this.isFirstInit = false
    }

    // 渲染列表项
    this.renderItem()

    return this
  },

  renderItem: function () {
    var container = this.$el.find('tbody')
    var tempItem  = null

    // 先清空
    container.html({})

    server.list({}, function (res) {

      if (res.result.code !== 200) return

      res.data.questionList.forEach(function (ele) {
        tempItem = new Item(ele)
        container.append(tempItem.render().el)
      })

    })

    return this
  }

//  dataHandler: function(){
//   var id = $("#data-id")
//  }
})

var pageList = new PageList

module.exports = pageList