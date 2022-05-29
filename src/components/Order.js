import React,{ useState }  from "react";

export default function Order() {
const [name, setName] = useState("");
  const [number, setNumber] = useState("");
function auth(e) {
    e.preventDefault();
    
  }
  return <div>
  <div
        className="container card border-info shadow text-center"
        style={{ width: "25rem" }}
      >
        <div className="card-header">Enter Your Details</div>
        <div className="card-body">
          <form onSubmit={(e) => auth(e)}>
            <div className="form-group">
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setName(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Name"
                  value={name}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setNumber(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Phone Number"
                  value={number}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={function changename(event) {
                    setNumber(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Enter your Address"
                  value={number}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="login"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div></div>
}