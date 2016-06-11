require('./index.styl')

var template  = require('./template.html')
var Model = require('../../model')

var text_question = Backbone.View.extend({
	tagName: 'h4',
    className: 'question-number',

    events:{
    },

    initialize: function (options) {
    this.model = new Model(options)
  },

    render: function () {
    this.$el.html(template(this.model.toJSON()))

    return this
  }
})

module.exports = text_question