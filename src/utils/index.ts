import { months } from "@/constants/misc";

export const getLastThreeMonths = () => {
  const currentMonth = new Date().getMonth();
  return [
    months[(currentMonth + 11) % 12], // Previous month
    months[currentMonth], // Current month
    months[(currentMonth + 1) % 12], // Next month
  ];
};

// Format time to display as "00:59"
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
