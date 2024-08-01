import React, { useEffect, useState } from "react";
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { setAllUserData, setError } from "../store/slice/dataSlice";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpdatePasswordModal from "./UPModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import SessionGraphModal from "./SessionGraphModal";
import Box from '@mui/material/Box';
import Loading from "./Loading2";
import Button from '@mui/material/Button';

const ErrorComponent = ({ message, onReload }) => (
  <div className="flex flex-col justify-center items-center w-full h-[50vh]">
    <p>Oops, sorry.</p>
    <p>{message}</p>
    <button className="bg-primary py-2 rounded-md px-3 text-white" onClick={onReload}>Reload</button>
  </div>
);

export default function DataTable() {
  const dispatch = useDispatch();
  const { allUserData, error } = useSelector((state) => state.alldata);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [sessionGraphModalOpen, setSessionGraphModalOpen] = useState(false);
  const [dailySessions, setDailySessions] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://vbackk.vercel.app/api/getAllUsers?appId=Sonos");
      const result = await response.json();
      
      if (result.success) {
        dispatch(setAllUserData(result.data));
      } else {
        dispatch(setError(result.message));
      }
    } catch (error) {
      dispatch(setError("An error occurred while fetching data."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleManageAccess = () => {
    // Implement manage access logic here
    handleMenuClose();
  };

  const handleUpdatePassword = () => {
    setPasswordModalOpen(true);
    handleMenuClose();
  };

  const handlePasswordSave = async (newPassword) => {
    try {
      const response = await fetch("/api/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.id, newPassword }),
      });
      const result = await response.json();
      if (result.success) {
        alert("Password updated successfully.");
      } else {
        alert("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
    setPasswordModalOpen(false);
    setSelectedUser(null); // Reset the selected user after saving
  };

  const handleDeleteUser = () => {
    setConfirmDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.id }),
      });
      const result = await response.json();
      if (result.success) {
        alert("User deleted successfully.");
        dispatch(setAllUserData(result.data)); // update the user data in the state
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
    setConfirmDeleteModalOpen(false);
    setSelectedUser(null); // Reset the selected user after deleting
  };

  const handleRowClick = (params) => {
    console.log('Row clicked:', params.row); // Log the clicked row data
  };

  const handleSeeDailySessions = (params) => {
    const user = params.row;
    setSelectedUser(user);
    setSelectedUserName(user.company); // Set the user's name (or email in this case)
    if (user.dailySessions && user.dailySessions.length > 0) {
      console.log('Daily sessions:', user.dailySessions); // Log the daily sessions data
      setDailySessions(user.dailySessions);
      setSessionGraphModalOpen(true);
    } else {
      console.log('No daily sessions found for this user.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center w-full h-[50vh]">
      <Loading/>
    </div>
  );

  if (error) return <ErrorComponent message={error} onReload={fetchData} />;

  const columns = [
    { field: "company", headerName: "Company", flex: 2, headerClassName: 'super-app-theme--header' },
    { field: "createdAt", headerName: "Date created", flex: 1, headerClassName: 'super-app-theme--header' },
    { field: "lastLogin", headerName: "Last Login", flex: 1, headerClassName: 'super-app-theme--header' },
    { field: "sessionDuration", headerName: "User Average time (hrs)", flex: 1, headerClassName: 'super-app-theme--header' },
    { field: "subscription", headerName: "Subscription Type", flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedUser && selectedUser.id === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleManageAccess}>Manage Access</MenuItem>
            <MenuItem onClick={handleUpdatePassword}>Update Password</MenuItem>
            <MenuItem onClick={handleDeleteUser}>Delete User</MenuItem>
            <MenuItem onClick={() => handleSeeDailySessions(params)}>See Daily Sessions</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "null";
  };

  const transformedData = allUserData.map(user => ({
    id: user._id,
    company: user.email,
    createdAt: formatDate(user.createdAt),
    lastLogin: user.lastLogin ? formatDate(user.lastLogin) : "user inactive",
    password: user.password,
    subscription: user.company,
    isLoggedIn: user.isLoggedIn,
    dailySessions: user.dailyTime,
    sessionDuration: (user.accumulatedTime / 3600).toFixed(2) // Convert to hours and round to 2 decimal places
  }));

  return (
    <div>
      <div style={{ height: "60vh", width: "100%" }}>
      <Box
      sx={{
        height: "100%",
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#36b4db',
          fontWeight: 'bolder',
          color: "white"
        },
      }}
    >
        <DataGrid
          rows={transformedData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={handleRowClick}
          componentsProps={{
            columnHeader: {
              style: {
                fontWeight: 'extrabold',
              }
            }
          }}
        />
        </Box>
        <UpdatePasswordModal
          open={passwordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onSave={handlePasswordSave}
        />
        <ConfirmDeleteModal
          open={confirmDeleteModalOpen}
          onClose={() => setConfirmDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
        <SessionGraphModal
          open={sessionGraphModalOpen}
          onClose={() => setSessionGraphModalOpen(false)}
          dailySessions={dailySessions}
          userName={selectedUserName} // Pass the user's name to the modal
        />
      </div>
    </div>
  );
}
