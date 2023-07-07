import format from "date-fns/format"
import {BsBarChart, BsBoxArrowUp, BsTrash3, BsClipboard} from "react-icons/bs"



type LinkCard = {
    // id: string,
    timestamp: Date, 
    name: string, 
    longURL: string,
    shortCode: string,
    totalClicks: number
}

function LinkCard({timestamp, name, longURL, shortCode, totalClicks}: LinkCard )  {
    // const createdAt = timestamp.toString()
  return (
    <>
        <div className="links">
            <div className="link-details">
                <h2>{name}</h2>
                <p className="timestamp">{format(timestamp, "d/MM/y")}</p>
                <p className="long-url">{longURL}</p>
                <p className="short-url-code">{window.location.host}/{shortCode}</p>
            </div>
            <div className="link-analytics">
                <div className="url-btns">
                    <button className="small-btn copy-btn"><BsClipboard /></button>
                    <button className="small-btn share-btn"><BsBoxArrowUp /></button>
                    <button className="small-btn delete-btn"><BsTrash3 /></button>
                </div>
                <p><BsBarChart />&nbsp;{totalClicks} clicks</p>
            </div>
        </div>
    </>
  )
}

export default LinkCard