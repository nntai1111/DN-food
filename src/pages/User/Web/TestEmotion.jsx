import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import alertIcon from "../../../util/icon/alertOctagon.json";
import LoadingWithHamster from "../../../components/LoadHamster/LoadingWithHamster";
import q1 from "../../../data/q1.json";
import Question1 from "../../../components/Content/Question1";
import Question2 from "../../../components/Content/Question2";
import Question3 from "../../../components/Content/Question3";
import Question4 from "../../../components/Content/Question4";
import Result from "../../../components/Content/Result";

const IncompleteAssessment = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
  >
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="relative  bg-gradient-to-br from-[#f0f9ff] to-[#fdf4ff] rounded-3xl p-8 md:p-12 shadow-2xl max-w-xl w-full flex flex-col items-center space-y-6"
    >
      <button className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 text-2xl font-bold" onClick={onClose} aria-label="Đóng">
        &times;
      </button>
      <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl mb-2 select-none">
        🍜
      </motion.div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">Bạn chưa hoàn tất bài kiểm tra ẩm thực Đà Nẵng</h3>
      <p className="text-gray-600 text-center max-w-md text-sm md:text-base">Hãy dành vài phút để khám phá ẩm thực Đà Nẵng qua bài kiểm tra này! 💜</p>
      <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-indigo-400 w-full">
        <div className="flex items-center mb-2">
          <span className="text-indigo-500 text-xl mr-2">🍴</span>
          <p className="font-medium text-gray-800">Bài trắc nghiệm là gì?</p>
        </div>
        <p className="text-gray-600 text-sm">Đây là bài kiểm tra vui về ẩm thực Đà Nẵng, giúp bạn khám phá các món ăn đậm đà bản sắc! 🌮</p>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-teal-400 w-full">
        <div className="flex items-center mb-2">
          <span className="text-teal-500 text-xl mr-2">🔒</span>
          <p className="font-medium text-gray-800">Bảo mật tuyệt đối</p>
        </div>
        <p className="text-gray-600 text-sm">Mọi lựa chọn của bạn đều được xử lý ẩn danh và không liên kết với danh tính cá nhân 💫</p>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-pink-400 w-full">
        <div className="flex items-center mb-2">
          <span className="text-pink-500 text-xl mr-2">🌮</span>
          <p className="font-medium text-gray-800">Chỉ mất 3 phút</p>
        </div>
        <p className="text-gray-600 text-sm">Hoàn thành bài khảo sát nhỏ để hoàn thành nhiệm vụ nhé ⏳</p>
      </div>
    </motion.div>
  </motion.div>
);

const TestKnowledge = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [favoriteFood, setFavoriteFood] = useState("");
  const [mustTryFoods, setMustTryFoods] = useState([]);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({ foods: [], quotes: [] });

  useEffect(() => {
    setData(q1);
    setLoading(false);
  }, []);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setCurrentStep(5);
    }, 2000);
  }, []);

  const handleTestAgain = () => {
    setCurrentStep(1);
    setSelectedFoods([]);
    setFavoriteFood("");
    setMustTryFoods([]);
    setQuote("");
  };

  const loadingMessages = [
    "🍴 Đang lưu thông tin món ăn...",
    "🐹 Hamster đang xử lý lựa chọn của bạn...",
    "📊 Đang thu thập dữ liệu ẩm thực...",
    "💫 Đang tổng hợp hương vị Đà Nẵng...",
  ];

  const [pandaMessage, setPandaMessage] = useState("");
  useEffect(() => {
    const pandaMessages = [
      "🍜 Mình đang thu thập thông tin món ăn của bạn... ngon lắm nè!",
      "😋 Mình nghĩ bạn chọn món yêu thích... hay là thử thêm? 🤭",
      "🐼 Chọn món đậm chất Đà Nẵng nhé!",
      "👀 Mình đang theo dõi lựa chọn của bạn đấy!",
    ];
    const randomMsg = pandaMessages[Math.floor(Math.random() * pandaMessages.length)];
    setPandaMessage(randomMsg);
  }, [currentStep]);

  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loadingMessages]);

  if (loading) {
    return (
      <div className="flex flex-col w-screen items-center justify-center h-screen bg-gradient-to-br from-teal-50 to-purple-50 z-50 text-center px-6">
        <LoadingWithHamster />
        <p className="mt-6 text-lg md:text-xl font-semibold text-gray-700 animate-pulse">Đang tải dữ liệu ẩm thực...</p>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="flex flex-col w-screen items-center justify-center h-screen bg-gradient-to-br from-teal-50 to-purple-50 z-50 text-center px-6">
        <LoadingWithHamster />
        <p className="mt-6 text-lg md:text-xl font-semibold text-gray-700 animate-pulse">{loadingMessages[messageIndex]}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center font-sans bg-[url('/danang-food-bg.png')] bg-fixed bg-cover bg-no-repeat px-8 w-full max-w-[1200px] mx-auto">
      <AnimatePresence>
        {showIntro && <IncompleteAssessment onClose={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl my-2 overflow-y-auto"
        >


          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <Question1 selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} handleNext={handleNext} />
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <Question2 selectedFoods={selectedFoods} setFavoriteFood={setFavoriteFood} handleNext={handleNext} handleBack={handlePrevious} />
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <Question3 setMustTryFoods={setMustTryFoods} handleNext={handleNext} handleBack={handlePrevious} />
              </motion.div>
            )}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <Question4 setQuote={setQuote} handleNext={handleSubmit} handleBack={handlePrevious} />
              </motion.div>
            )}
            {currentStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <Result selectedFoods={selectedFoods} favoriteFood={favoriteFood} mustTryFoods={mustTryFoods} quote={quote} handleTestAgain={handleTestAgain} />
              </motion.div>
            )}
          </AnimatePresence>

          {currentStep < 5 && (
            <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-md italic font-bold text-red-500 text-center animate-pulse">{pandaMessage}</div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TestKnowledge;