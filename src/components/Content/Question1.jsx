import React, { useEffect } from "react";
import { motion } from "framer-motion";
import FoodSlider from "./FoodSlider";
import q1 from "../../data/q1.json";

const Question1 = ({ selectedFoods, setSelectedFoods, handleNext, currentStep, pandaMessage }) => {
    // Disable body scrolling when component mounts
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto"; // Re-enable scrolling on unmount
        };
    }, []);

    const handleFoodToggle = (foodName) => {
        if (selectedFoods.includes(foodName)) {
            setSelectedFoods(selectedFoods.filter((item) => item !== foodName));
        } else {
            setSelectedFoods([...selectedFoods, foodName]);
        }
    };

    return (
        <motion.div
            className="p-4 rounded-2xl shadow-lg w-full  bg-white/80 backdrop-blur-sm flex flex-col justify-between items-center"
            style={{ overflow: "hidden" }}
        >
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl">
                <h2 className="text-lg md:text-xl font-bold text-[#2b468a] mb-4 text-center">
                    Bạn đã ăn qua bao nhiêu món “đậm Đà” dưới đây?
                </h2>
                <FoodSlider
                    foods={q1.foods}
                    selectedFoods={selectedFoods}
                    handleFoodToggle={handleFoodToggle}
                />
            </div>
            <div className="flex flex-col items-center w-full max-w-4xl">
                {currentStep < 5 && (
                    <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-200 w-full">
                        <div className="text-md italic font-bold text-red-500 text-center animate-pulse">
                            {pandaMessage}
                        </div>
                    </div>
                )}
                <motion.button
                    onClick={handleNext}
                    disabled={selectedFoods.length === 0}
                    whileHover={{ scale: selectedFoods.length > 0 ? 1.05 : 1 }}
                    whileTap={{ scale: selectedFoods.length > 0 ? 0.95 : 1 }}
                    className={`w-full max-w-xs py-3 px-6 mt-4 rounded-full font-semibold transition-all duration-300 ${selectedFoods.length > 0
                        ? "bg-gradient-to-r from-red-400 to-orange-400 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Tiếp theo
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Question1;