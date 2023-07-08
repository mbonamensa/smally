import LinkCard from "../components/LinkCard"
import AccountNavBar from "../components/AccountNavBar"
import {signOut, auth} from "../firebase"
import { useNavigate } from "react-router-dom"


import { useContext } from "react"
import { globalContext } from "../globalContext"
import ShortnerInput from "../components/ShortnerInput"
import InfoBox from "../components/CopiedInfoBox"

function Account()  {

  const {linkData, openOverlay, showInfoBox, handleInfoBoxClose} = useContext(globalContext)

  const navigate = useNavigate()

  function logOut() {
    signOut(auth);
    navigate("/");
    console.log("logged out")
  };

  const linkCards = linkData.map(card => {
   return <LinkCard
      key={card.id}
      id={card.id}
      timestamp={card.timestamp}
      name={card.name}
      longUrl={card.longUrl}
      shortCode={card.shortCode}
      shortUrl={card.shortUrl}
      totalClicks={card.totalClicks}
    />
  })

  return (
    <div className="account">
        <AccountNavBar logout={logOut}/>
        <div className="link-topic">
          <h2>Links</h2>
          <button onClick={openOverlay}>+ Add New</button>
        </div>
        <ShortnerInput />
        {linkCards}
        {showInfoBox && (
            <InfoBox message="Copied!" onClose={handleInfoBoxClose} />
        )}
    </div>
  )
}

export default Account