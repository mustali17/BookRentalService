export function Testimonials() {
  const testimonials = [
    {
      name: "Jane Doe",
      image: "https://media.istockphoto.com/id/1309257039/photo/portrait-of-young-male-student-holding-book-standing-isolated-over-white-background-stock.jpg?s=612x612&w=0&k=20&c=Irreqj9k8XvGIP-k_72EgH_lZmyOQTugOq9I-zrUfK4=",
      text: "Rent and Read has transformed my reading habits. So many books, so little cost!"
    },
    {
      name: "John Smith",
      image: "https://media.istockphoto.com/id/1448115775/photo/portrait-of-a-young-man-holding-a-book-in-a-library.jpg?s=612x612&w=0&k=20&c=OlNAVDVuc0EmV2y1jp8yxZHFD8_xrhv1X7YOU6Vlsmw=",
      text: "The convenience of doorstep delivery combined with a vast selection is unbeatable."
    },
    {
      name: "Jane Lee",
      image: "https://media.istockphoto.com/id/1425529463/photo/portrait-of-east-asian-student-with-books-and-backpack-in-college.jpg?s=612x612&w=0&k=20&c=cSspiaM-TzyEm8hrwVePu-yd7w4k1j4omPF9p-yS1iU=",
      text: "I love being part of this community of book lovers. It's more than just renting books!"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#114B5F]">What Our Readers Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white bg-opacity-75 rounded-lg shadow-md p-6">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-lg text-center mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
            <p className="font-semibold text-center">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}