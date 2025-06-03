// src/components/Navbar.tsx
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on navigation
  React.useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav style={{
      background: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: "#b388ff" }}>
          <Link to="/" style={{ color: "#b388ff", textDecoration: "none" }}>BerAuto</Link>
        </div>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#1976d2",
          }}
          className="navbar-burger"
          aria-label="Menü"
        >
          ☰
        </button>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: 24,
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
          className={menuOpen ? "navbar-menu open" : "navbar-menu"}
        >
          <li><Link to="/cars">Autók</Link></li>
          <li><Link to="/rental-request">Kölcsönzési igény</Link></li>
          {isAuthenticated && user?.roles.includes("Customer") && (
            <>
              <li><Link to="/rentals">Bérléseim</Link></li>
              <li><Link to="/profile">Profil</Link></li>
            </>
          )}
          {isAuthenticated && user?.roles.includes("Admin") && (
            <li><Link to="/admin">Admin Panel</Link></li>
          )}
          {isAuthenticated && user?.roles.includes("Employee") && (
            <li><Link to="/employee">Alkalmazotti Panel</Link></li>
          )}
          <li>
            {isAuthenticated ? (
              <>
                <span style={{ color: "#fff", fontWeight: 500 }}>Üdv, {user?.name}!</span>
                <button onClick={logout} style={{ marginLeft: 10, background: "#d32f2f" }}>Kijelentkezés</button>
              </>
            ) : (
              <>
                <Link to="/login">Bejelentkezés</Link>
                <Link to="/register" style={{ marginLeft: 10 }}>Regisztráció</Link>
              </>
            )}
          </li>
        </ul>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .navbar-burger { display: block !important; }
          .navbar-menu {
            display: ${menuOpen ? "flex" : "none"};
            flex-direction: column;
            gap: 0;
            background: #fff;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100vw;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            padding: 16px 0;
          }
          .navbar-menu li {
            margin: 12px 0;
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;