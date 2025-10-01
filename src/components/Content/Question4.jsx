import React, { useState } from "react";
import { motion } from "framer-motion";
import q1 from "../../data/q1.json";

const Question4 = ({ setQuote, handleNext, handleBack, pandaMessage }) => {
    const [localQuote, setLocalQuote] = useState("");

    const handleQuoteToggle = (quote) => {
        setLocalQuote(quote);
        setQuote(quote);
    };

    return (
        <motion.div
            className="p-2 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg w-full flex flex-col justify-between items-center px-6"
            style={{ overflow: "hidden" }}
        >
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl">
                <h2 className="text-lg md:text-xl font-bold text-[#2b468a] mb-2 text-center">
                    Cảm nhận của bạn về món ăn xứ Đà Thành?
                </h2>
                <motion.div
                    className="flex flex-col space-y-3 p-4 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl min-w-0 max-h-[60vh] overflow-y-auto w-full max-w-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { staggerChildren: 0.05 } }}
                    style={{ willChange: "opacity, scroll" }}
                >
                    {q1.quotes.length > 0 ? (
                        q1.quotes.slice(0, 25).map((quote, index) => (
                            <motion.button
                                key={quote.name} // Use quote.name as the key since it's unique
                                onClick={() => handleQuoteToggle(quote.name)} // Pass quote.name to handleQuoteToggle
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.95 }}
                                aria-pressed={localQuote === quote.name}
                                className={`p-3 rounded-lg text-left transition-all duration-300 ${localQuote === quote.name
                                        ? "bg-orange-300 text-gray-800 shadow-lg"
                                        : "bg-white hover:bg-orange-100 text-gray-800 shadow-md"
                                    }`}
                                style={{ willChange: "transform, box-shadow" }}
                            >
                                <span className="text-xs md:text-sm font-semibold leading-tight">
                                    {quote.name} {/* Display the name property */}
                                </span>
                            </motion.button>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            Không có câu quote nào để hiển thị.
                        </div>
                    )}
                </motion.div>
            </div>
            <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="flex flex-col items-center justify-center mt-2 bg-white p-4 rounded-2xl shadow-lg border border-gray-200 w-full">
                    <div className="text-md italic font-bold text-blue-500 text-center animate-pulse">
                        {pandaMessage || "Vui lòng chọn câu quote yêu thích của bạn!"}
                    </div>
                </div>
                <div className="flex justify-between mt-6 w-full">
                    <motion.button
                        onClick={handleBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Quay lại
                    </motion.button>
                    <motion.button
                        onClick={handleNext}
                        disabled={!localQuote}
                        whileHover={{ scale: localQuote ? 1.05 : 1 }}
                        whileTap={{ scale: localQuote ? 0.95 : 1 }}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${localQuote
                                ? "bg-gradient-to-r from-red-400 to-orange-400 text-white shadow-lg hover:shadow-xl"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Xem kết quả
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default Question4;