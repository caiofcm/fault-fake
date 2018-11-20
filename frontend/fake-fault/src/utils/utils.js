

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

export {
  constantFault
}
