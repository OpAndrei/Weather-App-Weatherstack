import React from "react";
import { Form } from "react-bootstrap";

export default function Navbar(props) {
    return (
        <div className="row">
            <div className="col-md-6">
                <h1 className="title">Weather Application</h1>
            </div>
            <div className="col-md-6">
                <form className="region" onChange={(e) => props.changeWeather(e)} action="#">
                    {/* <input className="regioninput"  placeholder="Enter Location" onChange={(e) => props.changeRegion(e.target.value)}/> */}
                    <Form.Control type="search" placeholder="Enter Location" onChange={(e) => props.changeRegion(e.target.value)} />
                </form>
            </div>
        </div>
    )
}