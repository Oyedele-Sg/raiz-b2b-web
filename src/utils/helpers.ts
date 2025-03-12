import { months, tiers } from "@/constants/misc";
import { toast } from "sonner";
import * as CryptoJS from "crypto-js";

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

export const truncateString = (str: string, length: number): string => {
  return str.length > length ? `${str.substring(0, length - 2)}...` : str;
};

export const copyToClipboard = (value: string) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast.success("Copied to clipboard");
    })
    .catch((error) => {
      toast.error("Unable to copy to clipboard:", error);
    });
};

export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

export function extractObjectUrlFromSignedUrl(signedUrl: string): string {
  const url = new URL(signedUrl);
  return url.origin + url.pathname;
}

export const getTierInfo = (value: number) => {
  const currentTier =
    tiers.find((tier) => value >= tier.min && value <= tier.max) || tiers[0];

  const currentTierIndex = tiers.findIndex(
    (tier) => value >= tier.min && value <= tier.max
  );

  const nextTier =
    currentTierIndex >= 0 && currentTierIndex < tiers.length - 1
      ? tiers[currentTierIndex + 1]
      : tiers[tiers.length - 1];

  return { currentTier, nextTier };
};

export const getAppRatingLink = () => {
  if (typeof window !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.userAgent.toLowerCase();

    if (/android/i.test(userAgent)) {
      return "https://play.google.com/store/apps/details?id=com.raiz.application&hl=en&pli=1";
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      return "https://apps.apple.com/us/app/raiz-app/id6502309659?mt=8";
    } else if (platform.includes("win")) {
      return "https://play.google.com/store/apps/details?id=com.raiz.application&hl=en&pli=1";
    } else if (platform.includes("mac")) {
      return "https://apps.apple.com/us/app/raiz-app/id6502309659?mt=8";
    }
  }

  return "https://apps.apple.com/us/app/raiz-app/id6502309659?mt=8";
};

export const iv = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");

export const passwordHash = (password: string): string => {
  const fixedSalt = "myFixedSalt";
  const keySize = 256 / 32; // 256-bit key size
  const iterations = 1000;
  const key = CryptoJS.PBKDF2(password, fixedSalt, {
    keySize,
    iterations,
  });
  // Use the derived key for encryption
  return CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.CFB,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  }).toString();
};
