import React, {useState} from 'react'

function Modal (props) {

    const child = props.child || "No content"
    const [modalVisible, setModalVisible] = useState(false)

    const shown = {
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(22,22,22,0.5)",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "12",
    }
    
    const modalContent = {
        display: "block",
        width: "50vw",
        backgroundColor: "rgb(245,245,245)",
        position: "relative",
        transform: "translateX(50%) translateY(200%)",
        padding: "8px",
        borderRadius: "4px",
        boxShadow: "0px 6px 8px 1px rgba(0,0,0,0.2)",
        zIndex:"13",
    }

    const btn = {
        display:"grid",
        justifySelf:"center",
    }
    const hidden = {
        display: "none",
    }

    return (
        <>
        <section style={modalVisible ? shown : hidden}>
            <div style={modalContent}>{child}<button style={btn} onClick={()=>setModalVisible(false)}>Luk</button></div>
        </section>
        <button style={btn} onClick={() =>!modalVisible ? setModalVisible(true) : false}>Kommenter</button>
        </>
    )
}

export default Modal