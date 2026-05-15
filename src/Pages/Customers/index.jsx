import { useEffect, useState } from "react";
import { Chip, Container } from "@mui/material";
import OrderSearch from "../../Components/OrderSearch/index";
import { useLazyQuery } from "@apollo/client/react";
import HeaderDashborad from "../../Components/HeaderDashboard/index";
import CheckToken from "../../Components/CheckToken";
import { useTranslation } from "react-i18next";
import { GET_USERS } from "./api";
import { StyleCustomers } from "./StyleCustomers";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

function Customers() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);

  const [getUsers, { data, loading }] = useLazyQuery(GET_USERS);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (data?.getUsers?.payload) {
      setUsers(data.getUsers.payload);
    }
  }, [data]);

  CheckToken();

  return (
    <HeaderDashborad>
      <StyleCustomers>
        <Container maxWidth="xl" disableGutters>
          <div className="orders-nav">
            <OrderSearch action="category" />

            {/* Header */}
            <div className="main-header">
              <div>
                <h2>{t("customers")}</h2>
                <p>{t("customerDescription")}</p>
              </div>
            </div>

            {/* Table */}
            <div className="orders-list">
              {loading ? (
                <div className="empty-state">Yuklanmoqda...</div>
              ) : users.length === 0 ? (
                <div className="empty-state">
                  <PeopleOutlineIcon sx={{ fontSize: 40, color: "#e8e4dc" }} />
                  Foydalanuvchilar topilmadi
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>{t("customerId")}</th>
                      <th>{t("joinDate")}</th>
                      <th>{t("customerName")}</th>
                      <th>{t("telegramId")}</th>
                      <th>{t("phoneNumber")}</th>
                      <th>{t("role")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((u) => u?.role)
                      .map((u) => (
                        <tr key={u._id}>
                          {/* ID */}
                          <td>
                            <span className="cell-id">
                              #{u._id.slice(0, 8)}
                            </span>
                          </td>

                          {/* Date */}
                          <td>
                            <span className="cell-date">
                              {u?.createdAt
                                ? new Date(u.createdAt).toLocaleDateString("uz")
                                : "-"}
                            </span>
                          </td>

                          {/* Name + Avatar */}
                          <td>
                            <div className="cell-name">
                              <div className="avatar">
                                {u.name?.charAt(0) || "?"}
                              </div>
                              <span>{u.name || "No name"}</span>
                            </div>
                          </td>

                          {/* Telegram */}
                          <td>
                            <span className="cell-telegram">
                              {u.telegramId || "-"}
                            </span>
                          </td>

                          {/* Phone */}
                          <td className="cell-phone">
                            <a href={`tel:${u.phone}`}>{u.phone}</a>
                          </td>

                          {/* Role */}
                          <td>
                            <Chip
                              label={u.role}
                              color={u.role === "admin" ? "info" : "default"}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </Container>
      </StyleCustomers>
    </HeaderDashborad>
  );
}

export default Customers;
