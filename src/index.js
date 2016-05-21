import $ from 'jquery'
import last from 'lodash.last'
import Diff from 'text-diff'
import filter from 'lodash.filter'
import Tokenizer from 'sentence-tokenizer'
import flattenDeep from 'lodash.flattendeep'

var $pad = $('#pad')
var snapshots = ['']
var diff = new Diff()
var tokenizer = new Tokenizer('')

$('#store-version-btn').one('click', function () {
  $(this).text('save version')
})

$('#store-version-btn').click(() => {
  var snapshot = $pad.val()

  var diffs = diff.main(last(snapshots), snapshot)

  var deletions = flattenDeep(
    filter(diffs, (dif) => dif[0] === -1)
    .map((dif) => dif[1])
  )

  var deletedWords = flattenDeep(deletions.map((deletion) => {
    tokenizer.setEntry(deletion)
    tokenizer.getSentences()
    return tokenizer.getTokens()
  }))

  console.log('deletedWords: ', deletedWords)

  snapshots.push(snapshot)
})
