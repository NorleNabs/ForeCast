import { Stack, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

function NewsCardComponent() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    // Get today's date and date 7 days ago

    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=31cef06eac7b4e05a4e395da29179c90`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          console.log("News API Response:", data.articles);
          setArticles(data.articles); // <-- Check here
        }
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <Container
      className="d-flex justify-content-center p-3 overflow-hidden"
      style={{}}>
      <Stack className=" h-100 mx-3" gap={3}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Row
              key={index}
              className="rounded-4"
              style={{
                minHeight: "20vh",
                backgroundColor: "#7f7e7e5d",
                backdropFilter: "blur(10px)",
                webkitBackdropFilter: "blur(10px)",
              }}>
              <Col sm={4} className="">
                <img
                  src={article.urlToImage}
                  alt=""
                  style={{ width: "100%" }}
                />
              </Col>
              <Col sm={8} className="">
                <h3 className="fs-5">{article.title}</h3>
                <span className="fs-5">{article.description}</span>
              </Col>
            </Row>
          ))
        ) : (
          <p>Loading news...</p>
        )}

        <div></div>
        <div></div>
      </Stack>
    </Container>
  );
}

export default NewsCardComponent;
