import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 dark:text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-green-600 dark:text-green-500" />
      <p className="font-medium">Loading digital assets...</p>
    </div>
  );
};
