import React from "react";
import { motion } from "framer-motion";

export const ContentList = React.forwardRef(({ onConfirm, isLoading }, ref) => {
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
            className="flex flex-col justify-center items-center p-7 bg-black/40 rounded-xl min-h-[80vh] w-full"
        >
            <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-8 text-center relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
                <span className="text-white brightness-150 contrast-125">
                    Tóm tắt và khái quát nội dung
                </span>
                <motion.div
                    className="absolute -bottom-2 left-1/2 w-16 h-1 bg-gradient-to-r from-red-300 to-red-500 rounded-full"
                    style={{ transform: "translateX(-50%)" }}
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                />
            </motion.h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-5xl">
                {[
                    {
                        title: "Độc lập Dân tộc",
                        image: "/doclap.png",
                        description:
                            "Quyền bất khả xâm phạm, gắn với tự do, hạnh phúc nhân dân và toàn vẹn lãnh thổ. Độc lập toàn diện về chính trị, kinh tế, quân sự.",
                    },
                    {
                        title: "Cách mạng Giải phóng",
                        image: "/nd22.png",
                        description:
                            "Do Đảng Cộng sản lãnh đạo, dựa trên liên minh công - nông, đại đoàn kết, kết hợp bạo lực chính trị và vũ trang.",
                    },
                    {
                        title: "Chủ nghĩa Xã hội",
                        image: "/untitled-0.png",
                        description:
                            "Xã hội công bằng, nhân dân làm chủ, không áp bức. Dân chủ, kinh tế hiện đại, văn hóa tiến bộ, bỏ qua giai đoạn tư bản.",
                    },
                    {
                        title: "Mối quan hệ & Điều kiện",
                        image: "/hcm5.png",
                        description:
                            "Độc lập dân tộc là tiền đề, chủ nghĩa xã hội bảo đảm độc lập. Điều kiện: lãnh đạo Đảng, đoàn kết dân tộc, quốc tế.",
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-36 object-cover brightness-120"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-bold text-[#ff5858] mb-2 text-center">
                                {item.title}
                            </h2>
                            <p className="text-gray-600 text-x s text-center flex-grow">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                onClick={onConfirm}
                disabled={isLoading}
                className={`relative z-50 mt-6 px-4 py-2 bg-gradient-to-r from-[#602985] to-[#7b42b0] text-white rounded-lg hover:bg-purple-800 transition-all flex items-center gap-1 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                whileHover={{ scale: isLoading ? 1 : 1.03 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
            >
                {isLoading ? "Đang xử lý..." : "Tiếp theo"}

            </motion.button>
        </motion.div>
    );
});

export default ContentList;