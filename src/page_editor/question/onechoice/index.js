require('./index.styl')

var template  = require('./template.html')
var Model = require('../../model')

<<<<<<< HEAD:src/page_editor/question_type/text_question/index.js
var text_question = Backbone.View.extend({
=======
var oneChoice = Backbone.View.extend({
>>>>>>> 4b33dcb0b969f7d6d105f4de0cc435527ffa3368:src/page_editor/question/onechoice/index.js
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

module.exports = oneChoice