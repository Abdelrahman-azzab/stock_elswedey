import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const initialStock = {
    "روزليف 125": 200,
    "روزليف 175": 150,
    "روزليف 250": 100,
    "روزليف 350": 50,
    "روزليف 450": 25,
  };

  const { t, i18n } = useTranslation();

  const [stock, setStock] = useState(initialStock);
  const [usage, setUsage] = useState({});
  const [incoming, setIncoming] = useState({});
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // حفظ الوضع في localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleChange = (item, value) => {
    setUsage({ ...usage, [item]: Number(value) || 0 });
  };

  const handleIncomingChange = (item, value) => {
    setIncoming({ ...incoming, [item]: Number(value) || 0 });
  };

  const handleSubmit = () => {
    const newStock = { ...stock };
    Object.keys(usage).forEach((item) => {
      newStock[item] = Math.max((newStock[item] || 0) - usage[item], 0);
    });
    setStock(newStock);
    setUsage({});
  };

  const handleAddStock = (item) => {
    const amountToAdd = incoming[item] || 0;
    setStock({ ...stock, [item]: (stock[item] || 0) + amountToAdd });
    setIncoming({ ...incoming, [item]: 0 });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center flex-1">
          🧾 {t("برنامج إدارة المخزون")}
        </h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-2 rounded shadow hover:opacity-80 transition"
        >
          {darkMode ? "☀️ وضع النهار" : "🌙 الوضع الليلي"}
        </button>
      </div>

      {Object.keys(stock).map((item) => (
        <div
          key={item}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 shadow"
        >
          <h2 className="text-xl font-semibold mb-1">{item}</h2>
          <p className="font-bold text-green-600 dark:text-green-400 mb-2">
            المتبقي: {stock[item]}
          </p>

          <input
            type="number"
            placeholder="الكمية المستهلكة"
            value={usage[item] || ""}
            onChange={(e) => handleChange(item, e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 mb-2"
          />

          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              placeholder="إضافة كمية جديدة"
              value={incoming[item] || ""}
              onChange={(e) => handleIncomingChange(item, e.target.value)}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600"
            />
            <button
              onClick={() => handleAddStock(item)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
            >
              ➕ إضافة
            </button>
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          ✅ خصم الكميات المستهلكة
        </button>
      </div>
    </div>
  );
}

export default App;
