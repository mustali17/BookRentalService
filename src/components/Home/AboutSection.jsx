export function AboutSection() {
    const features = [
      {
        icon: "book",
        title: "Vast Selection",
        description: "Access a wide range of books without the need to purchase."
      },
      {
        icon: "people",
        title: "Community Driven",
        description: "Join a network of book lovers sharing their collections."
      },
      {
        icon: "home",
        title: "Doorstep Delivery",
        description: "Get books delivered right to your home, hassle-free."
      }
    ];
  
    return (
      <section className="container mx-auto px-4 py-20 bg-[#88D498]">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#114B5F]">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <i className={`bi bi-${feature.icon} text-4xl text-[#1A936F] mb-4`}></i>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }