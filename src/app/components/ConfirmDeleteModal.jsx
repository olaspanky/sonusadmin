// components/ConfirmDeleteModal.js
import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', marginTop: '1%', width: '40%', borderRadius: '10px' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this user and all their data?
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button className="red" variant="outlined" color="warning" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
