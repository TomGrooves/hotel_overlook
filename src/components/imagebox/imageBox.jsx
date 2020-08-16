import React from 'react'

function ImageBox(props){

    const url = props.url;
    const width = props.width || "100%"
    const height = props.height || "40vh"

    const bgStyle = {
        backgroundImage:`url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: width,
        height: height,
    }

    return(
        <div style={bgStyle}></div>
    )
}

export default ImageBox