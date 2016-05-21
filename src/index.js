import $ from 'jquery'
import last from 'lodash.last'
import Diff from 'text-diff'
var diff = new Diff()
import filter from 'lodash.filter'
import Tokenizer from 'sentence-tokenizer'
var tokenizer = new Tokenizer()
import flatten from 'lodash.flatten'

var snapshots = ['']
var $pad = $('#pad')

$('#store-version-btn').one('click', function (e) {
  $(this).text('save version')
})


$('#store-version-btn').click((e) => {
  var snapshot = $pad.val()
  var differences = diff.main(last(snapshots), snapshot)
  var deletions = flatten(filter(differences, (difference) => {
    return difference[0] === -1
  }).map((difference) => {
    return difference[1]
  }))
  console.log('deletions: ', deletions)
  snapshots.push(snapshot)
})
