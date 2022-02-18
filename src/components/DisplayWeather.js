import React from 'react'
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap'

export default function DisplayWeather(props) {
    //Destructuring
    const { location, temperature, description, region, country, wind_speed, pressure, precip, humidity, img } = props.weatherData;

    return (
        <div>
            <Container>
                <Card>
                    <Card.Header as="h5">{location}, {region}, {country}</Card.Header>
                    <Card.Body>
                        <img src={img} width='100'></img>
                        <h1>{temperature}<sup>o</sup>C , {description}</h1>



                        <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>More information</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col className='text-center'>
                                            <p><b>Wind Speed</b>(km/hr)</p>
                                            <h2>{wind_speed}</h2>
                                        </Col>
                                        <Col className='text-center'>
                                            <p><b>Preassure</b>(millibar)</p>
                                            <h2>{pressure}</h2>
                                        </Col>
                                        <Col className='text-center'>
                                            <p><b>Precipitation</b>(mm)</p>
                                            <h2>{precip}</h2>
                                        </Col>
                                        <Col className='text-center'>
                                            <p><b>Humidity</b>(%)</p>
                                            <h2>{humidity}</h2>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </Card.Body>
                </Card>
            </Container>
            {/* <div className="user-weather">
            
            <div className="row">
                <div className="col-md-3 weather-temp">
                    <h1>{temperature}<sup>o</sup>C , {description}</h1>
                    <h4>{location}</h4>
                    <p>{region} , {country}</p>
                </div>

                <div className="col-md-9">
                    <img className="mainImg" src={img} alt="weather-img" />
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 weather-info">
                    <p><b>Wind Speed</b>(km/hr)</p>
                    <h2>{wind_speed}</h2>
                </div>

                <div className="col-md-3 weather-info">
                    <p><b>Preassure</b>(millibar)</p>
                    <h2>{pressure}</h2>
                </div>

                <div className="col-md-3 weather-info">
                    <p><b>Precipitation</b>(mm)</p>
                    <h2>{precip}</h2>
                </div>

                <div className="col-md-3 weather-info">
                    <p><b>Humidity</b>(%)</p>
                    <h2>{humidity}</h2>
                </div>

            </div>
        </div> */}
        </div>
    )
}