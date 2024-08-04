import { useState } from "react"

const SiteNotes = () => {

  const [siteNotes, setSiteNotes] = useState()

  return (
    <div>
      {!siteNotes && (
        <div className="siteNotesBtn">
          <button onClick={() => setSiteNotes(true)}>Developer Notes</button>
        </div>
      )}
      {siteNotes && (
        <div className="siteNotesDiv">
          <p className="siteNotesText">
            A reminder that all your items are saved on your local machine. If you remove your browser data, or use another device you will no longer have access to your information.
          </p>
          <button className="closeBtn" onClick={() => setSiteNotes(false)}>Close</button>
        </div>
      )
      }
    </div >
  )
}

export default SiteNotes