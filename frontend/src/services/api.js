const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getMessages() {
  const response = await fetch(`${API_URL}/api/messages`);

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return response.json();
}