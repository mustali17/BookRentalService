import axios from "axios";
import React from "react";

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = formData.get("username");

  const newUrl = `http://${username}.localhost:3001`;
  window.location.href = newUrl;

  //   window.location.href = newUrl;
  //   axios.post('/api/login', formData)
  //     .then(response => {
  //       const subdomain = response.data.subdomain;
  //       const newUrl = `http://${subdomain}.localhost:3000`;

  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
}

function TryTapop() {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" id="username" />

      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" />

      <button type="submit">Sign in</button>
    </form>
  );
}

export default TryTapop;
