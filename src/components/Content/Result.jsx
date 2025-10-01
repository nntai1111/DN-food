import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import q1 from "../../data/q1.json";

// ---------------- Desktop (giữ nguyên) ----------------
const ResultDesktop = ({ selectedFoods, favoriteFood, mustTryFoods, quote, handleTestAgain }) => {
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
        setError("");

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
            <div
                ref={cardRef}
                className="relative rounded-lg overflow-hidden"
                style={{ minHeight: "600px", width: "100%" }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('/profile/${selectedFoods.length < 10 ? "THỰC KHÁCH.png" : "THỰC THẦN.png"}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>

                {/* Input tên */}
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

                {/* Nội dung */}
                <div className="absolute top-[308px] left-[345px] text-[20px] font-bold text-[#175D65]">
                    {selectedFoods.length}
                </div>
                <div className="absolute top-[358px] left-[380px] text-[20px] font-bold text-[#175D65]">
                    {favoriteFood}
                </div>
                <div className="absolute top-[408px] left-[410px] text-[20px] font-bold text-[#175D65]">
                    {mustTryFoods}
                </div>

                {/* Quote */}
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

// ---------------- Mobile ----------------
const ResultMobile = ({ selectedFoods, favoriteFood, mustTryFoods, quote, handleTestAgain }) => {
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
        setError("");

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
        <div className="w-[115%] -ml-5 mb-20 flex flex-col items-center">
            <div
                ref={cardRef}
                className="relative w-full max-w-[500px] min-h-[600px] rounded-lg overflow-hidden "
            >
                {/* Background mobile */}
                <img
                    src={`/profile/${selectedFoods.length < 10 ? "THỰC KHÁCH.png" : "THỰC THẦN.png"}`}
                    alt="background"
                    className="absolute inset-0 w-full h-full object-contain "
                />

                {/* Input tên */}
                <div className="absolute top-[194px] left-3  w-full flex justify-center">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setError("");
                        }}
                        placeholder="Nhập tên"

                        className={`absolute text-[10px] font-bold text-[#175D65] bg-transparent focus:outline-none
                          ${value.length <= 5 ? "text-center w-[50px] left-[120px]" : "text-right w-[120px] left-[48px]"}
                          ${error ? "border-b-2 border-red-500" : ""}`}
                    />
                    {error && (
                        <p className="absolute top-[120px] left-1/2 -translate-x-1/2 text-red-600 ">
                            {error}
                        </p>
                    )}
                </div>

                {/* Nội dung */}
                <div className="absolute top-[50.5%] left-[47%] text-[10px] font-bold text-[#175D65]">
                    {selectedFoods.length}
                </div>
                <div className="absolute top-[54.8%] left-[51%] text-[10px] font-bold text-[#175D65]">
                    {favoriteFood}
                </div>
                <div className="absolute top-[58.9%] left-[55%] text-[10px] font-bold text-[#175D65]">
                    {mustTryFoods}
                </div>

                {/* Quote */}
                {selectedQuote && (
                    <img
                        src={selectedQuote.image}
                        alt={selectedQuote.name}
                        className="absolute bottom-[29%] left-[20%] w-[60%] h-auto"
                    />
                )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
                <motion.button
                    onClick={handleTestAgain}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="retry-btn bg-blue-700 text-white px-6 py-2 rounded-full text-sm md:text-base"
                >
                    Thử lại
                </motion.button>
                <motion.button
                    onClick={handleDownloadImage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="download-btn bg-orange-500 text-white px-6 py-2 rounded-full text-sm md:text-base"
                >
                    Tải thiệp
                </motion.button>
            </div>
        </div>
    );
};

// ---------------- Main ----------------
const Result = (props) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? <ResultMobile {...props} /> : <ResultDesktop {...props} />;
};

export default Result;
