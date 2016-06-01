console.log('list start...')
require('./index.styl')

var template  = require('./template.html')
var ItemModel = require('./model')

var Item = Backbone.View.extend({

  tagName: 'tr',

  className: 'list-item',

  events: {
  },

  initialize: function (options) {
    this.model = new ItemModel(options)

  },

  render: function () {
    this.$el.html(template(this.model.toJSON()))

    return this
  }
})

module.exports = Item