/**
 * ai.js — AI Advisor powered by Anthropic API
 * Luma Shop
 */

const AI_ENDPOINT = "https://api.anthropic.com/v1/messages";
const AI_MODEL    = "claude-sonnet-4-20250514";

// ── Keyboard shortcut ──────────────────────────
document.getElementById("aiQuery").addEventListener("keydown", e => {
  if (e.key === "Enter") askAI();
});

// ── Main Ask Function ──────────────────────────
async function askAI() {
  const query = document.getElementById("aiQuery").value.trim();
  if (!query) return;

  const resultDiv = document.getElementById("aiResult");
  const box       = document.getElementById("aiResultBox");

  resultDiv.style.display = "block";
  box.innerHTML = `
    <div class="ai-loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>`;

  try {
    const systemPrompt = buildSystemPrompt();
    const response = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model:      AI_MODEL,
        max_tokens: 300,
        system:     systemPrompt,
        messages:   [{ role: "user", content: query }],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text
      || "Sorry, I couldn't process that request.";

    box.innerHTML = `
      <strong style="color:var(--accent);font-size:12px;text-transform:uppercase;letter-spacing:.5px">
        ✦ AI Advisor
      </strong>
      <p style="margin-top:6px">${formatAIResponse(text)}</p>`;

  } catch (err) {
    console.error("AI Advisor error:", err);
    box.innerHTML = `
      <span style="color:var(--accent)">⚠</span>
      Couldn't reach the AI Advisor right now. Please try again.`;
  }
}

// ── Helpers ────────────────────────────────────

/**
 * Build the system prompt with the live product catalogue
 * so the AI can make accurate recommendations.
 */
function buildSystemPrompt() {
  const productList = PRODUCTS
    .map(p => `• ${p.name} (${p.cat}) — ₹${p.price.toLocaleString()}`)
    .join("\n");

  return `You are a helpful and friendly shopping assistant for Luma, a curated online store.
Your job is to recommend products from the catalogue below based on the customer's needs.

Available products:
${productList}

Guidelines:
- Keep your reply under 80 words.
- Mention specific product names and their prices.
- Be warm, concise, and helpful.
- If nothing in the catalogue matches, suggest the closest option and say so.`;
}

/**
 * Very lightweight text formatter — wraps product names in bold.
 */
function formatAIResponse(text) {
  // Bold anything matching a product name for visual highlight
  PRODUCTS.forEach(p => {
    const escaped = p.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(escaped, "gi"),
      match => `<strong>${match}</strong>`);
  });
  return text;
}
