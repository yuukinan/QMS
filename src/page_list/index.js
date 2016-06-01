console.log('list start...')
require('./index.styl')

// 测试数据
var mock_data    = require('./mock_data')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')
var ievent       = require('../commons/ievent')

// 列表项
var Item         = require('./item')

var PageList = PageBaseView.extend({

  id: 'pageList',

  ename: 'page:list',

  template: template,

  events: {
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

    _.each(mock_data, function (data) {
      tempItem = new Item(data)
      container.append(tempItem.render().el)
    })

    return this
  }
})

var pageList = new PageList

module.exports = pageList