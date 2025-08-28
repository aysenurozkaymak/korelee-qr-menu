import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Scanner(){
  const divId = "qr-reader";
  const readerRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const reader = new Html5Qrcode(divId);
    readerRef.current = reader;

    const start = async () => {
      try{
        await reader.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (text) => {
            try {
              const url = new URL(text);
              const parts = url.pathname.split("/");
              const rIdx = parts.findIndex(p => p === "r");
              if (rIdx !== -1 && parts[rIdx+1]) navigate(`/r/${parts[rIdx+1]}`);
              else window.location.href = text; // tam URL
            } catch {
              navigate(`/r/${text}`); // salt masa no
            }
          }
        );
      }catch(e){ setError(e.message || String(e)); }
    };
    start();

    return () => { try{ reader.stop(); reader.clear(); } catch(_){} }
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">QR Tara</h5>
        {error && <div className="alert alert-warning">{error}</div>}
        <div id={divId} className="w-100"></div>
        <p className="text-secondary small mt-2">Not: iPhone’da kamera için HTTPS gerekir (Vercel’de otomatik).</p>
      </div>
    </div>
  );
}
