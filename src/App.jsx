import { Routes, Route, Link, NavLink } from "react-router-dom"; // 👈 Link/NavLink eklendi
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Scanner from "./pages/Scanner";
import AdminQR from "./pages/AdminQR";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Korelee</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="nav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/scan">QR Tara</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/qr">QR Üret</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">İletişim</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sayfalar */}
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/r/:tableId" element={<Menu />} />
          <Route path="/scan" element={<Scanner />} />
          <Route path="/admin/qr" element={<AdminQR />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container small d-flex flex-column flex-md-row justify-content-between gap-2">
          <span>© {new Date().getFullYear()} Korelee</span>
          <span>Adres: Kore Mutfağı Cd. No:7, Ankara</span>
          <span>
            Tel: <a className="link-light" href="tel:+905551112233">+90 555 111 22 33</a>
          </span>
        </div>
      </footer>
    </>
  );
}
