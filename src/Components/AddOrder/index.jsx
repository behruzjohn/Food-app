import { useState, useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import 'maplibre-gl/dist/maplibre-gl.css';

function AddOrder({ open, setOpen, onAdd }) {
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { address: '', lat: '', lng: '' },
  });
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (mapContainer.current && !map) {
      const initializeMap = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [69.240562, 41.311081],
        zoom: 10,
      });

      initializeMap.on('click', (e) => {
        const { lng, lat } = e.lngLat;

        if (marker) marker.remove();

        const newMarker = new maplibregl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(initializeMap);

        newMarker.on('dragend', () => {
          const { lng, lat } = newMarker.getLngLat();
          setValue('lat', lat.toFixed(6));
          setValue('lng', lng.toFixed(6));
        });

        setMarker(newMarker);

        setValue('lat', lat.toFixed(6));
        setValue('lng', lng.toFixed(6));
      });

      setMap(initializeMap);
    }
  }, [map]);

  const onSubmit = (data) => {
    onAdd(data);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    if (marker) marker.remove();
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="success">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddOrder;
