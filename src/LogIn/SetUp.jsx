import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Col, Container, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { MdPerson } from "react-icons/md";
import Background from "../UniComp/Background";

function SetUpComponent() {
  const [modalShow, setModalShow] = useState(false);
  const [location, setLocation] = useState({
    username: "",
    password: "",
    email: "",
    province: "",
    city: "",
    defaultnews: "",
  });
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const provinceUrl = `https://psgc.gitlab.io/api/provinces/`;
    const cityUrl = `https://psgc.gitlab.io/api/cities-municipalities/`;

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
  }, []);

  const handleProvinceChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const code = selectedOption.value; // "034900000"
    const selectedProvince = selectedOption.text; // "Nueva Ecija"

    setSelectedProvinceCode(code); // For filtering cities
    setLocation((prev) => ({
      ...prev,
      province: selectedProvince, // Store name in DB
    }));
  };

  const handleCityChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedCity = selectedOption.text;

    setLocation((prev) => ({
      ...prev,
      city: selectedCity, // Store city name
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Location Set!");
        setLocation({
          username: "",
          password: "",
          email: "",
          province: "",
          city: "",
          defaultnews: "",
        });
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      setMessage("Failed to submit.");
      console.error(err);
    }
  };

  return (
    <div className="w-100 h-100">
      <Background weather={{ main: "Clear" }} />
      <Row className="w-100 h-100 my-4">
        <h3 style={{ color: "white" }}>Lets Set Things Up</h3>
      </Row>
      <Row className="w-100 h-100">
        <Container className="d-flex justify-content-center">
          <Form
            onSubmit={handleSubmit}
            className="justify-content-center h-100 rounded-4 p-5"
            style={{
              backgroundColor: "#7f7e7e5d",
              backdropFilter: "blur(10px)",
              minHeight: "80vh",
            }}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextUsername">
              <Col sm="6">
                <Form.Label
                  style={{ color: "white" }}
                  className="d-flex justify-self-start">
                  Username
                </Form.Label>
                <Form.Control
                  name="username"
                  value={location.username}
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setLocation({ ...location, username: e.target.value })
                  }
                />
              </Col>

              <Col sm="6" className="">
                <Form.Label
                  className="d-flex justify-self-start"
                  style={{ color: "white" }}>
                  Password
                </Form.Label>
                <Form.Control
                  name="password"
                  value={location.password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setLocation({ ...location, password: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail">
              <Col sm="12">
                <Form.Label
                  className="d-flex justify-content-start"
                  style={{ color: "white" }}>
                  Email
                </Form.Label>
                <Form.Control
                  name="email"
                  value={location.email}
                  type="text"
                  placeholder="Email"
                  onChange={(e) =>
                    setLocation({ ...location, email: e.target.value })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm="6">
                <Form.Label
                  className="d-flex justify-content-start"
                  style={{ color: "white" }}>
                  Province
                </Form.Label>
                <Form.Select
                  className="mb-4"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleProvinceChange(e);
                    handleChange(e);
                  }}
                  name="province"
                  value={location.province}
                  required>
                  <option value="">Select</option>
                  {province.map((prov) => (
                    <option key={prov.code} value={prov.code}>
                      {prov.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm="6">
                <Form.Label
                  className="d-flex justify-content-start"
                  style={{ color: "white" }}>
                  City
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleCityChange(e);
                    handleChange(e);
                  }}
                  name="city"
                  value={location.city}
                  required>
                  <option value="">Select</option>
                  {selectedProvinceCode ? (
                    city
                      .filter(
                        (cty) => cty.provinceCode === selectedProvinceCode
                      )
                      .map((cty) => (
                        <option key={cty.code} value={cty.name}>
                          {cty.name}
                        </option>
                      ))
                  ) : (
                    <option disabled>Select a province first</option>
                  )}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextWeather">
              <Col sm="12">
                <Form.Label
                  className="d-flex justify-content-start"
                  style={{ color: "white" }}>
                  Default News Type
                </Form.Label>
                <Form.Control
                  name="defaultnews"
                  value={location.defaultnews}
                  type="text"
                  placeholder="e.g(weather, technology)"
                  onChange={(e) =>
                    setLocation({ ...location, defaultnews: e.target.value })
                  }
                />
              </Col>
              <label style={{ color: "white" }}>
                Go back to <a href="/">Log In</a>
              </label>
            </Form.Group>
            <Button type="Button" className="btn-1 mx-2">
              <span>Cancel</span>
            </Button>
            <Button type="submit" className="btn-1 mx-2">
              <span>Register</span>
            </Button>
          </Form>
        </Container>
      </Row>
    </div>
  );
}

export default SetUpComponent;
