import { useCallback } from "react";

const useShare = (referralCode: string) => {
  const shareOnWhatsApp = useCallback(() => {
    const message = encodeURIComponent(
      `Hi there,  Use my referral code: ${referralCode} to get raized!`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  }, [referralCode]);

  const shareOnIMessage = useCallback(() => {
    const message = encodeURIComponent(
      `Use my referral code: ${referralCode} to join!`
    );
    window.open(`sms:&body=${message}`, "_blank");
  }, [referralCode]);

  const shareOnAll = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Referral Code",
          text: `Use my referral code: ${referralCode} to join!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  }, [referralCode]);

  return { shareOnWhatsApp, shareOnIMessage, shareOnAll };
};

export default useShare;
