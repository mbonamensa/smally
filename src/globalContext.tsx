import {createContext, useState} from "react"

type LinkDataType = {
    name: string,
    longUrl: string
}
type GlobalContextTypes = {
    formOverlay: boolean,
    addNewLink: (urlData: LinkDataType) => void,
    closeOverlay: () => void,
    linkData: LinkDataType[],
}

export const globalContext = createContext<GlobalContextTypes>({} as GlobalContextTypes)

function GlobalContextProvider(props: {children: React.ReactNode}) {
    
    const [formOverlay, setFormOverlay] = useState(false)
    const [linkData, setLinkData] = useState<LinkDataType[]>([])
    
    function addNewLink(urlData: LinkDataType) {
        setLinkData(prevData => [...prevData, urlData])
    }

    function closeOverlay() {
        setFormOverlay(false)
    }

    console.log(linkData)

    return (
       <globalContext.Provider value={{formOverlay, addNewLink, closeOverlay, linkData}}>
            {props.children}
        </globalContext.Provider>
    ) 
}

export {GlobalContextProvider}