
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../../../hooks/useAudio";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";
import { WelcomePopup } from "../../../components/IntroComponents/WelcomePopup";
import { MemberIntro } from "../../../components/IntroComponents/Member";
import { Func } from "../../../components/IntroComponents/Function";
import { ContentList } from "../../../components/IntroComponents/Content";
import { ContentList2 } from "../../../components/IntroComponents/Content2";
import TestEmotion from "./TestEmotion";
const Intro = () => {
  const question1Ref = useRef(null);
  const question2Ref = useRef(null);
  const question3Ref = useRef(null);
  const question4Ref = useRef(null);
  const question5Ref = useRef(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const { currentStep, goToNext, goToPrevious } = useMultiStepForm(5);
  const { playing, muted, toggle: toggleAudio, toggleMute } = useAudio("/sounds/chill.mp3");

  const closeWelcomeAndStart = () => {
    setShowWelcomePopup(false);
    if (!playing) toggleAudio();
    setTimeout(() => {
      if (question1Ref.current) {
        question1Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 500);
  };

  const handleConfirm = (step) => {
    if (step < 4) {
      goToNext();
      setTimeout(() => {
        const nextRef =
          step === 0
            ? question2Ref
            : step === 1
              ? question3Ref
              : step === 2
                ? question4Ref
                : question5Ref;
        if (nextRef?.current) {
          nextRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('/bg1e.jpg')`,
        // backgroundImage: `url('/bg1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <img
        src="/bga1.png"
        alt="bg1"
        className="absolute bottom-0 left-0 right-0 w-full h-[70%] object-cover pointer-events-none"
      /> */}


      <div className="relative z-10">
        <ProgressIndicator currentStep={currentStep} totalSteps={4} />
        {!showWelcomePopup && (
          <MuteButton isMuted={muted} onToggle={toggleMute} />
        )}
        {currentStep > 0 && currentStep < 5 && !showWelcomePopup && (
          <motion.button
            onClick={goToPrevious}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-4 left-4 bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 z-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Quay lại
          </motion.button>
        )}

        <div className="absolute inset-0 bg-black/20 z-10 rounded-2xl"></div>

        <AnimatePresence mode="wait">
          {showWelcomePopup && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <WelcomePopup onClose={closeWelcomeAndStart} />
            </motion.div>
          )}

          {!showWelcomePopup && currentStep === 0 && (
            <motion.div
              key="step1"
              // initial={{ opacity: 0, x: 100 }}
              // animate={{ opacity: 1, x: 0 }}
              // exit={{ opacity: 0, x: -100 }}
              // transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full relative z-30"
            >
              <TestEmotion
                ref={question1Ref}
                onConfirm={() => handleConfirm(0)}
                isLoading={false}
              />
            </motion.div>
          )}

          {!showWelcomePopup && currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ContentList2
                ref={question2Ref}
                onConfirm={() => handleConfirm(1)}
                isLoading={false}
              />
            </motion.div>
          )}

          {!showWelcomePopup && currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ContentList
                ref={question3Ref}
                onConfirm={() => handleConfirm(2)}
                isLoading={false}
              />
            </motion.div>
          )}

          {!showWelcomePopup && currentStep === 3 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Func
                ref={question4Ref}
                onConfirm={() => handleConfirm(3)}
                isLoading={false}
              />
            </motion.div>
          )}
        </AnimatePresence>  </div>

    </div>
  );
};

const MuteButton = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
    >
      {isMuted ? (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clipRule="evenodd"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </button>
  );
};

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: index <= currentStep ? 1.2 : 1, opacity: 1 }}
          className={`w-3 h-3 rounded-full transition-all ${index <= currentStep ? "bg-white" : "bg-white/30"
            }`}
        />
      ))}
    </div>
  );
};

export default Intro;