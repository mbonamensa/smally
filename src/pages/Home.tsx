import Hero from '../components/Hero'
import NavBar from '../components/NavBar'


function Home() {
  return (
    <div className='home'>
      <div className="home-details">
        <NavBar />
        <Hero />
      </div>
    </div>
  )
}

export default Home