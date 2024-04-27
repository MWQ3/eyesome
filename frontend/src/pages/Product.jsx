import { useParams } from "react-router-dom"
import { products } from "../db/products"
import ProductsListing from "../components/ProductsListing";

function Product() {
  const {productId} = useParams()

  const selectedProduct = products.find((product) => product._id === productId)

  const selectedProductArray = [selectedProduct]

  return (
    <main className="main-product-container">
      {selectedProductArray.map((product) => (
        <ProductsListing key={product._id} product={product} />
      ))}
    </main>
  )
}

export default Product