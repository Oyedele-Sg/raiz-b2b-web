"use client";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  name: string;
  src: string | null;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name = "User", src, size = 48 }) => {
  const { selectedCurrency } = useCurrencyStore();
  const [imageError, setImageError] = useState(false);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full  text-white ${
        selectedCurrency.name === "USD" ? "bg-raiz-usd-primary" : "bg-primary"
      } `}
      style={{ width: size, height: size, fontSize: size / 3 }}
    >
      {src && !imageError ? (
        <Image
          src={src}
          alt={name}
          className="rounded-full object-cover"
          width={size}
          height={size}
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
