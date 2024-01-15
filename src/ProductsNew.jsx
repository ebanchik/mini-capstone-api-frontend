import axios from "axios"
import { useEffect, useState } from 'react'

export function ProductsNew(props) {
  const [suppliers, setSuppliers] = useState([])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateProduct(params, () => event.target.reset());
    console.log('creating product')
  };

  const productsIndex = () => {
    console.log('howdy partner')
    axios.get('http://localhost:3000/suppliers.json').then(response => {
      console.log(response.data);
      setSuppliers(response.data)
    })
  }

  useEffect(productsIndex, [])
  
  return (
    <div>
      <h1>New Product</h1>
      {suppliers.map(supplier => (
        <p key={supplier.id}>{supplier.name}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Price: <input name="price" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          <select name="supplier" id="cars">
            {suppliers.map(supplier => (
              <option>{supplier.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create product</button>
      </form>
    </div>
  );
}