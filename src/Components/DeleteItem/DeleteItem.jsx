import { useState } from 'react'
import PropTypes from 'prop-types'

//passing through the index from the list item from the List jsx
//passing through the handleDeleteIntem to the List jsx to use with out DeleteItem component
const DeleteItem = ({ index, handleDeleteItem }) => {

  const [confirmDelete, setConfirmDelete] = useState(false)

  //a function for deleting the list item. From our prop, we use the index of the list item as a parameter
  const handleDelete = () => {
    handleDeleteItem(index)
    setConfirmDelete(false)
  }

  //creating a button to delete the item, using the handleDelete function
  return (
    <div>
      {!confirmDelete && (
        <button
          className="deleteItemBtn"
          onClick={() => setConfirmDelete(true)}> Delete</button>
      )}
      {confirmDelete && (
        <div>
          <p>Are you sure you want to delete this?</p>
          <button
            className="confirmDelete"
            onClick={handleDelete}>Confirm Delete</button>
          <button onClick={() => setConfirmDelete(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}

DeleteItem.propTypes = {
  index: PropTypes.string
}

DeleteItem.propTypes = {
  handleDeleteItem: PropTypes.string
}

export default DeleteItem