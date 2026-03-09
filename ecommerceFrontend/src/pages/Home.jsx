import { useEffect, useState } from "react";
import { Carousel, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const cars = [
  {
    id: 1,
    name: "tmfo wood",
    price: "500",
    rating: "⭐⭐⭐⭐⭐",
    img: "/public/image2.jpg",
  },
  {
    id: 2,
    name: "Fogg",
    price: "$400",
    rating: "⭐⭐⭐⭐",
    img: "/public/image3.jpg",
  },
  {
    id: 3,
    name: "Beardo",
    price: "300",
    rating: "⭐⭐⭐⭐⭐",
    img: "/public/image4.jpg",
  },
];

export default function Home() {
  const [displayvalue1, setdisplayvalue1] = useState([]);

  useEffect(() => {
    handlefunction1();
  }, []);

  const handlefunction1 = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products/");
      setdisplayvalue1(res.data);
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="py-4">
      {/* <h2 className="text-center mb-4">Featured Cars</h2> */}

      {/* Carousel */}
      <Carousel className="mb-5 shadow" style={{ backgroundColor: "yellow" }}>
        {cars.map((car) => (
          <Carousel.Item key={car.id}>
            <img
              src={car.img}
              alt={car.name}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "contain",
              }}
            />

            <Carousel.Caption>
              <h3>{car.name}</h3>
              <p>
                {car.price} • {car.rating}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Product Cards */}
      <Row className="g-4 px-4">
        {displayvalue1.map((car) => (
          <Col key={car._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="h-100 shadow-sm border-0">
              {/* Image Section */}
              <div
                style={{
                  backgroundColor: "yellow",
                  padding: "20px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Rating on top of image */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#ffc107",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ⭐ {car.rating}
                </div>

                <Card.Img
                  src={car.img}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{car.name}</Card.Title>

                <Card.Text className="text-muted small">{car.price}</Card.Text>

                <Button as={Link} to={`/car/${car._id}`} variant="dark">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
