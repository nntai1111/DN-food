import React from "react";
import { motion } from "framer-motion";

const FoodSlider = ({ foods, selectedFoods, handleFoodToggle }) => {
    // Animation variants for staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05, // Faster stagger for smoother load
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl min-w-0 max-h-[60vh] overflow-y-auto w-full max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ willChange: "opacity, scroll" }}
        >
            {foods.length > 0 ? (
                foods.slice(0, 25).map((food, index) => (
                    <motion.button
                        key={food.name}
                        onClick={() => handleFoodToggle(food.name)}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-pressed={selectedFoods.includes(food.name)}
                        className={`flex flex-col items-center p-3 rounded-xl text-center transition-all duration-300 min-w-0 ${selectedFoods.includes(food.name)
                                ? "bg-orange-300 text-gray-800"
                                : "bg-white hover:bg-orange-100 text-gray-800 shadow-md"
                            }`}
                        style={{ willChange: "transform, box-shadow" }}
                    >
                        <img
                            src={food.image || "https://via.placeholder.com/64"}
                            alt={`Món ăn: ${food.name}`}
                            className="w-14 h-14 object-cover rounded-full shadow-sm mb-2"
                        />
                        <span className="text-xs md:text-sm font-semibold leading-tight">
                            {food.name}
                        </span>
                    </motion.button>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500">
                    Không có món ăn nào để hiển thị.
                </div>
            )}
        </motion.div>
    );
};

export default FoodSlider;