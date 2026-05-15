import { CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_ORDER_ITEMS } from "../../api";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client/react";
import { StyleOrderItem } from "./StyleOrderItem";
import { formatPrice } from "../../../../helpers/formatters";
import OrderSearch from "../../../../Components/OrderSearch";
import HeaderDashborad from "../../../../Components/HeaderDashboard";
import FavouriteCard from "../../../FavouritePage/pages/FavouriteCard";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

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
  } catch {
    return "-";
  }
}

const STATUS_MAP = {
  pending: { label: "Kutilmoqda", cls: "pending" },
  cooking: { label: "Tayyorlanmoqda", cls: "cooking" },
  delivering: { label: "Yetkazilmoqda", cls: "delivering" },
  received: { label: "Qabul qilindi", cls: "received" },
};

function OrderItem() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [locationText, setLocationText] = useState("");

  const { data, loading } = useQuery(GET_ORDER_ITEMS, {
    variables: { orderId: id },
  });

  const order = data?.getOrderById?.payload;
  const orderItems = order?.orderItems || [];
  const status = order?.status;
  const statusInfo = STATUS_MAP[status] || { label: status, cls: "" };

  const mapsUrl =
    order?.address?.length === 2
      ? `https://www.google.com/maps?q=${order.address[0]},${order.address[1]}`
      : null;

  useEffect(() => {
    if (!order?.address || order.address.length !== 2) return;
    const [lat, lng] = order.address;
    reverseGeocode(lat, lng).then(setLocationText);
  }, [order]);

  return (
    <HeaderDashborad>
      <Container maxWidth="xl" disableGutters>
        <StyleOrderItem>
          <div className="orderItems-nav">
            <OrderSearch action="category" />

            <div className="category-nav">
              {/* ── Info card ── */}
              <div className="info-card">
                {/* Top stripe */}
                <div className="info-card-header">
                  <div className="info-card-title">
                    <ReceiptOutlinedIcon />
                    Buyurtma tafsiloti
                  </div>
                  {status && (
                    <span className={`status-badge ${statusInfo.cls}`}>
                      {statusInfo.label}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="info-card-body">
                  <div className="order-meta">
                    <h2 className="order-title">{t("orderProduct")}</h2>

                    {/* Location */}
                    {locationText ? (
                      <div className="location-row">
                        <LocationOnOutlinedIcon />
                        {mapsUrl ? (
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {locationText}
                          </a>
                        ) : (
                          <span>{locationText}</span>
                        )}
                      </div>
                    ) : order?.address ? (
                      <div className="location-row">
                        <LocationOnOutlinedIcon />
                        <span style={{ color: "#c8c4bc" }}>
                          Manzil yuklanmoqda...
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Total */}
                  {order?.totalPrice != null && (
                    <div className="total-box">
                      <span className="total-label">Jami summa</span>
                      <div className="total-price">
                        {formatPrice(order.totalPrice)}
                        <span>so'm</span>
                      </div>
                      <span className="total-items">
                        {orderItems.length} ta mahsulot
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Products ── */}
              <div className="section-header">
                <h3>
                  <ShoppingBagOutlinedIcon
                    sx={{
                      fontSize: 16,
                      verticalAlign: -2,
                      mr: 0.5,
                      color: "#F97316",
                    }}
                  />
                  Mahsulotlar
                </h3>
                <span>{orderItems.length} ta</span>
              </div>

              {loading ? (
                <div className="loading-wrap">
                  <CircularProgress size={40} />
                </div>
              ) : orderItems.length === 0 ? (
                <div className="empty-state">
                  Buyurtma mahsulotlari topilmadi
                </div>
              ) : (
                <div className="card">
                  {orderItems.map((item) => (
                    <FavouriteCard
                      key={item?.id}
                      food={item?.food}
                      user={item?.user}
                      quantity={item?.quantity}
                      isOrderItem={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </StyleOrderItem>
      </Container>
    </HeaderDashborad>
  );
}

export default OrderItem;
