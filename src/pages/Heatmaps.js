import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Col, Row, CardBody, Card } from 'reactstrap';
import Heatmap from '../components/Heatmap';
import { heatmapDemo, heatmapRange } from '../helpers/common';
import { heatmapRequest } from '../helpers/request';
import MainFilter from '../components/MainFilter';

export default function Heatmaps() {

  const [data, setData] = useState({ dye: '', map: '' })
  const [normalizeHeatmap, setNormalizeHeatmap] = useState([]);
  const filter = {}

  const dispatch = useDispatch();





  const updateFilter = async (e) => {
    console.log('date im recieving', e);

    let obj = {
      data: {
        start: e.start,
        end: e.end,
        sid : e.sid.length > 0 ? e.sid[0] : "",
        fid : e.fid.length > 0 ? e.fid[0] : '',
        cid : e.cid.length > 0 ? e.cid[0] : ""
      }
    }

    const response = await heatmapRequest(obj);

    console.log('response', response);

    if (typeof response && response) {
      try {
        if (response.status) {
          setNormalizeHeatmap(response.data)


        }
        else {
          setNormalizeHeatmap([])

        }



      }

      catch (err) {
        console.log('error while setting heatmap', err);
      }
    }
    else {
      setNormalizeHeatmap([])

    }

  }




  return (
    <Fragment>
      <MainFilter
        type="calendar"
        pageTitle="Heatmap"
        updateFilter={updateFilter}
      />

      {
        // data.dye &&
        <Row className="mb-3">
          <Col>
            <Card>
              <CardBody>
                <Row className="align-items-center justify-content-evenly">
                  <Col className="col-8 col-md-8">




                    <Heatmap
                      dye={'https://devapi.adlytic.ai/uploads/client/1709055405596WhatsApp Image 2024-02-27 at 6.40.39 PM (1).jpg'}
                      map={'https://devapi.adlytic.ai/uploads/client/1709055405596WhatsApp Image 2024-02-27 at 6.40.39 PM (1).jpg'}
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

      {/* {!data.dye && (
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
      )} */}
    </Fragment>
  )
}
