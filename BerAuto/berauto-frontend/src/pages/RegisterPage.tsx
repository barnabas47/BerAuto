import React, { useState } from "react";
import { register } from "../api/auth";
import { UserRegisterDto } from "../models";
import { useNavigate } from "react-router-dom";

// Segítő típus az address mezők kezelésére
interface AddressForm {
  city: string;
  street: string;
  zipCode: string;
  state: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<UserRegisterDto>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleIds: [2], // Customer role ID, confirm with backend
    address: { city: "", street: "", zipCode: "", state: "" }, // Teljes inicializálás
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Segítő függvény az address mezők frissítéséhez
  const updateAddressField = (field: keyof AddressForm, value: string) => {
    setFormData({
      ...formData,
      address: {
        ...(formData.address || { city: "", street: "", zipCode: "", state: "" }),
        [field]: value
      } as AddressForm
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validáció: minden address mező kitöltött
      if (!formData.address?.city || !formData.address?.street || !formData.address?.zipCode || !formData.address?.state) {
        setError("Minden címmező kitöltése kötelező");
        return;
      }
      await register(formData);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Hiba a regisztráció során");
    }
  };

  // Biztosítjuk, hogy az address létezik, de az inicializálás miatt ez mindig igaz
  const address = formData.address || { city: "", street: "", zipCode: "", state: "" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6fb" }}>
      <div className="card" style={{ minWidth: 340, maxWidth: 440, width: "100%", boxShadow: "0 4px 24px rgba(25,118,210,0.10)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 24, color: '#1976d2', fontWeight: 700 }}>Regisztráció</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Név:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Jelszó:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Telefonszám:</label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500 }}>Cím:</label>
            <input
              type="text"
              placeholder="Város"
              value={formData.address?.city || ""}
              onChange={(e) => updateAddressField('city', e.target.value)}
              required
              style={{ width: "100%", marginBottom: 8 }}
            />
            <input
              type="text"
              placeholder="Utca, házszám"
              value={formData.address?.street || ""}
              onChange={(e) => updateAddressField('street', e.target.value)}
              required
              style={{ width: "100%", marginBottom: 8 }}
            />
            <input
              type="text"
              placeholder="Irányítószám"
              value={formData.address?.zipCode || ""}
              onChange={(e) => updateAddressField('zipCode', e.target.value)}
              required
              style={{ width: "100%", marginBottom: 8 }}
            />
            <input
              type="text"
              placeholder="Megye"
              value={formData.address?.state || ""}
              onChange={(e) => updateAddressField('state', e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          {error && (
            <div className="error" style={{ textAlign: "center", marginTop: 12, marginBottom: 0 }}>{error}</div>
          )}
          <button type="submit" style={{ width: "100%", marginTop: 18 }}>Regisztráció</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;