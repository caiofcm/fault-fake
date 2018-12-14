
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

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
  var u = 0, v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

const UUIDgeneration = function () {
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
}

// function make_subarray(array, from, to) {
//   return {
//     get: function (i) {
//       return array[i + from]
//     },
//     length: to - from
//   }
// }

// ref: https://stackoverflow.com/questions/24065411/javascript-subarray-without-copying
Array.prototype.subarray = function (i, j) {
  var self = this, arr = [];
  for (var n = 0; i <= j; i++ , n++) {
    (function (i) {
      Object.defineProperty(arr, n, {       //Array is an Object
        get: function () {
          return self[i];
        },
        set: function (value) {
          self[i] = value;
          return value;
        }
      });
    })(i);
  }
  return arr;
}

export {
  constantFault,
  processData,
  computeTableData,
  float_format,
  getHigherId,
  createConstantSignal,
  randn_bm,
  UUIDgeneration,
  // make_subarray
}
