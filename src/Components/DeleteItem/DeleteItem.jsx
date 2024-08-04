import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
//passing through the index from the list item from the List jsx
//passing through the handleDeleteIntem to the List jsx to use with out DeleteItem component
const DeleteItem = ({ index, handleDeleteItem }) => {

  const [confirmDelete, setConfirmDelete] = useState(false)

  //a function for deleting the list item. From our prop, we use the index of the list item as a parameter
  const handleDelete = async () => {
    try {
      handleDeleteItem(index)
      setConfirmDelete(false)
    } catch (error) {
      toast.error('There was an issue deleting your item, please try again later', {
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
      console.log('there was a problem deleting your item', error)
    }
  }

  //creating a button to delete the item, using the handleDelete function
  return (
    <div>
      {!confirmDelete && (
        // <button
        //   className="deleteItemBtn"
        //   onClick={() => setConfirmDelete(true)}> Delete</button>
        <IconButton>
          <DeleteIcon className='deleteIcon' onClick={() => setConfirmDelete(true)} />
        </IconButton>
      )}
      {confirmDelete && (
        <div>
          <p>Are you sure you want to delete this?</p>
          <div className='confirmDeleteBtn'>
            <button
              className="confirmDelete"
              onClick={handleDelete}>Confirm Delete</button>
            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}


export default DeleteItem