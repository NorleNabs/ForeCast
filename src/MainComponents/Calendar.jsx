import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import MyVerticallyCenteredModal from "./TodoModal";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function Calendar() {
  const [modalShow, setModalShow] = useState(false);
  const [activeDay, setActiveDay] = useState(null);

  const handleDateClick = (arg) => {
    setModalShow(true);
    setActiveDay(arg.dateStr);

    // alert(arg.dateStr);
  };

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activeDay={activeDay}
      />
      ;
    </Container>
  );
}
