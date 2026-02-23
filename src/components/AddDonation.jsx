import { useState } from "react";

const CATEGORIES = ["Food", "Clothing", "Education", "Kids"];
const LOCATIONS  = ["Chennai", "Bangalore", "Hyderabad"];

function AddDonation({ addDonation }) {
  const [open, setOpen]         = useState(false);
  const [item, setItem]         = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [donor, setDonor]       = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!item.trim())   { setError("Please enter an item name."); return; }
    if (!category)      { setError("Please select a category."); return; }
    if (!location)      { setError("Please select a location."); return; }

    addDonation({
      id: crypto.randomUUID(),
      item: item.trim(),
      category,
      location,
      donor: donor.trim() || "Anonymous",
      date: new Date().toISOString().split("T")[0],
    });

    // Reset
    setItem(""); setCategory(""); setLocation(""); setDonor("");
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setOpen(false); }, 1800);
  };

  return (
    <div className="add-donation">
      {/* Toggle button */}
      <button
        className={`add-toggle ${open ? "add-toggle--open" : ""}`}
        onClick={() => { setOpen(!open); setError(""); setSuccess(false); }}
        aria-expanded={open}
      >
        <svg
          className="add-toggle__icon"
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
        >
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        {open ? "Cancel" : "Donate an Item"}
      </button>

      {/* Collapsible form */}
      {open && (
        <div className="add-form-wrap" style={{ animation: "slideDown 0.25s ease both" }}>
          {success ? (
            <div className="add-success">
              <span>🎉</span>
              <strong>Thank you! Your donation has been added.</strong>
            </div>
          ) : (
            <form className="add-form" onSubmit={handleSubmit} noValidate>
              <h3 className="add-form__title">Add a Donation</h3>

              <div className="add-form__grid">
                {/* Item name */}
                <div className="add-field add-field--full">
                  <label className="add-label" htmlFor="add-item">Item Name *</label>
                  <input
                    id="add-item"
                    type="text"
                    className="add-input"
                    placeholder="e.g. Winter Jackets, Notebooks..."
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* Category */}
                <div className="add-field">
                  <label className="add-label" htmlFor="add-category">Category *</label>
                  <div className="add-select-wrap">
                    <select
                      id="add-category"
                      className="add-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <svg className="add-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                {/* Location */}
                <div className="add-field">
                  <label className="add-label" htmlFor="add-location">Location *</label>
                  <div className="add-select-wrap">
                    <select
                      id="add-location"
                      className="add-select"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">Select location</option>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <svg className="add-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                {/* Donor name (optional) */}
                <div className="add-field add-field--full">
                  <label className="add-label" htmlFor="add-donor">Your Name <span style={{ opacity: 0.5 }}>(optional)</span></label>
                  <input
                    id="add-donor"
                    type="text"
                    className="add-input"
                    placeholder="Leave blank for Anonymous"
                    value={donor}
                    onChange={(e) => setDonor(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              {error && <p className="add-error">⚠ {error}</p>}

              <button type="submit" className="add-submit">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
                </svg>
                Submit Donation
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default AddDonation;