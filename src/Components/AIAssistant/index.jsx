import { AnimatePresence, motion } from "framer-motion";
import { FloatingBtn, Overlay } from "./StyleAIAssistant";
import AIChatModal from "./AIChatModal";
import { useAIAssistant } from "./useAIAssistant";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_CARD } from "../../Pages/FavouritePage/api";
import { useTranslation } from "react-i18next";
import ToastCompact from "../Toast";
import Loader from "../Loader";
import { GET_CARD_FOOD } from "../../Pages/ShopCard/api";

function AIAssistant() {
  const assistant = useAIAssistant();
  const { isOpen, setIsOpen } = assistant;
  const [openToastForAddCart, setOpenToastForAddCart] = useState(false);

  const { t } = useTranslation();

  const [createCard, { loading }] = useMutation(CREATE_CARD, {
    refetchQueries: [{ query: GET_CARD_FOOD }],
  });

  const handleAddToCart = useCallback(
    async (foodId) => {
      try {
        await createCard({
          variables: {
            data: {
              food: foodId,
              quantity: 1,
            },
          },
        });
        setOpenToastForAddCart(true);
        return true;
      } catch (err) {
        return false;
      }
    },
    [createCard],
  );
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Overlay onClick={() => setIsOpen(false)} />
            </motion.div>

            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                position: "fixed",
                bottom: 96,
                right: 28,
                zIndex: 999,
              }}
            >
              <AIChatModal
                {...assistant}
                handleAddToCart={handleAddToCart}
                onClose={() => setIsOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <FloatingBtn onClick={() => setIsOpen((p) => !p)} title={t("aiTitle")}>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isOpen ? <CloseIcon /> : <SmartToyOutlinedIcon />}
        </motion.div>
        {!isOpen && <span className="badge">AI</span>}
      </FloatingBtn>

      {/* Toast */}
      <ToastCompact
        status="success"
        title={t("addedNewCartFood")}
        open={openToastForAddCart}
        setOpen={setOpenToastForAddCart}
      />

      {/* Loader */}
      <Loader load={loading} />
    </>
  );
}

export default AIAssistant;
