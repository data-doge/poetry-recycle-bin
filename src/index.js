import $ from 'jquery'
import last from 'lodash.last'
import Diff from 'text-diff'
import toCSV from 'array-to-csv'
import map from 'lodash.map'
import downloadCSV from 'client-side-csv-download'
import concat from 'concat-arrays'
import Snapshot from './snapshot.js'
import Histogram from './histogram.js'
var histogram = new Histogram()

var $pad = $('#pad')
var snapshots = []
var diff = new Diff()

$('#start-tracking-btn').click(function () {
  var text = $pad.val()
  $(this).hide()
  snapshots.push(new Snapshot(text))
})

$(document).keyup(function (e) {
  if (e.keyCode === 27 && snapshots.length > 0) {
    var text = $pad.val()
    var diffs = diff.main(last(snapshots).text, text)
    var snapshot = new Snapshot(text, diffs)
    snapshots.push(snapshot)
    histogram.addSnapshot(snapshot)
  }
})

$('#download-csv-btn').click(function () {
  var arr = concat(
    [['text', 'deletions', 'additions']],
    snapshots.map((snapshot) => snapshot.toArray()),
    [['', '', '']],
    [['deleted words', 'count']],
    map(histogram.deletions, (count, word) => [word, count]),
    [['', '', '']],
    [['added words', 'count']],
    map(histogram.additions, (count, word) => [word, count])
  )
  var csvString = toCSV(arr)
  downloadCSV({csvString: csvString, filename: 'meow'})
})
