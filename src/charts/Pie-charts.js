import React, { Fragment, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { convertMinutesIntoHourInString, graphColorsTwo } from '../helpers/utils';

const getOptions = (title = '', data, legends, time = false, percentage =false) => {
    return {
        tooltip: {
            trigger: 'item',
            // position: 'absolute',
            confine: true,
            formatter: function (params) {

                console.log('paramsparams', params);
                if(percentage){
                    return `<p><span style="color:${params.color}; margin-right:10px;">\u2B24</span> <span style="font-weight:">${params.data.name}</span>  : <span style="font-weight:bold">${params.percent}% </span>  </p>`

                }else {
                    return `<p><span style="color:${params.color}; margin-right:10px;">\u2B24</span> <span style="font-weight:">${params.data.name}</span>  : <span style="font-weight:bold">${ time ? convertMinutesIntoHourInString(params.data.value) : params.data.value} </span>  </p>`

                }


            }
          
        },
        legend: {
            show: legends,
            top: '5%',
            left: 'center'
        },
        color: graphColorsTwo,
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        series: [
            {
                name: title,
                type: 'pie',
                radius: ['70%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 0,
                    borderColor: '#fff',
                    borderWidth: 1
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    scale: false
                },
                labelLine: {
                    show: false
                },
                data: data

            }
        ]
    };
}

const PieCore = ({ title = '', data, legends, time = false, percentage=false }) => {

    const [option, setOption] = useState(null);
    useEffect(() => {
        setOption(getOptions(title, data, legends, time, percentage));
    }, [data])

    return (
        <Fragment>
            {option != undefined &&
                <ReactECharts
                    option={option}
                    style={{ height: 150 }}
                />
            }
        </Fragment>
    )
}

export default PieCore;