import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes

export const useAutoLogout = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const logout = () => {
      console.log("Logging out due to inactivity...");
      Cookies.remove("access_token");
      router.push("/login");
    };

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(logout, AUTO_LOGOUT_TIME);
    };

    resetTimer();

    // Events to reset the timer on user activity
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Handle tab/browser close
    const handleTabClose = () => {
      Cookies.remove("access_token");
    };
    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);
};
