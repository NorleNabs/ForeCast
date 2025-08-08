import { Col, Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import { SunnyOutlineLoop } from "./weathericon/SunnyIconSvg";
import { RainyOutline } from "./weathericon/Rainy";
import { CloudsBroken } from "./weathericon/BrokenClouds";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import SetLocationModal from "./LogIn";
import Clock from "./Clock";
import "bootstrap/dist/css/bootstrap.min.css";

function CardComponent() {
  const [weather, setWeather] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.city || weather) return; // Already has weather, no need to fetch again

    const API_KEY = "700ff8cb218f7611af24806ddd219352";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${user.city}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log("✅ Weather API fetched:", data);
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, [user?.city, weather]);

  const currentDay = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
  });

  console.log(user.username); // or user.id, user.email, etc.

  return (
    <Container
      className="d-flex justify-content-center w-100 h-100 pb-4 pt-1"
      style={{}}>
      {weather ? (
        <div className="card h-100 w-100 rounded-4 p-1">
          <span className="glass"></span>
          <div
            className="content h-100 w-100"
            style={{
              backgroundColor: "#928DAB",
              backdropFilter: "blur(10px)",
            }}>
            <div className="align-items-center p-3 h-100 w-100">
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
                ) : weather.weather?.[0]?.main === "Broken" ? (
                  <CloudsBroken style={{ fontSize: "3rem" }} />
                ) : weather.weather?.[0]?.main === "Clouds" ? (
                  <CloudsBroken style={{ fontSize: "3rem" }} />
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
                    {user.city}
                  </p>
                  <p className="text-start my-1">
                    <WiHumidity className="mx-1" />
                    {""}
                    {weather.main?.humidity
                      ? `${weather.main.humidity}%`
                      : "--"}
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
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </Container>
  );
}

export default CardComponent;
