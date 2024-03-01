import React, { Fragment, useEffect, useState } from 'react'
import { CardBody, Card, Row, Col, CardHeader, Button, ButtonGroup } from 'reactstrap'
import LineCore from '../charts/LineCore'
import PieCore from '../charts/Pie-charts'
import PieChart from '../charts/Pie-charts'
import ColorDot from '../components/ColorDot'
import MainFilter from '../components/MainFilter'
// import { footfallRequest } from '../helpers/request'
import { capitalizeFirstLetter, colors, graphColorsTwo } from '../helpers/utils'
import moment from 'moment'
import { BarChart2, TrendingUp } from "react-feather";

export default function Summary() {

  const [filter, setFilter] = useState();

  const gr = [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      name: 'Entry'
    },
    {
      data: [130, 230, 234, 258, 235, 347, 160],
      type: 'line',
      name: 'Exit'
    }
  ]


  const [graph, setGraph] = useState([]);
  const [footfall, setFootfall] = useState()
  const [labels, setLabels] = useState([]);
  const [total, setTotal] = useState({ entry: 0, exit: 0 })
  const [type, setType] = useState("line")
  const [barGraph, setBarGraph] = useState([]);
  const [lineGraph, setLineGraph] = useState([]);


  console.log('graph is', graph);

  const updateFilter = async (e) => {
    console.log('date im recieving', e);


    let obj = {
      data: {
        start: e.start,
        end: e.end,
        "key": "newStore"
      }
    };

    // const response = await footfallRequest(obj);

    // console.log('response of footfall', response);

    // if (typeof response !== undefined && response) {

    //   setTotal({ entry: response.current.reduce((acc, curr) => acc + curr.entry, 0), exit: response.current.reduce((acc, curr) => acc + curr.exit, 0) })
    //   setFootfall(response);
    //   setFilter(e)


    //   try {

    //     const line = await compileGraph(response.current, e, "line")
    //     setLabels(line.label)
    //     setLineGraph(line.graph)
    //     const bar = await compileGraph(response.current, e, "bar")
    //     // setLabels(bar.xLabels)
    //     setBarGraph(bar.graph)

    //   }
    //   catch (err) {
    //     console.log('got error while making graph');
    //   }


    // }






  }

  const children = [
    { value: 45, label: "Entry" },
    { value: 87, label: "Exit" },

  ]

  const compileGraph = (data, payload, type) => {


    try {
      let start = moment(payload.start);
      let end = moment(payload.end);

      console.log('end is near', end, moment(new Date(end)).format());

      let xLabels = [];
      let entry = {
        data: [],
        type: type,
        name: 'Entry'
      }

      let exit = {
        data: [],
        type: type,
        name: 'Exit'
      }



      let diff = end.diff(start, 'day');

      console.log('diff', diff);

      if (diff == 0) {

      }
      else {


        let objectOfDates = {};
        data = data.sort((a, b) => {
          return new Date(a._id) - new Date(b._id)
        })
        data.forEach((item) => {
          objectOfDates[item._id] = item;
        })


        while (end.diff(start, "day") >= 0) {



          let _start = moment(start).format("YYYY-MM-DD");
          console.log('_start is now', _start, "end is", moment(end).format("YYYY-MM-DD"), "and diff is", end.diff(start, 'day'));
          xLabels.push(_start);

          if (_start in objectOfDates) {
            entry.data.push(objectOfDates[_start]['entry']);
            exit.data.push(objectOfDates[_start]['exit']);
          } else {
            exit.data.push(0)
            entry.data.push(0)
          }


          start = start.add(1, "day");

        }

      }

      return { label: xLabels, graph: [entry, exit] };

      // setGraph([entry, exit])
      // setLabels(xLabels)

    }

    catch (err) {
      console.log('error of making chart', err);
    }



  }


  useEffect(() => {

    if (typeof filter !== undefined && filter) {
      try {
        compileGraph(footfall.current, filter, type)

      }
      catch (err) {

      }
    }





  }, [type, filter])


  const summaryMenu = [
    ["line", <TrendingUp size={16} />],
    ["bar", <BarChart2 size={16} />],
  ];

  return (
    <Fragment>
      <MainFilter
        type="calendar"
        pageTitle=""
        updateFilter={updateFilter}
      />

      <Row>
        <Col md={2}>
        </Col>
        <Col md={8}>
          <Row className='my-4 ' >






            <Col className='' md={2}>
              <div className='feature '>
                <div className='title'>
                  Entry
                </div>
                <div className='number'>
                  {total.entry}
                </div>

              </div>
              <div className='feature my-4'>
                <div className='title'>
                  Exit
                </div>
                <div className='number'>
                  {total.exit}

                </div>

              </div>



            </Col>
            <Col md={6} className='p-0 m-0'>
              <div className='feature' >

                <PieCore data={[{ name: "Entry", value: total.entry }, { name: "Exit", value: total.exit }]} />

                <div style={{ maxHeight: '12.5rem', backgroundColor: '' }}>
                  <div
                    className={'scrollbar'} id="style-3" style={{ width: "100%", overflowY: 'auto', overflowX: "hidden" }}
                  >
                    {total &&
                      Object.keys(total ? total : {})?.map((item, index) => {
                        return (
                          <div className={'py-2 px-2'} style={{ paddingLeft: "10px", fontSize: "12px", color: colors.lightDark, }} key={"visitors-chart-" + index}>
                            <ColorDot
                              marginRight={'0.4rem'}
                              color={graphColorsTwo[index]}
                              display={'inline-block'}
                            />
                            {capitalizeFirstLetter(item)} {''}
                            <span style={{ float: "right" }}>
                              {total[item]}
                            </span>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

            </Col>

            <Col md={4}>
            </Col>





          </Row>
          <Row>
            <Col md={12} className='p-0' style={{ marginLeft: "10px" }}>
              <Card className='m-0 p-0'>
                <CardHeader style={{ backgroundColor: 'none' }} className=''>
                  <Row style={{ position: 'relative' }}>
                    <Col style={{ backgroundColor: '', position: "absolute", top: "50%", margin: 0, transform: "translateY(-50%)" }}>
                      {


                        <h4 className="m-0" style={{ fontSize: '14px' }}>{(("Line Graph").toLocaleUpperCase())}</h4>
                      }
                    </Col>
                    <Col className='text-end'>

                      <Button
                        // href={"#toggle-tab-" + val[0]}
                        color={type === "line" ? "#0d6efd" : "#000000"}
                        className='section-tab'
                        size='sm'
                        active={summaryMenu[0][0] === "line" ? true : false}
                        // active={!Object.keys(type ? type : {}).length ? index === 0 && true : (typeof type !== undefined && type && feature in type && type[feature] === val[0]) ? true : false}
                        key={"compare-tab-line"}
                      >
                        {summaryMenu[0][1]}
                      </Button>


                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className='p-0 m-0 pt-3 '>
                  <LineCore labels={labels} graph={lineGraph} />

                </CardBody>
              </Card>

            </Col>
          </Row>

          <Row>
            <Col md={12} className='p-0' style={{ marginLeft: "10px" }}>
              <Card className='m-0 p-0'>
                <CardHeader style={{ backgroundColor: 'none' }} className=''>
                  <Row style={{ position: 'relative' }}>
                    <Col style={{ backgroundColor: '', position: "absolute", top: "50%", margin: 0, transform: "translateY(-50%)" }}>
                      {


                        <h4 className="m-0" style={{ fontSize: '14px' }}>{(("Bar Graph").toLocaleUpperCase())}</h4>
                      }
                    </Col>
                    <Col className='text-end'>
                      <Button
                        // href={"#toggle-tab-" + val[0]}
                        color={type === "bar" ? "#0d6efd" : "#000000"}
                        className='section-tab'
                        size='sm'
                        active={summaryMenu[1][0] === "bar" ? true : false}
                        // active={!Object.keys(type ? type : {}).length ? index === 0 && true : (typeof type !== undefined && type && feature in type && type[feature] === val[0]) ? true : false}
                        key={"compare-tab-bar"}
                      >
                        {summaryMenu[1][1]}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className='p-0 m-0 pt-3 '>
                  <LineCore labels={labels} graph={barGraph} />

                </CardBody>
              </Card>

            </Col>
          </Row>
        </Col>
        <Col md={2}>
        </Col>
      </Row>



    </Fragment>
  )
}
