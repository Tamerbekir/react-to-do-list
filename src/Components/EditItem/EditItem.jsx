import { useState } from 'react';
import PropTypes from 'prop-types';

const EditItem = ({ index, newItemAdded, setNewItemAdded }) => {
  //useState that either cancels or conform the edit
  const [confirmEdit, setConfirmEdit] = useState(false);
  //useState that defines what the edit form consists of / data
  const [editForm, setEditForm] = useState({
    item: '',
    notes: '',
    date: '',
    priority: '',
  });

  // Show the edit form with the current item's data
  const showEditForm = () => {
    //show the item / index in the array 
    const itemToEdit = newItemAdded[index];
    //useState to show the form using the variable that defines the item at said index
    setEditForm(itemToEdit);
    //useState to show the edit button
    setConfirmEdit(true);
  };

  // Handling the change in the edit form input fields
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // Save the edited item
  const saveEditedItem = () => {
    //Variable to define the array of items / index in the array 
    const updatedList = [...newItemAdded];
    //The index will show within the edit form
    updatedList[index] = editForm;
    //useState to update array with variable defined above with new added information within the array
    setNewItemAdded(updatedList);
    //useState to then not show the edit button once editing
    setConfirmEdit(false);
  };

  // Cancel the edit
  const cancelEdit = () => {
    //useState to close edit form, once triggered it closes (false)
    setConfirmEdit(false);
  };

  return (
    <div>
      {!confirmEdit && (
        <button className='editBtn' onClick={showEditForm}>Edit</button>
      )}

      {confirmEdit && (
        <div className="editForm">
          <p className='editItem'>Edit your item..</p>
          <input
            className="editPriorityInput"
            placeholder='Priority..'
            name='priority'
            type='number'
            value={editForm.priority}
            onChange={handleEditFormChange}
          />
          <input
            className="editItemInput"
            placeholder='Edit your list..'
            name='item'
            type='text'
            value={editForm.item}
            onChange={handleEditFormChange}
          />
          <input
            className="editNotesInput"
            placeholder='Edit notes..'
            name='notes'
            type='text'
            value={editForm.notes}
            onChange={handleEditFormChange}
          />
          <input
            className="editDateInput"
            placeholder='date'
            name='date'
            type='date'
            value={editForm.date}
            onChange={handleEditFormChange}
          />
          <div>
            <button className='saveBtn' onClick={saveEditedItem}>Save Changes </button>
            <button onClick={cancelEdit}>Cancel Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

//proptypes to just ensure correct data is passed through
EditItem.propTypes = {
  index: PropTypes.number.isRequired,
  newItemAdded: PropTypes.array.isRequired,
  setNewItemAdded: PropTypes.func.isRequired,
};

export default EditItem;
