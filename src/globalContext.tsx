import {createContext, useState, useEffect} from "react"

import { LinkDataType } from "./types"

type GlobalContextTypes = {
    formOverlay: boolean,
    addNewLink: (urlData: LinkDataType) => void,
    closeOverlay: () => void,
    linkData: LinkDataType[],
}

export const globalContext = createContext<GlobalContextTypes>({} as GlobalContextTypes)

function GlobalContextProvider(props: {children: React.ReactNode}) {
    
    const [formOverlay, setFormOverlay] = useState(false)
    const storedLinkData = localStorage.getItem("linkData");
    const parsedLinkData = storedLinkData ? JSON.parse(storedLinkData) : [];

    const [linkData, setLinkData] = useState<LinkDataType[]>(parsedLinkData);
    
    function addNewLink(urlData: LinkDataType) {
        setLinkData(prevData => [...prevData, urlData])
    }

    function closeOverlay() {
        setFormOverlay(false)
    }

    useEffect(() => {
        localStorage.setItem("linkData", JSON.stringify(linkData))

    }, [linkData])

    console.log(linkData)

    return (
       <globalContext.Provider value={{formOverlay, addNewLink, closeOverlay, linkData}}>
            {props.children}
        </globalContext.Provider>
    ) 
}

export {GlobalContextProvider}