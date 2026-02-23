import { useState } from "react";

const CATEGORY_META = {
  Food:      { icon: "🌾", color: "var(--cat-food)",      label: "Food"      },
  Clothing:  { icon: "👕", color: "var(--cat-clothing)",  label: "Clothing"  },
  Education: { icon: "📚", color: "var(--cat-education)", label: "Education" },
  Kids:      { icon: "🧸", color: "var(--cat-kids)",      label: "Kids"      },
};

function DonationCard({ donation, index, markTaken, deleteDonation }) {
  const meta = CATEGORY_META[donation.category] || {
    icon: "🎁", color: "var(--charcoal-3)", label: donation.category
  };
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    if (confirmDelete) {
      deleteDonation(donation.id);
    } else {
      setConfirmDelete(true);
      // Auto-cancel confirm after 3s if user doesn't follow through
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div
      className={`don-card ${donation.taken ? "don-card--taken" : ""}`}
      style={{
        animationDelay: `${index * 60}ms`,
        "--cat-color": meta.color,
      }}
    >
      {/* Top accent strip */}
      <div className="don-card__strip" />

      {/* Category badge */}
      <div className="don-card__badge">
        <span className="don-card__badge-icon">{donation.taken ? "✅" : meta.icon}</span>
        <span className="don-card__badge-label">{donation.taken ? "Taken" : meta.label}</span>
      </div>

      {/* Item name */}
      <h3 className="don-card__item">{donation.item}</h3>

      {/* Meta row */}
      <div className="don-card__meta">
        <span className="don-card__location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {donation.location}
        </span>

        {donation.donor && (
          <span className="don-card__donor">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {donation.donor}
          </span>
        )}
      </div>

      {/* Date */}
      {donation.date && (
        <div className="don-card__date">
          {new Date(donation.date).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric"
          })}
        </div>
      )}

      {/* Action buttons */}
      <div className="don-card__actions">
        {/* Mark Taken / Undo */}
        <button
          className={`don-btn don-btn--taken ${donation.taken ? "don-btn--taken-active" : ""}`}
          onClick={() => markTaken(donation.id)}
          title={donation.taken ? "Mark as available again" : "Mark as taken"}
        >
          {donation.taken ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
              Undo
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Mark Taken
            </>
          )}
        </button>

        {/* Delete button — two-tap confirm to prevent accidents */}
        <button
          className={`don-btn don-btn--delete ${confirmDelete ? "don-btn--confirm" : ""}`}
          onClick={handleDeleteClick}
          title={confirmDelete ? "Click again to confirm removal" : "Remove this donation"}
        >
          {confirmDelete ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Confirm
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
              Remove
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function DonationList({ data, markTaken, deleteDonation }) {
  if (data.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">🔍</span>
        <strong>No donations found</strong>
        <p>Try adjusting your filters or add a new donation above.</p>
      </div>
    );
  }

  return (
    <div className="don-grid">
      {data.map((d, i) => (
        <DonationCard
          key={d.id}
          donation={d}
          index={i}
          markTaken={markTaken}
          deleteDonation={deleteDonation}
        />
      ))}
    </div>
  );
}

export default DonationList;