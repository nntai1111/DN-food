import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingWithHamster from "../../../components/LoadHamster/LoadingWithHamster";
import q1 from "../../../data/q1.json";
import Question1 from "../../../components/Content/Question1";
import Question2 from "../../../components/Content/Question2";
import Question3 from "../../../components/Content/Question3";
import Question4 from "../../../components/Content/Question4";
import Result from "../../../components/Content/Result";

const LOADING_MESSAGES = [
  "🍴 Đang lưu thông tin món ăn...",
  "🐹 Hamster đang xử lý lựa chọn của bạn...",
  "📊 Đang thu thập dữ liệu ẩm thực...",
  "💫 Đang tổng hợp hương vị Đà Nẵng...",
];

const PANDA_MESSAGES = [
  "🍜 Mình đang thu thập thông tin món ăn của bạn... ngon lắm nè!",
  "😋 Mình nghĩ bạn chọn món yêu thích... hay là thử thêm? 🤭",
  "🐼 Chọn món đậm chất Đà Nẵng nhé!",
  "👀 Mình đang theo dõi lựa chọn của bạn đấy!",
];

const STEPS = [
  { component: Question1, props: { key: "step1" } },
  { component: Question2, props: { key: "step2" } },
  { component: Question3, props: { key: "step3" } },
  { component: Question4, props: { key: "step4" } },
  { component: Result, props: { key: "step5" } },
];

const TestKnowledge = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [favoriteFood, setFavoriteFood] = useState("");
  const [mustTryFoods, setMustTryFoods] = useState("");
  const [quote, setQuote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Handle loading messages during submission
  useEffect(() => {
    if (!submitting) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [submitting]);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setCurrentStep(5);
    }, 2000);
  };

  const handleTestAgain = () => {
    setCurrentStep(1);
    setSelectedFoods([]);
    setFavoriteFood("");
    setMustTryFoods("");
    setQuote("");
  };

  const randomPandaMessage =
    PANDA_MESSAGES[Math.floor(Math.random() * PANDA_MESSAGES.length)];

  if (submitting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-teal-50 to-purple-50 text-center px-6">
        <LoadingWithHamster />
        <p className="mt-6 text-lg md:text-xl font-semibold text-gray-700 animate-pulse">
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>
    );
  }

  const CurrentStepComponent = STEPS[currentStep - 1]?.component;
  const stepProps = {
    selectedFoods,
    setSelectedFoods,
    setFavoriteFood,
    setMustTryFoods,
    setQuote,
    handleNext,
    handleBack: handlePrevious,
    handleSubmit,
    favoriteFood,
    mustTryFoods,
    quote,
    handleTestAgain,
    ...STEPS[currentStep - 1]?.props,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      {/* Nền mờ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Box nội dung */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-30 rounded-2xl my-2 overflow-y-auto bg-white/90 backdrop-blur-md shadow-xl p-6 max-w-3xl w-11/12"
      >
        <AnimatePresence mode="wait">
          {CurrentStepComponent && (
            <motion.div
              key={stepProps.key}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <CurrentStepComponent {...stepProps} />
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep < 5 && (
          <div className="flex flex-col items-center justify-center mt-4 bg-white/80 p-4 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-md italic font-bold text-red-500 text-center animate-pulse">
              {randomPandaMessage}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TestKnowledge;
