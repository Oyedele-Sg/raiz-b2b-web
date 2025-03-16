import { getAppRatingLink } from "@/utils/helpers";

export const SettingsMenus = [
  {
    name: "Your profile",
    link: "/settings",
    icon: () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#EAECFF" fillOpacity="0.6" />
        <path
          opacity="0.65"
          d="M19.9999 20C22.3011 20 24.1666 18.1345 24.1666 15.8333C24.1666 13.5321 22.3011 11.6667 19.9999 11.6667C17.6987 11.6667 15.8333 13.5321 15.8333 15.8333C15.8333 18.1345 17.6987 20 19.9999 20Z"
          fill="#8A5E35"
        />
        <path
          d="M25 22.5H15C13.6192 22.5 12.5 23.6192 12.5 25C12.5 26.3808 13.6192 27.5 15 27.5H25C26.3808 27.5 27.5 26.3808 27.5 25C27.5 23.6192 26.3808 22.5 25 22.5Z"
          fill="#A03976"
        />
      </svg>
    ),
  },
  {
    name: "Login and Security",
    link: "/settings/login-security",
    icon: () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          opacity="0.65"
          d="M22.0833 11.6667C18.6316 11.6667 15.8333 14.465 15.8333 17.9167C15.8333 21.3683 18.6316 24.1667 22.0833 24.1667C25.5349 24.1667 28.3333 21.3683 28.3333 17.9167C28.3333 14.465 25.5349 11.6667 22.0833 11.6667ZM24.1666 17.5C23.2458 17.5 22.4999 16.7542 22.4999 15.8333C22.4999 14.9125 23.2458 14.1667 24.1666 14.1667C25.0874 14.1667 25.8333 14.9125 25.8333 15.8333C25.8333 16.7542 25.0874 17.5 24.1666 17.5Z"
          fill="#FF9900"
        />
        <path
          d="M16.3226 20.3442L11.9109 24.7558C11.7542 24.9125 11.6667 25.1242 11.6667 25.345V27.5C11.6667 27.96 12.0401 28.3333 12.5001 28.3333H14.6551C14.8759 28.3333 15.0884 28.2458 15.2442 28.0892L16.3217 27.0117C16.5426 26.7908 16.6667 26.4908 16.6667 26.1783C16.6667 25.5275 17.1942 25 17.8451 25C18.1576 25 18.4576 24.8758 18.6784 24.655L19.6559 23.6775C18.1559 23.045 16.9551 21.8433 16.3226 20.3442Z"
          fill="#E8A005"
        />
      </svg>
    ),
  },
  {
    name: "Help and Support",
    link: "/settings/help&support",
    icon: () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          opacity="0.45"
          d="M14 25V13C14 11.343 15.343 10 17 10H25C26.657 10 28 11.343 28 13V25C28 26.657 26.657 28 25 28H17C15.343 28 14 26.657 14 25Z"
          fill="#0151F2"
        />
        <path
          d="M17 28C15.343 28 14 26.657 14 25V13C12.895 13 12 13.895 12 15V27C12 28.657 13.343 30 15 30H23C24.105 30 25 29.105 25 28H17Z"
          fill="#385DA5"
        />
        <path
          d="M20.8831 20.973H20.8771C20.2071 20.973 19.6901 20.368 19.8051 19.708C20.1551 17.695 21.7221 17.625 21.7221 16.375C21.7221 16.028 21.6621 15.251 20.8261 15.251C20.3741 15.251 20.1081 15.54 19.9531 15.848C19.7441 16.265 19.2621 16.47 18.8031 16.389C18.1071 16.265 17.6801 15.519 17.9751 14.877C18.3971 13.96 19.2611 13 20.9721 13C23.7481 13 24.1201 15.174 24.1201 16.196C24.1201 18.612 22.3211 18.702 21.9481 20.094C21.8131 20.596 21.4031 20.973 20.8831 20.973ZM22.3251 23.533C22.3251 23.945 22.1981 24.293 21.9431 24.576C21.6871 24.858 21.3521 25 20.9401 25C20.5261 25 20.1921 24.858 19.9371 24.576C19.6821 24.293 19.5531 23.945 19.5531 23.533C19.5531 23.13 19.6821 22.783 19.9371 22.488C20.1921 22.195 20.5261 22.049 20.9401 22.049C21.3521 22.049 21.6871 22.195 21.9431 22.488C22.1981 22.783 22.3251 23.131 22.3251 23.533Z"
          fill="#385DA5"
        />
      </svg>
    ),
  },
  {
    name: "About",
    link: "https://www.raiz.app/about-us.php",
    icon: () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          opacity="0.35"
          d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
          fill="#006C84"
        />
        <path
          d="M19 25V20C19 19.448 19.448 19 20 19C20.552 19 21 19.448 21 20V25C21 25.552 20.552 26 20 26C19.448 26 19 25.552 19 25Z"
          fill="#066B82"
        />
        <path
          d="M20 17C20.8284 17 21.5 16.3284 21.5 15.5C21.5 14.6716 20.8284 14 20 14C19.1716 14 18.5 14.6716 18.5 15.5C18.5 16.3284 19.1716 17 20 17Z"
          fill="#066B82"
        />
      </svg>
    ),
    newTab: true,
  },
  {
    name: "Legal",
    link: "https://www.raiz.app/privacy-policy.php",
    icon: () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <g clipPath="url(#clip0_24169_859)">
          <path
            opacity="0.35"
            d="M25 10H13C12.448 10 12 10.448 12 11V29C12 29.552 12.448 30 13 30H25C26.657 30 28 28.657 28 27V13C28 11.343 26.657 10 25 10Z"
            fill="#9B4E32"
          />
          <path
            d="M22.5 15C22.114 15 17.886 15 17.5 15C16.672 15 16 15.672 16 16.5C16 17.328 16.672 18 17.5 18C17.886 18 22.114 18 22.5 18C23.328 18 24 17.328 24 16.5C24 15.672 23.328 15 22.5 15Z"
            fill="#9D6062"
          />
          <path
            d="M31 32C30.744 32 30.488 31.902 30.293 31.707L26.281 27.695C25.89 27.304 25.89 26.672 26.281 26.281C26.672 25.89 27.304 25.89 27.695 26.281L31.707 30.293C32.098 30.684 32.098 31.316 31.707 31.707C31.512 31.902 31.256 32 31 32Z"
            fill="#895538"
          />
          <path
            d="M30.498 26.069L26.069 30.498C25.4 31.167 24.316 31.167 23.647 30.498L21.502 28.353C20.833 27.684 20.833 26.6 21.502 25.931L25.931 21.502C26.6 20.833 27.684 20.833 28.353 21.502L30.498 23.647C31.167 24.316 31.167 25.4 30.498 26.069Z"
            fill="#895538"
          />
        </g>
        <defs>
          <clipPath id="clip0_24169_859">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(8 8)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    newTab: true,
  },
  {
    name: "Freeze Account",
    link: "/settings/freeze-account",
    icon: () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          opacity="0.35"
          d="M20 13.5C19.744 13.5 19.488 13.402 19.293 13.207L17.293 11.207C16.902 10.816 16.902 10.184 17.293 9.79301C17.684 9.40201 18.316 9.40201 18.707 9.79301L20 11.086L21.293 9.79301C21.684 9.40201 22.316 9.40201 22.707 9.79301C23.098 10.184 23.098 10.816 22.707 11.207L20.707 13.207C20.512 13.402 20.256 13.5 20 13.5Z"
          fill="#792D3D"
        />
        <path
          opacity="0.35"
          d="M14.804 16.5C14.676 16.722 14.463 16.894 14.197 16.966L11.465 17.698C10.93 17.841 10.383 17.525 10.24 16.991C10.097 16.457 10.413 15.909 10.947 15.766L12.713 15.293L12.24 13.527C12.097 12.993 12.413 12.445 12.947 12.302C13.481 12.159 14.028 12.475 14.172 13.009L14.904 15.741C14.975 16.008 14.932 16.278 14.804 16.5Z"
          fill="#792D3D"
        />
        <path
          opacity="0.35"
          d="M14.804 22.5C14.932 22.722 14.975 22.992 14.904 23.259L14.172 25.991C14.029 26.525 13.482 26.841 12.947 26.698C12.412 26.555 12.097 26.008 12.24 25.473L12.713 23.707L10.947 23.234C10.413 23.091 10.097 22.544 10.24 22.009C10.383 21.475 10.93 21.159 11.465 21.302L14.197 22.034C14.463 22.106 14.676 22.278 14.804 22.5Z"
          fill="#792D3D"
        />
        <path
          opacity="0.35"
          d="M20 25.5C20.256 25.5 20.512 25.598 20.707 25.793L22.707 27.793C23.098 28.184 23.098 28.816 22.707 29.207C22.316 29.598 21.684 29.598 21.293 29.207L20 27.914L18.707 29.207C18.316 29.598 17.684 29.598 17.293 29.207C16.902 28.816 16.902 28.184 17.293 27.793L19.293 25.793C19.488 25.598 19.744 25.5 20 25.5Z"
          fill="#792D3D"
        />
        <path
          opacity="0.35"
          d="M25.1961 22.5C25.3241 22.278 25.5371 22.106 25.8031 22.034L28.5351 21.302C29.0691 21.159 29.6161 21.475 29.7601 22.009C29.9041 22.543 29.5871 23.09 29.0531 23.234L27.2871 23.707L27.7601 25.473C27.9031 26.007 27.5871 26.554 27.0531 26.698C26.5191 26.841 25.9721 26.525 25.8281 25.991L25.0961 23.259C25.0251 22.992 25.0681 22.722 25.1961 22.5Z"
          fill="#792D3D"
        />
        <path
          opacity="0.35"
          d="M25.1961 16.5C25.0681 16.278 25.0251 16.008 25.0961 15.741L25.8281 13.009C25.9711 12.475 26.5181 12.159 27.0531 12.302C27.5871 12.445 27.9031 12.992 27.7601 13.527L27.2871 15.293L29.0531 15.766C29.5871 15.909 29.9031 16.456 29.7601 16.991C29.6171 17.525 29.0701 17.841 28.5351 17.698L25.8031 16.966C25.5371 16.894 25.3241 16.722 25.1961 16.5Z"
          fill="#792D3D"
        />
        <path
          d="M21 9.5V15.43L20.5 15.14C20.19 14.95 19.81 14.95 19.5 15.14L19 15.43V9.5C19 8.95 19.45 8.5 20 8.5C20.55 8.5 21 8.95 21 9.5Z"
          fill="#AB316D"
        />
        <path
          d="M21 23.57V29.5C21 30.05 20.55 30.5 20 30.5C19.45 30.5 19 30.05 19 29.5V23.57L19.5 23.86C19.65 23.95 19.83 24 20 24C20.17 24 20.35 23.95 20.5 23.86L21 23.57Z"
          fill="#AB316D"
        />
        <path
          opacity="0.55"
          d="M20 24C19.826 24 19.651 23.955 19.496 23.864L16.496 22.114C16.188 21.935 16 21.605 16 21.25V17.75C16 17.395 16.188 17.065 16.496 16.886L19.496 15.136C19.807 14.954 20.193 14.954 20.504 15.136L23.504 16.886C23.812 17.065 24 17.395 24 17.75V21.25C24 21.605 23.812 21.935 23.504 22.114L20.504 23.864C20.349 23.955 20.174 24 20 24ZM18 20.676L20 21.843L22 20.676V18.324L20 17.157L18 18.324V20.676Z"
          fill="#8F026E"
        />
        <path
          d="M29.8701 24.99C29.6901 25.31 29.3501 25.5 29.0001 25.5C28.8301 25.5 28.6701 25.46 28.5101 25.37L23.0801 22.35L23.5001 22.11C23.8101 21.93 24.0001 21.61 24.0001 21.25V20.57L29.4901 23.63C29.9701 23.89 30.1401 24.5 29.8701 24.99Z"
          fill="#AB316D"
        />
        <path
          d="M16.92 16.65L16.5 16.89C16.19 17.07 16 17.39 16 17.75V18.43L10.51 15.37C10.03 15.11 9.86001 14.5 10.13 14.01C10.39 13.53 11 13.36 11.49 13.63L16.92 16.65Z"
          fill="#AB316D"
        />
        <path
          d="M29.4901 15.37L24.0001 18.42V17.75C24.0001 17.39 23.8101 17.07 23.5001 16.89L23.0801 16.65L28.5101 13.63C29.0001 13.36 29.6101 13.53 29.8701 14.01C30.1401 14.5 29.9701 15.11 29.4901 15.37Z"
          fill="#AB316D"
        />
        <path
          d="M16.92 22.35L11.49 25.37C11.33 25.46 11.17 25.5 11 25.5C10.65 25.5 10.31 25.31 10.13 24.99C9.86001 24.5 10.03 23.89 10.51 23.63L16 20.57V21.25C16 21.61 16.19 21.93 16.5 22.11L16.92 22.35Z"
          fill="#AB316D"
        />
      </svg>
    ),
    type: "button",
    action: "freeze",
  },
  {
    name: "Delete Account",
    link: "/",
    icon: () => (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          d="M25 29.5H15C13.343 29.5 12 28.157 12 26.5V13.5H28V26.5C28 28.157 26.657 29.5 25 29.5Z"
          fill="#EAD6B7"
        />
        <path
          d="M24 11.5H16V10.5C16 9.948 16.448 9.5 17 9.5H23C23.552 9.5 24 9.948 24 10.5V11.5Z"
          fill="#8F4040"
        />
        <path
          d="M27 10.5C26.399 10.5 13.601 10.5 13 10.5C11.895 10.5 11 11.395 11 12.5C11 13.605 11.895 14.5 13 14.5C13.601 14.5 26.399 14.5 27 14.5C28.105 14.5 29 13.605 29 12.5C29 11.395 28.105 10.5 27 10.5Z"
          fill="#8F4040"
        />
        <path
          d="M22.8121 25.715L15.7851 18.688C15.4011 18.304 15.4011 17.68 15.7851 17.296L15.7961 17.285C16.1801 16.901 16.8041 16.901 17.1881 17.285L24.2151 24.312C24.5991 24.696 24.5991 25.32 24.2151 25.704L24.2041 25.715C23.8201 26.099 23.1961 26.099 22.8121 25.715Z"
          fill="#8F4040"
        />
        <path
          d="M15.7851 24.312L22.8121 17.285C23.1961 16.901 23.8201 16.901 24.2041 17.285L24.2151 17.296C24.5991 17.68 24.5991 18.304 24.2151 18.688L17.1881 25.715C16.8041 26.099 16.1801 26.099 15.7961 25.715L15.7851 25.704C15.4011 25.32 15.4011 24.696 15.7851 24.312Z"
          fill="#8F4040"
        />
      </svg>
    ),
    type: "button",
    action: "delete",
    email: {
      to: "support@raiz.app",
      subject: "Request to Delete My Account",
      body: `Dear Support Team,

      I would like to request the deletion of my account. I understand that by submitting this request, I will no longer have access to my account or any remaining funds associated with it.
      
      Please let me know if any further steps are required.
      
      Best regards,
      [Your Name]`,
    },
  },
];

export const helpSupportData = [
  {
    name: "Social Media",
    part: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          d="M25.6271 23.0379L23.4581 19.9999L25.6281 16.9619C24.1721 16.8249 22.9451 15.9229 22.3651 14.6489L19.9711 17.9999H16.4451C16.7891 18.5899 17.0001 19.2679 17.0001 19.9999C17.0001 20.7319 16.7891 21.4099 16.4451 21.9999H19.9711L22.3641 25.3509C22.9441 24.0759 24.1711 23.1739 25.6271 23.0379Z"
          fill="#501260"
        />
        <path
          opacity="0.35"
          d="M13 16C10.791 16 9 17.791 9 20C9 22.209 10.791 24 13 24C15.209 24 17 22.209 17 20C17 17.791 15.209 16 13 16Z"
          fill="#4B0082"
        />
        <path
          opacity="0.35"
          d="M30 27C30 24.791 28.209 23 26 23C23.791 23 22 24.791 22 27C22 29.209 23.791 31 26 31C28.209 31 30 29.209 30 27Z"
          fill="#4B0082"
        />
        <path
          opacity="0.35"
          d="M30 13C30 10.791 28.209 9 26 9C23.791 9 22 10.791 22 13C22 15.209 23.791 17 26 17C28.209 17 30 15.209 30 13Z"
          fill="#4B0082"
        />
      </svg>
    ),
  },
  {
    name: "Visit our blog",
    part: 2,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <g clipPath="url(#clip0_24170_1924)">
          <path
            opacity="0.35"
            d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
            fill="#3F8CFF"
          />
          <path
            d="M22 29.763V25.723C21.397 27.178 20.626 28 20 28C18.863 28 17.249 25.303 17.028 21H22V20.736C22 20.074 22.246 19.474 22.64 19H17.028C17.249 14.697 18.863 12 20 12C21.109 12 22.666 14.567 22.949 18.682C23.431 18.263 24.053 18 24.74 18C24.791 18 24.839 18.012 24.889 18.015C24.7 15.99 24.242 14.204 23.56 12.846C25.902 14.017 27.591 16.298 27.93 19H26.866L29.807 21.941C29.932 21.313 30 20.664 30 20C30 14.486 25.514 10 20 10C14.486 10 10 14.486 10 20C10 25.514 14.486 30 20 30C20.686 30 21.356 29.93 22.004 29.798C22.003 29.786 22 29.775 22 29.763ZM12.069 21H15.023C15.134 23.442 15.647 25.577 16.439 27.154C14.097 25.983 12.409 23.701 12.069 21ZM15.024 19H12.069C12.408 16.299 14.097 14.017 16.439 12.846C15.648 14.423 15.134 16.558 15.024 19Z"
            fill="#2E3787"
          />
          <path
            d="M31.55 26.513L25.254 20.217C24.792 19.754 24 20.082 24 20.736V29.763C24 30.361 24.662 30.72 25.164 30.396L27.024 29.191L28.17 31.423C28.438 31.945 29.079 32.151 29.601 31.883C30.123 31.615 30.329 30.974 30.061 30.452L28.934 28.261L31.175 27.783C31.759 27.658 31.973 26.935 31.55 26.513Z"
            fill="#2E3787"
          />
        </g>
        <defs>
          <clipPath id="clip0_24170_1924">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(8 8)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    link: "https://www.raiz.app/index.php",
  },
  {
    name: "App rating",
    part: 3,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          opacity="0.35"
          d="M26 29H14C12.343 29 11 27.657 11 26V14C11 12.343 12.343 11 14 11H26C27.657 11 29 12.343 29 14V26C29 27.657 27.657 29 26 29Z"
          fill="#0DDC3A"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.383 15.4149C19.504 15.1869 19.741 15.0439 20 15.0439C20.259 15.0439 20.496 15.1869 20.617 15.4149L21.788 17.6239C21.801 17.6499 21.821 17.6719 21.844 17.6889C21.867 17.7059 21.894 17.7169 21.923 17.7219L24.386 18.1529C24.641 18.1979 24.85 18.3789 24.93 18.6249C25.01 18.8709 24.947 19.1409 24.768 19.3269L23.029 21.1239C23.009 21.1449 22.994 21.1699 22.985 21.1969C22.976 21.2249 22.973 21.2539 22.978 21.2819L23.329 23.7579C23.365 24.0139 23.257 24.2689 23.048 24.4209C22.839 24.5729 22.563 24.5969 22.33 24.4829L20.084 23.3839C20.058 23.3709 20.029 23.3649 20 23.3649C19.971 23.3649 19.943 23.3719 19.916 23.3839L17.67 24.4829C17.438 24.5969 17.162 24.5729 16.952 24.4209C16.743 24.2689 16.635 24.0139 16.671 23.7579L17.022 21.2819C17.026 21.2529 17.024 21.2239 17.015 21.1969C17.006 21.1689 16.991 21.1439 16.971 21.1239L15.232 19.3269C15.052 19.1409 14.99 18.8709 15.07 18.6249C15.15 18.3789 15.359 18.1969 15.614 18.1529L18.077 17.7219C18.106 17.7169 18.133 17.7059 18.156 17.6889C18.179 17.6719 18.199 17.6499 18.212 17.6239L19.383 15.4149Z"
          fill="#17770F"
        />
      </svg>
    ),
    link: getAppRatingLink(),
  },
  {
    name: "Contact us",
    part: 4,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          opacity="0.55"
          d="M10 25V15C10 13.343 11.343 12 13 12H27C28.657 12 30 13.343 30 15V25C30 26.657 28.657 28 27 28H13C11.343 28 10 26.657 10 25Z"
          fill="#F7A900"
        />
        <path
          d="M30 15C30 14.522 29.878 14.076 29.679 13.675L21.492 18.587C20.573 19.139 19.429 19.139 18.509 18.587L10.321 13.675C10.122 14.076 10 14.522 10 15V16.981L16.964 21.16C17.901 21.722 18.95 22.003 20 22.003C21.049 22.003 22.1 21.722 23.035 21.16L30 16.981V15Z"
          fill="#AE7317"
        />
      </svg>
    ),
    link: "mailto:suport@raiz.app",
  },
  {
    name: "Help Center",
    part: 5,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          d="M20 10C14.477 10 10 14.477 10 20C10 21.592 10.382 23.091 11.043 24.427L10.038 28.446C9.80902 29.361 10.638 30.191 11.554 29.962L15.573 28.957C16.909 29.618 18.408 30 20 30C25.523 30 30 25.523 30 20C30 14.477 25.523 10 20 10Z"
          fill="#D2D4FF"
        />
        <path
          d="M19.8831 21.973H19.8771C19.2071 21.973 18.6901 21.368 18.8051 20.708C19.1551 18.695 20.7221 18.625 20.7221 17.375C20.7221 17.028 20.6621 16.251 19.8261 16.251C19.3741 16.251 19.1081 16.54 18.9531 16.848C18.7441 17.265 18.2621 17.47 17.8031 17.389C17.1071 17.265 16.6801 16.519 16.9751 15.877C17.3971 14.96 18.2611 14 19.9721 14C22.7481 14 23.1201 16.174 23.1201 17.196C23.1201 19.612 21.3211 19.702 20.9481 21.094C20.8131 21.596 20.4031 21.973 19.8831 21.973ZM21.3251 24.533C21.3251 24.945 21.1981 25.293 20.9431 25.576C20.6871 25.858 20.3521 26 19.9401 26C19.5261 26 19.1921 25.858 18.9371 25.576C18.6821 25.293 18.5531 24.945 18.5531 24.533C18.5531 24.13 18.6821 23.783 18.9371 23.488C19.1921 23.195 19.5261 23.049 19.9401 23.049C20.3521 23.049 20.6871 23.195 20.9431 23.488C21.1981 23.783 21.3251 24.131 21.3251 24.533Z"
          fill="#8F3CAD"
        />
      </svg>
    ),
    link: "",
  },
  // {
  //   name: "Contact support",
  //   part: 6,
  //   icon: (
  //     <svg
  //       width="40"
  //       height="40"
  //       viewBox="0 0 40 40"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <rect width="40" height="40" rx="20" fill="#F3F1F6" />
  //       <path
  //         d="M25 23C22.327 23 15.673 23 13 23C11.34 23 10 24.34 10 26C10 27.66 11.34 29 13 29C16.524 29 21.476 29 25 29C26.66 29 28 27.66 28 26C28 24.34 26.66 23 25 23Z"
  //         fill="#59922E"
  //       />
  //       <path
  //         d="M28.002 15.315H27.998C27.551 15.315 27.207 14.911 27.283 14.471C27.516 13.129 28.561 13.082 28.561 12.249C28.561 12.018 28.521 11.5 27.963 11.5C27.661 11.5 27.484 11.693 27.381 11.898C27.242 12.176 26.921 12.312 26.615 12.259C26.151 12.177 25.866 11.68 26.063 11.252C26.345 10.64 26.921 10 28.061 10C29.912 10 30.16 11.449 30.16 12.131C30.16 13.742 28.96 13.802 28.712 14.73C28.622 15.064 28.348 15.315 28.002 15.315ZM28.963 17.022C28.971 17.554 28.588 18.011 28.039 18C27.489 18.012 27.107 17.554 27.114 17.022C27.107 16.502 27.491 16.018 28.039 16.033C28.586 16.018 28.971 16.502 28.963 17.022Z"
  //         fill="#59922E"
  //       />
  //       <path
  //         d="M19 20C21.7614 20 24 17.7614 24 15C24 12.2386 21.7614 10 19 10C16.2386 10 14 12.2386 14 15C14 17.7614 16.2386 20 19 20Z"
  //         fill="#BBDE6B"
  //       />
  //       <path
  //         d="M11.766 19.7659C12.625 18.9069 12.906 17.6689 12.996 16.8429C13.048 16.3579 12.643 15.9519 12.158 16.0049C11.332 16.0939 10.094 16.3749 9.235 17.2349C8.376 18.0949 8.095 19.3319 8.005 20.1579C7.953 20.6429 8.358 21.0489 8.843 20.9959C9.669 20.9059 10.907 20.6249 11.766 19.7659Z"
  //         fill="#BBDE6B"
  //       />
  //     </svg>
  //   ),
  // },
  // {
  //   name: "Follow us on social media",
  //   part: 7,
  //   icon: (
  //     <svg
  //       width="40"
  //       height="40"
  //       viewBox="0 0 40 40"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <rect width="40" height="40" rx="20" fill="#F3F1F6" />
  //       <path
  //         d="M26 29H14C12.343 29 11 27.657 11 26V14C11 12.343 12.343 11 14 11H26C27.657 11 29 12.343 29 14V26C29 27.657 27.657 29 26 29Z"
  //         fill="#FCD1B6"
  //       />
  //       <path
  //         d="M15 26C14.447 26 14 25.553 14 25V23.331C14 19.289 17.289 16 21.331 16H24C24.553 16 25 16.447 25 17C25 17.553 24.553 18 24 18H21.331C18.392 18 16 20.392 16 23.331V25C16 25.553 15.553 26 15 26Z"
  //         fill="#7D641F"
  //       />
  //       <path
  //         d="M22 20.305C22 20.922 22.744 21.232 23.182 20.798L26.296 17.713C26.692 17.32 26.692 16.68 26.296 16.287L23.182 13.202C22.744 12.768 22 13.079 22 13.695V20.305Z"
  //         fill="#7D641F"
  //       />
  //     </svg>
  //   ),
  // },
];

export const loginSecurityData = [
  {
    name: "Reset Password",
    text: "Last updated 3 months ago",
    part: 1,
    icon: (
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.5" width="40" height="40" rx="20" fill="#F3F1F6" />
        <path
          opacity="0.55"
          d="M26 30H14C12.343 30 11 28.657 11 27V19C11 17.343 12.343 16 14 16H26C27.657 16 29 17.343 29 19V27C29 28.657 27.657 30 26 30Z"
          fill="#F7A900"
        />
        <path
          d="M16 16C16 13.791 17.791 12 20 12C22.209 12 24 13.791 24 16H26C26 12.686 23.314 10 20 10C16.686 10 14 12.686 14 16H16Z"
          fill="#292D32"
        />
        <path
          d="M20 24.5C20.8284 24.5 21.5 23.8284 21.5 23C21.5 22.1716 20.8284 21.5 20 21.5C19.1716 21.5 18.5 22.1716 18.5 23C18.5 23.8284 19.1716 24.5 20 24.5Z"
          fill="#6C265B"
        />
        <path
          d="M25 24.5C25.8284 24.5 26.5 23.8284 26.5 23C26.5 22.1716 25.8284 21.5 25 21.5C24.1716 21.5 23.5 22.1716 23.5 23C23.5 23.8284 24.1716 24.5 25 24.5Z"
          fill="#6C265B"
        />
        <path
          d="M15 24.5C15.8284 24.5 16.5 23.8284 16.5 23C16.5 22.1716 15.8284 21.5 15 21.5C14.1716 21.5 13.5 22.1716 13.5 23C13.5 23.8284 14.1716 24.5 15 24.5Z"
          fill="#6C265B"
        />
      </svg>
    ),
  },
  {
    name: "Change/Reset Transaction PIN",
    part: 2,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F3F1F6" />
        <g clipPath="url(#clip0_24170_3733)">
          <path
            opacity="0.35"
            d="M29 14H13.802C12.912 14 12.067 14.395 11.497 15.079L8.46399 18.719C7.84599 19.461 7.84599 20.538 8.46399 21.28L11.497 24.92C12.067 25.605 12.911 26 13.802 26H29C30.657 26 32 24.657 32 23V17C32 15.343 30.657 14 29 14Z"
            fill="#971979"
          />
          <path
            d="M26.5 21.5C27.3284 21.5 28 20.8284 28 20C28 19.1716 27.3284 18.5 26.5 18.5C25.6716 18.5 25 19.1716 25 20C25 20.8284 25.6716 21.5 26.5 21.5Z"
            fill="#292140"
          />
          <path
            d="M21 21.5C21.8284 21.5 22.5 20.8284 22.5 20C22.5 19.1716 21.8284 18.5 21 18.5C20.1716 18.5 19.5 19.1716 19.5 20C19.5 20.8284 20.1716 21.5 21 21.5Z"
            fill="#292140"
          />
          <path
            d="M15.5 21.5C16.3284 21.5 17 20.8284 17 20C17 19.1716 16.3284 18.5 15.5 18.5C14.6716 18.5 14 19.1716 14 20C14 20.8284 14.6716 21.5 15.5 21.5Z"
            fill="#292140"
          />
        </g>
        <defs>
          <clipPath id="clip0_24170_3733">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(8 8)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  // {
  //   name: "Enable/ disable biometrics",
  //   text: "Replace password actions like transaction approvals with fingerprint",
  //   part: 3,
  //   icon: (
  //     <svg
  //       width="40"
  //       height="40"
  //       viewBox="0 0 40 40"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <rect width="40" height="40" rx="20" fill="#F3F1F6" />
  //       <path
  //         opacity="0.35"
  //         d="M27 31C29.2091 31 31 29.2091 31 27C31 24.7909 29.2091 23 27 23C24.7909 23 23 24.7909 23 27C23 29.2091 24.7909 31 27 31Z"
  //         fill="white"
  //       />
  //       <path
  //         d="M19 29C18.447 29 18 28.553 18 28V25C18 24.447 18.447 24 19 24C19.553 24 20 24.447 20 25V28C20 28.553 19.553 29 19 29Z"
  //         fill="#4B0082"
  //       />
  //       <path
  //         d="M19 23C18.447 23 18 22.553 18 22V20C18 19.447 18.447 19 19 19C19.553 19 20 19.447 20 20V22C20 22.553 19.553 23 19 23Z"
  //         fill="#4B0082"
  //       />
  //       <path
  //         d="M15 29C14.447 29 14 28.553 14 28V22C14 21.447 14.447 21 15 21C15.553 21 16 21.447 16 22V28C16 28.553 15.553 29 15 29Z"
  //         fill="#4B0082"
  //       />
  //       <path
  //         opacity="0.35"
  //         d="M23.0001 28C22.4471 28 22.0001 27.553 22.0001 27V20C22.0001 18.346 20.6541 17 19.0001 17C17.7531 17 16.6221 17.785 16.1871 18.953C15.9941 19.473 15.4151 19.731 14.9011 19.542C14.3831 19.349 14.1201 18.773 14.3121 18.256C15.0381 16.309 16.9211 15 19.0001 15C21.7571 15 24.0001 17.243 24.0001 20V27C24.0001 27.553 23.5531 28 23.0001 28Z"
  //         fill="#460088"
  //       />
  //       <path
  //         opacity="0.35"
  //         d="M11 28C10.447 28 10 27.553 10 27V24C10 23.447 10.447 23 11 23C11.553 23 12 23.447 12 24V27C12 27.553 11.553 28 11 28Z"
  //         fill="#460088"
  //       />
  //       <path
  //         d="M11 22C10.447 22 10 21.553 10 21V20C10 15.037 14.037 11 19 11C20.421 11 21.779 11.321 23.039 11.955C23.532 12.203 23.731 12.805 23.483 13.298C23.235 13.792 22.63 13.988 22.14 13.742C21.162 13.25 20.105 13 19 13C15.141 13 12 16.141 12 20V21C12 21.553 11.553 22 11 22Z"
  //         fill="#4B0082"
  //       />
  //       <path
  //         opacity="0.35"
  //         d="M26.9999 25.0001C26.4469 25.0001 25.9999 24.5531 25.9999 24.0001V20.0001C25.9999 18.5031 25.5339 17.0741 24.6519 15.8691C24.3269 15.4241 24.4229 14.7981 24.8689 14.4721C25.3159 14.1461 25.9399 14.2431 26.2669 14.6901C27.3999 16.2391 27.9999 18.0751 27.9999 20.0001V24.0001C27.9999 24.5531 27.5529 25.0001 26.9999 25.0001Z"
  //         fill="#7B3DB7"
  //       />
  //       <path
  //         d="M27 22C24.239 22 22 24.239 22 27C22 29.761 24.239 32 27 32C29.761 32 32 29.761 32 27C32 24.239 29.761 22 27 22ZM29.619 26.619L27.119 29.119C26.954 29.284 26.734 29.375 26.5 29.375C26.266 29.375 26.046 29.284 25.881 29.119L24.381 27.619C24.04 27.277 24.04 26.723 24.381 26.381C24.722 26.041 25.277 26.041 25.618 26.381L26.499 27.263L28.38 25.381C28.721 25.041 29.276 25.041 29.617 25.381C29.96 25.723 29.96 26.277 29.619 26.619Z"
  //         fill="#02A909"
  //       />
  //     </svg>
  //   ),
  // },
];
