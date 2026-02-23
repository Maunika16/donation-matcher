import { useState } from "react";
import "./styles/App.css";
import donationsData from "./data/donations";
import Filter from "./components/Filter";
import DonationList from "./components/DonationList";
import AddDonation from "./components/AddDonation";

// Load initial state from localStorage, fall back to seed data
function loadDonations() {
  try {
    const saved = localStorage.getItem("donations-v2");
    return saved ? JSON.parse(saved) : donationsData;
  } catch {
    return donationsData;
  }
}

function App() {
  const [donations, setDonations] = useState(loadDonations);
  const [category, setCategory]   = useState("");
  const [location, setLocation]   = useState("");
  const [search, setSearch]       = useState("");

  const persist = (next) => {
    localStorage.setItem("donations-v2", JSON.stringify(next));
    return next;
  };

  const addDonation = (newDonation) => {
    setDonations((prev) => persist([newDonation, ...prev]));
  };

  // Toggle taken status on a donation
  const markTaken = (id) => {
    setDonations((prev) =>
      persist(prev.map((d) => d.id === id ? { ...d, taken: !d.taken } : d))
    );
  };

  // Permanently remove a donation from the list
  const deleteDonation = (id) => {
    setDonations((prev) => persist(prev.filter((d) => d.id !== id)));
  };

  const filteredData = donations.filter((d) =>
    (category === "" || d.category === category) &&
    (location === "" || d.location === location) &&
    d.item.toLowerCase().includes(search.toLowerCase())
  );

  // Quick stats
  const totalCount    = donations.length;
  const takenCount    = donations.filter((d) => d.taken).length;
  const locationCount = [...new Set(donations.map((d) => d.location))].length;
  const filteredCount = filteredData.length;

  return (
    <div className="app">
      {/* Hero header */}
      <header className="app-hero">
        <div className="app-hero__inner">
          <div className="app-hero__tag">🤝 Community Giving</div>
          <h1 className="app-hero__title">
            Donation<br /><em>Matcher</em>
          </h1>
          <p className="app-hero__sub">
            Connect generosity with need. Browse, filter, and contribute items that make a real difference.
          </p>

          {/* Stats strip */}
          <div className="stats-strip">
            <div className="stat">
              <span className="stat__num">{totalCount}</span>
              <span className="stat__label">Total Listed</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__num">{takenCount}</span>
              <span className="stat__label">Items Taken</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__num">{locationCount}</span>
              <span className="stat__label">Cities</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__num">{filteredCount}</span>
              <span className="stat__label">Showing</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <AddDonation addDonation={addDonation} />

        <Filter
          category={category}  setCategory={setCategory}
          location={location}  setLocation={setLocation}
          search={search}      setSearch={setSearch}
        />

        <DonationList
          data={filteredData}
          markTaken={markTaken}
          deleteDonation={deleteDonation}
        />
      </main>

      <footer className="app-footer">
        Made with ❤ for the community
      </footer>
    </div>
  );
}

export default App;