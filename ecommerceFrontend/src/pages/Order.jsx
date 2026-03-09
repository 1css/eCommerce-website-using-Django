import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
  Alert,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Order() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
      setProduct(res.data);
    } catch (err) {
      setError("Failed to load product");
      console.log(err);
    }
  };

  const handleBuy = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (qty > product.countInStock) {
      setError(
        `❌ Quantity exceeds available stock (${product.countInStock})!`,
      );
      return;
    }

    if (qty <= 0) {
      setError("❌ Quantity must be greater than 0!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      
      const orderData = {
        orderItems: [
          {
            product: product._id, 
            name: product.name,
            qty: qty,
            price: product.price,
          },
        ],
        totalPrice: qty * product.price,
        shippingPrice: 0,
        taxPrice: 0,
        paymentMethod: "paypal",
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/add/",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // TOKEN ADDED
          },
        },
      );

      setShowSuccess(true);

      console.log("Order Created:", response.data);

      // Optional redirect
      // setTimeout(() => navigate(`/order/${response.data.id}`), 2000);
    } catch (err) {
      const message = err.response?.data?.detail || "Error placing order";
      setError(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <h2 className="text-center">Loading...</h2>;

  return (
    <Container className="py-5">
      <ToastContainer position="top-center" className="p-3">
        <Toast
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">
            ✅ Order placed successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 p-4">
            <Row>
              <Col md={5}>
                <Image src={product.image} fluid rounded />
              </Col>

              <Col md={7}>
                <h2>{product.name}</h2>
                <h4 className="text-success">₹ {product.price}</h4>

                <p>
                  <strong>Stock Available:</strong>{" "}
                  <span
                    className={
                      product.countInStock > 0 ? "text-primary" : "text-danger"
                    }
                  >
                    {product.countInStock}
                  </span>
                </p>

                <Form.Group className="mt-3">
                  <Form.Label>Select Quantity</Form.Label>

                  <Form.Control
                    type="number"
                    min="1"
                    max={product.countInStock}
                    value={qty}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setQty(value > 0 ? value : 1);
                    }}
                    disabled={loading}
                  />
                </Form.Group>

                <h5 className="mt-3">
                  Total Price: ₹ {(qty * product.price).toFixed(2)}
                </h5>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}

                <Button
                  variant="success"
                  size="lg"
                  className="mt-4 w-100"
                  onClick={handleBuy}
                  disabled={loading || product.countInStock === 0}
                >
                  {loading ? "Processing..." : "Confirm Order"}
                </Button>

                {product.countInStock === 0 && (
                  <Alert variant="warning" className="mt-3">
                    This item is currently out of stock
                  </Alert>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
