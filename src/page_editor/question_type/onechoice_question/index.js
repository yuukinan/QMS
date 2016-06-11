require('./index.styl')

var template  = require('./template.html')
var Model = require('../model')

var onechoice_question = Backbone.view.extend({
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

module.exports = one_question