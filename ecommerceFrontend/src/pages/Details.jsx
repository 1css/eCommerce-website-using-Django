import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Details() {
  const { id } = useParams(); // get id from URL
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
      setCar(res.data);
      
    } catch (error) {
      console.log(error.message);
    }
  };
   
   
  if (!car) return <h2 className="text-center">Loading...</h2>;

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={6}>
          <div
            style={{
              backgroundColor: "yellow",
              padding: "10px",
              borderRadius: "10px",
              display: "inline-block",
            }}
          >
            <Image
              src={car.image}
              fluid
              rounded
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        </Col>

        <Col md={6}>
          <h1>{car.name}</h1>

          <h3 className="text-success">Price-{car.price}</h3>

          <h5>
            <Badge bg="warning" text="dark">
              ⭐ {car.rating}
            </Badge>
          </h5>

          <p className="mt-3 fs-5">
            <strong>Availability:</strong>{" "}
            <span
              className={`fw-bold ${
                car.countInStock > 0 ? "text-success" : "text-danger"
              }`}
            >
              {car.countInStock}
            </span>
          </p>

          <p className="mt-3">{car.description}</p>

          <Button
            variant="dark"
            size="lg"
            className="mt-4"
            onClick={() => navigate(`/order/${car._id}`)}
          >
            Buy Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
