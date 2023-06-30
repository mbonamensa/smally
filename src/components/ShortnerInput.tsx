import { useState } from "react"


type ShortnerInputTypes = {
    handleClose: Function
}
function ShortnerInput({handleClose} : ShortnerInputTypes) {
    const [urlData, setInput] = useState({
        name: "",
        longURL: ""
    })
    console.log(urlData)
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="formOverlay">
            <h2>Add new</h2>
            <div className="formBox">
                <div >
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
                    name="longURL"
                    value={urlData.longURL} 
                    placeholder="Enter URL here"
                    />
                    <button>Shorten URL</button>
                    <button onClick={() => handleClose()}>close</button>
                </div>
            </div>
        </div>
    )
}

export default ShortnerInput