var statusMap = {
  'unPublish' : '未发布',
  'published' : '已发布',
  'end'       : '已结束'
}

var ItemModel = Backbone.Model.extend({
  defaults: {
    title: '',
    time: 0,
    status: 'unPublish',
    checked: false
  },

  toJSON: function(options) {
    var obj =  _.clone(this.attributes)

    obj.status = statusMap[obj.status]

    return obj
  }
})

module.exports = ItemModel