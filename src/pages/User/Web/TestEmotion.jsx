import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import alertIcon from "../../../util/icon/alertOctagon.json";
import LoadingWithHamster from "../../../components/LoadHamster/LoadingWithHamster";
import LoadingPanda from "../../../components/LoadHamster/LoadingPanda";
import q1 from "../../../data/q1.json";
import q2 from "../../../data/q2.json";
import q3 from "../../../data/q3.json";
import q4 from "../../../data/q4.json";

// IncompleteAssessment Component (unchanged)
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
      className="bg-gradient-to-br from-[#f0f9ff] to-[#fdf4ff] rounded-3xl p-8 md:p-12 shadow-2xl max-w-xl w-full flex flex-col items-center relative space-y-6"
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 text-2xl font-bold"
        onClick={onClose}
        aria-label="Đóng"
      >
        &times;
      </button>
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl mb-2 select-none"
      >
        📝
      </motion.div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
        Bạn chưa hoàn tất bài kiểm tra
      </h3>
      <p className="text-gray-600 text-center max-w-md text-sm md:text-base">
        Hãy dành vài phút để tìm hiểu lý do vì sao bài kiểm tra này quan trọng với bạn 💜
      </p>
      <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-indigo-400 w-full">
        <div className="flex items-center mb-2">
          <span className="text-indigo-500 text-xl mr-2">ℹ️</span>
          <p className="font-medium text-gray-800">Bài trắc nghiệm là gì?</p>
        </div>
        <p className="text-gray-600 text-sm">
          Đây là bài kiểm tra kiến thức về tư tưởng Hồ Chí Minh, giúp bạn hiểu rõ hơn về độc lập dân tộc 🌍
        </p>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-teal-400 w-full">
        <div className="flex items-center mb-2">
          <span className="text-teal-500 text-xl mr-2">🔒</span>
          <p className="font-medium text-gray-800">Bảo mật tuyệt đối</p>
        </div>
        <p className="text-gray-600 text-sm">
          Mọi câu trả lời của bạn đều được xử lý ẩn danh và không liên kết với danh tính cá nhân 💫
        </p>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-pink-400 w-full">
        <div className="flex items-center mb-2">
          <span className="text-pink-500 text-xl mr-2">🌱</span>
          <p className="font-medium text-gray-800">Chỉ mất 3 phút</p>
        </div>
        <p className="text-gray-600 text-sm">
          Hoàn thành bài test để kiểm tra và củng cố kiến thức về Hồ Chí Minh chỉ trong vài phút ⏳
        </p>
      </div>
    </motion.div>
  </motion.div>
);

// TestKnowledge Component
const TestKnowledge = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [scores, setScores] = useState({ correct: 0 });
  const [results, setResults] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null); // Track selected question set
  const questionSets = [
    { name: "Full Test - Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội", data: [...q1, ...q2, ...q3, ...q4] },
    { name: "Tư tưởng Hồ Chí Minh về độc lập dân tộc", data: q1 },
    { name: "Tư tưởng Hồ Chí Minh về cách mạng giải phóng dân tộc", data: q2 },
    { name: "Tư tưởng Hồ Chí Minh về chủ nghĩa xã hội và xây dựng chủ nghĩa xã hội ở Việt Nam", data: q3 },
    { name: "Mối quan hệ giữa độc lập dân tộc và chủ nghĩa xã hội", data: q4 },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Load questions based on selected set
  useEffect(() => {
    if (selectedSet !== null) {
      const selectedData = questionSets[selectedSet].data;
      setQuestions(selectedData.sort((a, b) => a.Order - b.Order));
      setTotalQuestions(selectedData.length);
      setLoading(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setSubmitted(false);
      setScores({ correct: 0 });
      setResults([]);
    }
  }, [selectedSet]);

  // Handle option selection
  const handleOptionChange = useCallback(
    (optionContent) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: optionContent,
      }));
    },
    [currentQuestionIndex]
  );

  // Handle navigation
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle question selection from sidebar
  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Handle test submission
  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    setSubmitted(true);
    let correctCount = 0;
    const resultDetails = Object.entries(answers).map(([index, selectedOption]) => {
      const question = questions[parseInt(index)];
      const correctOption = question.options.find((opt) => opt.Id === question.CorrectAnswer).Content;
      const isCorrect = selectedOption === correctOption;
      if (isCorrect) correctCount++;
      return {
        question: question.Content,
        selected: selectedOption || "Chưa chọn",
        correct: correctOption,
        isCorrect,
      };
    });
    setScores({ correct: correctCount });
    setResults(resultDetails);
    setSubmitting(false);
  }, [answers, questions]);

  // Reset test
  const handleTestAgain = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScores({ correct: 0 });
    setResults([]);
    setSelectedSet(null); // Return to set selection
  };

  const loadingMessages = [
    "🧠 Đang chấm điểm bài kiểm tra...",
    "🐹 Hamster đang kiểm tra đáp án của bạn...",
    "📊 Đang tính toán kết quả kiến thức...",
    "💫 Đang phân tích câu trả lời...",
  ];

  const [pandaMessage, setPandaMessage] = useState("");
  useEffect(() => {
    const pandaMessages = [
      "🧠 Mình đang kiểm tra kiến thức của bạn... dễ mà, phải không?",
      "📉 Mình nghĩ bạn biết câu này... hay là đoán? 🤭",
      "🐼 Câu này có liên quan đến Hồ Chí Minh, chọn cẩn thận nhé!",
      "👀 Mình đang theo dõi bạn chọn đáp án đấy!",
    ];
    const randomMsg = pandaMessages[Math.floor(Math.random() * pandaMessages.length)];
    setPandaMessage(randomMsg);
  }, [currentQuestionIndex]);

  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (submitting) {
    return (
      <div className="flex flex-col w-screen items-center justify-center h-screen bg-gradient-to-br from-teal-50 to-purple-50 z-50 text-center px-6">
        <LoadingWithHamster />
        <p className="mt-6 text-lg md:text-xl font-semibold text-gray-700 animate-pulse">
          {loadingMessages[messageIndex]}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className=" flex flex-col items-center font-sans 
     bg-[url('/hcm3.png')] bg-fixed bg-cover bg-no-repeat px-8 w-full max-w-[1200px] mx-auto">
      <AnimatePresence  >
        {showIntro && (
          <IncompleteAssessment onClose={() => setShowIntro(false)} />
        )}
      </AnimatePresence >

      {!showIntro && selectedSet === null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-4xl my-12">
          {questionSets.map((set, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSet(index)}
              className="w-full h-24 flex flex-col justify-center items-center 
                 bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 
                 hover:from-rose-500 hover:via-red-500 hover:to-orange-500 
                 text-white rounded-2xl font-semibold shadow-md hover:shadow-xl 
                 transition-all duration-300"
            >
              <span className="text-lg text-center">{set.name}</span>
              <span className="text-sm opacity-90">({set.data.length} câu)</span>
            </motion.button>
          ))}
        </div>
      )}

      {
        !showIntro && selectedSet !== null && (
          <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-4">
            {/* Sidebar for Question Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-4 md:p-6 h-fit md:sticky md:top-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh sách câu hỏi</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuestionSelect(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full text-sm font-medium transition-all duration-200 ${index === currentQuestionIndex
                      ? "bg-indigo-500 text-white"
                      : answers[index]
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="w-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-xl font-semibold text-gray-800 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md max-w-[600px] break-words">
                    <span className="text-blue-700">Bộ câu hỏi:</span> {questionSets[selectedSet].name}
                  </h2>

                  <motion.button
                    onClick={() => setSelectedSet(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 
                 hover:from-rose-500 hover:via-red-500 hover:to-orange-500 text-white px-4 py-2 mx-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Chọn bộ khác
                  </motion.button>
                </div>
                {!submitted && currentQuestion && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="bg-white p-4 md:px-8 rounded-2xl shadow-lg min-h-[340px] max-w-[1000px] flex flex-col justify-between break-words"
                    >

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center italic"
                      >
                        Câu {currentQuestionIndex + 1}/{totalQuestions}: {currentQuestion.Content}
                      </motion.p>
                      <motion.div
                        className="flex flex-col w-full space-y-3 md:space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                      >
                        {currentQuestion.options.map((option) => (
                          <motion.button
                            key={option.Id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionChange(option.Content)}
                            className={`p-3 md:p-4 rounded-lg text-left transition-all duration-300 text-base font-medium ${answers[currentQuestionIndex] === option.Content
                              ? "bg-indigo-100 text-indigo-700 shadow-md"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                              }`}
                          >
                            {option.Content}
                          </motion.button>
                        ))}
                      </motion.div>
                      <div className="flex justify-between mt-6">
                        <motion.button
                          onClick={handlePrevious}
                          disabled={isFirstQuestion}
                          whileHover={{ scale: isFirstQuestion ? 1 : 1.05 }}
                          whileTap={{ scale: isFirstQuestion ? 1 : 0.95 }}
                          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${isFirstQuestion
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg hover:shadow-xl"
                            }`}
                        >
                          Quay lại
                        </motion.button>
                        {isLastQuestion ? (
                          <motion.button
                            onClick={handleSubmit}
                            disabled={!answers[currentQuestionIndex]}
                            whileHover={{ scale: answers[currentQuestionIndex] ? 1.05 : 1 }}
                            whileTap={{ scale: answers[currentQuestionIndex] ? 0.95 : 1 }}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${answers[currentQuestionIndex]
                              ? "bg-gradient-to-r from-emerald-500 to-indigo-500 text-white shadow-lg hover:shadow-xl"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                          >
                            Nộp bài
                          </motion.button>
                        ) : (
                          <motion.button
                            onClick={handleNext}
                            disabled={!answers[currentQuestionIndex]}
                            whileHover={{ scale: answers[currentQuestionIndex] ? 1.05 : 1 }}
                            whileTap={{ scale: answers[currentQuestionIndex] ? 0.95 : 1 }}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${answers[currentQuestionIndex]
                              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                          >
                            Tiếp theo
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {submitted && (
                  <div className="mt-10">
                    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-200">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-6">
                        🧠 Kết quả bài trắc nghiệm
                      </h2>
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 md:p-6 rounded-xl mb-6 border-l-4 border-indigo-400">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                          📋 Kết quả
                        </h3>
                        <p className="text-sm text-gray-700">
                          Bạn đã trả lời đúng {scores.correct}/{totalQuestions} câu hỏi.
                        </p>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-4">
                          Chi tiết câu trả lời
                        </h3>
                        {results.map((result, index) => (
                          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                            <p className="text-sm font-medium text-gray-800">
                              Câu {index + 1}: {result.question}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Đáp án của bạn:</strong> {result.selected}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Đáp án đúng:</strong> {result.correct}
                            </p>
                            <p className={`text-sm font-semibold ${result.isCorrect ? "text-green-600" : "text-red-600"}`}>
                              {result.isCorrect ? "Đúng" : "Sai"}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center">
                        <motion.button
                          onClick={handleTestAgain}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          Thử lại
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}

                {!submitted && (
                  <div className="flex flex-col items-center justify-center mt-2 bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
                    <div className="text-md italic font-bold text-[#fd6c6c] text-center animate-pulse">
                      {pandaMessage}
                    </div>
                    {/* <LoadingPanda /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default TestKnowledge;