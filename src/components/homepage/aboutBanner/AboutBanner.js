
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import classes from "./IntroBanner.css";
import ReactBootstrap, {Jumbotron, Button, Col,Row,Container,Grid, Panel, FormGroup} from 'react-bootstrap'


class AboutBanner extends Component{
    render(){
        return(
            <div>
                <Container>
  {/* Stack the columns on mobile by making one full-width and the other half-width */}
  <Row>
    <Col xs={12} md={8}>
      xs=12 md=8
    </Col>
    <Col xs={6} md={4}>
      xs=6 md=4
    </Col>
  </Row>

  {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
  <Row>
    <Col xs={6} md={4}>
      xs=6 md=4
    </Col>
    <Col xs={6} md={4}>
      xs=6 md=4
    </Col>
    <Col xs={6} md={4}>
      xs=6 md=4
    </Col>
  </Row>

  {/* Columns are always 50% wide, on mobile and desktop */}
  <Row>
    <Col xs={6}>xs=6</Col>
    <Col xs={6}>xs=6</Col>
  </Row>
</Container>
            </div>
        );
    }
}

export default AboutBanner;
