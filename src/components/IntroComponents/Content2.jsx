import React from "react";
import { motion } from "framer-motion";

export const ContentList2 = React.forwardRef(({ onConfirm, isLoading }, ref) => {
    // Animation variants for cards
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        }),
        hover: {
            scale: 1.05,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-center p-4 sm:p-7 bg-black/40 rounded-xl min-h-[80vh] w-full overflow-hidden"
        >
            <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 text-center relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
                <span className="text-white brightness-150 contrast-125">
                    Những điều cần biết trước khi xem nội dung
                </span>
                <motion.div
                    className="absolute -bottom-2 left-1/2 w-16 h-1 bg-gradient-to-r from-red-300 to-red-500 rounded-full"
                    style={{ transform: "translateX(-50%)" }}
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                />
            </motion.h1>

            {/* 3 ô ở trên */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl mb-4">
                {[
                    {
                        title: "Chủ nghĩa Mác - Lênin",
                        image: "/maclenin.jpg",
                        description:
                            "Nguyên lý đấu tranh giai cấp, cách mạng vô sản, luận cương Lênin về dân tộc, thuộc địa.",
                    },
                    {
                        title: "Bối cảnh lịch sử",
                        image: "/boicanh.png",
                        description:
                            "Việt Nam dưới thực dân Pháp, phong trào yêu nước thất bại. Quốc tế: Cách mạng Tháng Mười Nga (1917).",
                    },
                    {
                        title: "Cuộc đời Hồ Chí Minh",
                        image: "/bacho.jpg",
                        description:
                            "Hành trình tìm đường cứu nước, tác phẩm <i>Đường cách mệnh</i>, <i>Tuyên ngôn độc lập</i>.",
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-white rounded-lg shadow-md min-h-[250px] overflow-hidden flex flex-col transform transition-all duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover brightness-110"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-[#ff5858] mb-2 text-center">
                                {item.title}
                            </h2>
                            <p
                                className="text-gray-600 text-lg text-center flex-grow"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 2 ô ở dưới chính giữa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl mb-4">
                {[
                    {
                        title: "Khái niệm cơ bản",
                        image: "/khainiem.jpg",
                        description:
                            "Độc lập dân tộc, chủ nghĩa xã hội, đại đoàn kết, bạo lực cách mạng.",
                    },
                    {
                        title: "Truyền thống Việt Nam",
                        image: "/truyenthong.jpg",
                        description:
                            "Lòng yêu nước, đoàn kết, tư tưởng nhân văn.",
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        custom={index + 3}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-white rounded-lg shadow-md min-h-[250px] overflow-hidden flex flex-col transform transition-all duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover brightness-110"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-[#ff5858] mb-2 text-center">
                                {item.title}
                            </h2>
                            <p
                                className="text-gray-600 text-lg text-center flex-grow"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                onClick={onConfirm}
                disabled={isLoading}
                className={`relative z-50 mt-2 px-4 py-1.5 bg-gradient-to-r from-[#602985] to-[#7b42b0] text-white rounded-lg hover:bg-purple-800 transition-all flex items-center gap-1 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                whileHover={{ scale: isLoading ? 1 : 1.03 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
            >
                {isLoading ? "Đang xử lý..." : "Tiếp theo"}
            </motion.button>
        </motion.div>
    );
});

export default ContentList2;