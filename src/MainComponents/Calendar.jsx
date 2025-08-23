import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import MyVerticallyCenteredModal from "./TodoModal";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function Calendar() {
  const [modalShow, setModalShow] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await fetch(
          `http://localhost:8000/api/users/${user.id}/todo`
        );
        const data = await res.json();
        console.log("Fetched todos:", data);
        setTodos(data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    fetchTodos();
  }, []);

  const date = new Date();

  const formatted = date.toISOString().split("T")[0];

  const handleDateClick = (arg) => {
    {
      formatted <= arg.dateStr ? setModalShow(true) : null;
    }
    setActiveDay(arg.dateStr);

    console.log(formatted, formatted <= arg.dateStr, arg.dateStr);
    // alert(arg.dateStr);
  };

  function convertTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }

    return `${hours.padStart(2, "0")}:${minutes}:00`;
  }

  console.log(
    todos.map((todo) => ({
      id: todo._id,
      title: todo.task,
      start: todo.date || todo.Fromtime,
      end: todo.Totime,
    }))
  );

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={todos}
        eventDataTransform={(todo) => {
          const start = `${todo.date}T${convertTo24Hour(todo.Fromtime)}`;
          const end = todo.Totime
            ? `${todo.date}T${convertTo24Hour(todo.Totime)}`
            : null;

          return {
            id: todo._id,
            title: todo.task || "Untitled Todo",
            start,
            end,
            fromTime: todo.Fromtime || "",
            toTime: todo.Totime || "",
          };
        }}
        eventContent={(eventInfo) => {
          const { title, extendedProps } = eventInfo.event;
          return (
            <div
              style={{
                backgroundColor: "#6fbcecff",
                borderRadius: "8px",
                padding: "2px",
                color: "white",
                width: "100%",
              }}>
              <b>{title}</b>
              {extendedProps.fromTime && extendedProps.toTime && (
                <div style={{ fontSize: "0.8em" }}>
                  {extendedProps.fromTime} - {extendedProps.toTime}
                </div>
              )}
            </div>
          );
        }}
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
