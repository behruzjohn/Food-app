import {
  StyledLayoutWrapper,
  StyleHeaderDashboard,
} from "./StyleHeaderDashboard";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { SIDEBAR_LINKS } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GuardComponent from "../CheckRole/CheckRole";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Darklogo = "/src/assets/taomGoDark.png";

function HeaderDashboard({ children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("authStore");
    const parsed = JSON.parse(stored || "{}");
    setRole(parsed?.state?.role);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const handleOverlayClick = () => {
    if (window.innerWidth <= 600) setOpen(false);
  };

  return (
    <StyledLayoutWrapper
      $openHeaderDashboard={open}
      onClick={(e) => {
        const isContent = e.currentTarget
          .querySelector(".content")
          ?.contains(e.target);
        if (e.target === e.currentTarget || isContent) handleOverlayClick();
      }}
    >
      <StyleHeaderDashboard $openHeaderDashboard={open}>
        {/* Mobile toggle */}
        <Button
          id="sidebarToggle"
          aria-label="toggle sidebar"
          onClick={() => setOpen((p) => !p)}
          variant="text"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </Button>

        {/* SEO — hidden */}
        <h1 style={{ position: "absolute", left: -99999 }}>
          Behruzjon Restaurant
        </h1>

        {/* Logo */}
        <img src={Darklogo} alt="TaomGo logotipi" />

        {/* Nav */}
        <nav className="header-nav">
          <ul>
            {SIDEBAR_LINKS?.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

              const content = (
                <li
                  key={item.key}
                  className={isActive ? "active" : ""}
                  onClick={() => navigate(item.path)}
                >
                  <a>
                    {item.icon}
                    <span className="span-title">{t(item.key)}</span>
                  </a>
                </li>
              );

              if (item.guard) {
                return (
                  <GuardComponent
                    key={item.key}
                    role={role}
                    section={item.guard.section}
                    action={item.guard.action}
                  >
                    {content}
                  </GuardComponent>
                );
              }

              return content;
            })}
          </ul>
        </nav>

        {/* Logout */}
        <Button
          id="logOut"
          onClick={handleLogOut}
          startIcon={<LogoutOutlinedIcon />}
          variant="text"
        >
          <span className="span-title">{t("logOut")}</span>
        </Button>
      </StyleHeaderDashboard>

      <div className="content">{children}</div>
    </StyledLayoutWrapper>
  );
}

export default HeaderDashboard;
