import { useState, useEffect, useRef } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import Logo from './Logo'
import defaultUser from '../assets/defaultUser.png'
import { BsBookmarkHeart } from 'react-icons/bs'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { FaBars } from 'react-icons/fa'


function Header() {
  const [addHeaderShadow, setAddHeaderShadow] = useState(false)
  const currentPath = useLocation()
  const navigate = useNavigate()
  const {inCart} = useSelector((state) => state.cart)
  const {inWishlist} = useSelector((state) => state.wishlist)

  const dropdownBtnRef = useRef()

  const handleToggleDropdownBox = () => {
    dropdownBtnRef.current.classList.toggle('toggle-dropdown')
  }

  const handleDropdownOutsideBox = (e) => {
    if(!e.target.classList.contains('dropdown-btn')) {
      dropdownBtnRef.current.classList?.remove('toggle-dropdown')
    }
  }

  const addShadowOnScroll = () => {
    if(window.scrollY >= 80) {
      setAddHeaderShadow(true)
    } else {
      setAddHeaderShadow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDropdownOutsideBox)

    return () => {
      document.removeEventListener('click', handleDropdownOutsideBox)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', addShadowOnScroll)

    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])


  return currentPath.pathname === '/signin' || currentPath.pathname === '/signup' ? <></> : (
    <div className='main-header-container'>
    <div className={`header ${addHeaderShadow && 'b-shadow'}`}>
        <div className="profile-logo-container">
          <Link to='profile'>
            <img className='profile-img' src={defaultUser} alt="Profile"  />
            </Link>
            <Logo />
        </div>
        
        <SearchBar />

        <div className='header-icons-container'>
           <button onClick={() => navigate('/products')} className='explore-products-btn'>Explore</button>
           <button onClick={() => navigate('/products')} className='hidden-explore-icon'>
           <MdOutlineExplore style={{marginBottom: '-2px'}} />
           </button>
            
           <button onClick={handleToggleDropdownBox} className='dropdown-btn'><FaBars /></button>
           
           <div ref={dropdownBtnRef} className='dropdown-box'>
           <ul>
           <li onClick={() => navigate('/wishlist')}><BsBookmarkHeart style={{margin: '0 1rem -5px 0', fontSize: '1.1rem'}} />Wishlist</li>
           <li onClick={() => navigate('/cart')}><HiOutlineShoppingBag style={{margin: '0 1rem -5px 0', fontSize: '1.1rem'}} />Bag</li>
           </ul>
            </div> 

           <ul className='icons-ul hide-ul-icons'>
           <li><BsBookmarkHeart onClick={() => navigate('/wishlist')} />{inWishlist.length > 0 && <div>{inWishlist.length}</div>}</li>
           <li><HiOutlineShoppingBag onClick={() => navigate('/cart')} />{inCart.length > 0 && <div>{inCart.length}</div>}</li>
           </ul>
        </div>
    </div>
    </div>
  )
}

export default Header