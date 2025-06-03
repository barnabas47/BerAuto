// src/pages/CarsPage.tsx
import React, { useState, useEffect } from "react";
import { getAllCars } from "../api/cars";
import { getAllCarCategories } from "../api/carCategories";
import { CarDto, CarCategoryDto } from "../models";

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<CarDto[]>([]);
  const [categories, setCategories] = useState<CarCategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carData, categoryData] = await Promise.all([
          getAllCars(),
          getAllCarCategories()
        ]);
        setCars(carData.filter(car => car.isAvailable));
        setCategories(categoryData);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data || "Hiba az autók vagy kategóriák betöltésekor");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Betöltés...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "32px 0", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 32, fontSize: 32, fontWeight: 700, color: '#b388ff' }}>Bérelhető autók</h2>
      {cars.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>Nincsenek bérelhető autók.</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: 'center' }}>
          {cars.map((car) => {
            const category = categories.find(cat => cat.id === car.carCategoryId);
            return (
              <div key={car.id} className="card rental-car-card" style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, color: '#b388ff' }}>{car.make} {car.model}</div>
                <div style={{ color: '#fff', marginBottom: 8 }}>{category?.name || 'Kategória nélkül'}</div>
                <div style={{ marginBottom: 8, color: '#fff' }}><strong>Ár:</strong> {car.price} Ft/nap</div>
                <div style={{ marginBottom: 8, color: '#fff' }}><strong>Km óra:</strong> {car.odometer ?? 'N/A'} km</div>
                <div style={{ marginBottom: 8, color: '#fff' }}><strong>Elérhető:</strong> {car.isAvailable ? 'Igen' : 'Nem'}</div>
                {/* További adatok, ha szükséges */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarsPage;