import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cinai = () => {
  const [searchInput, setSearchInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const api_key = import.meta.env.VITE_GEMINI_AI?.trim();

  const handleSearch = async () => {
    const trimmedInput = searchInput.trim();
    if (!trimmedInput) return;

    const userMessage = { role: "user", content: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);

    const prompt = `You are an experienced and highly knowledgeable movie expert. Based on the user's input, provide a list of at least 3 movie recommendations. Be decisive and concise, without unnecessary details or any special formatting like asterisks or bullet points. Provide only the movie titles, each on a new line, with no extra symbols: "${trimmedInput}"`;

    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Gemini response:", data);

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a suggestion.";

      const aiMessage = { role: "ai", content: reply };
      setMessages((prev) => [...prev, aiMessage]);
      setSearchInput("");
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "There was an error contacting Gemini." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 bg-black/40 text-white bg-gray-900">
        <div>
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            CIN<span className="text-orange-400">VIEW</span>
          </h1>
        </div>
        <div>
          <ul className="flex space-x-6">
            <li>
              <Link to="/Homepage" className="hover:text-orange-400">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/Homepage" className="hover:text-orange-400">
                TV Shows
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex flex-col h-screen bg-gray-900 text-white px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">CINAI</h1>
          <p className="text-lg text-gray-400 mt-2">
            Your AI-powered movie recommendation system.
          </p>
        </header>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-xl mb-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xl ${
                msg.role === "user"
                  ? "bg-gray-700 self-end ml-auto"
                  : "bg-gray-700 self-start"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded-lg max-w-xl bg-gray-700 self-start">
              <p className="whitespace-pre-wrap">Loading...</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a movie..."
            className="flex-1 px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            className="bg-purple-600 hover:bg-gray-700 transition px-4 py-2 rounded-xl font-medium"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cinai;
