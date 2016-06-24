var baseUrl = 'http://localhost:3000'

var server = {}

server.addNew = function (data, callback){
	$.ajax({
		url: baseUrl + '/addNew',
		type: 'POST',
		dataType: 'json',
		data: data,
		success: callback
	})
}

server.list = function (data, callback) {
  $.ajax({
    url: baseUrl + '/list',
    type: 'GET',
    dataType: 'json',
    data: data,
    success: callback
  })
}

server.detail = function (data, callback) {
  $.ajax({
    url: baseUrl + '/detail',
    type: 'GET',
    dataType: 'json',
    data: data,
    success: callback
  })
}

//server.edit = function (data, callback){
//	$.ajax({
//		url: baseUrl + '/edit',
//		type: 'POST',
//		dataType: 'json',
//		data: data,
//		success: callback
//	})
//}

module.exports = server