console.log('detail start...')
require('./index.styl')

var template     = require('./template.html')
var index        = require('./index.html')
var PageBaseView = require('../page.base.view')

var ievent       = require('../commons/ievent')
var server       = require('../commons/server')
var router       = require('../commons/router')
var store        = require('../commons/store')

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

    var self = this

    // if (this.isFirstInit) {
    //   this.isFirstInit = false
    // }

    if (id.indexOf('question-') != 0 && !store.get(id)) {
      router.navigate('list', {trigger: true})
      return
    }

    store.get(id, function (data) {
      self.$el.find('h1').text(data.title)

      var container = self.$el.find('.container')

      _.each(data.list, function (ele, idx) {
        if (ele.type == 'text') {
          ele.number = idx+1
          container.append(question.text(ele))
        } else {
          ele.number = idx+1
          container.append(question.oneChoice(ele))
        }
      })
    })

    return this
  }

})

var pageDetail = new PageDetail

module.exports = pageDetail