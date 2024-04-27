import LoadingGif from '../assets/loading.gif'
import Logo from './Logo'

function Loading() {
  return (
    <div className='loading-container'>
        <img src={LoadingGif} alt="Loading..." />
        <div className='logo'><span className="letter">e</span><span className="letter">y</span><span className="letter">e</span><span className="letter">s</span><span className="letter">o</span><span className="letter">m</span><span className="letter">e</span></div>
    </div>
  )
}

export default Loading