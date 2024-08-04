import { useState } from 'react';
import DeleteItem from '../../Components/DeleteItem/DeleteItem';
import EditItem from '../../Components/EditItem/EditItem';
import CompletedItem from '../../Components/CompletedItem/CompletedItem'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify'


const ToDo = () => {
  // Adding a count for each time an item is added
  const [count, setCount] = useState(1);
  // useState for adding a new item which is being added to an array
  const [newItemAdded, setNewItemAdded] = useState([]);

  //useState for adding a confirm text once added to the list
  // const [addedText, setAddedText] = useState()

  //useState for setting text when deleted
  // const [deletedText, setDeletedText] = useState('')

  //useState for showing text when the user completed their list
  const [emptyList, setEmptyList] = useState()

  const [confirmDelete, setConfirmDelete] = useState()

  // const [completedText, setCompletedText] = useState()

  const [error, setError] = useState({
    item: '',
    date: '',
    priority: count
  })

  // useState for setting the names and values needed for the toDo list
  const [toDoList, setToDoList] = useState({
    item: '',
    notes: '',
    date: '',
    priority: count
  })

  // Handling the change in the input fields
  const handleToDoChange = (event) => {
    const { name, value } = event.target;
    setToDoList({
      ...toDoList,
      [name]: value
    });
  };

  // Function to handle clearing the fields but keeps the count
  const handleClearFields = () => {
    setToDoList({
      item: '',
      notes: '',
      date: '',
      priority: count,
    })
    //when the function is called, the text is also cleared 
    setAddedText('')
  }


  // Handling the function that creates the action once the 'add to list' button is clicked
  const handleToDoList = async () => {
    try {
      toast.success('Added!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      // Adding the new items so they can be displayed on the page
      setNewItemAdded([...newItemAdded, toDoList]);
      // Update the count
      setCount(count + 1);
      // Clear the todo list after added
      setToDoList({
        item: '',
        notes: '',
        date: '',
        priority: count + 1
      });
      //When a to-do is added, useState is called to display an open text field where text saying ADDED is displayed within the HTML
      // setAddedText(' ')
      // when a to-do is added, the deleted text is cleared via useState
      // setDeletedText(false)
      //if the user is adding to their list, then the list cannot be empty, thus we set the emptyList useState to false
      setEmptyList(false)
      //if user is adding to the list, the complete text is gone
      // setCompletedText(false)
    } catch (error) {
      console.log(error);
    }
  }


  // Handling the function to delete an item
  const handleDeleteItem = (index) => {
    //variable for updating the array, spreading the items in the array
    const updatedList = [...newItemAdded];
    //removing / splicing the index when we click the delete button (the ket is the index)
    updatedList.splice(index, 1);
    //update useState with the updated Array
    setNewItemAdded(updatedList);
    //when a to-do is deleted, useState is called with an empty text field which is used in the html
    // setDeletedText(' ')
    //if the updated list has a length of 0, then use the useState to display text found in the HTMl otherwise useState will not show
    //when deleting, complete text is removed
    // setCompletedText(false)
    if (updatedList.length === 0) {
      setEmptyList(true)
    }
    toast.error('Deleted!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  }

  // Function to handle marking an item as completed
  const handleCompletedListItem = (index) => {
    toast.success('Completed!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
    const updatedList = [...newItemAdded];
    //! Not supposed to be slice- will be added to local storage. Just for now
    updatedList.splice(index, 1);
    setNewItemAdded(updatedList);
    //when completing a to do, delete text is removed
    // setDeletedText(false)
    //useState for an empty text field used to inform the user the task is complete 
    // setCompletedText(' ')
  };

  return (
    <div className="toDoDiv">
      <div>
        <div>
          <div className='floatingAddingItem'>
            <p className='addToListTag'>Add to your list</p>
            <input
              className="priorityInput"
              placeholder='Priority..'
              name='priority'
              type='number'
              value={toDoList.priority}
              onChange={handleToDoChange}
            />
            <input
              className="ItemInput"
              placeholder='Add to list..'
              name='item'
              type='text'
              value={toDoList.item}
              onChange={handleToDoChange}
            />
            <input
              className="notesInput"
              placeholder='Notes..'
              name='notes'
              type='text'
              value={toDoList.notes}
              onChange={handleToDoChange}
            />
            <input
              className="dateInput"
              placeholder='date'
              name='date'
              type='date'
              value={toDoList.date}
              onChange={handleToDoChange}
            />
            {/* {addedText && (
              <p className='confirmAddedText'>Added!</p>
            )} */}
            <div className='addAndClearDiv'>
              {/* calling the function for adding an item */}
              <button onClick={handleToDoList}>Add To List</button>
              {/* useState for clearing the input fields */}
              <button className='clearBtn' onClick={handleClearFields}>Clear</button>
            </div>
          </div>
          <div>
            {/* mapping over our items, giving it a name newItem and using the index at which it is located within the array */}
            {newItemAdded.map((newItem, index) => (
              <div className="listItem" key={index}>
                <div className="list">
                  <p>Priority: {newItem.priority}</p>
                  <p>To Do: {newItem.item}</p>
                  <p>Notes: {newItem.notes}</p>
                  <p>Date: {newItem.date}</p>
                </div>
                {/* delete component, deletes the index and is passing through the delete item fro the delete component */}
                {/* Conditionally render based on completion status */}
                <div className='actionBtns'>
                  <CompletedItem
                    index={index}
                    handleCompletedListItem={handleCompletedListItem}
                  />
                  {/* <button onClick={handleCompletedListItem}> Completed
                  </button> */}
                  {/* edit component, edit the index and is passing through the edit item from the edit component */}
                  <EditItem
                    index={index}
                    newItemAdded={newItemAdded}
                    setNewItemAdded={setNewItemAdded}
                  />
                  <DeleteItem
                    index={index}
                    handleDeleteItem={handleDeleteItem}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* useState for deleted text appears here as well as a completed text */}
          {/* <div className='floatingActionText'>
            {completedText && (
              <p>Completed!</p>
            )}
            {deletedText && (
              <p className='deletedText'>Deleted!</p>
            )}
          </div> */}
        </div>
      </div>
      {/* Once the list goes empty, the user will get this text. If the user adds to the list, it will clear */}
      {emptyList && (
        <p className='nothingLeftText'>Wow, you have nothing to do? Enjoy this sweet moment while it lasts.</p>
      )}
      <ToastContainer />
    </div >
  )
}

export default ToDo
