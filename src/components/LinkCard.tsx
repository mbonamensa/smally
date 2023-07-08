import {useContext} from "react"
import { format } from 'date-fns';
import {BsBarChart, BsBoxArrowUp, BsTrash3, BsClipboard} from "react-icons/bs"
import { LinkDataType } from "../types"
import { globalContext } from '../globalContext';



function LinkCard({id, timestamp, name, longUrl, shortCode, shortUrl, totalClicks}: LinkDataType )  {

    const formattedTimestamp = format(timestamp, 'd/MM/y');
    const {copyToClipboard, deleteLink} = useContext(globalContext)

    
    return (
        <>
            <div className="links">
                <div className="link-details">
                    <h2>{name}</h2>
                    <p className="timestamp">{formattedTimestamp}</p>
                    <p className="long-url">{longUrl}</p>
                    <a href={shortUrl} className="short-url-code">{shortCode}</a>
                </div>
                <div className="link-analytics">
                    <div className="url-btns">
                        <button onClick={() => copyToClipboard(shortCode)} className="small-btn copy-btn"><BsClipboard /></button>
                        <button className="small-btn share-btn"><BsBoxArrowUp /></button>
                        <button onClick={() => deleteLink(id)} className="small-btn delete-btn"><BsTrash3 /></button>
                    </div>
                    <p><BsBarChart />&nbsp;{totalClicks} clicks</p>
                </div>
            </div>
        </>
    )
}

export default LinkCard