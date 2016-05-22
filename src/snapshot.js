import filter from 'lodash.filter'
import flattenDeep from 'lodash.flattendeep'

class Snapshot {

  constructor (text, diffs = []) {
    this.text = text
    this.deletions = this._filteredDiffsByType(diffs, 'deletion')
    this.additions = this._filteredDiffsByType(diffs, 'addition')
  }

  _filteredDiffsByType (diffs, type) {
    var flag = type === 'addition' ? 1 : -1
    return flattenDeep(
      filter(diffs, (diff) => diff[0] === flag)
      .map((diff) => diff[1])
    )
  }

}

export default Snapshot
