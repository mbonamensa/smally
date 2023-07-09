import {createContext, useState, useEffect} from "react"
import axios from 'axios';
import { nanoid } from "nanoid";

import { LinkDataType } from "./types"

type GlobalContextTypes = {
    formOverlay: boolean,
    linkData: LinkDataType[],
    urlData: LinkDataType,
    showInfoBox: boolean,
    handleInfoBoxClose: () => void,
    setUrlData: React.Dispatch<React.SetStateAction<LinkDataType>>,
    addNewLink: (urlData: LinkDataType) => void,
    closeOverlay: () => void,
    openOverlay: () => void,
    setLinkData: (e: []) => void,
    copyToClipboard: (e: string) => void,
    deleteLink: (e: string) => void
}

export const globalContext = createContext<GlobalContextTypes>({} as GlobalContextTypes)

function GlobalContextProvider(props: {children: React.ReactNode}) {
    
    
    const [formOverlay, setFormOverlay] = useState(false)
    const storedLinkData = JSON.parse(localStorage.getItem("linkData") || "[]") || [];
    const linkDataWithTimestamp = storedLinkData.map((item: LinkDataType) => ({
    ...item,
    timestamp: new Date(item.timestamp),
    }));
    const [linkData, setLinkData] = useState<LinkDataType[]>(linkDataWithTimestamp);

    const [urlData, setUrlData] = useState<LinkDataType>({
        name: "",
        longUrl: "",
        id: nanoid(),
        timestamp: new Date(), 
        shortCode: "",
        shortUrl: "",
        shareUrl: "",
        totalClicks: 0
    })

    const [showInfoBox, setShowInfoBox] = useState(false)

    async function addNewLink(urlData: LinkDataType) {
    try {
        const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${urlData.longUrl}`
        );
        
        const shortenedUrl = response.data.result.full_short_link
        const shortCode = response.data.result.short_link
        const shareUrl = response.data.result.share_link
        
        const updatedUrlData: LinkDataType = {
        ...urlData,
        shortCode: shortCode,
        shortUrl: shortenedUrl,
        shareUrl: shareUrl
        };

        setLinkData((prevData) => [...prevData, updatedUrlData]);
        } catch (error) {
            console.log(error);
        }

        setFormOverlay(false)
        setUrlData(prev => {
            return {
                ...prev,
                name: "",
                longUrl: "",
                id: nanoid(),
                timestamp: new Date(), 
                shortCode: "",
                shortUrl: "",
                totalClicks: 0
            }
        })
    }

    function copyToClipboard(text: string): void {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setShowInfoBox(true)
    }

    function handleInfoBoxClose() {
        setShowInfoBox(false);
    };
    
    function deleteLink(linkId: string): void {
        setLinkData((prevData) => prevData.filter((link) => link.id !== linkId));
    }

    function openOverlay() {
        setFormOverlay(true)
    }


    function closeOverlay() {
        setFormOverlay(false)
    }

    useEffect(() => {
        localStorage.setItem("linkData", JSON.stringify(linkData))

    }, [linkData])

    return (
       <globalContext.Provider value={{
        formOverlay, 
        linkData,
        urlData,
        showInfoBox,
        handleInfoBoxClose,
        setUrlData,
        addNewLink, 
        closeOverlay, 
        openOverlay,
        setLinkData, 
        copyToClipboard, 
        deleteLink
       }}
       >
            {props.children}
        </globalContext.Provider>
    ) 
}

export {GlobalContextProvider}