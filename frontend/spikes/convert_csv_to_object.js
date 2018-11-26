ss = `heading1,heading2,heading3,heading4,heading5
234901904.32,3302.2121, 3210.122, 32325.2, 23014.1
92323901904.32,35662.2121, 7830.122, -52395.2, 04.1
`

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/)
  var headers = allTextLines[0].split(',')
  let dataLines = allTextLines.slice(1)
  const series = Array(headers.length)
  dataLines = dataLines.filter(function (lin) {
    return lin.trim() !== ''
  })

  const matrixVals = dataLines.map(function (lin) {
    // if (lin.trim() === '') return -1
    let lineData = lin.split(',')
    if (lineData.length === headers.length) {
      lineData = lineData.map(function (v) {
        return parseFloat(v)
      })
    }
    else {
      console.log('Error, data format not supported')
      return -1
    }
    return lineData
  })
  for (let idx = 0; idx < series.length; idx++) {
    const singleSerieVals = matrixVals.map(function (v) {
      return v[idx]
    })
    series[idx] = {
      tag: headers[idx],
      values: singleSerieVals,
      id: idx,
      faultAdded: false,
    }
  }
  return series
}

console.log(processData(ss));
