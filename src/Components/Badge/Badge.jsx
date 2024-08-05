import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useState } from 'react';


//boiler plate from material mui. Added prop to pass through to list jsx
const BadgeCount = ({ tasksLeft }) => {
  return (
    <div className='badgeIcon'>
      <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
        <Badge color="secondary" badgeContent={tasksLeft} max={999}>
        </Badge>
      </Stack>
    </div>
  );
}

export default BadgeCount;