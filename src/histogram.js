import flattenDeep from 'lodash.flattendeep'
import Tokenizer from 'sentence-tokenizer'
var tokenizer = new Tokenizer('')

class Histogram {

  constructor () {
    this.additions = {}
    this.deletions = {}
  }

  addSnapshot (snapshot) {
    var addedWords = this._extractWordsFromDiffs(snapshot.additions)
    addedWords.forEach((word) => {
      if (this.additions[word]) {
        this.additions[word]++
      } else {
        this.additions[word] = 1
      }
    })

    var deletedWords = this._extractWordsFromDiffs(snapshot.deletions)
    deletedWords.forEach((word) => {
      if (this.deletions[word]) {
        this.deletions[word]++
      } else {
        this.deletions[word] = 1
      }
    })
  }

  _extractWordsFromDiffs (diffs) {
    return flattenDeep(diffs.map((diff) => {
      tokenizer.setEntry(diff)
      tokenizer.getSentences()
      return tokenizer.getTokens()
    }))
  }

}

export default Histogram
