import CheckIcon from '@mui/icons-material/Check';
import { IconButton, Tooltip } from '@mui/material';

const CompletedItem = ({ index, handleCompletedListItem }) => {
  const handleCompleted = () => {
    handleCompletedListItem(index);
  };

  return (
    <div>
      <Tooltip title='Complete'>
        <IconButton>
          <CheckIcon className='completedIcon' onClick={handleCompleted} />
        </IconButton>
      </Tooltip>
      {/* <button onClick={handleCompleted}>Completed</button> */}
    </div>
  );
};

export default CompletedItem;
