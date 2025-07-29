
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Card from "./components/Card";
import Footer from "./components/Footer";
import "./App.css";

const heroContent = {
  title: "BacheLORE",
  tagline: "For the LORE of every bachelor striving to survive.",
  description:
    "Find roommates, buy/sell second-hand items, book maid services, and track expenses—all in one place."
};

const services = [
  {
    title: "Roommate Finder",
    description: "Browse or post listings to find the perfect roommate.",
    button: { text: "Find Roommates", link: "#roommate" }
  },
  {
    title: "Second-hand Items",
    description: "Buy or sell used products easily and safely.",
    button: { text: "Browse Items", link: "#items" }
  },
  {
    title: "Maid Services",
    description: "Book or request trusted maid services.",
    button: { text: "Book Now", link: "#maids" }
  },
  {
    title: "Expense Tracker",
    description: "Track rent, utilities, and shared costs effortlessly.",
    button: { text: "Track Expenses", link: "#expenses" }
  }
];

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Section
          id="hero"
          className="hero-section"
          title={heroContent.title}
          tagline={heroContent.tagline}
          description={heroContent.description}
        />
        <div className="cards-grid">
          {services.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              description={service.description}
              button={service.button}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
