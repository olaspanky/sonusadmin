// import React from 'react';
// import { Modal, Box } from '@mui/material';
// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto';

// const SessionGraphModal = ({ open, onClose, dailySessions }) => {
//     console.log('Modal open:', open); // Log when the modal opens
//     console.log('Daily sessions data:', dailySessions); // Log the daily sessions data
  
//     const sessionGraphData = {
//       labels: dailySessions.map(session => session.date),
//       datasets: [
//         {
//           label: 'Time Spent (minutes)',
//           data: dailySessions.map(session => (session.timeSpent / 60).toFixed(2)), // Convert seconds to hours
//           fill: false,
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1
//         }
//       ]
//     };
  
//     return (
//       <Modal
//         open={open}
//         onClose={onClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', marginTop: '1%', width: '80%', borderRadius: '10px' }}>
//           <h3>Daily Sessions</h3>
//           <Line data={sessionGraphData} />
        
//         </Box>
//       </Modal>
//     );
//   };
  
// export default SessionGraphModal;
import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SessionGraphModal = ({ open, onClose, dailySessions, userName }) => {
  console.log('Modal open:', open); // Log when the modal opens
  console.log('Daily sessions data:', dailySessions); // Log the daily sessions data

  const [pageIndex, setPageIndex] = useState(0);

  const itemsPerPage = 7; // Number of days to display per page
  const totalPages = Math.ceil(dailySessions.length / itemsPerPage);

  const start = pageIndex * itemsPerPage;
  const end = start + itemsPerPage;
  const currentSessions = dailySessions.slice(start, end);

  const sessionGraphData = {
    labels: currentSessions.map(session => session.date),
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: currentSessions.map(session => (session.timeSpent / 60).toFixed(2)), // Convert seconds to minutes
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', marginTop: '1%', width: '80%', borderRadius: '10px' }}>
        <h3>Daily Sessions for {userName}</h3>
        <Line data={sessionGraphData} />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <IconButton onClick={handlePrevPage} disabled={pageIndex === 0}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={handleNextPage} disabled={pageIndex === totalPages - 1}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default SessionGraphModal;
