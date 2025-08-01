import Form from "react-bootstrap/Form";
import {
  Stack,
  Col,
  Container,
  Row,
  Dropdown,
  DropdownItem,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

function SetTime() {
  const [selectedHour, setSelectedHour] = useState("Set Hours");
  const [selectedMinute, setSelectedMinute] = useState("Set Minutes");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Set Time Frame");

  const handleSelectHour = (eventKey) => {
    setSelectedHour(eventKey);
  };

  const hoursOption = [];
  for (let i = 1; i <= 12; i++) {
    const paddedHour = String(i).padStart(2, "0");
    hoursOption.push(
      <Dropdown.Item eventKey={paddedHour} key={i}>
        {paddedHour}
      </Dropdown.Item>
    );
  }

  const handleSelectMinute = (eventKey) => {
    setSelectedMinute(eventKey);
  };

  const minuteOptions = [];
  for (let i = 1; i <= 59; i++) {
    const paddedMinute = String(i).padStart(2, "0");
    minuteOptions.push(
      <Dropdown.Item key={i} eventKey={paddedMinute}>
        {paddedMinute}
      </Dropdown.Item>
    );
  }

  const handleSelectTimeFrame = (eventKey) => {
    setSelectedTimeFrame(eventKey);
  };

  return (
    <Container>
      <Dropdown onSelect={handleSelectHour}>
        <Dropdown.Toggle variant="secondary" id="dropdown-hours">
          {selectedHour}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
          {hoursOption}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectMinute}>
        <Dropdown.Toggle variant="secondary" id="dropdown-minutes">
          {selectedMinute}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
          {minuteOptions}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown onSelect={handleSelectTimeFrame}>
        <Dropdown.Toggle variant="secondary" id="dropdown-TimeFrame">
          {selectedTimeFrame}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
          <Dropdown.Item eventKey="AM">AM</Dropdown.Item>
          <Dropdown.Item eventKey="PM">PM</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default SetTime;
