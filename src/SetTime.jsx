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

function SetTime({
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  selectedTimeFrame,
  setSelectedTimeFrame,
}) {
  const handleSelectHour = (eventKey) => {
    setSelectedHour(eventKey);
  };

  const handleSelectMinute = (eventKey) => {
    setSelectedMinute(eventKey);
  };

  const handleSelectTimeFrame = (eventKey) => {
    setSelectedTimeFrame(eventKey);
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

  const minuteOptions = [];
  for (let i = 0; i <= 59; i++) {
    const paddedMinute = String(i).padStart(2, "0");
    minuteOptions.push(
      <Dropdown.Item key={i} eventKey={paddedMinute}>
        {paddedMinute}
      </Dropdown.Item>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Dropdown onSelect={handleSelectHour}>
        <Dropdown.Toggle variant="secondary" id="dropdown-hours">
          {selectedHour}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: "100px", overflowY: "auto" }}>
          {hoursOption}
        </Dropdown.Menu>
      </Dropdown>

      <p className="mt-2 fs-3">:</p>

      <Dropdown onSelect={handleSelectMinute}>
        <Dropdown.Toggle variant="secondary" id="dropdown-minutes">
          {selectedMinute}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: "100px", overflowY: "auto" }}>
          {minuteOptions}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={handleSelectTimeFrame} className="mx-2">
        <Dropdown.Toggle variant="secondary" id="dropdown-TimeFrame">
          {selectedTimeFrame}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="AM">AM</Dropdown.Item>
          <Dropdown.Item eventKey="PM">PM</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default SetTime;
