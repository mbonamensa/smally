import LinkCard from "../components/LinkCard"
import AccountNavBar from "../components/AccountNavBar"
import {signOut, auth} from "../firebase"
import {Link, Outlet, useNavigate } from "react-router-dom"


import { data } from "../dummyData"

function Account()  {

  const navigate = useNavigate()

  function logOut() {
    signOut(auth);
    navigate("/");
    console.log("logged out")
  };

  const linkCards = data.map(card => {
   return <LinkCard
      key={card.id}
      timestamp={card.timestamp}
      name={card.name}
      longURL={card.longURL}
      shortCode={card.shortCode}
      totalClicks={card.totalClicks}
    />
  })

  return (
    <div className="account">
        <AccountNavBar logout={logOut}/>
        <div className="link-topic">
          <h2>Links</h2>
          <Link to="/account/new-link">+ Add New</Link>
        </div>
        {linkCards}
        <Outlet />

    </div>
  )
}

export default Account