import { Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import { SunnyOutlineLoop } from "./weathericon/SunnyIconSvg";
import { RainyOutline } from "./weathericon/Rainy";
import { CloudsBroken } from "./weathericon/BrokenClouds";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import Clock from "./Clock";
import "bootstrap/dist/css/bootstrap.min.css";

function CardComponent() {
  const [weather, setWeather] = useState(null);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("Limay");

  useEffect(() => {
    const provinceUrl = `https://psgc.gitlab.io/api/provinces/`;
    const cityUrl = `https://psgc.gitlab.io/api/cities-municipalities/`;
    const API_KEY = "700ff8cb218f7611af24806ddd219352";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log("Weather API Response:", data); // <-- Check here
      })
      .catch((err) => console.error("Error fetching weather:", err));

    fetch(provinceUrl)
      .then((res) => res.json())
      .then((data) => {
        setProvince(data);
        console.log("Province API Response:", data); // <-- Check here
      })
      .catch((err) => console.error("Error fetching weather:", err));

    fetch(cityUrl)
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
        console.log("City API Response:", data); // <-- Check here
      })
      .catch((err) => console.error("Error fetching city:", err));
  }, [selectedCity]);

  const currentDay = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
  });

  const handleProvinceChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const code = selectedOption.value;
    const selectedProvince = selectedOption.text;

    console.log("Selected Province Code:", code);
    console.log("Selected Province Name:", selectedProvince);

    setSelectedProvinceCode(code);
  };
  const handleCityChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const code = selectedOption.value;
    const selectedCi = selectedOption.text;

    console.log("Selected Province Code:", code);
    console.log("Selected Province Name:", selectedCi);

    setSelectedCity(selectedCi);
  };

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
              ) : weather.weather?.[0]?.main === "Broken" ? (
                <CloudsBroken />
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
                  {selectedCity}
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
            <Row className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={handleProvinceChange}>
                <option value="">Province</option>
                {province.map((prov) => (
                  <option key={prov.code} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Default select example"
                onChange={handleCityChange}>
                <option value="">City</option>
                {selectedProvinceCode ? (
                  city
                    .filter((cty) => cty.provinceCode === selectedProvinceCode)
                    .map((cty) => (
                      <option key={cty.code} value={cty.code}>
                        {cty.name}
                      </option>
                    ))
                ) : (
                  <option disabled>Select a province first</option>
                )}
              </Form.Select>
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
