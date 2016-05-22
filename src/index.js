import $ from 'jquery'
import last from 'lodash.last'
import Diff from 'text-diff'
import toCSV from 'array-to-csv'
import each from 'lodash.foreach'
import downloadCSV from './download-csv'
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
  if (e.keyCode === 27) {
    var text = $pad.val()
    var diffs = diff.main(last(snapshots).text, text)

    var snapshot = new Snapshot(text, diffs)
    snapshots.push(snapshot)

    histogram.addSnapshot(snapshot)
  }
})

$('#download-csv-btn').click(function () {
  var csvArray = []
  var snapshotHeaders = ['text', 'deletions', 'additions']
  var deletionHistogramHeaders = ['deleted words', 'count']
  var additionHistogramHeaders = ['added words', 'count']
  csvArray.push(snapshotHeaders)
  snapshots.forEach((snapshot) => csvArray.push(snapshot.toArray()))
  csvArray.push(['', '', ''])
  csvArray.push(deletionHistogramHeaders)
  each(histogram.deletions, (count, word) => { csvArray.push([word, count]) })
  csvArray.push(['', '', ''])
  csvArray.push(additionHistogramHeaders)
  each(histogram.additions, (count, word) => { csvArray.push([word, count]) })
  var csvString = toCSV(csvArray)
  downloadCSV({csvString: csvString, filename: 'meow'})
})
