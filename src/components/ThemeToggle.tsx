import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative z-50 p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-transform duration-200 shadow-sm border border-gray-200 dark:border-gray-700 active:scale-95 cursor-pointer hover:shadow-md"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};
