
import { useState } from "react"
import LinkCard from "../components/LinkCard"
import NavBar from "../components/NavBar"
import ShortnerInput from "../components/ShortnerInput"

import { data } from "../dummyData"

function Account()  {

  const [formOverlay, setFormOverlay] = useState(false)

  function addNewLink() {
    setFormOverlay(true)
  }

  function closeOverlay() {
    setFormOverlay(false)
  }

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
        <NavBar />
        {formOverlay && <ShortnerInput handleClose={closeOverlay}/>}
        <div className="link-topic">
          <h2>Links</h2>
          <button onClick={addNewLink}>Add</button>
        </div>
        {linkCards}

    </div>
  )
}

export default Account