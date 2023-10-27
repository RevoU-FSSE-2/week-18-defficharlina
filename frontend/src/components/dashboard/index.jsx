import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./dashboard.module.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { API_BASE_URL } from '../../pages/function'
//import { format, isDate } from 'date-fns';

function Dashboard({ OwnerName, urlApi }) {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    name: "",
    activity: "",
    priority: "",
    due_date: "",
    status: "",
  });
  const [editTaskData, setEditTaskData] = useState({
    name: "",
    activity: "",
    priority: "",
    due_date: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/tasks`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, [setData, API_BASE_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalEdit = (item) => {
    setIsModalEditOpen(true);
    setEditData(item);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTaskData({
      ...newTaskData,
      [name]: value,
    });
  };

  const handleInputChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditTaskData({
      ...editTaskData,
      [name]: value,
    });
  };

  const handleCreateTask = () => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/api/v1/tasks`, newTaskData)
      .then((response) => {
        setLoading(false);
        const newTask = response.data.data;
        setData([...data, newTask]);
        closeModal();
        fetchData();
      })
      .catch((error) => {
        closeModal();
        setLoading(false);
        console.error("Error creating task:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
      });
  };

  const handleEditTask = () => {
    axios
      .put(`${API_BASE_URL}/api/v1/tasks/${editData?._id}`, editTaskData)
      .then((response) => {
        const newTask = response.data.data;
        console.log(newTask);
        closeModalEdit();
        fetchData();
      })
      .catch((error) => {
        closeModalEdit();
        console.error("Error creating task:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
      });
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`${API_BASE_URL}/api/v1/tasks/${itemId}`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        Swal.fire({
          icon: "error",
          title: `Oops...`,
          html: `<b>[CODE] ${error.code}</b><br>Something went wrong!`,
        });
      });
  };

  if (error) return <div>Error While Fetching Data...</div>;

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    showAlert('success', 'Logout Successful', '');
    history.push('/login'); 
  };

  return (
    <div>
      <h1>
       My Tasks
      </h1>
      <h2>Endpoint : {API_BASE_URL}</h2>
      <Button variant="contained" color="primary" onClick={openModal}>
        Create Task
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        href="/login"
        onClick={handleLogout} 
      >
        Logout
      </Button>
      {data ? (
        data.map((item) => (
          <div key={item._id} className="task-item">
            { /*<div>ID: {item._id}</div>*/ }
            <div>Name: {item.name}</div>
            <div>Activity: {item.activity}</div>
            <div>Priority: {item.priority}</div>
            <div>Due Date: {item.due_date}</div>
            <div>Status: {item.status}</div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => openModalEdit(item)}
              style={{ margin: "10px" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </Button>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}

      {/* Add Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Create a New Task</h2>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={newTaskData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Activity"
            variant="outlined"
            name="activity"
            value={newTaskData.activity}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={newTaskData.priority}
            onChange={handleInputChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
          <TextField
            label="Due Date"
            variant="outlined"
            name="due_date"
            value={newTaskData.due_date}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={newTaskData.status}
              onChange={handleInputChange}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="On Progress">On Progress</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTask}
          >
            Create
          </Button>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isModalEditOpen} onClose={closeModalEdit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Edit Task</h2>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={editTaskData.name || editData?.name}
            onChange={handleInputChangeEdit}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Activity"
            variant="outlined"
            name="activity"
            value={editTaskData.activity || editData?.activity}
            onChange={handleInputChangeEdit}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={editTaskData.priority || editData?.priority}
              onChange={handleInputChangeEdit}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Due Date"
            variant="outlined"
            name="due_date"
            value={editTaskData.due_date || editData?.due_date}
            onChange={handleInputChangeEdit}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editTaskData.status || editData?.status}
              onChange={handleInputChangeEdit}
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="On Progress">On Progress</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleEditTask}>
            Edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  OwnerName: PropTypes.string.isRequired,
  urlApi: PropTypes.string.isRequired,
};
