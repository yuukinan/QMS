console.log('editor start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')
var ievent       = require('../commons/ievent')

var PageEditor = PageBaseView.extend({

  id: 'pageEditor',

  ename: 'page:editor',

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

    console.log(this.template)

    return this
  }
})

var pageEditor = new PageEditor

module.exports = pageEditor