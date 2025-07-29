
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
        <div style={{ width: '100%', textAlign: 'center', margin: '2.5rem 0' }}>
          <a href="#signup" className="auth-btn" style={{
            background: 'linear-gradient(90deg, #00B8D9 0%, #00E6F6 50%, #0099F7 100%)',
            color: '#122C4A',
            padding: '1rem 2.5rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1.25rem',
            margin: '0 1rem',
            boxShadow: '0 4px 24px rgba(0,184,217,0.15)',
            letterSpacing: '0.03em',
            border: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s'
          }}>Sign Up</a>
          <a href="#login" className="auth-btn" style={{
            background: 'linear-gradient(90deg, #0099F7 0%, #00E6F6 50%, #00B8D9 100%)',
            color: '#122C4A',
            padding: '1rem 2.5rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1.25rem',
            margin: '0 1rem',
            boxShadow: '0 4px 24px rgba(0,184,217,0.15)',
            letterSpacing: '0.03em',
            border: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s'
          }}>Login</a>
        </div>
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
