import $ from 'jquery'
import last from 'lodash.last'
import Diff from 'text-diff'
import Snapshot from './snapshot.js'
import Histogram from './histogram.js'
var histogram = new Histogram()

var $pad = $('#pad')
var snapshots = []
var diff = new Diff()

$('#start-tracking-btn').click(function () {
  var text = $pad.val()
  $(this).hide()
  $('#store-version-btn').show()
  snapshots.push(new Snapshot(text))
})

$('#store-version-btn').click(() => {
  var text = $pad.val()
  var diffs = diff.main(last(snapshots).text, text)

  var snapshot = new Snapshot(text, diffs)
  snapshots.push(snapshot)

  histogram.addSnapshot(snapshot)

  console.log('data: ', {
    snapshots: snapshots,
    histogram: histogram
  })
})
