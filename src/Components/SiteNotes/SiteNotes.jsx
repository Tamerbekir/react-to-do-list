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
            A reminder that all your items are saved on your local device- that means the device youre saving your tasks on. If you remove your browser data or local data on your device you will lose your information.
            <br />
            <br />
            Feedback is always welcome!
            <br />
            <br />
            Reach out to me at www.tamerbekir.com
          </p>
          <button className="closeBtn" onClick={() => setSiteNotes(false)}>Close</button>
        </div>
      )
      }
    </div >
  )
}

export default SiteNotes