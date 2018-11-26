
  //--------------------
  // Fault Edition
  //--------------------
function constantFault(inputs) {
  const { serie, faultConfig, bounds } = inputs
  const value = faultConfig.value
  // const serieMod = [...serie]
  // serieMod[bounds.lowBound]
  console.log(bounds, value)
  const serieMod = serie.values.map((v, i) => {
    return (i >= bounds.lowBound && i <= bounds.uppBound) ?
      value : v
  })
  return serieMod
}

//--------------------
// Signal Creation
//--------------------
function createConstantSignal(inputs) {
  const { faultConfig, numPoints } = inputs
  const value = faultConfig.value
  const signal = Array(numPoints)
  for (let index = 0; index < signal.length; index++) {
    signal[index] = value;
  }
  return signal
}







//--------------------
// Series Import
//--------------------
function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/)
  var headers = allTextLines[0].split(',')
  let dataLines = allTextLines.slice(1)
  const series = Array(headers.length)

  dataLines = dataLines.filter(function (lin) {
    return lin.trim() !== ''
  })

  const matrixVals = dataLines.map(function (lin) {
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

//--------------------
// Table
//--------------------
function float_format(num) {
  return (num > 1e3 || (num !== 0 && num < 1e-3)) ? num.toExponential(4) : num.toFixed(4)
}
function computeTableData(data) {
  return {
    id: data.id,
    name: data.tag,
    fault: data.faultAdded,
    min: float_format(Math.min(...data.values)),
    max: float_format(Math.max(...data.values)),
    size: data.values.length,
  }
}


//--------------------
// Misc
//--------------------
function getHigherId(series) {
  return Math.max(...series.map(v =>  v.id ))
}


export {
  constantFault,
  processData,
  computeTableData,
  float_format,
  getHigherId,
  createConstantSignal,
}
