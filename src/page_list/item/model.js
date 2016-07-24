var statusMap = {
  'unPublish' : '未发布',
  'published' : '已发布',
  'end'       : '已结束'
}

var ItemModel = Backbone.Model.extend({
  defaults: {
    id: 0,
    title: '',
    createdAt: 0,
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