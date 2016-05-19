console.log('list start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')
var ievent       = require('../commons/ievent')

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

    return this
  }
})

var pageList = new PageList

module.exports = pageList