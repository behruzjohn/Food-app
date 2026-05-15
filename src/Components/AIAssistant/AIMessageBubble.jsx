import { MessageBubble, FoodsGrid } from "./StyleAIAssistant";
import AIFoodCard from "./AIFoodCard";

function AIMessageBubble({ message, onAddToCart }) {
  const isUser = message.type === "user";
  const time = new Date(message.timestamp).toLocaleTimeString("uz", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <MessageBubble $isUser={isUser}>
      <div className="bubble-row">
        {!isUser && <div className="mini-avatar">🤖</div>}
        <div className="bubble">{message.text}</div>
      </div>

      {!isUser && message.foods?.length > 0 && (
        <FoodsGrid>
          {message.foods.map((food) => (
            <AIFoodCard key={food._id} food={food} onAddToCart={onAddToCart} />
          ))}
        </FoodsGrid>
      )}

      <span className="timestamp">{time}</span>
    </MessageBubble>
  );
}

export default AIMessageBubble;
