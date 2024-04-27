import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsArrowDownRight } from 'react-icons/bs'
import bannerImg from '../assets/bannerImg.png'
import TrendingProducts from '../components/TrendingProducts'

function Home() {
  const navigate = useNavigate()
  const categoriesRef = useRef(null)

  const scrollToCategories = () => {
    if(categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
    <div className="home-container">
      <section className="intro">
        <div className="left-intro">
          <div className="title">
            <h1>Glasses & Lens</h1>
          </div>
          <div className="description">
            <p>
            Buy the best high-quality sunglasses from us.
            <br/>
            More than 100 types of assortment.
            </p>
            <button onClick={() => navigate('/products')} className="start-shopping-btn">Start Shopping</button>
            <button onClick={scrollToCategories} className="explore-btn">Explore More <span><BsArrowDownRight /></span></button>
          </div>
        </div>
        <div className="right-intro">
          <div className="right-intro-img-container">
          <img src={bannerImg} alt="Cool Glasses" className='banner-img' />
          </div>
        </div>
      </section>
      <section className="product-showcase">
        <TrendingProducts />
      </section>
      <section ref={categoriesRef} className="categories">
        <h2>Categories</h2>
        <div className="categories-container">
          <div className="vision-category">
            <h1>Vision</h1>
          </div>
          <div className="sports-category">
            <h1>Sports</h1>
          </div>
          <div className="sunglasses-category">
            <h1>Sunglasses</h1>
          </div>
        </div>
      </section>
      
    </div>
        <footer className='home-footer'>
          <p>Created By Me</p>
        </footer>
    </div>
  )
}

export default Home