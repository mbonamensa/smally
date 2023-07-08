import { useState, useContext, useRef } from "react"
import {BsXLg} from "react-icons/bs"

import { globalContext } from "../globalContext"
import { LinkDataType } from "../types"

type ValidationMessages = {
    name: { message: string; touched: boolean };
    longUrl: { message: string; touched: boolean };
}


function ShortnerInput() {
    const {addNewLink, formOverlay, closeOverlay, urlData, setUrlData} = useContext(globalContext)
    const nameRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);

    const [validationMessages, setValidationMessages] = useState<ValidationMessages>({
        name: { message: "", touched: false },
        longUrl: { message: "", touched: false },
      })
    console.log(urlData)

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        const { name, value } = e.currentTarget;
        setUrlData((prev: LinkDataType) => ({
          ...prev,
          [name]: value,
        }))
      
        validateField(name as keyof ValidationMessages, value);
        setValidationMessages((prev) => ({
            ...prev,
            [name]: { ...prev[name as keyof ValidationMessages], touched: true },
          }))

    }

    function validateField(name: keyof ValidationMessages, value: string) {
        let message = "";
        if (name === "name") {
        if (value.length < 4 || value.length > 10) {
            message = "Name should be between 4 and 10 characters";
        }
        } else if (name === "longUrl") {
        if (!isValidUrl(value)) {
            message = "Please enter a valid URL";
        }
        }

        setValidationMessages((prev) => ({
            ...prev,
            [name]: { ...prev[name], message },
        }))
    }

    function isValidUrl(url: string): boolean {
        const urlPattern = /^https?:\/\/\S+$/i;
        return urlPattern.test(url);
    }

  function validateForm(): boolean {
    const { name, longUrl } = urlData;

    const isNameValid = name.length >= 4 && name.length <= 10;
    const isUrlValid = isValidUrl(longUrl);

    return isNameValid && isUrlValid;
  }

    return (
        <>
        {formOverlay && 
            <div className="formOverlay">
                <button onClick={closeOverlay} className="close-btn"><BsXLg /></button>
                <div className="formBox">
                <h2>Add new</h2>
                    <div className="form-container" >
                        <div className="input-container">
                            <input 
                            onChange={handleChange} 
                            type="text"
                            name="name"
                            value={urlData.name} 
                            placeholder="Enter name here"
                            minLength={4}
                            ref={nameRef}
                            />

                            <p
                                className={`validation-message ${
                                validationMessages.name.touched ? "show" : ""
                                }`}
                            >
                                {validationMessages.name.message}
                            </p>

                        </div>
                        <div className="input-container">
                            <input 
                            onChange={handleChange} 
                            type="url"
                            name="longUrl"
                            value={urlData.longUrl} 
                            placeholder="Enter URL here"
                            ref={urlRef}
                            />
                            <p
                                className={`validation-message ${
                                validationMessages.longUrl.touched ? "show" : ""
                                }`}
                            >
                                {validationMessages.longUrl.message}
                            </p>
                        </div>
                        <button disabled={!validateForm()} onClick={()=> addNewLink(urlData)}>Shorten URL</button>
                    </div>
                </div>
            </div>
        }
        </>
        
    )
}

export default ShortnerInput