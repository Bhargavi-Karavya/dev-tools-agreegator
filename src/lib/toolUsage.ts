export async function trackToolUsage(toolId: string) {
  try {
    await fetch("/api/tools/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolId, timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    console.error("Failed to track tool usage:", err);
  }
}
