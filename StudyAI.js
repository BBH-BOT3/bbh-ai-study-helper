import React, { useState } from "react";
import axios from "axios";

export default function StudyAI() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("General");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post("https://studyai-backend-demo.onrender.com/ask", {
        question,
        subject,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("উত্তর আনতে সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Study AI - বাংলায় প্রশ্ন করুন</h1>
      <div className="max-w-xl mx-auto">
        <textarea
          className="w-full p-3 border rounded mb-3"
          rows={4}
          placeholder="আপনার প্রশ্ন লিখুন..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>

        <select
          className="w-full mb-3 p-2 border rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option>General</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Math</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "লোড হচ্ছে..." : "উত্তর দেখুন"}
        </button>

        {answer && (
          <div className="mt-6 text-left bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold mb-2">উত্তর:</h2>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
