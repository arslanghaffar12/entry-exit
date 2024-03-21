import React, { Component, Fragment } from 'react';
import h337 from 'heatmap.js'
import { Download } from 'react-feather';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


class Heatmap extends Component {
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
        this.heatmapRef = React.createRef();
        this.state = {
            isImageLoaded: false,
            scale: 1,
            imageWidth: null,
            imageHeight: null,
            points: [],
            sectionWIdth: 25,
            sectionHeight: 25,
            popoverOpen: [],
            selectedArea: '',
            hmInstance: null
        }
    }


    processHeatmapData = (heatmapData) => {
        console.log('this.state.scale==', this.state.scale);

        let min = Number.MAX_SAFE_INTEGER - 1;
        let max = Number.MIN_SAFE_INTEGER - 1;
        var data = [];
        var dataScale = [];
        for (var i = 0; i < heatmapData.length; i++) {
            var val = heatmapData[i].v;
            var record = heatmapData[i];

            data.push({ x: record.x, y: record.y, value: record.v });
            dataScale.push({ x: Math.round(record.x * this.state.scale), y: Math.round(record.y * this.state.scale), value: record.v });

            if (val < min) {
                min = val;
            }
            if (val > max) {
                max = val;
            }
        }
        console.log('heatmap data', data);
        console.log('heatmap dataScale', dataScale);

        return { max: max, data: dataScale };
    }


    componentDidMount() {
        console.log('this.props.heatmapData--', this.props.heatmapData);
        if (this.props.sections) {
            let array = new Array(this.props.sections.length).fill(false);
            console.log('sections length is', array, this.props.sections);
            this.setState({ popoverOpen: array });
        }

        this.imageElement = document.createElement("img");
        this.imageElement.src = this.props.map;
        this.imageElement.addEventListener('load', () => {
            console.log(this.imageElement.width, this.imageElement.height);
            this.setState({ isImageLoaded: true });
        });



        this.imageElement.onload = () => {



            if (this.myInput.current) {
                var drawingWidth = this.myInput.current.offsetWidth;
                let scale = drawingWidth / this.imageElement.width;
                this.setState({ scale: scale, imageWidth: this.imageElement.width, imageHeight: this.imageElement.height, })
                console.log('drawingWidth is', drawingWidth, "this.imageElement.width", this.imageElement.width);

            }


            setTimeout(() => {
                // console.log('this.props.key',this.props.key);
                // console.log("document.querySelector('#live-heatmap')",this.props.key,document.querySelector(`#${this.props.key}`))
                this.heatmapInstance = h337.create({
                    container: document.querySelector('#live-heatmap'),
                    // container: document.querySelector(`#${this.props.key}`),


                    radius: 9.5,
                    opacity: 0.9,
                    visible: true,
                    gradient: {
                        '0.05': '#9ec5ff',
                        '0.15': '#3785F9',
                        '0.20': '#265BF9',
                        '0.30': '#59DBFB',
                        '0.35': '#65FA9D',
                        '0.45': '#64F92C',
                        '0.50': '#78FA26',
                        '0.60': '#D2FC2C',
                        '0.65': '#F5FD2F',
                        '0.75': '#EC8923',
                        '0.80': '#f3783d',
                        // '0.80': '#E3231B',

                        // 0.85: '#b53df3fa',

                        '0.90': '#E43A1C',
                        // '0.90': '#E3231B',
                        '0.95': '#E3231B',
                        '1.0': '#b80701', // highest red
                    }
                });
                setTimeout(async () => {
                    let data = await this.processHeatmapData(this.props.heatmapData);
                    console.log('data first heat', data);
                    this.heatmapInstance.setData(data);

                }, 200);

            }, 200);
            // this.props.dispatch(setLoading(false));

        };


    }


    componentDidCatch(error, errorInfo) {
        console.log('Component Error:', error, errorInfo);
    }




    componentDidUpdate(prevProps, prevState) {

        console.log('prevState', prevState, this.state.popoverOpen);
        // if(prevState.popoverOpen !== this.state.popoverOpen)

        if (this.props.sections !== prevProps.sections) {
            if (this.props.sections) {
                let array = new Array(this.props.sections.length).fill(false);
                console.log('sections length is', array, this.props.sections);
                this.setState({ popoverOpen: array });
            }

        }




        if (this.props.map !== prevProps.map) {
            this.imageElement.src = this.props.map;
            this.setState({ imageHeight: this.imageElement.height, imageWidth: this.imageElement.width });
            this.setState({ isImageLoaded: false })

            console.log('yes map is changed');






        }








        try {

            if (this.state.isImageLoaded && this.heatmapInstance) {
                if (this.props.heatmapData !== prevProps.heatmapData) {
                    let data = this.processHeatmapData(this.props.heatmapData);
                    console.log('data second heat', data);

                    this.heatmapInstance.setData(data);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    clickPoint = (event) => {
        var _points = this.state.points.slice();
        _points.push({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
        this.setState({ points: _points })
    }

    clickArea = (section) => {
        if (typeof section !== undefined && section) {
            this.setState({ selectedArea: section._id })
            this.props.setSection(section); // this handles onclick updated request

        }


    };



    toggle = (index, status = -1) => {
        console.log('index ==', index, "status is", status, this.state.popoverOpen);

        // if (this.props.sections.length === this.state.popoverOpen.length) {
        this.setState(prevState => {
            return {
                popoverOpen: prevState.popoverOpen.map((item, ind) => {
                    if (ind === index) {
                        return status === -1 ? !item : status === 1;
                    } else {
                        return false;
                    }
                }),
            };
        });
        // }

    };


    handleSectionForCamera = (section) => {
        this.props.setSection(section);
        this.props.setModal(true)

    }











    render() {

        return (
            <Fragment >
                {console.log('this.state.popoverOpen', this.state.popoverOpen, "scale is", this.state.scale, "imgwidthis ", this.state.imageWidth)}



                {

                    <div

                        style={{ width: '100%', height: "100%" }} ref={this.myInput}

                    >

                        {this.props.dye != null && this.props.dye.length > 0 && this.state.isImageLoaded &&
                            <>
                                <img
                                    width={this.state.imageWidth * this.state.scale}
                                    height={this.state.imageHeight * this.state.scale}
                                    src={this.props.baeUrl}
                                    style={{ position: "absolute", zIndex: 0 }} alt='' />

                            </>
                        }

                        <div
                            id="live-heatmap"

                            style={{
                                overflow: "auto", margin: "0px", padding: "0px", width: '100%', height: '100%',
                                zIndex: 0
                            }}
                        >
                            <svg
                                height={this.state.imageHeight * this.state.scale}
                                width={this.state.imageWidth * this.state.scale}
                                style={{ position: "absolute", zIndex: 0 }}
                                ref={this.heatmapRef}
                            >
                                {this.props.sections.map((section, ind) => {
                                    var points = "";
                                    var xCords = [];
                                    var yCords = [];
                                    section.positions.forEach((point, index) => {
                                        if (index > 0) {
                                            points +=
                                                " " +
                                                // point.x * this.state.scale +
                                                point.x * this.state.scale +

                                                "," +
                                                point.y * this.state.scale;
                                        } else {
                                            points +=
                                                point.x * this.state.scale +
                                                "," +
                                                point.y * this.state.scale;
                                        }
                                        xCords.push(point.x);
                                        yCords.push(point.y);
                                    });
                                    var axisRatio = {
                                        x: Math.floor(
                                            (Math.max(...xCords) + Math.min(...xCords)) / 2
                                        ),
                                        y: Math.floor(
                                            (Math.max(...yCords) + Math.min(...yCords)) / 2
                                        ),
                                    };

                                    return (
                                        <Fragment key={"section_" + ind}>
                                            {console.log('"Popover-" + section?._id', "Popover-" + section?._id)}
                                            <svg
                                                width={this.state.sectionWIdth * this.state.scale}
                                                height={this.state.sectionHeight * this.state.scale}
                                                id={"Popover-" + section._id}
                                                x={axisRatio.x * this.state.scale - 12}
                                                y={axisRatio.y * this.state.scale - 12}
                                                stroke="rgba(0,0,0,0.1)"
                                                strokeWidth="1"
                                                fill={
                                                    this.state.selectedArea === section._id
                                                        ? "rgba(232,129,49,1)"
                                                        : ""
                                                }
                                                viewBox="0 0 368 368"
                                                // onMouseEnter={() => this.toggle(ind, 1)}
                                                // onMouseLeave={() => this.toggle(ind, 0)}
                                                style={{ zIndex: 100, position: "absolute", cursor: 'pointer' }}
                                            >
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515
                                                                        c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51
                                                                        c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355
                                                                        c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552
                                                                        c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297
                                                                        C313.629,178.709,304.004,206.393,285.795,229.355z"
                                                            />
                                                            <path
                                                                d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374
                                                                        S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374
                                                                        s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z"
                                                            />
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                            <polygon
                                                onClick={() => this.clickArea(section)}
                                                style={{
                                                    fill:
                                                        this.state.selectedArea === section._id ?
                                                            "rgba(0,0,0,0.3)"
                                                            : "rgba(0,0,0,0)",
                                                }}
                                                className={"itHeatmap"}
                                                points={points}
                                                onMouseEnter={() => this.toggle(ind, 1)}
                                                id={"Popover-" + section?._id}
                                            />

                                        </Fragment>
                                    );
                                })}
                            </svg>

                            <img width={this.state.imageWidth * this.state.scale} height={this.state.imageHeight * this.state.scale} src={this.props.baeUrl} alt='' />

                        </div>



                    </div>
                }



            </Fragment>
        );
    }
}

export default Heatmap;