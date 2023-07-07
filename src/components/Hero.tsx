import { Link } from "react-router-dom"

function Hero() {
  return (
    <div className='hero'>
        <div className="hero-text">
            <h1>Streamline Your Links, Elevate Your Reach</h1>
            <p>Unlock the hidden possibilities of maximizing your impact with each shortened link.</p>
            <Link to="/signup" className="start-now-btn">Start now</Link>
        </div>
        <div className="hero-img">
            <img src="www-pana.svg" alt="" />
        </div>
    </div>
  )
}

export default Hero