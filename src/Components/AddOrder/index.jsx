import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

import { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

function AddOrder({ open, setOpen, onAdd }) {
  const { t } = useTranslation();

  const mapContainer = useRef(null);
  const markerRef = useRef(null);

  const [map, setMap] = useState(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      address: "",
      lat: "",
      lng: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      if (!mapContainer.current) return;

      const newMap = new maplibregl.Map({
        container: mapContainer.current,

        style:
          "https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json",

        // JIZZAKH
        center: [67.8422, 40.1158],

        zoom: 12,
      });

      newMap.addControl(new maplibregl.NavigationControl(), "top-right");

      newMap.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        if (markerRef.current) {
          markerRef.current.remove();
        }

        const newMarker = new maplibregl.Marker({
          draggable: true,
          color: "#f97316",
        })
          .setLngLat([lng, lat])
          .addTo(newMap);

        newMarker.on("dragend", () => {
          const coords = newMarker.getLngLat();

          setValue("lat", coords.lat.toFixed(6));
          setValue("lng", coords.lng.toFixed(6));
        });

        markerRef.current = newMarker;

        setValue("lat", lat.toFixed(6));
        setValue("lng", lng.toFixed(6));
      });

      setMap(newMap);
    }, 100);

    return () => {
      clearTimeout(timer);

      if (markerRef.current) {
        markerRef.current.remove();
      }

      if (map) {
        map.remove();
      }

      markerRef.current = null;
      setMap(null);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);

    reset();

    if (markerRef.current) {
      markerRef.current.remove();
    }
  };

  const onSubmit = (data) => {
    onAdd(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "24px",
          pb: 1,
        }}
      >
        {t("addOrder")}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              mb: 2,
            }}
          >
            Buyurtma keladigan manzilni kiriting yoki xaritadan belgilang.
          </Typography>

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Manzil"
                fullWidth
                placeholder="Masalan: Jizzax shahri, Zargarlik ko‘chasi 12"
                sx={{ mb: 2 }}
              />
            )}
          />

          <Box
            sx={{
              overflow: "hidden",
              borderRadius: "18px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              ref={mapContainer}
              style={{
                width: "100%",
                height: "320px",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
            }}
          >
            <Controller
              name="lat"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Latitude" fullWidth disabled />
              )}
            />

            <Controller
              name="lng"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Longitude" fullWidth disabled />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose}>{t("cancel")}</Button>

          <Button
            startIcon={<AddIcon />}
            type="submit"
            variant="contained"
            color="success"
          >
            {t("add")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddOrder;
