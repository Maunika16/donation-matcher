const CATEGORIES = ["Food", "Clothing", "Education", "Kids"];
const LOCATIONS  = ["Chennai", "Bangalore", "Hyderabad"];

const CATEGORY_ICONS = {
  Food: "🌾",
  Clothing: "👕",
  Education: "📚",
  Kids: "🧸",
};

function Filter({ category, setCategory, location, setLocation, search, setSearch }) {
  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="search-wrap">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search donations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-btn" onClick={() => setSearch("")} aria-label="Clear search">×</button>
        )}
      </div>

      {/* Category pills */}
      <div className="pill-group" role="group" aria-label="Filter by category">
        <button
          className={`pill ${category === "" ? "pill--active" : ""}`}
          onClick={() => setCategory("")}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`pill pill--${cat.toLowerCase()} ${category === cat ? "pill--active" : ""}`}
            onClick={() => setCategory(category === cat ? "" : cat)}
          >
            <span>{CATEGORY_ICONS[cat]}</span> {cat}
          </button>
        ))}
      </div>

      {/* Location select */}
      <div className="select-wrap">
        <svg className="select-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <select
          className="location-select"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <svg className="chevron-icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  );
}

export default Filter;