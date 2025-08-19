import React, { useRef, useState } from "react";

export default function Background({ weather }) {
  console.log("Weather data:", weather.main);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Behind content
        overflow: "hidden",
      }}>
      {weather.main === "Clouds" ? (
        <div style={{ width: "100%", height: "100%" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}>
            <source src="/Image/c.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : weather.main === "Clear" ? (
        <div style={{ width: "100%", height: "100%" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}>
            <source src="/Image/59483-493557880_small.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : weather.main === "Rain" ? (
        <div style={{ width: "100%", height: "100%" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}>
            <source src="/Image/203878-922675732_medium.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <img
            src="/Image/slide1.jpg"
            alt="Default background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </div>
  );
}
