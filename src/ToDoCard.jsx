import { Button, Container } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import React, { useEffect, useState } from "react";
import MyVerticallyCenteredModal from "./TodoModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function ToDoCardComponent() {
  const [modalShow, setModalShow] = useState(false);
  const [activeDay, setActiveDay] = useState(null);

  const handleShow = (day) => {
    setActiveDay(day);
    setModalShow(true);
  };

  const getNext7Days = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      const formatted = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      days.push(formatted);
    }

    return days;
  };

  // 2. Use it in useState
  const [next7Days, setNext7Days] = useState(getNext7Days());

  useEffect(() => {
    const now = new Date();

    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timeout = setTimeout(() => {
      setNext7Days(getNext7Days()); // ✅ now accessible
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [next7Days]);
  return (
    <Container className="d-flex justify-content-center w-100 h-100">
      <Stack direction="horizontal" gap={3} className="w-100 h-100  ">
        <div
          className="h-100 w-100 m-2 rounded-3 align-content-center"
          style={{
            backgroundColor: "#7f7e7e5d",
            backdropFilter: "blur(10px)",
          }}>
          <>
            <Button
              variant="primary"
              onClick={() => handleShow(next7Days[0])}
              style={{ backgroundColor: "#78787806", border: "none" }}>
              {next7Days[0]}
            </Button>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              activeDay={activeDay}
            />
          </>
        </div>
        <div
          className="h-100 w-100 m-2 rounded-3 align-content-center"
          style={{
            backgroundColor: "#7f7e7e6d",
            backdropFilter: "blur(10px)",
          }}>
          <Button
            variant="primary"
            onClick={() => handleShow(next7Days[1])}
            style={{ backgroundColor: "#78787806", border: "none" }}>
            {next7Days[1]}
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            activeDay={activeDay}
          />
        </div>
        <div
          className="h-100 w-100 m-2 rounded-3 align-content-center"
          style={{
            backgroundColor: "#7f7e7e5d",
            backdropFilter: "blur(10px)",
          }}>
          <Button
            variant="primary"
            onClick={() => handleShow(next7Days[2])}
            style={{ backgroundColor: "#78787806", border: "none" }}>
            {next7Days[2]}
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            activeDay={activeDay}
          />
        </div>
        <div
          className="h-100 w-100 m-2 rounded-3 align-content-center"
          style={{
            backgroundColor: "#7f7e7e5d",
            backdropFilter: "blur(10px)",
          }}>
          <Button
            variant="primary"
            onClick={() => handleShow(next7Days[3])}
            style={{ backgroundColor: "#78787806", border: "none" }}>
            {next7Days[3]}
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            activeDay={activeDay}
          />
        </div>
        <div
          className="h-100 w-100 m-2 rounded-3 align-content-center"
          style={{
            backgroundColor: "#7f7e7e5d",
            backdropFilter: "blur(10px)",
          }}>
          <Button
            variant="primary"
            onClick={() => handleShow(next7Days[4])}
            style={{ backgroundColor: "#78787806", border: "none" }}>
            {next7Days[4]}
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            activeDay={activeDay}
          />
        </div>
        <div
          className="h-100 w-100 m-2 rounded-3 align-content-center"
          style={{
            backgroundColor: "#7f7e7e5d",
            backdropFilter: "blur(10px)",
          }}>
          <Button
            variant="primary"
            onClick={() => handleShow(next7Days[5])}
            style={{ backgroundColor: "#78787806", border: "none" }}>
            {next7Days[5]}
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            activeDay={activeDay}
          />
        </div>
        <div
          className="h-100 w-100 m-2 rounded-3 align-content-center"
          style={{
            backgroundColor: "#7f7e7e5d",
            backdropFilter: "blur(10px)",
          }}>
          <Button
            variant="primary"
            onClick={() => handleShow(next7Days[6])}
            style={{ backgroundColor: "#78787806", border: "none" }}>
            {next7Days[6]}
          </Button>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            activeDay={activeDay}
          />
        </div>
      </Stack>
    </Container>
  );
}

export default ToDoCardComponent;
