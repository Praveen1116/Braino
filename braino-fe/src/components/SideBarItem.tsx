import type { ReactElement } from "react";
import { motion } from "framer-motion";

interface SideBarItemProps {
  title: string;
  startIcon?: ReactElement;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SideBarItem({
  title,
  startIcon,
  isSelected,
  onClick,
}: SideBarItemProps) {
  return (
    <motion.button
      className={`flex items-center gap-2 mt-2 cursor-pointer p-3 rounded-lg w-full transition-colors
        ${
          isSelected
            ? "bg-blue-200 text-blue-900 font-semibold"
            : "bg-gray-50 hover:bg-blue-100"
        }
      `}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {startIcon}
      {title}
    </motion.button>
  );
}