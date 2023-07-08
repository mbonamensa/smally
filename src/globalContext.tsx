import {createContext, useState, useEffect} from "react"
import axios from 'axios';

import { LinkDataType } from "./types"

type GlobalContextTypes = {
    formOverlay: boolean,
    addNewLink: (urlData: LinkDataType) => void,
    closeOverlay: () => void,
    linkData: LinkDataType[],
    setLinkData: (e: []) => void
}

// console.log(tinyurl)

export const globalContext = createContext<GlobalContextTypes>({} as GlobalContextTypes)

function GlobalContextProvider(props: {children: React.ReactNode}) {
    
    
    const [formOverlay, setFormOverlay] = useState(false)
    const storedLinkData = JSON.parse(localStorage.getItem("linkData") || "[]") || [];
    const linkDataWithTimestamp = storedLinkData.map((item: LinkDataType) => ({
    ...item,
    timestamp: new Date(item.timestamp),
    }));
    const [linkData, setLinkData] = useState<LinkDataType[]>(linkDataWithTimestamp);

    
    // function addNewLink(urlData: LinkDataType) {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios(
    //             `https://api.shrtco.de/v2/shorten?url=${urlData.longUrl}`
    //             );
                
    //             (response.data.result.full_short_link);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     setLinkData(prevData => [...prevData, urlData])
    // }


    async function addNewLink(urlData: LinkDataType) {
    try {
        const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${urlData.longUrl}`
        );
        
        const shortenedUrl = response.data.result.full_short_link
        const shortCode = response.data.result.short_link
        
        // Create a new URL object with the updated short URL
        const updatedUrlData: LinkDataType = {
        ...urlData,
        shortCode: shortCode,
        shortUrl: shortenedUrl
        };

        setLinkData((prevData) => [...prevData, updatedUrlData]);
    } catch (error) {
        console.log(error);
    }
    }


    function closeOverlay() {
        setFormOverlay(false)
    }

    useEffect(() => {

        // const fetchData = async () => {
        //     try {
        //         const response = await axios(
        //         `https://api.shrtco.de/v2/shorten?url=${userInput}`
        //         );
        //         setShortenedLink(response.data.result.full_short_link);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };
    })


    useEffect(() => {
        localStorage.setItem("linkData", JSON.stringify(linkData))

    }, [linkData])

    console.log(linkData)

    return (
       <globalContext.Provider value={{formOverlay, addNewLink, closeOverlay, setLinkData, linkData}}>
            {props.children}
        </globalContext.Provider>
    ) 
}

export {GlobalContextProvider}