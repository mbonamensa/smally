import {useContext} from "react"
import { format } from 'date-fns'
import {BsBoxArrowUp, BsTrash3, BsClipboard} from "react-icons/bs"
import { LinkDataType } from "../types"
import { globalContext } from '../globalContext'
import { RWebShare } from "react-web-share"
import QRCode from "qrcode.react";



function LinkCard({id, timestamp, name, longUrl, shortCode, shortUrl}: LinkDataType )  {

    const formattedTimestamp = format(timestamp, 'd/MM/y');
    const {copyToClipboard, deleteLink} = useContext(globalContext)

    const downloadQRCode = () => {
        const qrCode = document.getElementById("qr-code") as HTMLCanvasElement | null;
        if (!qrCode) {
            return;
        }
        const pngUrl = qrCode
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${shortCode}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    
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
                        <button title="copy QR-code" onClick={() => copyToClipboard(shortCode)} className="small-btn copy-btn"><BsClipboard /></button>
                        <RWebShare
                            data={{
                                url: shortUrl
                            }}
                        >
                            <button title="share QR-code" className="small-btn share-btn"><BsBoxArrowUp /></button>
                        </RWebShare>
                        <button title="delete QR-code" onClick={() => deleteLink(id)} className="small-btn delete-btn"><BsTrash3 /></button>
                    </div>
                    <button onClick={downloadQRCode} title="download QR-code" className="qr-code-container">
                        <QRCode id="qr-code" value={shortUrl} size={50} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default LinkCard