import React from 'react'
import Plot from 'react-plotly.js'

export default function PlotData(props) {
  return (
    <Plot
      onRelayout={props.handleReLayout}
      data={[
        {
          // x: [1, 2, 3],
          y: props.serie.values,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'black', symbol: 'circle-open', size: 12 },
        },
      ]}
      layout={{
        width: 700,
        title: props.serie.tag
      }}
      config={{ displaylogo: false, showLink: false,
        modeBarButtonsToRemove: ['sendDataToCloud'] }}
    />
  )
}
