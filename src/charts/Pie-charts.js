import React, { Fragment, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { convertMinutesIntoHourInString, graphColorsTwo } from '../helpers/utils';

const getOptions = (title = '', data, legends, time = false, percentage = false) => {

    console.log('data are', data);
    let _data = [
        {name : "Entry", value : 10},
        {name : "Exit", value : 10},

        
    ]
    return {
        tooltip: {
            trigger: 'item',
            // position: 'absolute',
            confine: true,
            formatter: function (params) {

                console.log('paramsparams', params);
                if (percentage) {
                    return `<p><span style="color:${params.color}; margin-right:10px;">\u2B24</span> <span style="font-weight:">${params.data.name}</span>  : <span style="font-weight:bold">${params.percent}% </span>  </p>`

                } else {
                    return `<p><span style="color:${params.color}; margin-right:10px;">\u2B24</span> <span style="font-weight:">${params.data.name}</span>  : <span style="font-weight:bold">${time ? convertMinutesIntoHourInString(params.data.value) : params.data.value} </span>  </p>`

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
                name: 'Footfall',
                type: 'pie',
                radius: '80%',
                data: _data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }
        ]
    };
}

const PieCore = ({ title = '', data, legends, time = false, percentage = false }) => {

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