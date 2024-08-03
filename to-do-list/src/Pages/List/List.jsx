import { useState } from 'react';
import DeleteItem from '../../Components/DeleteItem/DeleteItem';
import EditItem from '../../Components/EditItem/EditItem';

const ToDo = () => {
  // Adding a count for each time an item is added
  const [count, setCount] = useState(1);

  // useState for setting the names and values needed for the toDo list
  const [toDoList, setToDoList] = useState({
    item: '',
    notes: '',
    date: '',
    priority: count
  });

  // useState for adding a new item which is being added to an array
  const [newItemAdded, setNewItemAdded] = useState([]);

  // Handling the change in the input fields
  const handleToDoChange = (event) => {
    const { name, value } = event.target;
    setToDoList({
      ...toDoList,
      [name]: value
    });
  };

  // Handling the function that creates the action once the 'add to list' button is clicked
  const handleToDoList = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  // Handling the function to delete an item
  const handleDeleteItem = (index) => {
    //variable for updating the array, spreading the items in the array
    const updatedList = [...newItemAdded];
    //removing / splicing the index when we click the delete button (the ket is the index)
    updatedList.splice(index, 1);
    //update useState with the updated Array
    setNewItemAdded(updatedList);
  };

  return (
    <div className="toDoDiv">
      <div>
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
        <button onClick={handleToDoList}>Add To List</button>

        <div>
          {newItemAdded.map((newItem, index) => (
            <div key={index}>
              <div className="list">
                <p>#: {newItem.priority}</p>
                <p>To Do: {newItem.item}</p>
                <p>Notes: {newItem.notes}</p>
                <p>Date: {newItem.date}</p>
              </div>
              <DeleteItem
                index={index}
                handleDeleteItem={handleDeleteItem}
              />
              <EditItem
                index={index}
                newItemAdded={newItemAdded}
                setNewItemAdded={setNewItemAdded}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
