import $ from 'jquery'

function downloadCSV (params) {
  var $anchor = $('<a></a>')
  $('body').append($anchor)
  $anchor.attr({
    href: 'data:attachment/csv;charset=utf-8,' + encodeURI(params.csvString),
    target: '_self',
    download: params.filename + '.csv'
  })[0].click()
  $anchor.remove()
}

export default downloadCSV
