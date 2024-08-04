import { useState } from "react"

const ComingSoon = () => {

  const [comingSoon, setComingSoon] = useState()

  return (
    <div>
      {!comingSoon && (
        <div className="comingSoonBtn">
          <button onClick={() => setComingSoon(true)}>See what's coming soon!</button>
        </div>
      )}
      {comingSoon && (
        <div className="comingSoonDiv">
          <p className="comingText">
            Here are just a few things coming to your simple to-do list.
            <br />
            <br />
            See all items that were completed.
            <br />
            Saving to local storage.
            <br />
            Priority listed in order - and more!</p>
          <button className="closeBtn" onClick={() => setComingSoon(false)}>Close</button>
        </div>
      )
      }
    </div >
  )
}

export default ComingSoon