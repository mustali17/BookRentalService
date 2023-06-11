import React, { useState } from "react";
import { OpenAIApi } from "openai";
openai.api_key = "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";
const openai = new OpenAIApi({
    api_key: "YOUR_API_KEY_HERE"
  });

function BookRecommendations() {
  const [bookQuery, setBookQuery] = useState("");
  const [bookRecommendations, setBookRecommendations] = useState([]);

  const handleBookQueryChange = (event) => {
    setBookQuery(event.target.value);
  };

  const handleBookRecommendations = (recommendations) => {
    setBookRecommendations(recommendations.data.choices[0].text.split("\n"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `Please recommend some books similar to ${bookQuery}.`;

    try {
      const completions = await openai.Completion.create({
        engine: "davinci",
        prompt,
        max_tokens: 256,
        n: 1,
        stop: "\n",
      });

      handleBookRecommendations(completions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bookQuery">Enter a book title:</label>
        <input
          type="text"
          id="bookQuery"
          name="bookQuery"
          value={bookQuery}
          onChange={handleBookQueryChange}
        />
        <button type="submit">Get recommendations</button>
      </form>
      <ul>
        {bookRecommendations.map((book) => (
          <li key={book}>{book}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookRecommendations;
