import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import CustomTextField from "../../Atom/Textfield";
import CustomButton from "../../Atom/Button";

const EditDialog = ({ open, handleClose, rowData, handleSave }) => {
  const [editedData, setEditedData] = useState(rowData);

  useEffect(() => {
    setEditedData(rowData);
  }, [rowData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedData({ ...editedData, [id]: value });
  };

  const handleCancel = () => {
    handleClose();
    setEditedData(rowData);
  };

  const handleSaveChanges = () => {
    handleSave(editedData);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%", height: "100%" }}
    >
      <DialogTitle>Edit Entry</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextField
              id="author_names"
              label="Author"
              value={editedData.author_names || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="title"
              label="Title"
              value={editedData.title || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="first_publish_year"
              label="Year"
              value={editedData.first_publish_year || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="ratings_average"
              label="Ratings"
              value={editedData.ratings_average || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="subject"
              label="Subject"
              value={editedData.subject || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="author_birth_date"
              label="Birth Date"
              value={editedData.author_birth_date || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              id="author_top_work"
              label="Top Work"
              value={editedData.author_top_work || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton variant="outlined" onClick={handleCancel}>Cancel</CustomButton>
        <CustomButton variant="outlined" onClick={handleSaveChanges}>Save</CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
