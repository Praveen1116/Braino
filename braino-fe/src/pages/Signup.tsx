import { useRef } from "react";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";
import { motion } from "framer-motion";

const BrainIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.74.56-3.34 1.51-4.66.45.65.73 1.42.73 2.26 0 2.21 1.79 4 4 4 1.34 0 2.52-.67 3.23-1.68.85.64 1.9.99 3.03.95-.24 2.89-2.22 5.13-4.5 5.13zM15.5 8c-1.18 0-2.25.48-3.02 1.25l-1.07-1.07C12.33 7.26 13.85 6.5 15.5 6.5c2.21 0 4 1.79 4 4 0 .93-.28 1.78-.76 2.49-.65-.57-1.48-.92-2.39-.96-.44-2.21-2.4-3.88-4.75-3.88-2.02 0-3.77 1.22-4.53 2.94C7.05 10.42 6.8 9.74 6.8 9c0-3.14 2.41-5.73 5.5-5.96V5c0-1.66 1.34-3 3-3s3 1.34 3 3v.04c2.83.47 5 2.94 5 5.96 0 1.96-1.01 3.7-2.56 4.75C20.18 16.92 19 18.28 19 20h-2c0-2.21 1.79-4 4-4 .66 0 1.28.16 1.83.44C22.45 15.17 22 13.64 22 12c0-5.52-4.48-10-10-10z"/>
  </svg>
);

const IdeaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
  </svg>
);

const HexagonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21 16.5l-9 5.2-9-5.2v-9l9-5.2 9 5.2v9zm-9-13.4l-8.2 4.7v8.6l8.2 4.7 8.2-4.7V7.8L12 3.1z"/>
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

const GearIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

import type { Transition } from "framer-motion";

const floatTransition: Transition = {
  repeat: Infinity,
  repeatType: "reverse",
  ease: [0.42, 0, 0.58, 1],
};

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_API_URL;

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        await axios.post(`${BACKEND_URL}/api/v1/braino/signup`, {
            username,
            password
        });
        navigate("/signin");
        alert("You are signed up");
    } catch (e) {
        alert("Error signing up. Username might be taken.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Poppins'] relative overflow-hidden">
      
      <motion.div
        className="absolute text-blue-200 opacity-40 blur-sm"
        initial={{ top: "-10%", left: "-10%" }}
        animate={{
          top: ["-10%", "50%", "10%"],
          left: ["-10%", "40%", "80%"],
          scale: [1, 1.2, 0.9],
          rotate: [0, 20, -10]
        }}
        transition={{ ...floatTransition, duration: 25 }}
      >
        <BrainIcon className="w-80 h-80" />
      </motion.div>

      <motion.div
        className="absolute text-yellow-200 opacity-40 blur-sm"
        initial={{ bottom: "5%", right: "-5%" }}
        animate={{
          bottom: ["5%", "60%", "20%"],
          right: ["-5%", "45%", "90%"],
          rotate: [0, -30, 60],
          scale: [1, 1.1, 0.8]
        }}
        transition={{ ...floatTransition, duration: 30 }}
      >
        <IdeaIcon className="w-64 h-64" />
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-1/4 text-purple-200 opacity-30 blur-sm"
        animate={{
          y: ["0%", "80%", "-40%"],
          x: ["0%", "-80%", "40%"],
          rotate: [0, 180, 90],
          scale: [1, 0.8, 1.2],
        }}
        transition={{ ...floatTransition, duration: 35 }}
      >
        <HexagonIcon className="w-48 h-48" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-20 text-green-200 opacity-40 blur-sm"
        animate={{
            y: ["0%", "-120%", "40%"],
            x: ["0%", "50%", "-30%"],
            rotate: [0, -45, 10]
        }}
        transition={{ ...floatTransition, duration: 28 }}
      >
        <BookIcon className="w-40 h-40" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-10 text-pink-200 opacity-30 blur-sm"
        animate={{
          y: ["0%", "100%", "-20%"],
          x: ["0%", "60%", "-10%"],
          rotate: [0, 90, -45]
        }}
        transition={{ ...floatTransition, duration: 32 }}
      >
        <DocumentIcon className="w-32 h-32" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-10 text-gray-300 opacity-30 blur-sm"
        animate={{
          y: ["0%", "-80%", "30%"],
          x: ["0%", "-40%", "20%"],
          rotate: [0, 360, 180]
        }}
        transition={{ ...floatTransition, duration: 40 }}
      >
        <GearIcon className="w-36 h-36" />
      </motion.div>

      <motion.div
        className="absolute top-10 right-1/3 text-orange-200 opacity-30 blur-sm"
        animate={{
          y: ["0%", "60%", "-30%"],
          x: ["0%", "30%", "-50%"],
          rotate: [0, -20, 45]
        }}
        transition={{ ...floatTransition, duration: 26 }}
      >
        <IdeaIcon className="w-24 h-24" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/3 text-indigo-200 opacity-25 blur-sm"
        animate={{
          y: ["0%", "-50%", "20%"],
          x: ["0%", "40%", "-40%"],
          rotate: [0, 45, -90]
        }}
        transition={{ ...floatTransition, duration: 22 }}
      >
        <HexagonIcon className="w-20 h-20" />
      </motion.div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl p-12 relative z-10">
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Join Braino</h2>
            <p className="text-gray-500 mt-2">Create your second brain today.</p>
        </div>
        
        <div className="mb-6 space-y-4 bg-sky-50/50 p-4 rounded-2xl">
          <Input placeholder="Username" reference={usernameRef} />
          <Input placeholder="Password" reference={passwordRef} />
        </div>
        <div className="flex justify-center mt-8">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
             <Button title={"Sign Up"} variant="submission" onClick={signup} />
          </motion.div>
        </div>
         <p className="text-center mt-6 text-gray-600">
            Already have an account? <span onClick={() => navigate('/signin')} className="text-blue-500 cursor-pointer hover:underline">Sign in</span>
        </p>
      </div>
    </div>
  );
}