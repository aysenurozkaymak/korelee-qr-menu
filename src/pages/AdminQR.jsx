import { useMemo, useState } from "react";
import QRCode from "qrcode";

const BASE = typeof window !== "undefined" ? window.location.origin : "https://korelee.vercel.app";

export default function AdminQR(){
  const [tableId, setTableId] = useState("12");
  const url = useMemo(() => `${BASE}/r/${tableId}`, [tableId]);
  const [dataUrl, setDataUrl] = useState("");

  const generate = async () => {
    const png = await QRCode.toDataURL(url, { width: 360, margin: 2 });
    setDataUrl(png);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">QR Üret – Masa Linki</h5>
        <div className="d-flex gap-2 flex-wrap">
          <input className="form-control" value={tableId} onChange={e=>setTableId(e.target.value)} placeholder="ör: 12" />
          <button className="btn btn-dark" onClick={generate}>Oluştur</button>
        </div>
        <p className="mt-2 small text-secondary">Hedef URL: <code>{url}</code></p>

        {dataUrl && (
          <div className="mt-3">
            <img src={dataUrl} alt="QR" className="border rounded-3 p-2 bg-white"/>
            <div className="mt-2">
              <a className="btn btn-outline-primary" download={`korelee-masa-${tableId}.png`} href={dataUrl}>
                PNG indir
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
