import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import q1 from "../../data/q1.json";

const Result = ({ selectedFoods, favoriteFood, mustTryFoods = [], quote, handleTestAgain }) => {
    const title = selectedFoods.length > 10 ? "Thực thần đậm Đà" : "Thực khách đậm Đà";
    const cardRef = useRef(null);

    // Lấy thông tin món ăn từ q1.json để lấy hình ảnh
    const favoriteFoodData = q1.foods.find((food) => food.name === favoriteFood);
    const mustTryFoodsData = q1.foods.filter((food) => mustTryFoods.includes(food.name));

    useEffect(() => {
        const images = cardRef.current?.querySelectorAll("img");
        if (images) {
            images.forEach((img) => {
                img.setAttribute("crossOrigin", "anonymous");
            });
        }
    }, []);

    const handleDownload = async () => {
        if (!cardRef.current) return;

        try {
            // Ẩn cả hai nút trước khi chụp
            const retryBtn = cardRef.current.querySelector(".retry-btn");
            const downloadBtn = cardRef.current.querySelector(".download-btn");
            if (retryBtn) retryBtn.style.display = "none";
            if (downloadBtn) downloadBtn.style.display = "none";

            // Đợi tất cả ảnh load xong
            await Promise.all(
                Array.from(cardRef.current.querySelectorAll("img")).map(
                    (img) => new Promise((resolve) => {
                        if (img.complete) resolve();
                        else img.onload = img.onerror = resolve;
                    })
                )
            );

            // Chụp ảnh
            const dataUrl = await htmlToImage.toPng(cardRef.current, { cacheBust: true });

            // Hiện lại nút sau khi chụp
            if (retryBtn) retryBtn.style.display = "block";
            if (downloadBtn) downloadBtn.style.display = "block";

            // Tạo link tải
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "thiep-am-thuc.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error generating image:", error);
            alert("Có lỗi khi tạo hình ảnh. Vui lòng thử lại.");
        }
    };




    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-orange-50">
            <motion.div
                ref={cardRef}
                className="p-8 bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    backgroundImage: "url('/logo1b.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "8px solid #f4e4bc",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                    overflow: "hidden",
                    minHeight: "700px",
                }}
            >
                {/* Overlay for background brightness */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(244, 228, 188, 0.75))",
                        zIndex: 1,
                    }}
                />

                <div style={{ position: "relative", zIndex: 2 }}>
                    {/* Tiêu đề */}
                    <h2
                        className="text-3xl font-extrabold text-center mb-8 flex items-center justify-center gap-4"
                        style={{ color: "#2b468a" }}
                    >
                        <img src="/logo1b.png" alt="Icon" className="w-10 h-10" />
                        Khám Phá Ẩm Thực Đà Nẵng
                        <img src="/logo1b.png" alt="Icon" className="w-10 h-10" />
                    </h2>

                    {/* Khung nội dung */}
                    <div
                        className="p-6 rounded-xl mb-4 border-l-4 bg-gradient-to-r from-yellow-50 to-orange-50"
                        style={{
                            borderColor: "#f4a261",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* Danh hiệu */}
                        <h3
                            className="text-2xl font-semibold mb-4 flex items-center gap-3"
                            style={{ color: "#d9480f" }}
                        >
                            <img src="/logo1b.png" alt="Chef Icon" className="w-8 h-8" />
                            Danh hiệu: {title}
                        </h3>

                        {/* Số món */}
                        <div className="flex items-center mb-2 border-b border-gray-200 py-5">
                            <img src="/logo1b.png" alt="Count Icon" className="w-7 h-7 mr-3" />
                            <p className="text-base text-gray-700">
                                <strong>Số món đã yêu thích:</strong> {selectedFoods.length} món
                            </p>
                        </div>

                        {/* Món ruột */}
                        <div className="flex items-center mb-2 border-b border-gray-200 pb-2">
                            <img src="/logo1b.png" alt="Count Icon" className="w-7 h-7 mr-3" />

                            <p className="text-base text-gray-700">
                                <strong>Món ruột:</strong> {favoriteFood || "Chưa chọn"}
                            </p>
                            {/* <img
                                src={favoriteFoodData?.image || "https://via.placeholder.com/64"}
                                alt="Favorite Food"
                                className="w-12 h-12 ml-auto rounded-full object-cover border border-gray-300 shadow-sm"
                            /> */}
                        </div>

                        {/* Món muốn chén sạch */}
                        <div className="space-y-3 mb-4">

                            {mustTryFoodsData.length > 0 ? (
                                mustTryFoodsData.map((food) => (
                                    <div
                                        key={food.name}
                                        className="flex items-center border-b border-gray-200 pb-2"
                                    >
                                        <img src="/logo1b.png" alt="Count Icon" className="w-7 h-7 mr-3" />

                                        <p className="text-base text-gray-700">
                                            <strong>Món muốn chén sạch:</strong> {food.name}
                                        </p>
                                        {/* <img
                                            src={food.image || "https://via.placeholder.com/64"}
                                            alt={food.name}
                                            className="w-12 h-12 ml-auto rounded-full object-cover border border-gray-300 shadow-sm"
                                        /> */}
                                    </div>
                                ))
                            ) : (
                                <p className="text-base text-gray-700">Chưa chọn</p>
                            )}
                        </div>

                        {/* Cảm nhận */}
                        <div className="flex items-start ">
                            <img src="/logo1b.png" alt="Quote Icon" className="w-7 h-7 mr-3" />
                            <p className="text-base text-gray-700">
                                <strong>Cảm nhận:</strong> {quote || "Chưa chọn"}
                            </p>
                        </div>
                    </div>
                </div>


                {/* Border overlay */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "3px solid #f4a261",
                        borderRadius: "16px",
                        pointerEvents: "none",
                        zIndex: 3,
                    }}
                />

                {/* Decorative icons */}
                {/* <img
                    src="/logo1b.png"
                    alt="Corner Decor"
                    style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        width: "48px",
                        height: "48px",
                        opacity: 0.4,
                        zIndex: 3,
                    }}
                /> */}
                <img
                    src="/logo1b.png"
                    alt="Corner Decor"
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        right: "16px",
                        width: "48px",
                        height: "48px",
                        opacity: 0.4,
                        zIndex: 3,
                    }}
                />
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem", position: "relative", zIndex: 10 }}>
                    <motion.button
                        onClick={handleTestAgain}
                        className="retry-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            backgroundColor: "#2b468a",
                            color: "#fff",
                            padding: "0.75rem 2rem",
                            borderRadius: "0.75rem",
                            fontWeight: "600",
                            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                        }}
                    >
                        Thử lại
                    </motion.button>

                    <motion.button
                        onClick={handleDownload}
                        className="download-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            backgroundColor: "#f4a261",
                            color: "#fff",
                            padding: "0.75rem 2rem",
                            borderRadius: "0.75rem",
                            fontWeight: "600",
                            boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
                        }}
                    >
                        Tải thiệp
                    </motion.button>
                </div>
            </motion.div>

            {/* Buttons */}

        </div>
    );
};

export default Result;