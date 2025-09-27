import React from "react";
import { motion } from "framer-motion";

export const MemberIntro = React.forwardRef(({ onConfirm, isLoading }, ref) => {
    const teamMembers = [
        { name: "Nguyễn Như Tài", image: "/nam.jpg" },
        { name: "Đặng Thành Phước", image: "/nam.jpg" },
        { name: "Hoàng Phúc Trọng", image: "/nam.jpg" },
        { name: "Trần Khánh Linh", image: "/nu2.png" },
        { name: "Vũ Thị Minh Phương", image: "/nu2.png" },
    ];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen flex flex-col justify-center items-center p-4 relative z-10 bg-transparent backdrop-blur-xs"
        >
            <motion.h1
                className="text-2xl sm:text-3xl text-white font-bold mb-6 text-center relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                    Giới thiệu thành viên
                </span>
                <motion.div
                    className="absolute -bottom-2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-white rounded-full"
                    style={{ transform: "translateX(-50%)" }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "4rem", opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                />
            </motion.h1>

            {/* Team Members Layout */}
            <div className="flex flex-col items-center">
                {/* Top Row */}
                <div className="flex justify-around w-full  mb-8 space-x-20">
                    {teamMembers.slice(0, 3).map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index, duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-purple-700"
                            />
                            <span className="text-white mt-2 text-center text-lg font-semibold">
                                {member.name}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Center Banner */}
                <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm text-white text-center py-4 px-6 rounded-lg mb-8">
                    <h2 className="text-3xl font-bold">Team 2</h2>
                    <p className="text-sm italic">	Ho Chi Minh Ideology(HCM202)_Half1_SE1736</p>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-around w-full ">
                    {teamMembers.slice(3).map((member, index) => (
                        <motion.div
                            key={index + 3}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * (index + 3), duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-purple-700"
                            />
                            <span className="text-white mt-2 text-center text-lg font-semibold">
                                {member.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Continue Button */}
            <motion.button
                onClick={onConfirm}
                disabled={isLoading}
                className={`mt-8 px-5 py-2 bg-gradient-to-r from-[#602985] to-[#7b42b0] text-white rounded-lg hover:bg-purple-800 transition-all flex items-center gap-5 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                whileHover={{ scale: isLoading ? 1 : 1.03 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
            >
                {isLoading ? (
                    <>
                        <div className="h-4 w-4 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-1"></div>
                        <span className="text-sm">Đang xử lý</span>
                    </>
                ) : (
                    <>
                        <span className="text-sm">Tiếp theo</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </>
                )}
            </motion.button>
        </motion.div>
    );
});

export default MemberIntro;