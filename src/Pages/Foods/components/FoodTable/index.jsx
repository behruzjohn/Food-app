import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { formatPrice } from "../../../../helpers/formatters";
import { useTranslation } from "react-i18next";

function FoodTable({ food, handleClickDeleteFood, handleClickEditFood }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <tr>
      {/* Image */}
      <td>
        <img
          src={food?.image}
          alt={food?.name}
          style={{
            width: 44,
            height: 44,
            objectFit: "cover",
            borderRadius: 8,
            border: "0.5px solid #f0e8e0",
            display: "block",
          }}
        />
      </td>

      {/* Name */}
      <td>
        <span style={{ fontWeight: 500, color: "#1a1916", fontSize: 13 }}>
          {food?.name}
        </span>
      </td>

      {/* Description */}
      <td>
        <span style={{ color: "#9e9890", fontSize: 13, lineHeight: 1.5 }}>
          {food?.description?.slice(0, 60)}
          {food?.description?.length > 60 ? "..." : ""}
        </span>
      </td>

      {/* Category */}
      <td>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 10px",
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 500,
            background: "#fff3ea",
            color: "#F97316",
            border: "0.5px solid rgba(249,115,22,0.25)",
            whiteSpace: "nowrap",
          }}
        >
          {food?.category?.name}
        </span>
      </td>

      {/* Price */}
      <td>
        <span
          style={{
            fontWeight: 500,
            fontSize: 13,
            color: "#1a1916",
            whiteSpace: "nowrap",
          }}
        >
          {formatPrice(food?.price)} {t("price").replace(":", "")}
        </span>
      </td>

      {/* Actions */}
      <td className="actions">
        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{
            color: "#9e9890",
            borderRadius: "8px",
            "&:hover": { background: "#fff3ea", color: "#F97316" },
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            elevation: 0,
            sx: {
              minWidth: 160,
              border: "0.5px solid rgba(249,115,22,0.15)",
              borderRadius: "10px",
              boxShadow: "0 4px 16px rgba(26,25,22,0.08)",
              overflow: "hidden",
              "& .MuiMenuItem-root": {
                fontSize: 13,
                padding: "9px 14px",
                gap: 1,
                transition: "background 0.15s",
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClickEditFood(food?._id);
              handleClose();
            }}
            sx={{
              color: "#1a1916",
              "&:hover": { background: "#fff3ea", color: "#F97316" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <EditOutlinedIcon sx={{ fontSize: 16, color: "inherit" }} />
            </ListItemIcon>
            <ListItemText
              primary={t("edit")}
              primaryTypographyProps={{ fontSize: 13 }}
            />
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClickDeleteFood(food?._id);
              handleClose();
            }}
            sx={{
              color: "#E24B4A",
              borderTop: "0.5px solid #f4f1eb",
              "&:hover": { background: "#fff3ea" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 28 }}>
              <DeleteOutlineIcon sx={{ fontSize: 16, color: "#E24B4A" }} />
            </ListItemIcon>
            <ListItemText
              primary={t("delete")}
              primaryTypographyProps={{ fontSize: 13, color: "#E24B4A" }}
            />
          </MenuItem>
        </Menu>
      </td>
    </tr>
  );
}

export default FoodTable;
