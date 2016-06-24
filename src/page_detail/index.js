console.log('detail start...')
require('./index.styl')

var template     = require('./template.html')
var PageBaseView = require('../page.base.view')
var ievent       = require('../commons/ievent')

var PageDetail = PageBaseView.extend({

  id: 'pageDetail',

  ename: 'page:detail',

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
    
    this.renderDetail

    return this
  },
  
  renderDetail: function (){
    var container = this.$el.find('tbody')
    var tempDetail = null

    container.html({})
    server.detail({id: id}, function (res) {

      if (res.result.code !== 200) return

      tempDetail = new template(res.data.questionList)
      container.append(tempDetail.render().el)

    })

    return this
  }

})

var pageDetail = new PageDetail

module.exports = pageDetail