import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const CompletedList = ({ }) => {


  const [savedItems, setSavedItems] = useState([])

  useEffect(() => {
    const storedItems = localStorage.getItem('toDoList')

    if (storedItems) {
      //pulling items from the local storage BUT only the items that are listed as completed as her handleCompletedListItem function. It maps through the stored items and only retrieves the completed items
      const completed = JSON.parse(storedItems).filter(item => item.completed);
      setSavedItems(completed)
    }
  }, [])


  return (
    <div>
      <h1>Completed Tasks</h1>
      {savedItems.map((item, index) => (
        <div key={index}>
          <p>{item.item}</p>
        </div>
      ))}
      <Link to='/'>
        <button className="backBtn">Back</button>
      </Link>
      {/* <button>Completed</button> */}
    </div>
  )
}

export default CompletedList