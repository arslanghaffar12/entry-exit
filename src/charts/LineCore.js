import React, { Fragment, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

const getOption = ({ labels, data, legends }) => {

  return {
    tooltip: {
      trigger: 'axis',
      confine: true

    },
    xAxis: {
      type: 'category',
      data: labels
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => Math.round(value),
      },
    },
    legend: {
      data: legends
    },
    series: data

  };
}
const LineCore = (props) => {

  console.log('props.labels', props.labels);

  const [options, setOptions] = useState(null);
  const onChartReady = (echarts) => {
    echarts.hideLoading();
  }

  useEffect(() => {
    setOptions(getOption({ labels: props.labels, data: props.graph, legends: props.legends }));
  }, [props])

  return (
    <Fragment>
      {options != undefined && options !== null && options &&
        <ReactECharts
          echarts={echarts}
          option={options}
          style={{ height: 217 }}
          onChartReady={onChartReady}
          notMerge={true}

        />
      }
    </Fragment>
  )
}

export default LineCore;