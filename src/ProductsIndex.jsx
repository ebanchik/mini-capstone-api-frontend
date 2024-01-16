import { useState } from "react";

export function ProductsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div id="products-index">
      <h1>All products</h1>
      <p>Search filter: <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} /></p>
      <div className="row">
      {props.products.filter(
          product => product.name.toLowerCase()
          .includes(searchFilter.toLowerCase())
          )
          .map(product => (
        <div key={product.id} className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-header">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              {/* <img src={product.images[0].url} className="card-img-top" alt="..."/> */}
              <button className="btn btn-primary" onClick={() => props.onShowProduct(product)}>More info</button>            
            </div>
          </div>
        </div>
        ))}
    </div>
  </div>
  );
}

{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}
  
  {/* <div>
    <h1>All products</h1>
    {props.products.map((product) => (
      <div key={product.id}>
        <h2>{product.name}</h2>
        <img src={product.url} />
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
        <p>Supplier ID: {product.supplier_id}</p>
        <button onClick={() => props.onShowProduct(product)}>More info</button>
      </div>
    ))}
  </div>
); */}