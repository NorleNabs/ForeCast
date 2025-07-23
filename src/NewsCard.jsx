import { Button, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { u } from "framer-motion/client";

function NewsCardComponent() {
  const [news, setNews] = useState(null);
  useEffect(() => {
    const url =
      "https://newsapi.org/v2/everything?" +
      "q=Apple&" +
      "from=2025-07-21&" +
      "sortBy=popularity&" +
      "apiKey=31cef06eac7b4e05a4e395da29179c90";

    var req = new Request(url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Just use the first article for example
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles[0]);
        }
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <Container
      className="d-flex justify-content-center w-100 h-100 p-3"
      style={{ backgroundColor: "#0b0b0bff" }}>
      <Col className="bg-primary h-100 justify-content-center align-items-center me-2">
        {news?.urlToImage ? (
          <img
            src={news.urlToImage}
            alt={news.title}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        ) : (
          <p>No image available</p>
        )}
      </Col>
      <Col className="bg-primary h-100 justify-contetn-center align-items-center ms-2">
        <p>{news?.source?.id || "Unknown"}</p>
      </Col>
    </Container>
  );
}

export default NewsCardComponent;
