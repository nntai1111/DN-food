import React from "react";
import { motion } from "framer-motion";

export const WelcomePopup = ({ onClose }) => {
  // Animation variants for staggered entrance of text and icons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Backdrop với hiệu ứng mờ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        onClick={onClose}
      />

      {/* Popup chính */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-0 flex items-center justify-center z-40"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl max-w-2xl w-11/12 border border-orange-200/50 flex flex-col items-center justify-center relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative icons */}
          <motion.img
            src="/logoReal.png"
            alt="Corner Decor"
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              width: "80px",
              height: "48px",
              opacity: 0.4,
            }}
            variants={iconVariants}
          />
          {/* <motion.img
            src="/logoReal.png"
            alt="Corner Decor"
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              width: "80px",
              height: "48px",
              opacity: 0.4,
            }}
            variants={iconVariants}
          /> */}

          <motion.h1
            className="text-3xl mt-8 md:text-3xl font-extrabold mb-6 text-center text-[#2b468a] font-[Cursive] flex flex-col items-center gap-3"
            variants={itemVariants}
          >
            <span>Thực Khách Đậm Đà</span>
            <span>Hành Trình Ẩm Thực Đà Thành 🍜</span>
            {/* <motion.span variants={iconVariants}>🍜</motion.span> */}
          </motion.h1>


          <div className="flex flex-col  space-y-4 text-sm md:text-base leading-relaxed mb-8">
            <motion.p variants={itemVariants} className=" inline-flex items-center justify-center gap-2">
              <motion.span variants={iconVariants}>🥢</motion.span>
              <span>              Chào mừng bạn đến với Challenge <span className="text-orange-500 font-semibold">“Thực khách Đậm Đà”</span> nơi bạn trở thành “nhà thám hiểm” ẩm thực, khám phá từng hương vị đặc trưng của Đà Nẵng
              </span>
            </motion.p>

            {/* <motion.div className="flex items-center justify-center space-x-2 py-2" variants={itemVariants}>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-16"></div>
              <motion.span className="text-lg" variants={iconVariants}>🥟</motion.span>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-16"></div>
            </motion.div> */}

            <motion.p variants={itemVariants} className="inline-flex items-center justify-center gap-2">
              <motion.span variants={iconVariants}>🍲</motion.span>
              Từ những món quen thuộc đến những hương vị bạn chưa từng thử qua, mỗi câu hỏi sẽ dần hé lộ “Chân dung đậm Đà” mang đậm dấu ấn cá nhân của bạn
            </motion.p>

            <motion.p variants={itemVariants} className="inline-flex items-center justify-center gap-2">
              <motion.span variants={iconVariants}>🍤</motion.span>
              Tham gia ngay để tạo ra profile của riêng bạn và lan tỏa tình yêu ẩm thực Đà Thành với mọi người ngay nhé!

            </motion.p>

            <motion.div className="flex items-center justify-center space-x-2 py-2" variants={itemVariants}>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-16"></div>
              <motion.span className="text-lg" variants={iconVariants}>🍙</motion.span>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-16"></div>
            </motion.div>

            <motion.p variants={itemVariants} className="font-medium text-orange-600 inline-flex items-center justify-center gap-2">
              <motion.span variants={iconVariants}>🔥</motion.span>
              Thưởng thức món ngon, lan tỏa hương vị Đà Nẵng!
            </motion.p>
          </div>

          <motion.div className="flex justify-center" variants={itemVariants}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95, rotate: -2 }}
              className="px-8 py-3 bg-gradient-to-r from-[#f4a261] to-[#d9480f] text-white rounded-lg hover:bg-orange-600 transition-all transform hover:shadow-lg flex items-center space-x-2"
            >
              <motion.span variants={iconVariants}>🍴</motion.span>
              <span>Bắt Đầu Khám Phá</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default WelcomePopup;