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
            Different colors for past, current or future dates and more!
            <br />
            Be on the lookout- updates are always rolling out!</p>
          <button className="closeBtn" onClick={() => setComingSoon(false)}>Close</button>
        </div>
      )
      }
    </div >
  )
}

export default ComingSoon