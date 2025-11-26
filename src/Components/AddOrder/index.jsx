import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { t } from 'i18next';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useState, useRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

function AddOrder({ open, setOpen, onAdd }) {
  const markerRef = useRef(null);
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: { address: '', lat: '', lng: '' },
  });

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      if (mapContainer.current) {
        const newMap = new maplibregl.Map({
          container: mapContainer.current,
          style: 'https://demotiles.maplibre.org/style.json',
          center: [69.240562, 41.311081],
          zoom: 10,
        });

        newMap.on('click', (e) => {
          const { lng, lat } = e.lngLat;

          if (markerRef.current) {
            markerRef.current.remove();
          }

          const newMarker = new maplibregl.Marker({ draggable: true })
            .setLngLat([lng, lat])
            .addTo(newMap);

          newMarker.on('dragend', () => {
            const { lng, lat } = newMarker.getLngLat();
            setValue('lat', lat.toFixed(6));
            setValue('lng', lng.toFixed(6));
          });

          markerRef.current = newMarker;

          setValue('lat', lat.toFixed(6));
          setValue('lng', lng.toFixed(6));
        });

        setMap(newMap);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      if (map) map.remove();
      setMap(null);
      markerRef.current = null;
    };
  }, [open]);

  const onSubmit = (data) => {
    onAdd(data);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    if (marker) marker.remove();
    setMarker(null);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Order</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Address"
                fullWidth
                margin="dense"
              />
            )}
          />
          <div
            ref={mapContainer}
            style={{
              width: '100%',
              height: '300px',
              margin: '12px 0',
              border: '1px solid #ccc',
            }}
          ></div>
          <Controller
            name="lat"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Latitude" fullWidth margin="dense" />
            )}
          />
          <Controller
            name="lng"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Longitude"
                fullWidth
                margin="dense"
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
  );
}

export default AddOrder;
