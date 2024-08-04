import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@mui/material';

const CompletedItem = ({ index, handleCompletedListItem }) => {
  const handleCompleted = () => {
    handleCompletedListItem(index);
  };

  return (
    <div>
      <IconButton>
        <CheckIcon className='completedIcon' onClick={handleCompleted} />
      </IconButton>
      {/* <button onClick={handleCompleted}>Completed</button> */}
    </div>
  );
};

export default CompletedItem;
