import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AdsComponent from "./AdsComponent";
import Avatar from "react-avatar";
import StarRating from "star-rating-react";
export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    bookname: "",
    authorname: "",
    desc: "",
    imgurl: "",
    price: "",
    records: [],
  });
  const [review, setReview] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState(30); // default value of 30 days

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://rentandread.onrender.com/api/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
      const reviewResponse = await fetch(
        `https://rentandread.onrender.com/api/review/${params.id.toString()}`
      );
      const reviewData = await reviewResponse.json();
      setReview(reviewData);

      setIsLoading(false);
    }

    fetchData();

    return;
  }, [params.id, navigate]);
  const [price, setPrice] = useState(49);
  const handleChange = (event) => {
    setSelectedDays(event.target.value);
    const days = parseInt(event.target.value);
    let newPrice;
    if (days === 30) {
      newPrice = 49;
    } else if (days === 60) {
      newPrice = 99;
    } else if (days === 90) {
      newPrice = 199;
    }
    setPrice(newPrice);
  };
  return (
    <div>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-8">
            <div
              className="card mb-3 border-primary"
              style={{ maxWidth: "540px" }}
            >
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={require(`./books/${form.imgurl}`)}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{form.bookname}</h5>
                      <p className="card-text">{form.authorname}</p>
                      <p className="card-text">
                        <small className="text-muted">{form.desc}</small>
                      </p>
                      <div className="form-group">
                        <label htmlFor="days">Rent for</label>
                        <select
                          className="form-control"
                          id="days"
                          name="days"
                          onChange={handleChange}
                          value={selectedDays}
                        >
                          <option value="30">30 Days</option>
                          <option value="60">60 Days</option>
                          <option value="90">90 Days</option>
                        </select>
                      </div>

                      <p className="card-text">₹ {price}</p>
                      <Link
                        to={`/books/order/${params.id}?days=${selectedDays}&price=${price}`}
                      >
                        <button className="btn btn-primary">Rent Book</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card mb-3 border-primary"
              style={{ maxWidth: "540px" }}
            >
              <div className="card-body">
                <h5 className="card-title">Reviews</h5>
                {review.length > 0 ? (
                  review.map((reviewItem) => (
                    <div
                      key={reviewItem._id}
                      className="review-item"
                      style={{
                        marginBottom: "1.5rem",
                        padding: "1.5rem",
                        background: "#f9f9f9",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        className="d-flex align-items-center mb-4"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        <div>
                          <Avatar
                            name={reviewItem.username}
                            size="48"
                            round
                            textSizeRatio={2}
                            style={{
                              border: "2px solid #fff",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </div>
                        <div
                          className="ms-3"
                          style={{
                            marginLeft: "1rem",
                          }}
                        >
                          <h6
                            className="mb-1 username"
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                              marginBottom: "0.5rem",
                              color: "#333",
                            }}
                          >
                            {reviewItem.username}
                          </h6>
                          <div
                            className="star-rating"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <StarRating
                              count={5}
                              value={reviewItem.rating}
                              activeColor="#ffd700"
                              inactiveColor="#ccc"
                              edit={false}
                            />
                            <span
                              className="rating-value"
                              style={{
                                marginLeft: "0.5rem",
                                fontSize: "1.2rem",
                                color: "#555",
                              }}
                            >
                              {reviewItem.rating}
                            </span>
                          </div>
                          <p
                            className="mt-1 review"
                            style={{
                              fontSize: "1rem",
                              color: "#555",
                              lineHeight: "1.4",
                            }}
                          >
                            {reviewItem.review}
                          </p>
                        </div>
                      </div>
                      <hr
                        className="divider"
                        style={{
                          border: "none",
                          borderTop: "1px solid #ddd",
                          marginTop: "1.5rem",
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <p>No reviews available</p>
                    <div
                      id="sideimage"
                      style={{
                        perspective: "800px",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={require("../5385893-removebg-preview.png")}
                        alt="..."
                        style={{
                          maxWidth: "70%",
                          minWidth: "70px",
                          height: "auto",
                          transform: "rotateY(20deg)",
                          filter: "drop-shadow(8px 5px 4px #303030)",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
