import { products } from '../db/products'
import ProductsListing from '../components/ProductsListing';
import bannerHero from '../assets/bannerHero.jpg'


function Products() {

  

  return (
    <main className='all-products-main'>
      <div className='products-page-container'>
        <div className="products-bannerimg">
          <img src={bannerHero} alt="2 people wearing glasses" />
        </div>
        <h2>Glasses For You!</h2>
        <div className='all-products-container'>

          {products.map((product) => (
            <ProductsListing key={product._id} product={product} />
          ))}

        </div>
      </div>
    </main>
  )
}

export default Products