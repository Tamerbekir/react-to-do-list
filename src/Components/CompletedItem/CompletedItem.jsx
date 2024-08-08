import CheckIcon from '@mui/icons-material/Check';
import { IconButton, Tooltip } from '@mui/material';
import { Button } from 'react-bootstrap';

//props from List jsx
const CompletedItem = ({ index, handleCompletedListItem, completed }) => {
  const handleCompleted = () => {
    handleCompletedListItem(index);
  };

  //from props, we use completed from our function to work as a onClick where is the user completes the tech, they can unclick it by clicking the text, otherwise they get the check icon to complete it.
  return (
    <div>
      {completed && (
        <Tooltip title='Undo Complete'>
          <p
            className='completedText'
            onClick={(handleCompleted)}
          > Completed (click to undo )</p>
        </Tooltip>
      )}
      {!completed && (
        <Tooltip title='Complete'>
          <IconButton onClick={handleCompleted}>
            <CheckIcon className='completedIcon' />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default CompletedItem;
