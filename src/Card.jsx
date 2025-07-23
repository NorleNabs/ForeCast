import { Col, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import { SunnyOutlineLoop } from "./SunnyIconSvg";
import { RainyOutline } from "./Rainy";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import Clock from "./Clock";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function CardComponent() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const city = "Limay, Bataan"; // Change this to your desired city
    const API_KEY = "700ff8cb218f7611af24806ddd219352";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log("Weather API Response:", data); // <-- Check here
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, []);

  const currentDay = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
  });

  return (
    <Container
      className="d-flex justify-content-center w-100 h-100 pb-4 pt-1"
      style={{}}>
      {weather ? (
        <div
          className=" h-100 w-100 mx-5 mt-3 mb-3 rounded-4"
          style={{
            backgroundColor: "#7f7e7e5d",
            backdropFilter: "blur(10px)",
            webkitBackdropFilter: "blur(10px)",
          }}>
          <div className=" align-items-center p-3 h-100">
            <Row>
              <Col sm={6} className="text-start">
                <p className="text-start">{currentDay}</p>
              </Col>
              <Col sm={6} className="text-end">
                <p className="text-end">
                  <Clock />
                </p>
              </Col>
            </Row>
            <Row
              style={{ minHeight: "20vh", textTransform: "capitalize" }}
              className="align-items-center">
              {weather.weather?.[0]?.main === "Rain" ? (
                <RainyOutline style={{ fontSize: "3rem" }} />
              ) : weather.weather?.[0]?.main === "Clear" ? (
                <SunnyOutlineLoop style={{ fontSize: "3rem" }} />
              ) : null}
              <p>
                {weather.weather?.[0]?.description
                  ? weather.weather[0].description
                  : "--"}
              </p>
            </Row>
            <Row className="align-items-center">
              <Col sm={6} className="text-start" style={{ fontSize: "14px" }}>
                <p className="text-start my-1">
                  <FaLocationDot className="mx-1" />
                  {""}
                  {weather.name ? weather.name : "--"}
                </p>
                <p className="text-start my-1">
                  <WiHumidity className="mx-1" />
                  {""}
                  {weather.main?.humidity ? `${weather.main.humidity}%` : "--"}
                </p>
                <p className="text-start my-1">
                  <WiStrongWind className="mx-1" />
                  {""}
                  {weather.wind?.speed ? `${weather.wind.speed} m/s` : "--"}
                </p>
              </Col>
              <Col sm={6} className="h-100" style={{ fontSize: "2.5rem" }}>
                <p className="text-center">
                  {" "}
                  {weather.main?.temp ? `${weather.main.temp}°C` : "--"}
                </p>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </Container>
  );
}

export default CardComponent;
