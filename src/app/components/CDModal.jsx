import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ConfirmDeactivateModal = ({ open, onClose, onConfirm, isActive }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" component="h2">
          {isActive ? "Deactivate User" : "Activate User"}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to {isActive ? "activate" : "deactivate"} this user?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default ConfirmDeactivateModal;
