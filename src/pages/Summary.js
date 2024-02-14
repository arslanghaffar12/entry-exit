import React, { Fragment } from 'react'
import { CardBody, Card, Row, Col, CardHeader } from 'reactstrap'

export default function Summary() {
  return (
    <Fragment>
      <h4>Visitors</h4>
      <Row className='my-4 ' >


        <Col className='d-flex'>
          <div className='feature'>
            <div className='title'>
              Entry
            </div>
            <div className='number'>
              7,343
            </div>

          </div>
          <div className='feature mx-4'>
            <div className='title'>
              Exit
            </div>
            <div className='number'>
              4,343
            </div>

          </div>



        </Col>

      </Row>
    </Fragment>
  )
}
