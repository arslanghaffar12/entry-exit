import React, { Component, Fragment } from 'react';
import h337 from 'heatmap.js'


class Heatmap extends Component {
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
        this.state = {
            isImageLoaded: false,
            scale: 1,
            imageWidth: null,
            imageHeight: null,
            points: [],
            sectionWIdth: 25,
            sectionHeight: 25,
            popoverOpen: new Array(this.props.sections.length).fill(false),
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

        this.imageElement = document.createElement("img");
        this.imageElement.src = this.props.map;
        console.log('this.imageElement.src',this.imageElement.src);
        this.imageElement.addEventListener('load', () => {
            console.log(this.imageElement.width, this.imageElement.height);
            this.setState({ isImageLoaded: true });
        });



        this.imageElement.onload = () => {
            console.log('this.imageElement.src inside',this.imageElement.src);

            if (this.myInput.current) {
                var drawingWidth = this.myInput.current.offsetWidth;
                let scale = drawingWidth / this.imageElement.width;
                this.setState({ scale: scale, imageWidth: this.imageElement.width, imageHeight: this.imageElement.height, })

            }


            setTimeout(() => {

                this.heatmapInstance = h337.create({
                    container: document.querySelector('#live-heatmap'),


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




    componentDidUpdate(prevProps) {




        if (this.props.map !== prevProps.map) {
            this.imageElement.src = this.props.map;
            this.setState({ imageHeight: this.imageElement.height, imageWidth: this.imageElement.width });
            this.setState({ isImageLoaded: false })

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
            // this.props.selectedSection(section.label);
        }


    };



    toggle = (index, status = -1) => {
        this.setState((prevState) => {
            const _popoverOpen = [...prevState.popoverOpen];

            if (status === -1) {
                _popoverOpen[index] = !_popoverOpen[index];
            } else {
                _popoverOpen.fill(false); // Set all to false
                _popoverOpen[index] = status === 1;
            }

            return { popoverOpen: _popoverOpen };
        });
    };


    handleSectionForCamera = (section) => {
        this.props.setSection(section);
        this.props.setModal(true)

    }



    render() {

        return (
            <Fragment>



                {this.state.isImageLoaded &&

                    <div
                        // style={{ width: this.imageElemement.width + "px", height: this.imageElement.height + "px" }}
                        // style={{ width: (this.state.imageWidth * this.state.scale) + "px", height: (this.state.imageHeight * this.state.scale) + "px" }}
                        // style={{ width: '100%' }}
                        style={{width : this.props.dye.width,
                        height : this.props.dye.height
                        }}
                         ref={this.myInput}
                         className='p-0 m-0'

                    >

                        {/* {this.props.dye != null && this.props.dye.length > 0 &&
                            <>
                                <img
                                //  width={this.state.imageWidth * this.state.scale}
                                //     height={this.state.imageHeight * this.state.scale}
                                    width ={this.props.dye.width}
                                    height ={this.props.dye.height}

                                    src={this.props.dye}
                                    style={{ position: "absolute", zIndex: 2 }} alt='' />

                            </>
                        } */}

                        <div
                            id="live-heatmap"
                            // ref={this.reference}
                            // id={this.props.key}
                            style={{
                                //  width: this.state.imageWidth + "px", height: this.state.imageHeight + "px",
                                overflow: "auto", margin: "0px", padding: "0px", width: '100%', height: '100%'
                            }}
                        >
                            {/* <svg
                                height={this.state.imageHeight * this.state.scale}
                                width={this.state.imageWidth * this.state.scale}
                                style={{ position: "absolute", zIndex: 10 }}
                            >
                                
                            </svg> */}

                            <img 
                              width ={this.props.dye.width}
                              height ={this.props.dye.height}
                            
                            // width={this.state.imageWidth * this.state.scale}
                            //  height={this.state.imageHeight * this.state.scale}
                              src={this.props.map} alt='' />

                        </div>



                    </div>
                }



            </Fragment>
        );
    }
}

export default Heatmap;