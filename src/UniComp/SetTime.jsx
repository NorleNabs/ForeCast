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
  ToselectedHour,
  setToSelectedHour,
  ToselectedMinute,
  setToSelectedMinute,
  ToselectedTimeFrame,
  setToSelectedTimeFrame,
  FromselectedHour,
  setFromSelectedHour,
  FromselectedMinute,
  setFromSelectedMinute,
  FromselectedTimeFrame,
  setFromSelectedTimeFrame,
  modalDate,
  setModalDate,
}) {
  const handleToSelectHour = (eventKey) => {
    setToSelectedHour(eventKey);
  };

  const handleToSelectMinute = (eventKey) => {
    setToSelectedMinute(eventKey);
  };

  const handleToSelectTimeFrame = (eventKey) => {
    setToSelectedTimeFrame(eventKey);
  };

  const handleFromSelectHour = (eventKey) => {
    setFromSelectedHour(eventKey);
  };

  const handleFromSelectMinute = (eventKey) => {
    setFromSelectedMinute(eventKey);
  };

  const handleFromSelectTimeFrame = (eventKey) => {
    setFromSelectedTimeFrame(eventKey);
  };

  console.log("Modal today", modalDate);

  const currentTime = new Date().toLocaleTimeString("en-PH", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-PH", {
    month: "long",
    day: "2-digit",
  });

  console.log("Date Today", formattedDate);

  useEffect(() => {
    if (modalDate === formattedDate) {
      const now = new Date().toLocaleTimeString("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const period = now.split(" ")[1];
      setFromSelectedTimeFrame(period);
    }
  }, [modalDate, formattedDate, setFromSelectedTimeFrame]);

  const currentHour = parseInt(currentTime.split(":")[0], 10);
  const currentMinute = parseInt(currentTime.split(":")[1], 10);

  const TohoursOption = [];
  for (let i = 1; i <= 12; i++) {
    const TopaddedHour = String(i).padStart(2, "0");

    TohoursOption.push(
      <Dropdown.Item eventKey={TopaddedHour} key={i}>
        {TopaddedHour}
      </Dropdown.Item>
    );
  }

  const TominuteOptions = [];
  for (let i = 0; i <= 59; i++) {
    const TopaddedMinute = String(i).padStart(2, "0");

    TominuteOptions.push(
      <Dropdown.Item key={i} eventKey={TopaddedMinute}>
        {TopaddedMinute}
      </Dropdown.Item>
    );
  }

  const FromhoursOption = [];
  for (let i = 1; i <= 12; i++) {
    const FrompaddedHour = String(i).padStart(2, "0");

    FromhoursOption.push(
      <Dropdown.Item eventKey={FrompaddedHour} key={i}>
        {FrompaddedHour}
      </Dropdown.Item>
    );
  }

  const FromminuteOptions = [];
  for (let i = 0; i <= 59; i++) {
    const FrompaddedMinute = String(i).padStart(2, "0");

    FromminuteOptions.push(
      <Dropdown.Item key={i} eventKey={FrompaddedMinute}>
        {FrompaddedMinute}
      </Dropdown.Item>
    );
  }

  return (
    <Container>
      <p>From</p>
      <Container className="d-flex justify-content-center align-items-center">
        <Dropdown onSelect={handleFromSelectHour}>
          <Dropdown.Toggle variant="secondary" id="dropdown-hours">
            {FromselectedHour}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "100px", overflowY: "auto" }}>
            {FromhoursOption}
          </Dropdown.Menu>
        </Dropdown>

        <p className="mt-2 fs-3">:</p>

        <Dropdown onSelect={handleFromSelectMinute}>
          <Dropdown.Toggle variant="secondary" id="dropdown-minutes">
            {FromselectedMinute}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "100px", overflowY: "auto" }}>
            {FromminuteOptions}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={handleFromSelectTimeFrame} className="mx-2">
          <Dropdown.Toggle variant="secondary" id="dropdown-TimeFrame">
            {FromselectedTimeFrame}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="AM">AM</Dropdown.Item>
            <Dropdown.Item eventKey="PM">PM</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      <p>To</p>
      <Container className="d-flex justify-content-center align-items-center">
        <Dropdown onSelect={handleToSelectHour}>
          <Dropdown.Toggle variant="secondary" id="dropdown-hours">
            {ToselectedHour}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "100px", overflowY: "auto" }}>
            {TohoursOption}
          </Dropdown.Menu>
        </Dropdown>

        <p className="mt-2 fs-3">:</p>

        <Dropdown onSelect={handleToSelectMinute}>
          <Dropdown.Toggle variant="secondary" id="dropdown-minutes">
            {ToselectedMinute}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "100px", overflowY: "auto" }}>
            {TominuteOptions}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown onSelect={handleToSelectTimeFrame} className="mx-2">
          <Dropdown.Toggle variant="secondary" id="dropdown-TimeFrame">
            {ToselectedTimeFrame}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="PM">PM</Dropdown.Item>
            <Dropdown.Item eventKey="AM">AM</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Container>
  );
}

export default SetTime;
