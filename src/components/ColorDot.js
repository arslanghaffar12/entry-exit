import React, { Fragment } from 'react';

const ColorDot = ({color="silver",marginBottom = '0px',  position="relative", marginTop = "4px", marginLeft="0px", marginRight = "0px", display =""}) => {
    return (
        <Fragment>
            <div style={{position: position, border: "5px solid "+ color, borderRadius: "50%", width: 0, height: 0,marginRight : marginRight, marginTop: marginTop, marginLeft: marginLeft,marginBottom : marginBottom, display : display}}></div>
        </Fragment>
    )
}

export default ColorDot;