// App.jsx
import Navbar from "./components/Navbar";
import bg1image from "./assets/bg1image.jpg";
import Card from "./components/Card";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RoommateFinder from "./components/RoommateFinder";
import { Routes, Route, Link } from "react-router-dom";
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
    button: { text: "Find Roommates", link: "/roommates" }
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

function HomePage() {
  return (
    <>
      <img src={bg1image} alt="Background" className="background-image" />
      <div className="container"> {/* added wrapper */}
        <div className="app-container">
          <Navbar />

          <main className="main-content">
            <section id="hero" className="hero-section">
              <div className="hero-overlay">
                <h2 className="section-title">{heroContent.title}</h2>
                <h3 className="section-tagline">{heroContent.tagline}</h3>
                <p className="section-description">{heroContent.description}</p>
                <div className="auth-btn-container">
                  <Link to="/signup" className="auth-btn">Sign Up</Link>
                  <Link to="/login" className="auth-btn">Login</Link>
                </div>
              </div>
            </section>

            <section className="services-container">
              <h2 className="services-title">Our Services</h2>
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
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/roommates" element={<RoommateFinder />} />
    </Routes>
  );
}

export default App;
