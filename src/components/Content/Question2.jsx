import React, { useState } from "react";
import { motion } from "framer-motion";
import FoodSlider from "./FoodSlider";
import q1 from "../../data/q1.json";

const Question2 = ({ selectedFoods, setFavoriteFood, handleNext, handleBack, pandaMessage }) => {
    const [localFavorite, setLocalFavorite] = useState("");

    // Ánh xạ selectedFoods (mảng chuỗi) với q1.foods để lấy thông tin hình ảnh
    const selectedFoodObjects = q1.foods.filter((food) =>
        selectedFoods.includes(food.name)
    ).slice(0, 25);

    const handleFoodToggle = (foodName) => {
        setLocalFavorite(foodName);
        setFavoriteFood(foodName);
    };

    return (
        <motion.div
            className="p-4 rounded-2xl shadow-lg w-full flex flex-col justify-between items-center  bg-white/80 backdrop-blur-sm"
            style={{ overflow: "hidden" }}
        >
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl">
                <h2 className="text-lg md:text-xl font-bold text-[#2b468a] mb-4 text-center">
                    Đâu là “món ruột” của bạn?
                </h2>
                <FoodSlider
                    foods={selectedFoodObjects}
                    selectedFoods={[localFavorite]}
                    handleFoodToggle={handleFoodToggle}
                    className="h-[250px]"   // nếu FoodSlider nhận className
                    style={{ height: "250px" }} // fallback nếu không có
                />

            </div>
            <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-200 w-full">
                    <div className="text-md italic font-bold text-blue-500 text-center animate-pulse">
                        {pandaMessage || "Vui lòng chọn món yêu thích nhất của bạn!"}
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
                        disabled={!localFavorite}
                        whileHover={{ scale: localFavorite ? 1.05 : 1 }}
                        whileTap={{ scale: localFavorite ? 0.95 : 1 }}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${localFavorite
                            ? "bg-gradient-to-r from-red-400 to-orange-400 text-white shadow-lg hover:shadow-xl"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Tiếp theo
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default Question2;