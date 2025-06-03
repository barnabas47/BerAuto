import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProfile, updateAddress, getCurrentUserAddress } from "../api/user";
import { UserUpdateDto, AddressDto } from "../models";

const ProfilePage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState<UserUpdateDto>({
    name: "",
    email: "",
    phoneNumber: "",
    roleIds: [],
  });
  const [addressData, setAddressData] = useState<AddressDto>({
    id: 0, // Default ID for new addresses
    city: "",
    street: "",
    zipCode: "",
    state: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Initialize profileData with user data
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        roleIds: user.roles ? user.roles.map((role: any) => role.id) : [],
      });
      const fetchAddress = async () => {
        try {
          const address = await getCurrentUserAddress();
          setAddressData(address);
        } catch (err: any) {
          setError(err.response?.data || "Nincs tárolt cím, kérjük adja meg az adatokat.");
          // Keep default addressData if no address exists
        }
      };
      fetchAddress();
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await updateProfile(user.id, profileData);
        alert("Profil frissítve!");
      }
    } catch (err: any) {
      setError("Hiba a profil frissítésekor");
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await updateAddress(user.id, addressData);
        alert("Cím frissítve!");
      }
    } catch (err: any) {
      setError("Hiba a cím frissítésekor");
    }
  };

  return (
    <div style={{ padding: "32px 0", maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 32, fontSize: 28, fontWeight: 700, color: '#b388ff' }}>Profilom</h2>
      {error && <div className="error">{error}</div>}
      <div className="card">
        <form onSubmit={handleProfileSubmit}>
          <div className="profile-input-row" style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, minWidth: 90 }}>Név:</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              required
            />
          </div>
          <div className="profile-input-row" style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, minWidth: 90 }}>Email:</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
            />
          </div>
          <div className="profile-input-row" style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, minWidth: 90 }}>Telefonszám:</label>
            <input
              type="text"
              value={profileData.phoneNumber}
              onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
              required
            />
          </div>
          <button type="submit" style={{ width: "100%", marginTop: 18 }}>Profil mentése</button>
        </form>
      </div>
      <div className="card">
        <form onSubmit={handleAddressSubmit}>
          <div className="profile-input-row" style={{ marginBottom: 16, flexDirection: 'column' }}>
            <label style={{ fontWeight: 500, marginBottom: 8 }}>Cím:</label>
            <input
              type="text"
              placeholder="Város"
              value={addressData.city}
              onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Utca, házszám"
              value={addressData.street}
              onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Irányítószám"
              value={addressData.zipCode}
              onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Megye"
              value={addressData.state}
              onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
              required
            />
          </div>
          <button type="submit" style={{ width: "100%", marginTop: 18 }}>Cím mentése</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;