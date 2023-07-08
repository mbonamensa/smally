import { useState, useContext } from "react"
import {BsXLg} from "react-icons/bs"

import { globalContext } from "../globalContext"
import { Link } from "react-router-dom"
import { nanoid } from "nanoid"


function ShortnerInput() {
    const {addNewLink} = useContext(globalContext)

    const [urlData, setUrlData] = useState({
        name: "",
        longUrl: "",
        id: nanoid(),
        timestamp: new Date(), 
        shortCode: "",
        totalClicks: 0
    })
    console.log(urlData)

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget
        setUrlData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="formOverlay">
            <button className="close-btn"><Link to="/account"><BsXLg /></Link></button>
            <div className="formBox">
            <h2>Add new</h2>
                <div className="form-container" >
                    <input 
                    onChange={handleChange} 
                    type="text"
                    name="name"
                    value={urlData.name} 
                    placeholder="Enter name here"
                    />
                    <input 
                    onChange={handleChange} 
                    type="text"
                    name="longUrl"
                    value={urlData.longUrl} 
                    placeholder="Enter URL here"
                    />
                    <button onClick={()=> addNewLink(urlData)}>Shorten URL</button>
                </div>
            </div>
        </div>
    )
}

export default ShortnerInput