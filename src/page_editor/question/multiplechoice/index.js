require('./index.styl')

var template  = require('./template.html')
// var Model     = require('../../model')

var multipleChoice = Backbone.View.extend({
	tagName: 'div',

    className: 'question-number',

    events:{
    },

    initialize: function (options) {
        // this.model = new Model(options)
        this.number = options.number
        this.model = options.model
    },

    render: function () {
        this.$el.html(template({
            number: this.number
        }))

        return this
    }
})

module.exports = multipleChoice