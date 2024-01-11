import axios from "axios";
import { useState, useEffect } from "react";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { ProductsShow } from "./ProductsShow";
import { Modal } from "./Modal"
import { Signup } from "./Signup"
import { Login } from "./Login"
import { LogoutLink } from "./Logout"
import { Routes, Route } from "react-router-dom";
import { CartedProductsIndex } from "./CartedProductsIndex"


export function Content() {
  const [products, setProducts]= useState([]);
  const [isProductShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleIndexCart = () => {
    console.log("handleCartIndex");
    axios.get("http://localhost:3000/cart.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };
  
  const handleIndexProducts = () => {
    console.log("handleIndexProducts");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };
  const handleCreateProduct = (params, successCallback) => {
    console.log("handleCreateProducts", params);
    axios.post("http://localhost:3000/products.json", params).then((response) => {
      setProducts([...products, response.data]);
      successCallback();
    });
  };

  const handleShowProduct = (product) => {
    console.log("handleShowProduct", product);
    setIsProductsShowVisible(true);
    setCurrentProduct(product);  
  };
  
  const handleUpdateProduct = (id, params, successCallback) => {
    console.log("handleUpdateProduct", params);
    axios.patch(`http://localhost:3000/products/${id}.json`, params).then((response) => {
      setProducts(
        products.map((product) => {
          if (product.id === response.data.id) {
            return response.data;
          } else {
            return product;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsProductsShowVisible(false)
  };

  const handleDestroyProduct = (product) => {
    console.log("handleDestroyProduct", product);
    axios.delete(`http://localhost:3000/product/${product.id}.json`).then((response) => {
      setProducts(products.filter((p) => p.id !== product.id));
      handleClose();
    });
  };


  useEffect(handleIndexProducts, []);
  // useEffect(handleIndexCart, []);

  return (
    <div>
    <div className="container"></div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={ <ProductsIndex products={products} onShowProduct={handleShowProduct}/>} />
        <Route path="/products" element={ <ProductsIndex products={products} onShowProduct={handleShowProduct}/>} />
        <Route path="/products/new" element={<ProductsNew onCreateProduct={handleCreateProduct}/>} />
        <Route path="/cart" element={ <CartedProductsIndex/>} />
      </Routes>
      
      <LogoutLink/>
      <Modal show={isProductShowVisible} onClose={handleClose}>
        <ProductsShow product={currentProduct} onUpdateProduct={handleUpdateProduct} onDestroyProduct={handleDestroyProduct}/>
      </Modal>
    </div>
  );
}