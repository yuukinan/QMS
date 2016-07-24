console.log('list start...')
require('./index.styl')

var router    = require('../../commons/router')

var template  = require('./template.html')
var ItemModel = require('./model')

var Item = Backbone.View.extend({

  tagName: 'tr',

  className: 'list-item',

  events: {
    'click .delete' : 'itemDelete',
    'click .editor' : 'editorHandler',
    'click .detail' : 'detailHandler'
  },

  initialize: function (options) {
    this.model = new ItemModel(options)
  },

  editorHandler: function (evt) {
    var parent = $(evt.target).parent()
    var id     = parent.data('id')

    router.navigate('editor/' + id, {trigger: true})
  },

  detailHandler: function (evt) {
    var parent = $(evt.target).parent()
    var id     = parent.data('id')
    console.log('list', id)

    router.navigate('detail/' + id, {trigger: true})
  },

  editHandler: function (evt) {
    var parent = $(evt.target).parent()
    var id     = parent.data('id')

    router.navigate('editor/' + id, {trigger: true})
  },

  itemDelete: function(){
    var st = this.model.get("status")
    if (st == "end") {
      alert("问卷已结束，不能删除")
    } else {
      alert("确认删除？")
    }
  },

  render: function () {
    this.$el.html(template(this.model.toJSON()))

    return this
  }

})

module.exports = Item