import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function SetLocationModal(props) {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("Limay");
  const [location, setLocation] = useState({ province: "", city: "" });
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
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Location Set!");
        setLocation({ province: "", city: "" });
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (err) {
      setMessage("Failed to submit.");
      console.error(err);
    }
  };

  return (
    <Modal {...props} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Set Your Current Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleProvinceChange(e);
                handleChange(e);
              }}
              name="province"
              value={location.province}
              required>
              <option value="">Province</option>
              {province.map((prov) => (
                <option key={prov.code} value={prov.code}>
                  {prov.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                handleCityChange(e);
                handleChange(e);
              }}
              name="city"
              value={location.city}
              required>
              <option value="">City</option>
              {selectedProvinceCode ? (
                city
                  .filter((cty) => cty.provinceCode === selectedProvinceCode)
                  .map((cty) => (
                    <option key={cty.code} value={cty.name}>
                      {cty.name}
                    </option>
                  ))
              ) : (
                <option disabled>Select a province first</option>
              )}
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="btn btn-primary">
            Save
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" className="btn btn-primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SetLocationModal;
