import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { loadCart, saveCart } from "../utils/cartStorage";

const categories = [
  { id: "hot", label: "Hot Dishes",  icon: "bi-fire" },
  { id: "cold", label: "Cold Dishes", icon: "bi-snow" },
  { id: "soup", label: "Soup",        icon: "bi-cup-hot" },
  { id: "grill", label: "Grill",      icon: "bi-egg-fried" },
  { id: "dessert", label: "Dessert",  icon: "bi-cup-straw" }
];

const items = [
  { id:1,  cat:"hot",    name:"Spicy seasoned noodles", price:4.58, img:"https://images.unsplash.com/photo-1604908554033-8f2f43c8dfd1" },
  { id:2,  cat:"hot",    name:"Salted pasta with mushroom sauce", price:2.69, img:"https://images.unsplash.com/photo-1604909052743-8d69f5d6c76a" },
  { id:3,  cat:"hot",    name:"Beef dumpling in hot soup", price:3.20, img:"https://images.unsplash.com/photo-1544025162-d76694265947" },
  { id:4,  cat:"hot",    name:"Spicy instant noodle omelette", price:5.49, img:"https://images.unsplash.com/photo-1512058564366-18510be2db19" },
  { id:5,  cat:"dessert",name:"Hotteok", price:3.29, img:"https://images.unsplash.com/photo-1514517220038-90d59c2bb60e" },
  { id:6,  cat:"cold",   name:"Kongguksu (soy milk cold noodles)", price:4.10, img:"https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b" }
];

export default function Menu(){
  const { tableId } = useParams();
  const [active, setActive] = useState("hot");
  const [query, setQuery] = useState("");
const [cart, setCart] = useState(loadCart());


  const filtered = useMemo(() => {
    return items.filter(i => (active ? i.cat === active : true) &&
                             i.name.toLowerCase().includes(query.toLowerCase()));
  }, [active, query]);

  const total = useMemo(() => {
    return Object.entries(cart).reduce((sum,[id,qty]) => {
      const it = items.find(x => x.id === Number(id));
      return sum + (it ? it.price * qty : 0);
    }, 0);
  }, [cart]);


  const add = (id) => setCart(prev => {
  const next = {...prev, [id]: (prev[id]||0)+1};
  saveCart(next);
  return next;
});
const dec = (id) => setCart(prev => {
  const q = (prev[id]||0)-1; const n = {...prev};
  if(q<=0) delete n[id]; else n[id]=q;
  saveCart(n);
  return n;
});


  return (
    <div className="menu-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <button className="sbtn active" title="Menu"><i className="bi bi-grid"></i></button>
        <button className="sbtn" title="Orders"><i className="bi bi-receipt-cutoff"></i></button>
        <button className="sbtn" title="Favourites"><i className="bi bi-heart"></i></button>
        <button className="sbtn" title="Settings"><i className="bi bi-gear"></i></button>
      </aside>

      {/* İçerik */}
      <section>
        <div className="surface mb-3">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <div className="text-secondary small">Korelee • Masa #{tableId}</div>
              <h2 className="h4 m-0">Choose Dishes</h2>
            </div>
            <div className="input-group" style={{maxWidth:420}}>
              <span className="input-group-text bg-transparent border-0 text-secondary">
                <i className="bi bi-search"></i>
              </span>
              <input className="form-control bg-transparent border-0 text-light"
                     placeholder="Search for food, coffee, etc…"
                     value={query} onChange={e=>setQuery(e.target.value)} />
            </div>
          </div>

          <div className="d-flex gap-2 mt-3 flex-wrap">
            {categories.map(c=>(
              <div key={c.id}
                   onClick={()=>setActive(c.id)}
                   className={"tab-chip "+(active===c.id?"active":"")}>
                <i className={`bi ${c.icon} me-2`}></i>{c.label}
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="row g-3">
          {filtered.map(it=>(
            <div className="col-12 col-sm-6 col-lg-4" key={it.id}>
              <div className="card dark h-100">
                {it.img && <img src={it.img} className="card-img-top" alt={it.name}
                                 style={{height:160, objectFit:"cover"}}/>}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{it.name}</h5>
                  <div className="sub mb-2">Dine in • Bowl available</div>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="price">${it.price.toFixed(2)}</span>
                    <button className="btn btn-sm btn-outline-light"
                            onClick={()=>add(it.id)}>
                      <i className="bi bi-plus-lg me-1"></i>Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length===0 && (
            <div className="col-12"><div className="alert alert-secondary">Sonuç yok.</div></div>
          )}
        </div>
      </section>

      {/* Sepet / Orders */}
      <aside className="cart-panel">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="m-0">Orders <span className="text-secondary small">#{tableId}</span></h5>
          <div className="btn-group btn-group-sm" role="group" aria-label="dine">
            <button className="btn btn-outline-light active">Dine In</button>
            <button className="btn btn-outline-light">To Go</button>
            <button className="btn btn-outline-light">Delivery</button>
          </div>
        </div>

        <hr className="border-secondary"/>
<button className="btn btn-outline-secondary btn-sm"
        onClick={()=>{ saveCart({}); setCart({}); }}>
  Sepeti Temizle
</button>

        <div className="d-grid gap-2">
          {Object.keys(cart).length===0 && (
            <div className="text-secondary small">Sepet boş. Soldan ürün ekleyin.</div>
          )}
          {Object.entries(cart).map(([id,qty])=>{
            const it = items.find(x=>x.id===Number(id));
            if(!it) return null;
            return (
              <div key={id} className="cart-item">
                <div>
                  <div className="fw-semibold">{it.name}</div>
                  <div className="sub">${it.price.toFixed(2)}</div>
                </div>
                <div className="qtybox">
                  <button className="btn btn-sm btn-outline-light" onClick={()=>dec(it.id)}><i className="bi bi-dash-lg"></i></button>
                  <span>{qty}</span>
                  <button className="btn btn-sm btn-outline-light" onClick={()=>add(it.id)}><i className="bi bi-plus-lg"></i></button>
                </div>
                <div className="text-end fw-semibold">${(it.price*qty).toFixed(2)}</div>
              </div>
            );
          })}
        </div>

        <hr className="border-secondary"/>

        <div className="d-flex justify-content-between">
          <span className="text-secondary">Sub total</span>
          <span className="fw-semibold">${total.toFixed(2)}</span>
        </div>

        <button className="btn btn-accent w-100 mt-3">
          Continue to Payment
        </button>
      </aside>
    </div>
  );
}
