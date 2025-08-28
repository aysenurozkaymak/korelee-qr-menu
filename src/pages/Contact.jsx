export default function Contact(){
  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="surface">
          <h5 className="mb-3">İletişim</h5>
          <div className="d-grid gap-2">
            <a className="btn btn-primary" href="tel:+905551112233">
              <i className="bi bi-telephone me-2"></i>Telefon: +90 555 111 22 33
            </a>
            <a className="btn btn-success" href="https://wa.me/905551112233?text=Merhaba%20Korelee" target="_blank" rel="noreferrer">
              <i className="bi bi-whatsapp me-2"></i>WhatsApp’tan Yaz
            </a>
            <a className="btn btn-outline-light" target="_blank" rel="noreferrer"
               href="https://maps.google.com/?q=Kore%20Mutfa%C4%9F%C4%B1%20Cd.%20No:7%20Ankara">
              <i className="bi bi-geo-alt me-2"></i>Haritada Aç
            </a>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="surface">
          <h5 className="mb-3">Çalışma Saatleri</h5>
          <ul className="list-unstyled m-0 text-secondary">
            <li>Pzt–Cum: 11:00–23:30</li>
            <li>Cmt–Paz: 12:00–23:30</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
