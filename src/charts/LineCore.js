import React, { Fragment, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

const getOption = ({ legends, labels, data }) => {

    return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        legend : {
          data : ['Entry', 'Exit']
        } ,
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            name : 'Entry'
          },
           {
            data: [130, 230, 234, 258, 235, 347, 160],
            type: 'line',
            name : 'Exit'
          }
        ]
      };
}
const LineCore = (props) => {

    console.log('props.labels',props.labels);

    const [options, setOptions] = useState(null);
    const onChartReady = (echarts) => {
        echarts.hideLoading();
    }

    useEffect(() => {
        setOptions(getOption({ legends: props.legend, labels: props.labels, data: props.data }));
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