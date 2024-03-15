import React, { Fragment, useEffect, useState } from 'react'
import { CardBody, Card, Row, Col, CardHeader, Button, ButtonGroup } from 'reactstrap'
import LineCore from '../charts/LineCore'
import PieCore from '../charts/Pie-charts'
import PieChart from '../charts/Pie-charts'
import ColorDot from '../components/ColorDot'
import MainFilter from '../components/MainFilter'
import { footfallRequest } from '../helpers/request'
import { capitalizeFirstLetter, colors, formatNumberTwoDigits, graphColorsTwo } from '../helpers/utils'
import moment from 'moment'
import { BarChart2, Download, TrendingUp } from "react-feather";
import { useDispatch, useSelector } from 'react-redux'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function Summary() {

  const [filter, setFilter] = useState();
  const user = useSelector((state) => state.auth);
  console.log('user in summary is', user);

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
  const [total, setTotal] = useState({ entry: 0, exit: 0, male: 0, female: 0 })
  const [type, setType] = useState("line")
  const [genderType, setGenderType] = useState("line")


  const [barGraph, setBarGraph] = useState([]);
  const [lineGraph, setLineGraph] = useState([]);
  const [chartType, setChartTpe] = useState('count')
  const [countGraph, setCountGraph] = useState({ line: [], bar: [], legends: ['Entry', 'Exit'] })
  const [genderGraph, setGenderGraph] = useState({ line: [], bar: [], legends: ['Male', 'Female'] })

  const dispatch = useDispatch();


  console.log('graph is', graph);

  const updateFilter = async (e) => {
    console.log('date im recieving', e);


    let obj = {
      data: {
        start: e.start,
        end: e.end,
        "key": "newStore",
        sid: e.sid,
        fid: e.fid,
        cid: e.cid
      },
      dispatch
    };

    const response = await footfallRequest(obj);

    console.log('response of footfall', response);

    if (typeof response !== undefined && response) {
      let obj = {
        entry: 0,
        exit: 0,
        male: 0,
        female: 0
      }

      response.current.forEach((item) => {
        obj['entry'] = obj['entry'] + item.entry;
        obj['exit'] = obj['exit'] + item.exit;
        obj['male'] = obj['male'] + item.male;
        obj['female'] = obj['female'] + item.female;

      })

      setTotal(obj)

      // setTotal({ entry: response.current.reduce((acc, curr) => acc + curr.entry, 0), exit: response.current.reduce((acc, curr) => acc + curr.exit, 0) })
      setFootfall(response);
      setFilter(e)


      try {

        const line = await compileGraph(response.current, e, "line", 'entry', "exit")
        const bar = await compileGraph(response.current, e, "bar", 'entry', 'exit')

        const genderLine = await compileGraph(response.current, e, "line", 'male', "female")
        const genderBar = await compileGraph(response.current, e, "bar", 'male', 'female')
        setCountGraph({ line: line.graph, bar: bar.graph, legends: line.legends })
        setGenderGraph({ line: genderLine.graph, bar: genderBar.graph, legends: genderLine.legends })

        console.log('line graph', line);
        setLabels(line.label)
        setLineGraph(line.graph)
        console.log('bar graph', bar);

        // setLabels(bar.xLabels)
        setBarGraph(bar.graph)

      }
      catch (err) {
        console.log('got error while making graph');
      }


    }






  }

  const children = [
    { value: 45, label: "Entry" },
    { value: 87, label: "Exit" },

  ]

  const compileGraph = (data, payload, type, key1, key2) => {


    try {
      let start = moment(payload.start);
      let end = moment(payload.end);

      console.log('end is near', end, moment(new Date(end)).format());

      let xLabels = [];
      let entry = {
        data: [],
        type: type,
        name: key1
      }

      let exit = {
        data: [],
        type: type,
        name: key2
      }



      let diff = end.diff(start, 'day');

      console.log('diff', diff);

      if (diff == 0) {

        let objectOfDates = {};
        data = data.sort((a, b) => {
          return parseInt(a.h) - parseInt(b.h)
        })
        data.forEach((item) => {
          objectOfDates[item.h] = item;
        })

        while (end.diff(start, "hour") >= 0) {
          const startMoment = moment(start).format("hh:mm a");
          const hour = formatNumberTwoDigits(moment(start).hour());
          console.log('startMoment', startMoment, "hour is", hour);
          if (hour in objectOfDates) {
            entry.data.push(objectOfDates[hour][key1]);
            exit.data.push(objectOfDates[hour][key2]);
          } else {
            exit.data.push(0)
            entry.data.push(0)
          }
          xLabels.push(startMoment);
          start = start.add(1, "hour");



        }

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
            entry.data.push(objectOfDates[_start][key1]);
            exit.data.push(objectOfDates[_start][key2]);
          } else {
            exit.data.push(0)
            entry.data.push(0)
          }


          start = start.add(1, "day");

        }

      }

      return { label: xLabels, graph: [entry, exit], legends: [key1, key2] };

      // setGraph([entry, exit])
      // setLabels(xLabels)

    }

    catch (err) {
      console.log('error of making chart', err);
    }



  }


  const downloadPDF = async () => {
    const input = document.getElementById('contentToDownload'); // Replace with your element ID
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('download.pdf');
    });
  };





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

      <Row id="contentToDownload"  >
        <Col md={2} >
        </Col>
        <Col md={8} className='m-0 p-0'  >
          <Download size="16" onClick={downloadPDF} style={{ cursor: "pointer" }} />

          <Row className='m-0 my-4 p-0 ' >



            <Col className='p-0 m-0' md={3}>
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
            <Col md={6} className=' m-0'>

              <div className='feature'  >
                <div className='d-flex m-2' style={{ position: "absolute", zIndex: "99999999" }}>
                  <Button
                    color={chartType === "count" ? "#0d6efd" : "#000000"}
                    className='section-tab'
                    size='sm'
                    active={chartType === "count" ? true : false}
                    key={"compare-tab-line"}
                    onClick={() => setChartTpe('count')}
                    style={{ cursor: "pointer" }}

                  >
                    Count
                  </Button>
                  <Button
                    color={chartType === "gender" ? "#0d6efd" : "#000000"}
                    className='section-tab'
                    size='sm'
                    active={chartType === "gender" ? true : false}
                    key={"compare-tab-line"}
                    onClick={() => setChartTpe('gender')}
                    style={{ cursor: "pointer", marginLeft: "16rem" }}

                  >
                    Gender
                  </Button>

                </div>

                <PieCore data={chartType === "count" ? [{ name: "Entry", value: total.entry }, { name: "Exit", value: total.exit }]
                  : [{ name: "Male", value: total.male }, { name: "Female", value: total.female }]
                } />

                <Row className='' style={{ marginTop: "-2rem" }}>
                  <Col md={4}>
                    {total &&
                      Object.keys(total ? total : {})?.map((item, index) => {
                        console.log('item of total', item);
                        if (item === "entry" || item === "exit") {
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
                        }

                      })
                    }
                  </Col>
                  <Col md={4}>
                  </Col>
                  <Col md={4}>
                    {total &&
                      Object.keys(total ? total : {})?.map((item, index) => {
                        console.log('item of total', item);
                        if (item === "male" || item === "female") {
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
                        }

                      })
                    }
                  </Col>
                </Row>


              </div>

            </Col>
            <Col className='p-0 m-0' md={3}>
              <div className='feature '>
                <div className='title'>
                  Male
                </div>
                <div className='number'>
                  {total.male}
                </div>

              </div>
              <div className='feature my-4'>
                <div className='title'>
                  Female
                </div>
                <div className='number'>
                  {total.female}

                </div>

              </div>



            </Col>






          </Row>
          <Row className='m-0 p-0'>
            <Col md={12} className='p-0 mb-3'>
              <Card className='m-0 p-0'>
                <CardHeader style={{ backgroundColor: 'none' }} className=''>
                  <Row style={{ position: 'relative' }}>
                    <Col md={6} style={{ backgroundColor: '', position: "absolute", top: "50%", margin: 0, transform: "translateY(-50%)" }}>
                      {


                        <h4 className="m-0" style={{ fontSize: '14px' }}>{((`${type} Graph`).toLocaleUpperCase())}</h4>
                      }
                    </Col>
                    <Col className='text-end'>


                      <Button
                        color={type === "line" ? "#0d6efd" : "#000000"}
                        className='section-tab'
                        size='sm'
                        active={type === "line" ? true : false}
                        key={"compare-tab-line"}
                        onClick={() => setType('line')}
                        style={{ cursor: "pointer" }}

                      >
                        {summaryMenu[0][1]}
                      </Button>

                      <Button
                        color={type === "bar" ? "#0d6efd" : "#000000"}
                        className='section-tab'
                        size='sm'
                        active={type === "bar" ? true : false}
                        key={"compare-tab-line"}
                        onClick={() => setType('bar')}
                        style={{ cursor: "pointer" }}


                      >
                        {summaryMenu[1][1]}
                      </Button>


                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className='p-0 m-0 pt-3 '>
                  <LineCore labels={labels} graph={countGraph[type]} legends={countGraph.legends} />

                </CardBody>
              </Card>

            </Col>
          </Row>

          <Row className='m-0 p-0'>
            <Col md={12} className='p-0 m-0'>
              <Card className='m-0 p-0'>
                <CardHeader style={{ backgroundColor: 'none' }} className=''>
                  <Row style={{ position: 'relative' }}>
                    <Col md={6} style={{ backgroundColor: '', position: "absolute", top: "50%", margin: 0, transform: "translateY(-50%)" }}>
                      {


                        <h4 className="m-0" style={{ fontSize: '14px' }}>{((`${genderType} Graph`).toLocaleUpperCase())}</h4>
                      }
                    </Col>
                    <Col className='text-end'>
                      <Button
                        color={genderType === "line" ? "#0d6efd" : "#000000"}
                        className='section-tab'
                        size='sm'
                        active={genderType === "line" ? true : false}
                        key={"compare-tab-line"}
                        onClick={() => setGenderType('line')}
                        style={{ cursor: "pointer" }}


                      >
                        {summaryMenu[0][1]}
                      </Button>

                      <Button
                        color={genderType === "bar" ? "#0d6efd" : "#000000"}
                        className='section-tab'
                        size='sm'
                        active={genderType === "bar" ? true : false}
                        key={"compare-tab-line"}
                        style={{ cursor: "pointer" }}
                        onClick={() => setGenderType('bar')}
                      >
                        {summaryMenu[1][1]}
                      </Button>

                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className='p-0 m-0 pt-3 '>
                  <LineCore labels={labels} graph={genderGraph[genderType]} legends={genderGraph.legends} />

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
