import axios from 'axios'

export function ProductsShow(props) {

  const addToCart = (event) => {
    console.log('adding to cart...')
    event.preventDefault();    
    const params = new FormData(event.target);    
    axios.post('http://localhost:3000/add_to_cart.json', params).then(response => {
      console.log(response.data)
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateProduct(props.product.id, params, () => event.target.reset());
  };

  const handleClick = () => {
    props.onDestroyProduct(props.product);
  };
  
  return (
    <div>
      <h1>Product information</h1>
      <p>id: {props.product.id}</p>
      <p>Name: {props.product.name}</p>
      <p>Price: {props.product.price}</p>
      <p>Description: {props.product.description}</p>
      <p>Supplier ID: {props.product.supplier_id}</p>
      <form onSubmit={addToCart}>
        <div>
          <input name="product_id" type="hidden" defaultValue={props.product.id}   />
        </div>
        <div>
          Quantity: <input name="quantity" type="text" />
        </div>
        <button type="submit">Add To Cart</button>

      </form>
      
      
      {/* <form onSubmit={handleSubmit}>
        <div>
          Name: <input defaultValue={props.product.name} name="name" type="text" />
        </div>
        <div>
          Price: <input defaultValue={props.product.price} name="price" type="decimal" />
        </div>
        <div>
          Description: <input defaultValue={props.product.description} name="description" type="text" />
        </div>
        <div>
          Supplier ID: <input defaultValue={props.product.supplier_id} name="supplier_id" type="integer" />
        </div>
        <button type="submit">Update Product</button>
      </form>
        <button onClick={handleClick}>Destroy Product</button> */}
    </div>
  );
}