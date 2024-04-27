import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../db/products'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState([])
  const searchRef = useRef(null)
  const navigate = useNavigate()
  
  const searchedProducts = (value) => {
   const filteredProducts = products.filter((product) => value && product?.name?.toLowerCase().includes(value)
  )
  return setResults(filteredProducts)
  }

  const handleChange = (value) => {
      setInputValue(value)
      searchedProducts(value)
      console.log(inputValue)
      console.log(results)
  }

  const handleProductNav = (id) => {
    navigate(`/product/${id}`)
    setResults([])
    setInputValue('')
  }

  const handleSearchReset = () => {
    setResults([])
    setInputValue('')
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([])
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])
  
  return (
    <div className="search-bar" ref={searchRef}>
        <input type="text" className={`search-products ${inputValue.length > 0 && 'search-products-no-border-radius' }`} placeholder='Search Glasses' value={inputValue} onChange={(e) => handleChange(e.target.value)} />
        <span className='input-search-icon'>
          {inputValue.length > 0 && <button onClick={() => handleSearchReset()}>x</button>}
          <FaSearch />
        </span>
        <div className='search-results'>
          {results.map((searchedProduct) => (
            <div key={searchedProduct._id} onClick={() => handleProductNav(searchedProduct._id)} className='search-item-container'>

              <div className="search-item-img-name">
                <img src={searchedProduct.image} alt={searchedProduct.name} />
                <p>{searchedProduct.name}</p>
              </div>

              <div className="old-new-price">
                <h2>{`$${Math.round(searchedProduct.newPrice * 0.012)}`}</h2>
                <p>{`$${Math.round(searchedProduct.price * 0.012)}`}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default SearchBar