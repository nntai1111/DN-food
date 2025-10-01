import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FoodSlider from "./FoodSlider";
import q1 from "../../data/q1.json";

const Question3 = ({ selectedFoods, setMustTryFoods, handleNext, handleBack, pandaMessage }) => {
    const [selected, setSelected] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    const handleFoodToggle = (foodName) => {
        if (selected === foodName) {
            setSelected("");
            setShowWarning(false);
        } else {
            setSelected(foodName);
            setShowWarning(false);
        }
    };

    const handleSubmit = () => {
        setMustTryFoods([selected]);
        handleNext();
    };

    // Lọc các món chưa được chọn ở Question1
    const unselectedFoods = q1.foods.filter((food) => !selectedFoods.includes(food.name)).slice(0, 25);
    // Nếu không còn món nào chưa chọn, hiển thị toàn bộ danh sách
    const foodsToDisplay = unselectedFoods.length > 0 ? unselectedFoods : q1.foods.slice(0, 25);

    return (
        <motion.div
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg w-full flex flex-col justify-between items-center"
            style={{ overflow: "hidden" }}
        >
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-4xl">
                <h2 className="text-lg md:text-xl font-bold text-[#2b468a] mb-2 text-center">
                    {unselectedFoods.length === 0
                        ? "Tuyệt vời quá bạn đã trải nghiệm hết các món ngon ở Đà Nẵng rồi! Hãy chọn 1 món ăn bạn sẽ ăn đầu tiên khi tới Đà Nẵng nhé"
                        : "Món nào bạn định sẽ “chén sạch” khi đến Đà Nẵng?"}
                </h2>
                <AnimatePresence>
                    {showWarning && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg text-sm shadow-md"
                        >
                            Bạn chỉ được chọn tối đa 1 món!
                        </motion.div>
                    )}
                </AnimatePresence>
                <FoodSlider
                    foods={foodsToDisplay}
                    selectedFoods={[selected]}
                    handleFoodToggle={handleFoodToggle}
                />
            </div>
            <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-200 w-full">
                    <div className="text-md italic font-bold text-blue-500 text-center animate-pulse">
                        {pandaMessage || (unselectedFoods.length === 0
                            ? "Vui lòng chọn 1 món bạn muốn thử đầu tiên!"
                            : "Vui lòng chọn 1 món bạn muốn thử!")}
                    </div>
                </div>
                <div className="flex justify-between mt-2 w-full">
                    <motion.button
                        onClick={handleBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Quay lại
                    </motion.button>
                    <motion.button
                        onClick={handleSubmit}
                        disabled={!selected}
                        whileHover={{ scale: selected ? 1.05 : 1 }}
                        whileTap={{ scale: selected ? 0.95 : 1 }}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selected
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

export default Question3;