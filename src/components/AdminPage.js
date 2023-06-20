import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");
    if (!adminLogin) {
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className="container">
      <h3 className="text-center mt-4">Admin Page</h3>
      <div className="d-flex justify-content-center mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="bi bi-clipboard-data-fill card-icon"></i>
                <h5 className="card-title">All Orders</h5>
                <p className="card-text">View all orders placed by users.</p>
                <Link to="/allorders" className="btn btn-primary">
                  Go to Orders
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="bi bi-people-fill card-icon"></i>
                <h5 className="card-title">All Users</h5>
                <p className="card-text">Manage and view user accounts.</p>
                <Link to="/admin/all-users" className="btn btn-primary">
                  Go to Users
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="bi bi-book-fill card-icon"></i>
                <h5 className="card-title">Book Requests</h5>
                <p className="card-text">Manage book requests from users.</p>
                <Link to="/admin/book-request" className="btn btn-primary">
                  Go to Requests
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="bi bi-cloud-plus-fill card-icon"></i>
                <h5 className="card-title">Add Book</h5>
                <p className="card-text">Add a new book to the inventory.</p>
                <Link to="/addbook" className="btn btn-primary">
                  Add Book
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
