import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import moment from "moment";

import Navigation from "../Shared/Navigation";
import HomeImage from "../../assets/images/bg/home.jpg";
import PersonImage from "../../assets/images/john.png";

import "./Home.css";
import LocationInformationComponent from "../Shared/LocationInformationComponent";
import { useHistory } from "react-router-dom";
import StaticDatePicker from "@mui/lab/StaticDatePicker";


const Home = (props) => {
  const history = useHistory();

  const [currentTime, setCurrentTime] = useState(moment());
  const [date, setDate] = useState(moment().toDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
  }, []);

  const onDateSelected = (value) => {
    setDate(value);
    history.push("/todo");
  }

  const timer = useMemo(() => {
    return (
      <Row className="Home_Timer">
        <Col className="d-flex justify-content-center align-items-center">
          <span className="Home_TimerTime">
            {currentTime.format('HH:mm:ss')}
          </span>
          <span>&nbsp;</span>
          <span className="Home_TimerNoon">
            {currentTime.format('a').toUpperCase()}
          </span>
        </Col>
      </Row>
    );
  }, [currentTime])

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col className="p-0 h-100 Layout_ImageWrapper" sm={7}>
          <Image src={HomeImage} className="Layout_Image"/>
          <LocationInformationComponent/>
        </Col>
        <Col sm={5}>
          <Row>
            <Navigation/>
          </Row>
          <Row className="d-flex text-center pt-3">
            <h2 className="fw-bold">
              Hello, John!
            </h2>
            <h4>
              How are you today?
            </h4>
          </Row>
          <Row className="d-flex justify-content-center text-center pt-3">
            <Image src={PersonImage}
                   style={{ maxWidth: 200, maxHeight: 200 }}
                   className="Home_PersonImage"
            />
            <h2 style={{ fontSize: '25px' }}
                className="fw-bold pt-3"
            >
              John Doe
            </h2>
          </Row>
          {timer}
          <Row>
            <StaticDatePicker value={date}
                              views={['day']}
                              onChange={onDateSelected}
                              orientation="landscape"
                              showToolbar={false}
                              className="d-flex justify-content-center align-items-center"
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
