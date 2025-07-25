import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import PlaceDropDown from "./PlaceDropDown";

function SetLocationModal(props) {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("Limay");

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
    <Modal {...props} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Set Your Current Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SetLocationModal;
