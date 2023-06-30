import Hero from '../components/Hero'
import NavBar from '../components/NavBar'
import ShortnerInput from '../components/ShortnerInput'
import UserForm from '../components/UserForm'

function Home() {
  return (
    <div className='home'>
      <div className="home-details">
        <NavBar />
        {/* <ShortnerInput /> */}
        {/* <UserForm /> */}
        <Hero />
      </div>
    </div>
  )
}

export default Home