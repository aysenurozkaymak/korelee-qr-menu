import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home(){
  const [tableId, setTableId] = useState("12");
  const nav = useNavigate();

  const goMenu = (e) => {
    e.preventDefault();
    if(!tableId.trim()) return;
    nav(`/r/${tableId.trim()}`);
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="p-4 rounded-4 bg-body-tertiary">
          <h1 className="h4 fw-bold mb-2">Korelee’ye hoş geldiniz</h1>
          <p className="text-secondary m-0">
            Masanızdaki karekodu okutabilir ya da masa numarasını girip menüyü açabilirsiniz.
          </p>
        </div>
      </div>

      {/* Hızlı Aksiyonlar */}
      <div className="col-12 col-md-4">
        <div className="card shadow-sm h-100">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">QR Tara</h5>
            <p className="text-secondary">Kamera ile karekod okuyun.</p>
            <Link to="/scan" className="btn btn-dark mt-auto">QR Tara</Link>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card shadow-sm h-100">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">QR Üret</h5>
            <p className="text-secondary">Masaya özel QR PNG indir.</p>
            <Link to="/admin/qr" className="btn btn-outline-dark mt-auto">QR Üret</Link>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card shadow-sm h-100">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">İletişim</h5>
            <p className="text-secondary">Rezervasyon ve konum.</p>
            <Link to="/contact" className="btn btn-outline-secondary mt-auto">İletişim</Link>
          </div>
        </div>
      </div>

      {/* Masa No → Menüyü Aç */}
      <div className="col-12">
        <form onSubmit={goMenu} className="card shadow-sm">
          <div className="card-body d-flex gap-2 flex-wrap">
            <label className="form-label m-0 me-2">Masa No:</label>
            <input
              className="form-control"
              style={{maxWidth:180}}
              value={tableId}
              onChange={e=>setTableId(e.target.value)}
              placeholder="örn: 12"
            />
            <button className="btn btn-primary">Menüyü Aç</button>
          </div>
        </form>
      </div>
    </div>
  );
}
