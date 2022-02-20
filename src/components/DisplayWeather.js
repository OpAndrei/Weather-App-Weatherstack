import React from 'react'
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap'

export default function DisplayWeather(props) {
    //Destructuring
    const { location, temperature, description, region, country, wind_speed, pressure, precip, humidity, img } = props.weatherData;

    return (
        <div>
            <Container>
                <Card>
                    <Card.Header as="h4">{location}, {region}, {country}</Card.Header>
                    <Card.Body>
                        <img src={img} width='100'></img>
                        <h1>{temperature}<sup>o</sup>C , {description}</h1>



                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>More information</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col className='text-center'>
                                            <p><b><h3>Wind Speed</h3></b></p>
                                            <h2><b>{wind_speed}</b><i> km/h</i></h2>
                                        </Col>
                                        <Col className='text-center'>
                                            <p><b><h3>Pressure</h3></b></p>
                                            <h2><b>{pressure}</b><i> millibar</i></h2>
                                        </Col>
                                        <Col className='text-center'>
                                            <p><b><h3>Precipitation</h3></b></p>
                                            <h2><b>{precip}</b><i> mm</i></h2>
                                        </Col>
                                        <Col className='text-center'>
                                            <p><b><h3>Humidity</h3></b></p>
                                            <h2><b>{humidity}</b><i> %</i></h2>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </Card.Body>
                </Card>
            </Container>
            <br></br>
            {/*<div className="user-weather">

                <div className="row">
                    <div className="col-md-3 weather-temp">
                        <h1>25<sup>o</sup>C , {description}</h1>
                        <h4>Amsterdam</h4>
                        <h5><p>Western Netherlands , Netherlands</p></h5>
                    </div>

                    <div className="col-md-9">
                        <img className="mainImg" src={img} alt="weather-img" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3 weather-info">
                        <p><b><h4>Wind Speed</h4></b></p>
                        <h4><b>2</b><i> km/h</i></h4>
                    </div>

                    <div className="col-md-3 weather-info">
                        <p><b><h4>Pressure</h4></b></p>
                        <h4><b>1024</b><i> millibar</i></h4>
                    </div>

                    <div className="col-md-3 weather-info">
                        <p><b><h4>Precipitation</h4></b></p>
                        <h4><b>1</b><i> mm</i></h4>
                    </div>

                    <div className="col-md-3 weather-info">
                        <p><b><h4>Humidity</h4></b></p>
                        <h4><b>47</b><i> %</i></h4>
                    </div>

                </div>
            </div>*/}
        </div>
    )
}