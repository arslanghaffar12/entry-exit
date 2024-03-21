import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, CardBody, Card, CardHeader } from 'reactstrap';
import Heatmap from '../components/Heatmap';
import { heatmapDemo, heatmapRange } from '../helpers/common';
import { heatmapRequest } from '../helpers/request';
import MainFilter from '../components/MainFilter';
import { Download } from 'react-feather';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Heatmaps() {

  const [data, setData] = useState({ dye: '', map: '' })
  const [filters, setFilters] = useState({})
  const [normalizeHeatmap, setNormalizeHeatmap] = useState([]);
  const [image, setImage] = useState({ url: '' })
  console.log('image of dye', image);
  const [baeUrl, setBase64Data] = useState()
  const user = useSelector((state) => state.auth.user);

  const filter = {}

  const dispatch = useDispatch();





  const updateFilter = async (e) => {
    console.log('date im recieving', e);
    setFilters(e)

    let obj = {
      data: {
        start: e.start,
        end: e.end,
        sid: e.sid.length > 0 ? e.sid[0] : "",
        fid: e.fid.length > 0 ? e.fid[0] : '',
        cid: e.cid.length > 0 ? e.cid[0] : ""
      },
      dispatch
    }

    console.log('user is', user);

    let img = user?.userData?.access[0]?.cid?.filter((item) => item?._id === e?.cid[0]);
    console.log('img in function', img);
    if (typeof img !== undefined && img && img.length > 0) {

      
      setImage(img[0])
    }

    if (obj.data.cid !== "" && obj.data.sid !== "" && obj.data.fid !== "") {
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
    else {

    }




  }

  const downloadPDF = async () => {
    const input = document.getElementById('contentToDownload'); // Replace with your element ID
    console.log('input of heatmap', input);

    await Promise.all([
      loadImage(image.url),
      // loadImage('heatmapRange.jpg') // Adjust the URL accordingly
    ]);





    html2canvas(input).then((canvas) => {

      console.log('canvas is', canvas);

      const imgData = canvas.toDataURL('image/png');


      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // while (heightLeft >= 0) {
      //   position = heightLeft - imgHeight;
      //   pdf.addPage();
      //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      //   heightLeft -= pageHeight;
      // }

      pdf.save('download.pdf');
    });
  };

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = (err) => reject(err);
      img.src = url;
    });
  }

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setBase64Data(reader.result);
      reader.readAsDataURL(blob);
    };

    if (image.url) {
      fetchImage();
    }
  }, [image]);





  return (
    <Fragment>
      <MainFilter
        type="calendar"
        pageTitle="Heatmap"
        updateFilter={updateFilter}
        page='heatmap'
      />

      <Download size="16" onClick={downloadPDF} style={{ cursor: "pointer" }} />


      {
        // data.dye &&
        <Row className="mb-3" id="contentToDownload">
          {/* { baeUrl &&  <img src={baeUrl} />} */}

          <Col>

            <Card className='' >
              <CardHeader>
                {
                  "cid" in filters && filters.cid.length > 0 &&
                  user?.userData?.access[0]?.cid?.filter((item) => item?._id === filters?.cid[0])[0]?.label
                }

              </CardHeader>
              <CardBody>
                <Row className="align-items-center justify-content-evenly">
                  <Col className="col-8 col-md-8">

                    <Heatmap
                      dye={image.url}
                      map={image.url}
                      heatmapData={normalizeHeatmap ? normalizeHeatmap : []}
                      key={"my_map"}
                      sections={[]}
                      setSection={(section) => (section)}
                      section={""}
                      dispatch={dispatch}
                      baeUrl={baeUrl}

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
