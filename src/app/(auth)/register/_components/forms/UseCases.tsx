"use client";
import React from "react";
import Image from "next/image";
import { RegisterFormProps } from "./CreateAccount";

// const useCasesArr = [
//   {
//     use_case_name: "Saving money in USD",
//     use_case_description: "Save your money in USD currency.",
//     use_case_code: 1,
//     use_case_emoji: "🍯",
//     use_case_id: 1,
//     created_at: "2025-01-28T19:29:16.576Z",
//     updated_at: "2025-01-28T19:29:16.577Z",
//   },
//   {
//     use_case_name: "Growing my money",
//     use_case_description: "Invest and grow your savings.",
//     use_case_code: 2,
//     use_case_emoji: "🌱",
//     use_case_id: 2,
//     created_at: "2025-01-28T19:29:16.576Z",
//     updated_at: "2025-01-28T19:29:16.577Z",
//   },
//   {
//     use_case_name: "Paying friends",
//     use_case_description: "Easily send money to friends.",
//     use_case_code: 3,
//     use_case_emoji: "🫶🏽",
//     use_case_id: 3,
//     created_at: "2025-01-28T19:29:16.576Z",
//     updated_at: "2025-01-28T19:29:16.577Z",
//   },
//   {
//     use_case_name: "Paying my bills",
//     use_case_description: "Manage and pay your bills efficiently.",
//     use_case_code: 4,
//     use_case_emoji: "💡",
//     use_case_id: 4,
//     created_at: "2025-01-28T19:29:16.576Z",
//     updated_at: "2025-01-28T19:29:16.577Z",
//   },
//   {
//     use_case_name: "Saving with friends and family",
//     use_case_description: "Collaborate on savings with loved ones.",
//     use_case_code: 5,
//     use_case_emoji: "🤑",
//     use_case_id: 5,
//     created_at: "2025-01-28T19:29:16.576Z",
//     updated_at: "2025-01-28T19:29:16.577Z",
//   },
//   {
//     use_case_name: "Controlling my spending",
//     use_case_description: "Monitor and control your expenses.",
//     use_case_code: 6,
//     use_case_emoji: "🛍️",
//     use_case_id: 6,
//     created_at: "2025-01-28T19:29:16.576Z",
//     updated_at: "2025-01-28T19:29:16.577Z",
//   },
// ];

const UseCases = ({ goBack, formik, goForward }: RegisterFormProps) => {
  // const [selectedCases, setSelectedCases] = useState<number[]>(
  //   formik.values.useCases || []
  // );
  // const toggleCase = (id: number) => {
  //   if (selectedCases.includes(id)) {
  //     setSelectedCases((prev) => prev.filter((c) => c !== id));
  //   } else {
  //     setSelectedCases([...selectedCases, id]);
  //   }
  // };

  const handleSkip = () => {
    formik.setFieldValue("useCases", []);
    if (goForward) {
      goForward();
    }
  };

  // useEffect(() => {
  //   formik.setFieldValue("useCases", selectedCases);
  // }, [selectedCases]);
  return (
    <section className="h-full flex flex-col -mt-2 ">
      <div className="flex items-center justify-between mb-5">
        <button onClick={goBack}>
          <Image
            src={"/icons/arrow-left.svg"}
            alt="back"
            width={18.48}
            height={18.48}
          />
        </button>
        <button
          onClick={handleSkip}
          className="text-right text-raiz-gray-700 text-sm font-normal leading-tight"
        >
          Skip
        </button>
      </div>
      <h2 className="text-raiz-gray-950 text-[22px] font-semibold  leading-7">
        What would you like to use your Raiz account for?
      </h2>
      <p className="text-raiz-gray-700 text-sm font-normal  leading-tight">
        What would you like to use your Raiz account for?
      </p>

      {/* <div className="flex gap-4 mt-[44px] flex-wrap">
        {useCasesArr.map((each) => {
          const selected = selectedCases.includes(each.use_case_id);
          return (
            <button
              onClick={() => toggleCase(each.use_case_id)}
              key={each.use_case_id}
              className={`h-10 px-4 py-2 bg-[#f3f1f6] rounded-3xl  flex gap-1.5 items-center border  ${
                selected ? " border-raiz-gray-950" : "border-none"
              }`}
            >
              {each.use_case_emoji}
              <span className="text-raiz-gray-950 text-[13px] font-normal  leading-normal">
                {each.use_case_name}
              </span>
            </button>
          );
        })}
      </div> */}
    </section>
  );
};

export default UseCases;
