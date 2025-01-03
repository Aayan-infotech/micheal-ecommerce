// src/components/SessionTimeoutDialog.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // or any UI library you're using
import { useNavigate } from 'react-router-dom';

const SessionTimeoutDialog = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    handleClose();
    navigate('/login');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Session Timeout</DialogTitle>
      <DialogContent>
        <p>Your login session has expired. Please login again to continue.</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogout} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionTimeoutDialog;
