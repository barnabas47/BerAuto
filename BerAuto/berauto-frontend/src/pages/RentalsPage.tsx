import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserRentals } from "../api/rentals";
import { RentalDto } from "../models";

const RentalsPage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [rentals, setRentals] = useState<RentalDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchRentals = async () => {
        try {
          const data = await getUserRentals();
          setRentals(data);
        } catch (err: any) {
          setError(err.response?.data || "Hiba a bérlések betöltésekor");
        }
      };
      fetchRentals();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p style={{ padding: "20px" }}>Bejelentkezés szükséges!</p>;
  }

  const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return (
    <div style={{ padding: "32px 0", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 32, fontSize: 28, fontWeight: 700, color: '#b388ff' }}>Bérléseim</h2>
      {error && <div className="error">{error}</div>}
      {rentals.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>Nincs bérlésed.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {rentals.map((rental) => (
            <div className="card" key={rental.id}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 6 }}>Autó ID: {rental.carId ?? 'N/A'}</div>
              <div style={{ marginBottom: 6 }}><strong>Státusz:</strong> <span style={{ color: rental.status === 'Approved' ? 'green' : rental.status === 'Rejected' ? 'red' : rental.status === 'PickedUp' ? 'blue' : rental.status === 'Returned' ? 'purple' : '#333' }}>{rental.status ?? 'N/A'}</span></div>
              <div style={{ marginBottom: 6 }}><strong>Bérlés ID:</strong> {rental.id ?? 'N/A'}</div>
              <div style={{ marginBottom: 6 }}><strong>Kezdés:</strong> {formatDate(rental.from)}</div>
              <div style={{ marginBottom: 6 }}><strong>Vége:</strong> {formatDate(rental.to)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalsPage;