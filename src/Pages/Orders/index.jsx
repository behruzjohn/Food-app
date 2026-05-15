import { useEffect, useState, useRef, useCallback } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Pagination,
  Container,
  CircularProgress,
} from "@mui/material";
import noOrder from "../../assets/noRd.png";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { MoreHoriz } from "@mui/icons-material";
import ToastExample from "../../Components/Toast";
import { formatPrice } from "../../helpers/formatters";
import AddOrder from "../../Components/AddOrder/index";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSearch from "../../Components/OrderSearch/index";
import { PaginationWrapper, StyleOrder } from "./StyleOrder";
import { useMutation, useQuery } from "@apollo/client/react";
import GuardComponent from "../../Components/CheckRole/CheckRole";
import HeaderDashborad from "../../Components/HeaderDashboard/index";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import BlenderOutlinedIcon from "@mui/icons-material/BlenderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import SelectOrderStatus from "./components/SelectOrderStatus";
import {
  CREATE_ORDER,
  GET_ORDER_BY_ID,
  GET_ORDER_FOR_ADMIN,
  UPDATE_ORDER_STATUS,
} from "./api";

const localToken = JSON.parse(localStorage.getItem("authStore")) || {};
const role = localToken?.state?.role;

const STATUS_ACTIONS = [
  { status: "pending", color: "#BA7517", Icon: PendingActionsOutlinedIcon },
  { status: "cooking", color: "#A32D2D", Icon: BlenderOutlinedIcon },
  { status: "delivering", color: "#185fa5", Icon: LocalShippingOutlinedIcon },
  { status: "received", color: "#3B6D11", Icon: TaskAltOutlinedIcon },
];

const CHIP_COLOR = {
  pending: "warning",
  cooking: "error",
  delivering: "info",
  received: "success",
};

// ── Reverse geocode helper ──
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=uz`,
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    const parts = [
      data.locality || data.city || data.principalSubdivision,
      data.countryName,
    ].filter(Boolean);

    return parts.join(", ") || "-";
  } catch (err) {
    console.error("Geocode error:", err);
    return "-";
  }
}

function OrdersPg() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(null);
  const [locations, setLocations] = useState({});
  const [locLoading, setLocLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOrderId, setMenuOrderId] = useState(null);
  const [openAddOrder, setOpenAddOrder] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  // fetchedIds — qayta fetch qilmaslik uchun
  const fetchedIds = useRef(new Set());

  const [addOrder, { loading, error }] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      role === "admin" ? getOrderForAdmin() : getOrderForUser();
      setOpenToast(true);
    },
  });

  const [updateStatus, { loading: loadUpdate }] =
    useMutation(UPDATE_ORDER_STATUS);

  const {
    data: orderData,
    refetch: getOrderForUser,
    loading: userLoading,
  } = useQuery(GET_ORDER_BY_ID, {
    variables: { page, limit: 10 },
  });

  const {
    data: orderDataAdmin,
    refetch: getOrderForAdmin,
    loading: adminLoading,
  } = useQuery(GET_ORDER_FOR_ADMIN, {
    variables: { statuses: status, page, limit: 10 },
    skip: role !== "admin",
  });

  // ── Set orders ──
  useEffect(() => {
    if (role === "admin") {
      if (orderDataAdmin?.getOrders?.payload) {
        setOrders(orderDataAdmin.getOrders.payload);
      }
    } else {
      if (orderData?.getOrdersByUserId?.payload) {
        setOrders(orderData.getOrdersByUserId.payload);
      }
    }
  }, [orderData, orderDataAdmin]);

  // ── Refetch on page change ──
  useEffect(() => {
    role === "admin" ? getOrderForAdmin() : getOrderForUser();
  }, [page]);

  // ── Open add order from navigation state ──
  useEffect(() => {
    if (location.state?.openAddOrder) setOpenAddOrder(true);
  }, [location.state]);

  // ── Fetch locations — faqat yangi orderlar uchun ──
  useEffect(() => {
    if (role !== "admin" || orders.length === 0) return;

    const newOrders = orders.filter(
      (o) => !fetchedIds.current.has(o._id) && o.address?.length === 2,
    );

    if (newOrders.length === 0) return;

    setLocLoading(true);

    Promise.all(
      newOrders.map(async (o) => {
        const [lat, lng] = o.address;
        const addr = await reverseGeocode(lat, lng);
        fetchedIds.current.add(o._id);
        return { id: o._id, addr };
      }),
    ).then((results) => {
      setLocations((prev) => {
        const next = { ...prev };
        results.forEach(({ id, addr }) => {
          next[id] = addr;
        });
        return next;
      });
      setLocLoading(false);
    });
  }, [orders]);

  // ── Handlers ──
  const handleClickStatus = async (s) => {
    if (!menuOrderId) return;
    try {
      await updateStatus({ variables: { orderId: menuOrderId, status: s } });
      setMenuOrderId(null);
      setAnchorEl(null);
      role === "admin"
        ? getOrderForAdmin({ variables: { page, limit: 10 } })
        : getOrderForUser({ variables: { page, limit: 10 } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrder = async (formData) => {
    try {
      await addOrder({
        variables: {
          order: { address: [Number(formData.lat), Number(formData.lng)] },
        },
      });
    } catch (err) {
      console.error(err);
      setOpenToast(true);
    }
  };

  const isLoading = role === "admin" ? adminLoading : userLoading;

  return (
    <HeaderDashborad>
      <AddOrder
        open={openAddOrder}
        setOpen={setOpenAddOrder}
        onAdd={handleAddOrder}
      />

      <StyleOrder>
        <Container maxWidth="xl" disableGutters>
          <div className="orders-nav">
            <OrderSearch action="category" />

            {/* Header */}
            <div className="main-header">
              <h2>
                {role === "admin" ? t("orderTitleAdmin") : t("orderTitle")}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {role === "admin" && (
                  <SelectOrderStatus status={status} setStatus={setStatus} />
                )}
                <GuardComponent role={role} section="order" action="addOrder">
                  <Button
                    startIcon={<AddIcon />}
                    color="success"
                    variant="contained"
                    onClick={() => navigate("/food-cart")}
                  >
                    {t("addOrder")}
                  </Button>
                </GuardComponent>
              </div>
            </div>

            {/* Table */}
            <div className="orders-list">
              <div className="orders-list-scroll">
                {isLoading || loadUpdate ? (
                  <div className="loading-wrap">
                    <CircularProgress size={40} />
                  </div>
                ) : orders.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>{t("orderId")}</th>
                        <th>{t("data")}</th>
                        {role === "admin" && <th>{t("customerName")}</th>}
                        {role === "admin" && (
                          <th>
                            {t("location")}
                            {locLoading && (
                              <CircularProgress
                                size={10}
                                style={{ marginLeft: 6, color: "#F97316" }}
                              />
                            )}
                          </th>
                        )}
                        <th>{t("amount")}</th>
                        <th>{t("statusOrder")}</th>
                        {role === "admin" && <th>{t("actions")}</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((orderItem, idx) => (
                        <tr
                          key={orderItem._id}
                          style={{
                            cursor: role === "admin" ? "pointer" : "default",
                          }}
                          onClick={() => {
                            if (role === "admin")
                              navigate(`/orderItems/${orderItem._id}`);
                          }}
                        >
                          <td>
                            <span className="order-id">#{idx + 1}</span>
                          </td>
                          <td>
                            <span className="order-date">
                              {orderItem.createdAt
                                ? new Date(
                                    orderItem.createdAt,
                                  ).toLocaleDateString("uz")
                                : "-"}
                            </span>
                          </td>
                          {role === "admin" && (
                            <td>
                              <span className="order-customer">
                                {orderItem?.createdBy?.name || "-"}
                              </span>
                            </td>
                          )}
                          {role === "admin" && (
                            <td className="location">
                              {locations[orderItem._id] ? (
                                <a
                                  href={`https://www.google.com/maps?q=${orderItem.address[0]},${orderItem.address[1]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    color: "#F97316",
                                    textDecoration: "none",
                                    fontSize: 13,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                  }}
                                >
                                  {locations[orderItem._id]}
                                </a>
                              ) : (
                                <span
                                  style={{ color: "#c8c4bc", fontSize: 12 }}
                                >
                                  Yuklanmoqda...
                                </span>
                              )}
                            </td>
                          )}
                          <td className="amount">
                            {formatPrice(orderItem?.totalPrice)}
                          </td>
                          <td>
                            <Chip
                              className="chip"
                              label={orderItem.status}
                              color={CHIP_COLOR[orderItem.status] || "default"}
                            />
                          </td>

                          {role === "admin" && (
                            <td onClick={(e) => e.stopPropagation()}>
                              <div
                                className="menu-btn"
                                onClick={(e) => {
                                  setMenuOrderId(orderItem._id);
                                  setAnchorEl(e.currentTarget);
                                }}
                              >
                                <MoreHoriz fontSize="small" />
                              </div>

                              <Menu
                                anchorEl={anchorEl}
                                open={menuOrderId === orderItem._id}
                                onClose={() => {
                                  setMenuOrderId(null);
                                  setAnchorEl(null);
                                }}
                                transformOrigin={{
                                  horizontal: "right",
                                  vertical: "top",
                                }}
                                anchorOrigin={{
                                  horizontal: "right",
                                  vertical: "bottom",
                                }}
                                PaperProps={{
                                  elevation: 0,
                                  sx: {
                                    minWidth: 180,
                                    border: "0.5px solid rgba(249,115,22,0.15)",
                                    borderRadius: "10px",
                                    boxShadow: "0 4px 16px rgba(26,25,22,0.08)",
                                    overflow: "hidden",
                                    "& .MuiMenuItem-root": {
                                      fontSize: 13,
                                      padding: "9px 14px",
                                      transition: "background 0.15s",
                                      "&:hover": { background: "#fff3ea" },
                                    },
                                  },
                                }}
                              >
                                {STATUS_ACTIONS.map(({ status: s, color }) => (
                                  <MenuItem
                                    key={s}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleClickStatus(s);
                                    }}
                                  >
                                    <ListItemIcon sx={{ minWidth: 28 }}>
                                      <Icon sx={{ fontSize: 16, color }} />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={t(s)}
                                      primaryTypographyProps={{
                                        fontSize: 13,
                                      }}
                                    />
                                  </MenuItem>
                                ))}
                              </Menu>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="defualtImage">
                    <img src={noOrder} alt="no orders" />
                    <p>Hali buyurtmalar yo'q</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {role === "admin" && !loading && !loadUpdate && (
              <PaginationWrapper>
                <Pagination
                  page={page}
                  onChange={(_, val) => setPage(val)}
                  count={orderDataAdmin?.getOrders?.totalPage}
                  shape="rounded"
                />
              </PaginationWrapper>
            )}
          </div>
        </Container>
      </StyleOrder>

      <ToastExample
        status={error?.message ? "error" : "success"}
        open={openToast}
        setOpen={setOpenToast}
        title={error?.message || t("orderAdded")}
      />
    </HeaderDashborad>
  );
}

export default OrdersPg;
