import { useState } from "react"

import LinkCard from "../components/LinkCard"
import ShortnerInput from "../components/ShortnerInput"
import AccountNavBar from "../components/AccountNavBar"
import {signOut, auth} from "../firebase"
import {useNavigate } from "react-router-dom"


import { data } from "../dummyData"

function Account()  {

  const [formOverlay, setFormOverlay] = useState(false)
  const navigate = useNavigate()

  function addNewLink() {
    setFormOverlay(true)
  }

  function closeOverlay() {
    setFormOverlay(false)
  }

  function logOut() {
    signOut(auth);
    navigate("/");
    console.log("logged out")
  };

  // console.log(formOverlay)

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
        {formOverlay && <ShortnerInput handleClose={closeOverlay}/>}
        <div className="link-topic">
          <h2>Links</h2>
          <button onClick={addNewLink}>+ Add New</button>
        </div>
        {linkCards}

    </div>
  )
}

export default Account