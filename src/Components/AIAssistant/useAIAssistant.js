import { useState, useCallback, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { analyzeMessage, filterFoods, generateAIResponse } from "./aiAnalyzer";
import { GET_ALL_FOODS, CREATE_CARD } from "../../Pages/Foods/api";
import { GET_CARD_FOOD } from "../../Pages/ShopCard/api";

export function useAIAssistant() {
  const { t } = useTranslation();

  // ── Suggested questions — t() bilan ──
  const SUGGESTED_QUESTIONS = [
    t("aiSuggest1"),
    t("aiSuggest2"),
    t("aiSuggest3"),
    t("aiSuggest4"),
    t("aiSuggest5"),
    t("aiSuggest6"),
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: t("aiGreeting"),
      foods: [],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { data: foodsData } = useQuery(GET_ALL_FOODS, {
    variables: { page: 1, limit: 100 },
    skip: !isOpen,
  });

  const [createCard] = useMutation(CREATE_CARD, {
    refetchQueries: [{ query: GET_CARD_FOOD }],
  });

  const foods = foodsData?.getAllFoods?.payload || [];

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleAddToCart = useCallback(
    async (foodId) => {
      try {
        await createCard({
          variables: {
            data: { food: foodId, quantity: 1 },
          },
        });
        return true;
      } catch {
        return false;
      }
    },
    [createCard],
  );

  const sendMessage = useCallback(
    async (text) => {
      const userText = text || input;
      if (!userText.trim()) return;

      const userMsg = {
        id: Date.now(),
        type: "user",
        text: userText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      scrollToBottom();

      await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

      const analysis = analyzeMessage(userText);
      const filteredFoods = filterFoods(foods, analysis);
      const aiText = generateAIResponse(
        analysis,
        filteredFoods.length,
        userText,
      );

      const aiMsg = {
        id: Date.now() + 1,
        type: "ai",
        text: aiText,
        foods: filteredFoods,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
      scrollToBottom();
    },
    [input, foods, scrollToBottom],
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        type: "ai",
        text: t("aiGreeting"),
        foods: [],
        timestamp: new Date(),
      },
    ]);
  }, [t]);

  return {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    messagesEndRef,
    clearChat,
    handleAddToCart,
    suggestedQuestions: SUGGESTED_QUESTIONS,
  };
}
