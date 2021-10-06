import React from "react"
import Alert from "react-bootstrap/Alert"

const AlertMessage = ({ infor }) => {
    console.log(">> check from alert message: ", infor)

    return infor === null ? null : (
        <Alert variant={infor.type}>{infor.message}</Alert>
    )
}

export default AlertMessage
