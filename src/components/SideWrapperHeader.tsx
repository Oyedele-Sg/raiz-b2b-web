import React, { ReactNode } from "react";

interface Props {
  close: () => void;
  title: string;
  rightComponent?: ReactNode;
  titleColor?: string;
}

const SideWrapperHeader = ({
  close,
  title,
  rightComponent,
  titleColor,
}: Props) => {
  return (
    <div className=" flex justify-between items-center mb-[30px] w-full">
      <button onClick={close}>
        {titleColor ? (
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.48 8.43332V10.7667H4.48L10.8967 17.1833L9.24 18.84L0 9.59999L9.24 0.359985L10.8967 2.01665L4.48 8.43332H18.48Z"
              fill="#19151E"
            />
          </svg>
        ) : (
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
              d="M18.48 8.33334V10.6667H4.48L10.8967 17.0833L9.24 18.74L0 9.50001L9.24 0.26001L10.8967 1.91668L4.48 8.33334H18.48Z"
              fill={"#FCFCFD"}
            />
          </svg>
        )}
      </button>
      <h5
        className={`text-center ${
          titleColor ? titleColor : "text-raiz-gray-50 "
        }  font-bold  leading-tight `}
      >
        {title}
      </h5>
      {rightComponent ? rightComponent : <span />}
    </div>
  );
};

export default SideWrapperHeader;
