import { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { gql } from '@apollo/client';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

function AddOrder({ open, setOpen, onAdd }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      address: '',
      lat: '',
      lng: '',
    },
  });

  const onSubmit = (data) => {
    onAdd(data);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Order</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Enter your location"
                  fullWidth
                />
              )}
            />
            <Controller
              name="lat"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Selected Lat"
                  fullWidth
                />
              )}
            />
            <Controller
              name="lng"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Selected Lng"
                  fullWidth
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="success">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddOrder;
