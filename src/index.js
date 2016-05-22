import $ from 'jquery'
import last from 'lodash.last'
import Diff from 'text-diff'
import filter from 'lodash.filter'
import Tokenizer from 'sentence-tokenizer'
import flattenDeep from 'lodash.flattendeep'
import isEmpty from 'is-empty'

var $pad = $('#pad')

var data = {
  snapshots: [],
  histogram: {
    deletions: {},
    additions: {}
  }
}

var diff = new Diff()
var tokenizer = new Tokenizer('')

$('#start-tracking-btn').click(function () {
  $(this).hide()
  $('#store-version-btn').show()
  data.snapshots.push({text: $pad.val(), additions: '', deletions: ''})
})

$('#store-version-btn').click(() => {
  var text = $pad.val()

  var diffs = diff.main(last(data.snapshots).text, text)

  var deletions = flattenDeep(
    filter(diffs, (dif) => dif[0] === -1)
    .map((dif) => dif[1])
  )

  var deletedWords = flattenDeep(deletions.map((deletion) => {
    tokenizer.setEntry(deletion)
    tokenizer.getSentences()
    return tokenizer.getTokens()
  }))

  var additions = flattenDeep(
    filter(diffs, (dif) => dif[0] === 1)
    .map((dif) => dif[1])
  )

  var addedWords = flattenDeep(additions.map((additions) => {
    tokenizer.setEntry(additions)
    tokenizer.getSentences()
    return tokenizer.getTokens()
  }))

  data.snapshots.push({text: text, additions: additions, deletions: deletions})

  addedWords.forEach((word) => {
    if (data.histogram.additions[word]) {
      data.histogram.additions[word]++
    } else {
      data.histogram.additions[word] = 1
    }
  })

  deletedWords.forEach((word) => {
    if (data.histogram.deletions[word]) {
      data.histogram.deletions[word]++
    } else {
      data.histogram.deletions[word] = 1
    }
  })

  console.log('data: ', data)
})
