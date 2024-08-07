import { useEffect, useState } from 'react';
import DeleteItem from '../../Components/DeleteItem/DeleteItem';
import EditItem from '../../Components/EditItem/EditItem';
import CompletedItem from '../../Components/CompletedItem/CompletedItem'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify'
import BadgeCount from '../../Components/Badge/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, Card } from 'react-bootstrap';






const ToDo = ({ handleTaskCountChange }) => {
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
  //set to false by default (should not show unless said otherwise)
  const [showOnlyEdit, setShowOnlyEdit] = useState(false)

  //props from the delete component where we use a useState to ONLY show the delete button when the user clicks on the delete button- edit and complete will not show
  const [showOnlyDelete, setShowOnlyDelete] = useState(false)

  //useState to open collapse text. Set to false/not open by default
  //useState for when the user decides to click the 'close' btn when not wanting to add to task. it close th inputs and shows add task again
  const [openAddTask, setOpenAddTask] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)




  const [taskOpen, setTaskOpen] = useState(false)
  const [showTask, setShowTask] = useState(false)



  // useState for setting the names and values needed for the toDo list
  const [toDoList, setToDoList] = useState({
    item: '',
    notes: '',
    date: '',
    priority: ''
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
      priority: ''
    })
  }

  // This function handles opening or closing a specific task based on the index.
  // It toggles the state of the task, ensuring only one task is affected at a time.
  const singleTaskIndex = (index) => {
    // Use the previous state (prev) to update the current state of setTaskOpen.
    // Spread the existing state to maintain other tasks states.
    setTaskOpen((prev) => ({
      // Spread the current state of task open/closed statuses.
      ...prev,
      // Toggle on or off at the state of the task at the given index.
      [index]: !prev[index]
    }))
  }

  // Function to handle the click event for a specific task.
  // It calls singleTaskIndex with the task's index to toggle its state.
  const handleTaskClick = (index) => {
    singleTaskIndex(index)
  }

  // Handling the function that creates the action once the 'add to list' button is clicked
  const handleToDoList = async () => {
    try {
      // conditional to ensure user puts in an item in their todo list
      if (toDoList.item === '') {
        //if left empty, user will get an alert
        toast.error('Looks like you forgot to add a task!', {
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
      } else {
        //other wise, success
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
        const updatedList = [...newItemAdded, toDoList];
        // Sort the array based on the priority, as it sorts through the items
        updatedList.sort((item1, item2) => item1.priority - item2.priority);
        // Update state with the sorted array
        setNewItemAdded(updatedList);
        //if the user is adding to their list, then the list cannot be empty, thus we set the emptyList useState to false and the user is displayed a message
        setEmptyList(false)

        //when adding a task, the task is not expanded thus set to false
        setShowTask(false)
      }
      // Clear the todo list after added. However, if the user does not choose a priority, 'no priority' will be displayed when adding. If the user picks a priority it will show that instead
      setToDoList({
        item: '',
        notes: '',
        date: '',
        priority: ''
      });
      handleTaskCountChange()
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
            {!showAddTask && (
              <button
                className='addNewTaskBtn'
                onClick={() => {
                  setOpenAddTask(true)
                  setShowAddTask(true)
                }}
                aria-controls="collapse-content"
                aria-expanded={openAddTask}
              >Add a new task</button>
            )}
            {/* When user clicks on button, bootstrap takes effect and it uses the useState 'open' and expands the text. useState takes effect for onclick to not open the text, making it close. */}
            {/* collapse opens when useState 'open' is in effect */}
            <Collapse in={openAddTask}>
              <div id="collapse-content">
                <Card>
                  <Card.Body>
                    <input
                      className="priorityInput"
                      placeholder='Priority...(e.g high, low or 1, 5, etc)'
                      name='priority'
                      type='text'
                      value={toDoList.priority}
                      onChange={handleToDoChange}
                    />
                    <input
                      className="ItemInput"
                      placeholder='Add task...'
                      name='item'
                      type='text'
                      value={toDoList.item}
                      onChange={handleToDoChange}
                    />
                    <input
                      className="notesInput"
                      placeholder='Notes...'
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
                      <button onClick={handleToDoList}>Add</button>
                      {/* useState for clearing the input fields */}
                      <button className='clearBtn' onClick={handleClearFields}>Clear</button>
                    </div>
                  </Card.Body>
                </Card>
                {/* When close btn is closes, Add Task shows back up and close btn closes */}
                <button className='taskCloseBtn'
                  onClick={() => {
                    setOpenAddTask(false)
                    setShowAddTask(false)
                  }}>Close</button>
              </div>
            </Collapse>
          </div>


          {/* Brought in as a prop, it gives the number of tasks in the array and displays it as a badge */}
          {!emptyList && (
            <>
              <p className='tasksLeftText'>Tasks Remaining</p>
              <BadgeCount tasksLeft={newItemAdded.length} />
            </>
          )}



          <div >
            {/* mapping over our items, giving it a name newItem and using the index at which it is located within the array */}
            {newItemAdded.map((newItem, index) => (
              <div className="listItem" key={index}>
                <button
                  className='viewTaskBtn'
                  onClick={() => {
                    handleTaskClick(index)
                    setShowTask(true)
                    showTask(true)
                  }}
                  aria-controls={`collapse-content-${index}`}
                  aria-expanded={taskOpen[index]}
                >
                  {newItem.item}
                </button>
                <Collapse in={taskOpen[index]}>
                  <div id="collapse-content">
                    <Card>
                      <Card.Body>
                        <div className="list">
                          <div className="priorityDiv">
                            <p className='inputPriorityText'>Priority</p>
                            <p className='priorityText'>{newItem.priority}</p>
                          </div>
                          {/* <div className="taskDiv">
                            <p className='inputTaskText'>Task</p>
                            <p className='toDoText'>{newItem.item}</p>
                          </div> */}
                          <div className="notesDiv">
                            <p className='inputNotesText'>Notes</p>
                            <p className='notesText'>{newItem.notes}</p>
                          </div>
                          {showTask && (
                            <div className="dateDivText">
                              <p className='inputDateText'>Due</p>
                              <p className='dateText'>{newItem.date}</p>
                            </div>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Collapse>
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
        </div>
      </div>
      {/* Once the list goes empty, the user will get this text. If the user adds to the list, it will clear */}
      {
        emptyList && (
          <p className='nothingLeftText'>Wow, you have nothing to do? Enjoy this sweet moment while it lasts.</p>
        )
      }
      <ToastContainer />
    </div >
  )
}

export default ToDo
