import { useEffect, useState } from 'react';
import DeleteItem from '../../Components/DeleteItem/DeleteItem';
import EditItem from '../../Components/EditItem/EditItem';
import CompletedItem from '../../Components/CompletedItem/CompletedItem'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify'


const ToDo = () => {
  // Adding a count for each time an item is added
  const [count, setCount] = useState(1);
  // useState for adding a new item which is being added to an array
  const [newItemAdded, setNewItemAdded] = useState(() => {
    // Taking the newly added item and adding into local storage, called "toDoList"
    const storedItems = localStorage.getItem('toDoList');
    //if there are stored items, then parse them and return the values
    if (storedItems) {
      return JSON.parse(storedItems)
      // if there is nothing in local store return an empty array
    } else {
      return []
    }
  });

  // useEffect for saving the current state of the to-do list to localStorage
  // Whenever the 'newItemAdded' state changes, the to-do list is converted to a JSON string
  // and saved under the key 'toDoList' in localStorage.
  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(newItemAdded));
  }, [newItemAdded])

  //useState for showing text when the user completed their list
  const [emptyList, setEmptyList] = useState()


  //props from the edit component where we use a useState to ONLY show the edit form when the user clicks on the edit button- delete and complete will not show
  const [showOnlyEdit, setShowOnlyEdit] = useState()

  //props from the delete component where we use a useState to ONLY show the delete button when the user clicks on the delete button- edit and complete will not show
  const [showOnlyDelete, setShowOnlyDelete] = useState()

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
      // Clear the todo list after added but keep adding a +1 to the counter (priority)
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
  const handleDeleteItem = async (index) => {
    try {//variable for updating the array, spreading the items in the array
      const updatedList = [...newItemAdded];
      //removing / splicing the index when we click the delete button (the ket is the index)
      updatedList.splice(index, 1);
      //update useState with the updated Array
      setNewItemAdded(updatedList);
      //if the updated list has a length of 0, then use the useState to display text found in the HTMl otherwise useState will not show
      //when deleting, complete text is removed
      // setCompletedText(false)
      if (updatedList.length === 0) {
        setEmptyList(true)
      }
      //deleted message
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
    } catch (error) {
      toast.warning('There was an issue deleting your item, please try again later', {
        position: 'bottom-right',
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
    //update the useState with the new array
    setNewItemAdded(updatedList)
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
                <div className='actionBtns'>
                  {/* edit component, edit the index and is passing through the edit item from the edit component. Complete button has a closed useState/goes away when user is either editing or deleting*/}
                  {!showOnlyEdit && !showOnlyDelete && (
                    <CompletedItem
                      className="completedIcon"
                      index={index}
                      handleCompletedListItem={handleCompletedListItem}
                    />
                  )}
                  {/* edit button goes away when the delete button is clicked */}
                  {!showOnlyDelete && (
                    <EditItem
                      className="editIcon"
                      index={index}
                      newItemAdded={newItemAdded}
                      setNewItemAdded={setNewItemAdded}
                      showOnlyEdit={showOnlyEdit}
                      setShowOnlyEdit={setShowOnlyEdit}
                    />
                  )}
                  {/* delete button is closed /goes away when the user chooses to edit an item */}
                  {!showOnlyEdit && (
                    <DeleteItem
                      className="deletedIcon"
                      index={index}
                      handleDeleteItem={handleDeleteItem}
                      setShowOnlyDelete={setShowOnlyDelete}
                      showOnlyDelete={showOnlyDelete}
                    />
                  )}
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
