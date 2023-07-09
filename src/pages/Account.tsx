import LinkCard from "../components/LinkCard"
import AccountNavBar from "../components/AccountNavBar"
import {signOut, auth} from "../firebase"
import { useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { BounceLoader } from "react-spinners";

import { useContext, useEffect } from "react"
import { globalContext } from "../globalContext"
import ShortnerInput from "../components/ShortnerInput"
import InfoBox from "../components/CopiedInfoBox"

function Account()  {

  const {linkData, openOverlay, showInfoBox, handleInfoBoxClose} = useContext(globalContext)

  const navigate = useNavigate()

  function logOut() {
    signOut(auth);
    console.log("logged out")
  };

  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (loading) return
    if (!user) return navigate("/")
  }, [user, loading]);

  const linkCards = linkData.map(card => {
   return <LinkCard
      key={card.id}
      id={card.id}
      timestamp={card.timestamp}
      name={card.name}
      longUrl={card.longUrl}
      shortCode={card.shortCode}
      shortUrl={card.shortUrl}
      shareUrl={card.shareUrl}
      totalClicks={card.totalClicks}
    />
  })

  return (
    <>
    {loading ?  
      <div className="loader-container">
        <BounceLoader color="#008189" /> 
      </div> :
      (<div className="account">
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
      </div>) 
    }
    </>
  )
}

export default Account