import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const url = `https://newsapi.org/v2/everything?q=${user.defaultnews}&language=en&sortBy=publishedAt&apiKey=31cef06eac7b4e05a4e395da29179c90`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          console.log("News API Response:", data.articles);
        }
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center p-3 ">
        <Swiper
          style={{ flex: "1", width: "100%" }}
          cssMode={true}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          spaceBetween={30}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <SwiperSlide className="p-4">
                <Container
                  key={index}
                  className="d-grid justify-content-center align-items-center rounded-4 p-2"
                  style={{
                    minHeight: "80vh",
                    backgroundColor: "#928DAB",
                    gridTemplateRows: "auto 1fr",
                  }}>
                  <Row className="mt-2">
                    <h3 className="fs-5">{article.title}</h3>
                  </Row>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col sm={4} className="">
                      {article.urlToImage ? (
                        <img
                          src={article.urlToImage}
                          alt=""
                          style={{ width: "90%", height: "50%" }}
                        />
                      ) : (
                        <p>No Image Available</p>
                      )}
                    </Col>
                    <Col sm={6} className="">
                      <span className="fs-5">{article.description}</span>
                      <a href={article.url} target="_blank">
                        Read More
                      </a>
                      <h5>{article.author}</h5>
                    </Col>
                  </Row>
                </Container>
              </SwiperSlide>
            ))
          ) : (
            <p style={{ color: "white", fontSize: "2rem" }}>
              Loading New, Please Wait....
            </p>
          )}
        </Swiper>

        <Button>
          <Link to="/" className="fw-normal text-decoration-none text-reset">
            Back
          </Link>
        </Button>
      </Container>
    </>
  );
}
