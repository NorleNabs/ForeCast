import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";

function PlaceDropDown() {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState(""); // <-- Added

  useEffect(() => {}, []);
  const handleProvinceChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const code = selectedOption.value;
    const selectedProvince = selectedOption.text; // <-- Check here

    console.log("Selected Province Code:", code);
    console.log("Selected Province Name:", selectedProvince);

    setSelectedProvinceCode(code);
  };

  return (
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
      <Form.Select aria-label="Default select example">
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
  );
}
export default PlaceDropDown;
