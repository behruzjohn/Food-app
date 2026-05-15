const KEYWORDS = {
  spicy: ["achchiq", "spicy", "tez", "o'tkir", "qizil"],
  healthy: ["sog'lom", "healthy", "diet", "yengil", "salad", "sabzavot"],
  fast: ["tez", "fast", "burger", "pizza", "hotdog", "sandwich"],
  sweet: ["shirin", "sweet", "desert", "tort", "cake", "muzqaymoq"],
  cheap: ["arzon", "cheap", "tejamkor", "kam pul"],
  expensive: ["qimmat", "premium", "expensive", "luxury"],
  soup: ["sho'rva", "soup", "mastava", "lagmon", "shurpa"],
  meat: ["go'sht", "meat", "kabob", "kebab", "bifshteks"],
};

const PRICE_PATTERNS = [
  { regex: /(\d[\d\s]*)\s*(so['']?m|sum)/i, type: "max" },
  { regex: /(\d[\d\s]*)\s*dan\s*kam/i, type: "max" },
  { regex: /(\d[\d\s]*)\s*gacha/i, type: "max" },
  { regex: /(\d[\d\s]*)\s*dan\s*ko['']p/i, type: "min" },
  { regex: /(\d[\d\s]*)\s*dan\s*yuqori/i, type: "min" },
];

export function analyzeMessage(message) {
  const lower = message.toLowerCase();
  const result = {
    keywords: [],
    priceFilter: null,
    categoryHints: [],
    searchTerms: [],
    intent: "recommend",
  };

  // keyword detection
  for (const [key, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => lower.includes(w))) {
      result.keywords.push(key);
    }
  }

  // price detection
  for (const pattern of PRICE_PATTERNS) {
    const match = lower.match(pattern.regex);
    if (match) {
      const price = Number(match[1].replace(/\s/g, ""));
      result.priceFilter = { type: pattern.type, value: price };
      break;
    }
  }

  // direct food name search
  const words = lower.split(/\s+/).filter((w) => w.length > 2);
  result.searchTerms = words;

  // intent detection
  if (lower.includes("ko'rsat") || lower.includes("show"))
    result.intent = "show";
  if (lower.includes("tavsiya") || lower.includes("recommend"))
    result.intent = "recommend";
  if (lower.includes("arzon") || lower.includes("cheap"))
    result.intent = "budget";

  return result;
}

export function filterFoods(foods, analysis) {
  let filtered = [...foods];

  // price filter
  if (analysis.priceFilter) {
    const { type, value } = analysis.priceFilter;
    filtered = filtered.filter((f) =>
      type === "max" ? f.price <= value : f.price >= value,
    );
  }

  // keyword filter
  if (analysis.keywords.length > 0) {
    const keywordFiltered = filtered.filter((food) => {
      const text =
        `${food.name} ${food.description} ${food.category?.name}`.toLowerCase();
      return analysis.keywords.some((kw) => {
        const words = KEYWORDS[kw] || [];
        return words.some((w) => text.includes(w));
      });
    });
    if (keywordFiltered.length > 0) filtered = keywordFiltered;
  }

  // search terms filter
  if (analysis.searchTerms.length > 0) {
    const termFiltered = filtered.filter((food) => {
      const text =
        `${food.name} ${food.description} ${food.category?.name}`.toLowerCase();
      return analysis.searchTerms.some((term) => text.includes(term));
    });
    if (termFiltered.length > 0) filtered = termFiltered;
  }

  return filtered.slice(0, 6);
}

export function generateAIResponse(analysis, foodCount, userMessage) {
  const lower = userMessage.toLowerCase();

  if (foodCount === 0) {
    return "Afsuski, so'rovingizga mos taom topilmadi 😔 Boshqa narsa qidirib ko'ring!";
  }

  if (analysis.priceFilter) {
    const { type, value } = analysis.priceFilter;
    return type === "max"
      ? `${value.toLocaleString()} so'm gacha bo'lgan ${foodCount} ta taom topdim! 🎯`
      : `${value.toLocaleString()} so'mdan yuqori ${foodCount} ta premium taom! 👑`;
  }

  if (analysis.keywords.includes("healthy")) {
    return `Sog'lom ovqatlanish uchun ${foodCount} ta ajoyib taomni tanladim! 🥗`;
  }
  if (analysis.keywords.includes("spicy")) {
    return `Achchiq taomlar ixlosmandlariga ${foodCount} ta taom! 🌶️`;
  }
  if (analysis.keywords.includes("sweet")) {
    return `Shirin narsalar uchun ${foodCount} ta variant! 🍰`;
  }
  if (analysis.keywords.includes("meat")) {
    return `Go'sht taomlar bo'yicha ${foodCount} ta tanlov! 🥩`;
  }
  if (analysis.keywords.includes("fast")) {
    return `Tez tayyorlanadigan ${foodCount} ta taom! ⚡`;
  }

  return `"${userMessage}" bo'yicha ${foodCount} ta taom topdim! 🍽️`;
}
