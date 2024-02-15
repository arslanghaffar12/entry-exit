import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Col, Row, CardBody, Card } from 'reactstrap';
import Heatmap from '../components/Heatmap';
import { heatmapDemo, heatmapRange } from '../helpers/common';

export default function Heatmaps() {

  const [data, setData] = useState({ dye: '', map: '' })
  const [normalizeHeatmap, setNormalizeHeatmap] = useState([]);

  const dispatch = useDispatch();

  return (
    <Fragment>

      {data.dye &&
        <Row className="mb-3">
          <Col>
            <Card>
              <CardBody>
                <Row className="align-items-center justify-content-evenly">
                  <Col className="col-8 col-md-8">




                    <Heatmap
                      dye={data ? data.dye : ""}
                      map={data ? data.map : ""}
                      heatmapData={normalizeHeatmap ? normalizeHeatmap : []}
                      key={"my_map"}
                      sections={[]}
                      setSection={(section) => (section)}
                      section={""}
                      dispatch={dispatch}

                    />


                  </Col>
                  <Col className="col-3 col-md-3">
                    <img src={heatmapRange} className="rounded" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>}

      {!data.dye && (
        <>
          <Card>
            <CardBody>
              <Row>
                <Col className="h-100 valign-middle">
                  <h5 className="font-italic">
                    "A picture is worth a thousand words"
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col md={9}>
                  <img src={heatmapDemo} className="rounded w-100" />
                </Col>
              
              </Row>
            </CardBody>
          </Card>
        </>
      )}
    </Fragment>
  )
}
