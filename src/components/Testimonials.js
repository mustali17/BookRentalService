import React, { useState } from "react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text:
        "      As a busy college student, Rent and Read has been a lifesaver. I can now read all the books I want without breaking the bank. Thank you!",
      name: "Jane Doe",
      image:
        "https://images.unsplash.com/photo-1674376906038-a18fed600a55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=60"
    },
    {
      text:
        "I recently rented a book from Rent and Read and I was blown away by the selection and ease of the process. I would highly recommend this service to any book lover!",
      name: "John Smith",
      image:
        "https://images.unsplash.com/photo-1456315138460-858d1089ddba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29uJTIwcmVhZGluZyUyMGElMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=2000&q=60"
    },
    {
      text:
        "I love the convenience of being able to rent books from the comfort of my own home. Rent and Read has made it so easy to access the books I want to read.",
      name: "Jane Lee",
      image:
        "https://images.unsplash.com/photo-1528736189815-2cc50c5586f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHBlcnNvbiUyMHJlYWRpbmclMjBhJTIwYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60"
    }
  ];

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
    if (currentIndex === 0) {
      setCurrentIndex(testimonials.length - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex === testimonials.length - 1) {
      setCurrentIndex(0);
    }
  };
  const styles = {
    section: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    container: {
      display: "flex",
      justifyContent: "center",
      width: "30rem",
      height: "18.75rem",
      border: "1px solid lightgray",
      borderRadius: "10px",
      margin: " 50px 0",
      padding: "20px",
      backgroundColor:"white"
    },
    testimonial: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    image: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      margin: "20px 0",
      backgroundImage: "url(https://via.placeholder.com/100x100)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    text: {
      textAlign: "center",
      fontSize: "1.125rem",
      margin: "1.25rem 0",
        color:"black"
    },

    name: {
      fontSize: "16px",
      fontStyle: "italic",
      marginBottom: "20px",
      color:"black"
    },
    nav: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px"
    },

    navbutton: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "lightgray",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      margin: "0 10px"
    }
  };
  return (
    <div style={styles.section}>
      <h2 className="testimonials-title">What our users are saying</h2>
      <div style={styles.container}>
        <div style={styles.testimonial}>
          <img
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            style={styles.image}
          />
          <p style={styles.text}>{testimonials[currentIndex].text} </p>
          <p style={styles.name}>{testimonials[currentIndex].name}</p>
        </div>
      </div>
      <div style={styles.nav}>
        <button style={styles.navbutton} onClick={handlePrevClick}>
          {"<"}
        </button>
        <button style={styles.navbutton} onClick={handleNextClick}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
