console.log('new start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')
var ievent       = require('../commons/ievent')

var PageNew = PageBaseView.extend({

  id: 'pageNew',

  ename: 'page:new',

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

var pageNew = new PageNew

module.exports = pageNew