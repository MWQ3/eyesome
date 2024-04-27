import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductsListing from '../components/ProductsListing';
import emptyBag from '../assets/empty-shopping-bag.png'

function Cart() {

  const { inCart } = useSelector((state) => state.cart)

  const total = inCart?.reduce((acc, product) => (
    acc + (product.newPrice * 0.012)
  ), 0)

  return (
    <div className="cart-page-container">
      
      {inCart?.length === 0 ?
        <div className='empty-cart-container'>
          <img width={140} src={emptyBag} alt='Nothing Added....' />
          <h2>Hey, This feels light!</h2>
          <p>Your bag is empty. Add some items</p>
          <Link to='/products'>
          <button className='bag-icon'>Explore</button>
          </Link>
        </div>
      
        : <>
        <h2>Bag({inCart?.length})</h2>
        <div className="product-checkout-grid-container">

          <div className="cart-product">
            {inCart?.map((product) => (
              <ProductsListing key={product._id} product={product} />
            ))}
          </div>

          <div className="cart-checkout-container">
            <h2>Price Details</h2>

            {inCart?.map((productPrice) => (
              <div key={productPrice._id} className="cart-item-quan-price">
                <p>{productPrice.name} (1)item</p>
                <p>{`$${Math.round(productPrice.newPrice * 0.012)}`}</p>
              </div>
            ))}

            <hr />
            <div className="cart-total">
              <p>Total</p>
              <p>${total.toFixed(0)}</p>
            </div>
            <button className="bag-icon checkout-btn">Proceed to Checkout</button>
          </div>

        </div>
        </>
     }
   </div>
  )
}

export default Cart