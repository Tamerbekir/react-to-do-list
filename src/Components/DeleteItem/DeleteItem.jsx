import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

//passing through the index from the list item from the List jsx
//passing through the handleDeleteIntem to the List jsx to use with out DeleteItem component
const DeleteItem = ({ index, handleDeleteItem, showOnlyDelete, setShowOnlyDelete }) => {

  const [confirmDelete, setConfirmDelete] = useState(false)

  //a function for deleting the list item. From our prop, we use the index of the list item as a parameter
  const handleDelete = async () => {
    try {
      //deleting the index at which we click on
      handleDeleteItem(index)
      //confirm delete (cancel) is closed if user deletes item
      setConfirmDelete(false)
      //useState for hiding all buttons is false *buttons show again*
      setShowOnlyDelete(false)
    } catch (error) {
      console.log('there was a problem deleting your item', error)
    }
  }

  // a function that triggers when the user clicks on the delete icon (not the delete function)
  const deleteIcon = () => {
    //useState for only seeing the delete buttons will show
    setShowOnlyDelete(true)
    //useState for confirming delete button will show
    setConfirmDelete(true)
  }

  //function for canceling out a delete option
  const cancelDelete = () => {
    //useState for confirming delete is not shown
    setConfirmDelete(false)
    //useState for only showing the confirm delete / cancel option is not shown 
    setShowOnlyDelete(false)
  };

  return (
    <div>
      {!confirmDelete && !showOnlyDelete && (
        <Tooltip title="Delete">
          <IconButton onClick={deleteIcon}>
            <DeleteIcon className='deleteIcon' />
          </IconButton>
        </Tooltip>
      )}
      {confirmDelete && showOnlyDelete && (
        <div>
          <p>Are you sure you want to delete this?</p>
          <div className='confirmDeleteBtn'>
            <button className="confirmDelete" onClick={handleDelete}>Confirm Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default DeleteItem