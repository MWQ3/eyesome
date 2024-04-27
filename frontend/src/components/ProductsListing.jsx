import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addRemoveFromCart } from '../features/cart/cartSlice';
import { addRemoveFromWishlist } from '../features/wishlist/wishlistSlice';
import { toast } from 'react-toastify'
import { FaStar } from "react-icons/fa"
import { FaPlus, FaMinus } from 'react-icons/fa'
import { BsBookmarkHeart } from 'react-icons/bs'
import { HiOutlineShoppingBag } from "react-icons/hi";

function ProductsListing({ product }) {
  const [disableBtn, setDisableBtn] = useState(false)
  const [itemQuantity, setItemQuantity] = useState(1)

  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { inCart } = useSelector((state) => state.cart)
  const { inWishlist } = useSelector((state) => state.wishlist)

  const currentPath = useLocation()

  const disableBtnAfterClick = () => {
    setDisableBtn(true)

        setTimeout(() => {
          setDisableBtn(false)
        }, 1000)
  }

  const isInCart = inCart?.some((item) => item._id === product._id)

  const isInWishlist = inWishlist?.some((item) => item._id === product._id)

  const handleCartClick = () => {
    if(user && (currentPath.pathname === '/wishlist' || currentPath.pathname === '/products' || currentPath.pathname === `/product/${product._id}`)) {
      if(!isInCart) {
        dispatch(addRemoveFromCart(product))
        toast.success('Product Added To Cart', {
          position: toast.POSITION.TOP_CENTER,
        })
        
        disableBtnAfterClick()
        
      } else {
        navigate('/cart')
        disableBtnAfterClick()
      }
    } else if(currentPath.pathname === '/cart') {
      dispatch(addRemoveFromCart(product))
      toast.warning('Product Removed From Cart', {
        position: toast.POSITION.TOP_CENTER,
      })

    } else if(!user) {
      navigate('/signin')
    }
  }
  
  const handleWishlistClick = () => {
    if(user) {
      dispatch(addRemoveFromWishlist(product))
      if(!isInWishlist) {
        toast.success('Product Added to Wishlist!', {
          position: toast.POSITION.TOP_CENTER,
        })

        disableBtnAfterClick()

      } else {
        toast.warning('Product Removed from Wishlist', {
          position: toast.POSITION.TOP_CENTER
        })

        disableBtnAfterClick()

      }
    } else if(!user) {
      navigate('/signin')
    }
  }

  const stars = Array.from({ length: 5 }, (_, index) => index < product.rating);

  return currentPath.pathname === '/wishlist' || currentPath.pathname === '/products' ? (
    <div className="products-card">
      <div onClick={() => navigate(`/product/${product._id}`)} className="card-img">
        <img src={product.image} height={200} width={200} alt={product.name} />
      </div>
      <div className="card-desc">
        <div className="card-product-desc">
          <div>
            <h2>{product.name}</h2>
            <p>4.5 <FaStar style={{marginBottom: '-2px'}} color="gold" /> <span>Rating</span></p>
            <p>{product.brand}</p>
          </div>
        <div className="old-new-price">
          <h2>{`$${Math.round(product.newPrice * 0.012)}`}</h2>
          <p>{`$${Math.round(product.price * 0.012)}`}</p>
        </div>
        </div>

        <div className="card-buttons">
          <button disabled={disableBtn} className='bag-icon' onClick={handleCartClick}><HiOutlineShoppingBag style={{marginBottom: '-2px'}} />{!isInCart ? 'Add to Bag' : 'Go to Bag' }</button>
          <button disabled={disableBtn} className='wishlist-icon' onClick={handleWishlistClick}><BsBookmarkHeart style={{marginBottom: '-2px', color: !isInWishlist ? 'inherit' : 'red'}} /></button>
        </div>
        
      </div>
    </div>
  ) : currentPath.pathname === '/cart' ? <>
    
      <div className="cart-item-container">
        <div className="cart-product-details">
          <div className="cart-img-container">
            <img src={product.image} width={110} alt={product.name} />
          </div>
          <div className="cart-product-control">
            <h3>{product.name}</h3>
            <div className="quantity">
              <span>Quantity: </span>
              <button onClick={() => setItemQuantity((prevState) => prevState > 1 ? prevState - 1 : prevState)}><FaMinus /></button>
              <span>{itemQuantity}</span>
              <button onClick={() => setItemQuantity((prevState) => prevState < product.quantity ? prevState + 1 : prevState)}><FaPlus /></button>
            </div>
            <div className="cart-buttons">
              <button disabled={disableBtn} className='bag-icon' onClick={handleCartClick}><HiOutlineShoppingBag style={{marginBottom: '-2px'}} /> Remove From Bag</button>
              <button disabled={disableBtn} className='wishlist-icon' onClick={handleWishlistClick}><BsBookmarkHeart style={{marginBottom: '-4px', color: !isInWishlist ? 'inherit' : 'red'}} /></button>
            </div>
          </div>
          <div className="cart-item-price">
            <p>{`$${Math.round(product.newPrice * 0.012)}`}</p>
            <p  className='old-price'>{`$${Math.round(product.price * 0.012)}`}</p>
          </div>
        </div>
      </div>
  </> : <>
  <div className="product-container">
      <section className="left-product-img">
        <img src={product.image} width={1000} alt={product.name} />
      </section>

      <section className="right-product-desc">
        <div className="product-name-desc-rating">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        {stars.map((isFilled, index) => (
          <FaStar style={{margin: '0 1.5px -3px 1.5px'}} key={index} color={isFilled ? 'gold' : 'gray'} />
        ))} <span>{`(${product.rating}) Rating`}</span>
        </div>
        <div className="about-product">
          <h2>About Product</h2>
          <div>
            <div className="brand-category">
              <p><span>Brand:</span> {product.brand}</p>
              <p><span>Category:</span> {product.category}</p>
            </div>
            <div className="gender-weight">
              <p><span>Gender:</span> {product.gender}</p>
              <p><span>Weight:</span> {product.weight}</p>
            </div>
          </div>
          <p>Price: <span className="new-price">{`$${Math.round(product.newPrice * 0.012)}`}</span> <span className="old-price">{`$${Math.round(product.price * 0.012)}`}</span></p>
          <button disabled={disableBtn} onClick={handleCartClick}><HiOutlineShoppingBag style={{marginBottom: '-2px'}} />{!isInCart ? 'Add to Bag' : 'Go to Bag'}</button>
          <button disabled={disableBtn} onClick={handleWishlistClick}><BsBookmarkHeart style={{marginBottom: '-2px'}} />{!isInWishlist ? 'Wishlist Item' : 'Remove From Wishlist'}</button>
        </div>
      </section>
      </div>
    </>
  

}

export default ProductsListing