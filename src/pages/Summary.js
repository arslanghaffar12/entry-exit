import React, { Fragment } from 'react'
import { CardBody, Card, Row, Col, CardHeader } from 'reactstrap'
import LineCore from '../charts/LineCore'
import PieCore from '../charts/Pie-charts'
import PieChart from '../charts/Pie-charts'
import ColorDot from '../components/ColorDot'
import { colors, graphColorsTwo } from '../helpers/utils'

export default function Summary() {

  const children = [
    { value: 45, label: "Entry" },
    { value: 87, label: "Exit" },

  ]
  return (
    <Fragment>
      <h4>Visitors</h4>
      <Row className='my-4 ' >


        <Col className='' md={2}>
          <div className='feature '>
            <div className='title'>
              Entry
            </div>
            <div className='number'>
              7,343
            </div>

          </div>
          <div className='feature my-4'>
            <div className='title'>
              Exit
            </div>
            <div className='number'>
              4,343
            </div>

          </div>



        </Col>

        <Col md={2} className='p-0 m-0'>
          <div className='feature' >

            <PieCore data={[{ name: "Entry", value: 45 }, { name: "Exit", value: 87 }]} />

            <div style={{ maxHeight: '12.5rem', backgroundColor: '' }}>
              <div
                className={'scrollbar'} id="style-3" style={{ width: "100%", overflowY: 'auto', overflowX: "hidden" }}
              >
                {children &&
                  children?.map((item, index) => {
                    return (
                      <div className={'py-2 px-2'} style={{ paddingLeft: "10px", fontSize: "12px", color: colors.lightDark, }} key={"visitors-chart-" + index}>
                        <ColorDot marginRight={'0.4rem'} color={graphColorsTwo[index]} display={'inline-block'} />
                        {item.label} {''}
                        <span style={{ float: "right" }}>
                          {item.value}
                        </span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

        </Col>

        <Col md={7} className='p-0' style={{marginLeft : "10px"}}>
          <div className='feature'>
            <LineCore />
          </div>
        </Col>

      </Row>
    </Fragment>
  )
}
