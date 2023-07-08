// import format from "date-fns/format"
import { format } from 'date-fns';
import {BsBarChart, BsBoxArrowUp, BsTrash3, BsClipboard} from "react-icons/bs"
import { LinkDataType } from "../types"



function LinkCard({timestamp, name, longUrl, shortCode, shortUrl, totalClicks}: LinkDataType )  {

    const formattedTimestamp = format(timestamp, 'd/MM/y');
    
  return (
    <>
        <div className="links">
            <div className="link-details">
                <h2>{name}</h2>
                {/* <p className="timestamp">{timestamp}</p> */}
                <p className="timestamp">{formattedTimestamp}</p>
                <p className="long-url">{longUrl}</p>
                <a href={shortUrl} className="short-url-code">{shortCode}</a>
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