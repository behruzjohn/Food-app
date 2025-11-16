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
import { useTranslation } from 'react-i18next';
import 'maplibre-gl/dist/maplibre-gl.css';

function AddOrder({ open, setOpen, onAdd }) {
  const { t } = useTranslation();
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
        <DialogTitle>{t('AddOrderTitle')}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label={t('enterYourLocation')}
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
                  label={t('selectLat')}
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
                  label={t('selectLng')}
                  fullWidth
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('cancel')}</Button>
            <Button type="submit" variant="contained" color="success">
              {t('add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddOrder;
