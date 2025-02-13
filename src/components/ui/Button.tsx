import React, { ReactNode } from "react";
import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  width?: "fit" | "full";
  icon?: string | ReactNode;
  iconPosition?: "left" | "right";
  iconLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  width = "full",
  icon,
  iconPosition,
  iconLabel,
}) => {
  const baseStyles = `relative px-6 py-3.5 rounded-[100px] focus:outline-none transition ease-in-out duration-300 text-[15px]`;
  const disabledStyles = `bg-raiz-gray-200 hover:cursor-not-allowed hover:bg-raiz-gray-200 text-raiz-gray-400`;

  const variants = {
    primary: `bg-primary2 text-[#f9f9f9] hover:bg-primary2/90 `,
    secondary: ``,
    tertiary: `border border-[#2EB34A] hover:bg-[#096F3A5D] text-[#2EB34A]`,
  };

  const widthStyles = {
    fit: "w-auto",
    full: "w-full",
  };

  const selectedStyles = disabled ? disabledStyles : variants[variant];

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${selectedStyles} ${widthStyles[width]} ${className} flex items-center justify-center `}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <span className="ml-3 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
      ) : (
        children
      )}
      {icon && (
        <div
          className={`${
            iconPosition === "right" ? "absolute right-4" : "absolute left-4"
          }`}
        >
          {typeof icon === "string" ? (
            <Image
              className="w-5 h-5 cursor-pointer"
              width={20}
              height={20}
              src={icon || ""}
              alt={iconLabel || ""}
              onClick={onClick}
            />
          ) : (
            icon
          )}
        </div>
      )}
    </button>
  );
};

export default Button;
