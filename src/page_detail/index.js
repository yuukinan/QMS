console.log('detail start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')

var ievent       = require('../commons/ievent')
var server       = require('../commons/server')

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

    if (this.isFirstInit) {
      this.isFirstInit = false
    }

    server.detail({id: id}, function (res) {
      // 渲染
    })

    return this
  }
})

var pageDetail = new PageDetail

module.exports = pageDetail