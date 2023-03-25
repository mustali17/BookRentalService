import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AdsComponent from "./AdsComponent";

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
      setIsLoading(false);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  return (
    <div>
      <div className="container text-center">
        <div className="card mb-3 border-primary" style={{ maxWidth: "540px" }}>
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
                      value={selectedDays}
                      onChange={(e) =>
                        setSelectedDays(parseInt(e.target.value))
                      }
                    >
                      <option value={30}>30 days</option>
                      <option value={60}>60 days</option>
                      <option value={90}>90 days</option>
                    </select>
                  </div>

                  <p className="card-text">₹ {form.price} /per month</p>
                  <Link to={`/books/order/${params.id}?days=${selectedDays}`}>
                    <button className="btn btn-primary">Rent Book</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <AdsComponent />
      </div>
    </div>
  );
}
