import { Link } from "react-router-dom"
import { products } from "../db/products"
import { FaPlusSquare } from 'react-icons/fa'


function TrendingProducts() {

    const trendingProducts = products.filter(products => products.trending)

  return (
    <div className="intro-product-container">
          <div>
          <h2 style={{fontWeight: '400'}}>Trending Products</h2>
          </div>
          {trendingProducts.map((tProduct) => (
            <Link key={tProduct._id} style={{textDecoration: 'none', color: 'inherit'}} to={`product/${tProduct._id}`}>
            <div className="intro-products">
                <div className="product-description">
                  <div className="intro-name-price">
                  <h2>{tProduct.name}</h2>
                  <div>
                  <h3>{`$${Math.round(tProduct.price * 0.012)}`} <span><FaPlusSquare /></span></h3> 
                  <p>Sports</p>
                  </div>
                  </div>
                <div className="product-img-container">
                  <img src={tProduct.image} alt="Ardor Avaitor" />
                </div>
                </div>
            </div>    
            </Link> 
            ))}

        </div>
  )
}

export default TrendingProducts