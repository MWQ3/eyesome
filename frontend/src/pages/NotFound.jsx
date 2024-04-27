import notFound from '../assets/404-error.gif'

function NotFound() {
  return (
    <div className='not-found-page-container'>
        <div className="not-found-gif">
            <img src={notFound} alt="404 ERROR" />
        </div>
        <h2>NOTHING HERE!!</h2>
    </div>
  )
}

export default NotFound