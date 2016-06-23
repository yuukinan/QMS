console.log('list start...')
require('./index.styl')

var template  = require('./template.html')
var ItemModel = require('./model')

var Item = Backbone.View.extend({

  tagName: 'tr',

  className: 'list-item',

  events: {
    'click .delete' : 'itemDelete',
    'click .data' : 'viewData'
  },

  initialize: function (options) {
    this.model = new ItemModel(options)
  },

  itemDelete: function(){
    var st=this.model.get("status")
    if(st=="end")
      alert("问卷已结束，不能删除")
    else{alert("确认删除？")}
  },

  viewData: function(){
  },

  render: function () {
    this.$el.html(template(this.model.toJSON()))

    return this
  }

})

module.exports = Item