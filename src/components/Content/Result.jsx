import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import q1 from "../../data/q1.json";

const Result = ({ selectedFoods, favoriteFood, mustTryFoods = [], quote, handleTestAgain }) => {
    const cardRef = useRef(null);
    const selectedQuote = q1.quotes.find((q) => q.name === quote);
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const images = cardRef.current?.querySelectorAll("img");
        if (images) {
            images.forEach((img) => {
                img.setAttribute("crossOrigin", "anonymous");
            });
        }
    }, []);

    const handleDownloadImage = async () => {
        if (!value.trim()) {
            setError("Bạn phải nhập tên trước khi tải thiệp!");
            return;
        }
        setError(""); // clear lỗi khi hợp lệ

        if (!cardRef.current) return;

        try {
            await Promise.all(
                Array.from(cardRef.current.querySelectorAll("img")).map(
                    (img) =>
                        new Promise((resolve) => {
                            if (img.complete) resolve();
                            else img.onload = img.onerror = resolve;
                        })
                )
            );

            const dataUrl = await htmlToImage.toPng(cardRef.current, { cacheBust: true });

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "thiep-am-thuc.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating image:", error);
            setError("Có lỗi khi tạo hình ảnh. Vui lòng thử lại.");
        }
    };

    return (
        <div className="w-full mb-20 flex flex-col items-center">
            {/* Thẻ cần chụp ảnh */}
            <div
                ref={cardRef}
                className="relative rounded-lg overflow-hidden"
                style={{ minHeight: "600px", width: "100%" }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('/profile/${selectedFoods.length < 10 ? "THỰC KHÁCH.png" : "THỰC THẦN.png"
                            }')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>


                {/* Input tên (căn chỉnh giữ nguyên như code gốc) */}
                <div className="absolute top-[88px] left-0 w-full">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setError("");
                        }}
                        placeholder="Nhập tên"
                        className={`absolute text-[20px] font-bold text-[#175D65] bg-transparent focus:outline-none
                          ${value.length <= 5 ? "text-center w-[100px] left-[270px]" : "text-right w-[200px] left-[165px]"}
                          ${error ? "border-b-2 border-red-500" : ""}`}
                    />
                    {error && (
                        <p className="absolute top-[40px] left-[165px] text-red-600 text-sm">
                            {error}
                        </p>
                    )}
                </div>

                {/* Nội dung hiển thị */}
                <div className="absolute top-[308px] left-[345px] text-[20px] font-bold text-[#175D65]">
                    {selectedFoods.length}
                </div>
                <div className="absolute top-[358px] left-[380px] text-[20px] font-bold text-[#175D65]">
                    {favoriteFood}
                </div>
                <div className="absolute top-[408px] left-[410px] text-[20px] font-bold text-[#175D65]">
                    {mustTryFoods}
                </div>

                {/* Ảnh quote */}
                {selectedQuote && (
                    <img
                        src={selectedQuote.image}
                        alt={selectedQuote.name}
                        className="absolute top-[440px] left-[160px] w-[60%] h-auto"
                    />
                )}
            </div>

            {/* Nút bấm */}
            <div className="mt-6 flex gap-4">
                <motion.button
                    onClick={handleTestAgain}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="retry-btn bg-blue-700 text-white px-8 py-2 rounded-full"
                >
                    Thử lại
                </motion.button>
                <motion.button
                    onClick={handleDownloadImage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="download-btn bg-orange-500 text-white px-8 py-2 rounded-full"
                >
                    Tải thiệp
                </motion.button>
            </div>
        </div>
    );
};

export default Result;
