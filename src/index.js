import $ from 'jquery'

var snapshots = []
var $pad = $('#pad')

$('#store-version-btn').one('click', function (e) {
  $(this).text('save version')
})


$('#store-version-btn').click((e) => {
  snapshots.push($pad.val())
  console.log(snapshots)
})
