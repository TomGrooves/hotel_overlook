import React from 'react'
import style from './gridbox.module.scss';

function Gridbox (props) {

    const columns = props.columns || "1"
    const rows = props.rows || "1"
    const gap = props.gap || "8px"
    const width = props.width || "100%"
    const height = props.height || "auto"

    const gridbox = {
        display: "grid",
        margin: "auto",
        justifyItems: "center",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: `${gap}`,
        width : `${width}`,
        height : `${height}`,
        paddingTop: "2%",
        paddingBottom:"2%",
    }

    // takes width, height, rows, colums
    return (
        <section className={style.gridbox} style={gridbox}>{props.child}</section>
    )
}

export default Gridbox