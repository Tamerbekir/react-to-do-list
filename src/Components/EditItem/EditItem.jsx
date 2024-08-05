import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, Bounce } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';



//passing through props from List jsx
const EditItem = ({ index, newItemAdded, setNewItemAdded, showOnlyEdit, setShowOnlyEdit }) => {

  //useState to confirm if the user wants to save their changes. If false, useState is not active by default and does not show edit form
  const [confirmEdit, setConfirmEdit] = useState(false);


  //edit form useState that takes in inputs
  const [editForm, setEditForm] = useState({
    item: '',
    notes: '',
    date: '',
    priority: '',
  });

  //a function to trigger the edit form
  const showEditForm = () => {
    //a variable that sets the index to be edited
    const itemToEdit = newItemAdded[index];
    //then we run the useState to show the edit form, using the index of the item we clicked on
    setEditForm(itemToEdit);
    //then we run the useState to show the confirm options- "save or cancel"
    setConfirmEdit(true);
  };

  //Handling the input fields
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  //function for saving the item we made changes to
  const saveEditedItem = async () => {
    try {
      // Adding the new items so they can be displayed on the page
      const updatedList = [...newItemAdded];
      //we take the array of added items and add that to our setEdit form
      updatedList[index] = editForm;
      // the new item is added to the array using our useState
      setNewItemAdded(updatedList);
      // Sort the array based on the priority, as it sorts through the items
      updatedList.sort((item1, item2) => item1.priority - item2.priority);
      //useState for canceling the edit is not closes
      setConfirmEdit(false);
      //useState for nONLY showing the edit form is now closed (delete and complete buttons return)
      setShowOnlyEdit(false)
      // run a success message
      toast.success('Changes saved!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } catch (error) {
      //if item is not saved, run error message
      toast.error('There was a problem saving your changes. Please try again later', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      console.log('there was an error saving changes', error);
    }
  };

  //a function that takes in multiple useStates
  const cancelEdit = () => {
    //closes out 'cancel' save option
    setConfirmEdit(false);
    //closes out option to only show edit form (delete and complete options now return)
    setShowOnlyEdit(false)
  };



  return (
    <div className="editFormDiv">
      {!confirmEdit && !showOnlyEdit && (
        <Tooltip title="Edit">
          <IconButton onClick={() => setShowOnlyEdit(true)}>
            <EditIcon className='editIcon' onClick={showEditForm} />
          </IconButton>
        </Tooltip>
      )}


      {confirmEdit && showOnlyEdit && (
        <div className="editForm">
          <p className="editItem">Edit your item..</p>
          <input
            className="editPriorityInput"
            placeholder="Priority.."
            name="priority"
            type="number"
            value={editForm.priority}
            onChange={handleEditFormChange}
          />
          <input
            className="editItemInput"
            placeholder="Edit your list.."
            name="item"
            type="text"
            value={editForm.item}
            onChange={handleEditFormChange}
          />
          <input
            className="editNotesInput"
            placeholder="Edit notes.."
            name="notes"
            type="text"
            value={editForm.notes}
            onChange={handleEditFormChange}
          />
          <input
            className="editDateInput"
            placeholder="date"
            name="date"
            type="date"
            value={editForm.date}
            onChange={handleEditFormChange}
          />
          <div className="actionBtns">
            <button className="saveBtn" onClick={saveEditedItem}>Save Changes</button>
            <button onClick={cancelEdit}>Cancel Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}




export default EditItem;
