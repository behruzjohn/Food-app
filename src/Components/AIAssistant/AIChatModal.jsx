import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ModalWrap,
  ModalHeader,
  MessagesWrap,
  TypingIndicator,
  SuggestionsWrap,
  InputWrap,
} from "./StyleAIAssistant";
import AIMessageBubble from "./AIMessageBubble";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

function AIChatModal({
  messages,
  input,
  setInput,
  isTyping,
  sendMessage,
  messagesEndRef,
  clearChat,
  onClose,
  handleAddToCart,
  suggestedQuestions,
}) {
  const { t } = useTranslation();
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    // auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  };

  return (
    <ModalWrap>
      {/* Header */}
      <ModalHeader>
        <div className="header-left">
          <div className="ai-avatar">🤖</div>
          <div className="ai-info">
            <span className="ai-name">{t("aiTitle")}</span>
            <span className="ai-status">{t("aiOnline")}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={clearChat} title={t("aiClear")}>
            <DeleteOutlineIcon fontSize="small" />
          </button>
          <button className="icon-btn" onClick={onClose} title={t("cancel")}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </ModalHeader>

      {/* Messages */}
      <MessagesWrap>
        {messages.map((msg) => (
          <AIMessageBubble
            key={msg.id}
            message={msg}
            onAddToCart={handleAddToCart}
          />
        ))}

        {isTyping && (
          <TypingIndicator>
            <div className="mini-avatar">🤖</div>
            <div className="dots">
              <span />
              <span />
              <span />
            </div>
          </TypingIndicator>
        )}

        <div ref={messagesEndRef} />
      </MessagesWrap>

      {/* Suggestions */}
      <SuggestionsWrap>
        {suggestedQuestions.map((q) => (
          <button key={q} onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
      </SuggestionsWrap>

      {/* Input */}
      <InputWrap>
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={t("aiPlaceholder")}
        />
        <button
          className="send-btn"
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
        >
          <SendIcon fontSize="small" />
        </button>
      </InputWrap>
    </ModalWrap>
  );
}

export default AIChatModal;
