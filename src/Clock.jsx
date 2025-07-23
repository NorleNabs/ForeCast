import React, { useEffect, useState } from "react";

function Clock() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-PH", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-PH", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000); // updates every second

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return currentTime;
}

export default Clock;
