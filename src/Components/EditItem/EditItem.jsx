import { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const EditItem = ({ index, newItemAdded, setNewItemAdded }) => {
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    item: '',
    notes: '',
    date: '',
    priority: '',
  });

  const showEditForm = () => {
    const itemToEdit = newItemAdded[index];
    setEditForm(itemToEdit);
    setConfirmEdit(true);
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const saveEditedItem = async () => {
    try {
      const updatedList = [...newItemAdded];
      updatedList[index] = editForm;
      setNewItemAdded(updatedList);
      setConfirmEdit(false);
      toast.success('Changes saved!', {
        position: 'top-right',
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

  const cancelEdit = () => {
    setConfirmEdit(false);
  };

  return (
    <div className="editFormDiv">
      {!confirmEdit && (
        <button className="editBtn" onClick={showEditForm}>Edit</button>
      )}

      {confirmEdit && (
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
};

EditItem.propTypes = {
  index: PropTypes.number.isRequired,
  newItemAdded: PropTypes.array.isRequired,
  setNewItemAdded: PropTypes.func.isRequired,
};

export default EditItem;
