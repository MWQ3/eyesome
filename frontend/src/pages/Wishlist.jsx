import { useSelector } from 'react-redux'
import ProductsListing from '../components/ProductsListing'
import wishlistGif  from '../assets/empty-wish.gif'

function Wishlist() {
  const { inWishlist } = useSelector((state) => state.wishlist)

  return (
    <div className="wishlist-page-container">
      {inWishlist?.length === 0 ? 
        <div className='empty-wishlist-gif'>
          <img src={wishlistGif} alt="Nothing Added...." />
          <h2>NOTHING TO SHOW!</h2>
          <p>Unlock Your Shopping Desires: Fill Your Empty Wishlist</p>
        </div>
 
      : <> 
          <h2>Wishlist</h2>
          <div className='all-products-container'>
            {inWishlist.map((product) => (
            <ProductsListing key={product._id} product={product} />
      ))}
          </div>
      </>
    }
    </div>
  )
}

export default Wishlist