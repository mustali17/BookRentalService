import React, { useState } from "react";

const SearchEBook = ({ searchText }) => {
  const [text, setText] = useState("");
  const [showValidTextModal, setShowValidTextModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "" || !text.trim()) {
      setShowValidTextModal(true);
      return;
    }
    searchText(text);
  };

  const onChangevalue = (e) => {
    e.preventDefault();
    setText(e.target.value);
    searchText(e.target.value);
    if (e.target.value === "") {
      setText("Ruskin Bond");
      searchText("Ruskin Bond");
    }
  };

  return (
    <div>
      <br />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <input
            type="search"
            onChange={onChangevalue}
            placeholder="&#128269; Search books..."
            style={{
              padding: "8px",
              borderRadius: "20px",
              width: "300px",
              border: "none",
              outline: "none",
              background: "#f2f2f2",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchEBook;
