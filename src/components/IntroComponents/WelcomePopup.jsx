import React from "react";
import { motion } from "framer-motion";

export const WelcomePopup = ({ onClose }) => {
  return (
    <>
      {/* Backdrop với hiệu ứng mờ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
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
        <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl max-w-2xl w-11/12 text-white border border-white/20 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center font-[Cursive]">
            Welcome to HCM202
          </h1>

          <div className="space-y-4 text-center text-sm md:text-base leading-relaxed mb-6">
            <p>
              HCM202 - <span className="text-yellow-200 font-medium">Tư tưởng Hồ Chí Minh</span>, được xây dựng bởi Team 2, là hành trình khám phá tư tưởng Hồ Chí Minh về độc lập dân tộc và con đường tiến lên chủ nghĩa xã hội.
            </p>

            <div className="flex items-center justify-center space-x-2 py-1">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-16"></div>
              <span className="text-lg">✨</span>
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-16"></div>
            </div>

            <p>
              Tư tưởng Hồ Chí Minh khẳng định: <span className="font-semibold">"Không có gì quý hơn độc lập, tự do"</span>. Độc lập dân tộc phải gắn liền với hạnh phúc của nhân dân, thống nhất lãnh thổ, và được bảo đảm bởi con đường cách mạng vô sản.
            </p>

            <p>
              Chủ nghĩa xã hội, theo Hồ Chí Minh, là xã hội do nhân dân làm chủ, không còn áp bức, mọi người được ấm no, hạnh phúc. Việt Nam tiến lên chủ nghĩa xã hội từ một nước nông nghiệp lạc hậu, dưới sự lãnh đạo của Đảng Cộng sản và sức mạnh đại đoàn kết dân tộc.
            </p>

            <div className="flex items-center justify-center space-x-2 py-1">
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-16"></div>
              <span className="text-lg">🌱</span>
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-16"></div>
            </div>

            <p>
              Chúng tôi sẽ mang đến nội dung dễ hiểu, kết hợp hình ảnh minh họa, giúp bạn nắm bắt tư tưởng Hồ Chí Minh và hành trình xây dựng chủ nghĩa xã hội ở Việt Nam.
            </p>

            <p className="font-medium text-blue-200">
              Hiểu biết lý luận, vững vàng thực tiễn.
            </p>


          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-[#602985] to-[#7b42b0] text-white rounded-lg hover:bg-purple-800 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center space-x-2"
            >
              <span>Khám phá ngay</span>
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
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default WelcomePopup;