"use client";
import React, { useEffect, useState } from "react";
import Overlay from "@/components/ui/Overlay";
import { DateOption } from "./page";
import BasicDatePicker from "@/components/ui/BasicDatePicker";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  close: () => void;
  options: DateOption[];
  selectedRange: DateOption;
  setSelectedRange: (i: DateOption) => void;
}

const RangeModal = ({
  close,
  options,
  selectedRange,
  setSelectedRange,
}: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleDateChange = (val: Dayjs | null) => {
    if (val) {
      const today = dayjs();
      const daysDifference = today.diff(val, "day");

      setSelectedDate(val);
      setSelectedRange({
        value: `custom-${daysDifference}`,
        label: "Custom",
        dateRange: val.format("YYYY-MM-DD"),
        days: daysDifference,
      });
      close();
    }
  };

  const handleChange = (option: DateOption) => {
    setSelectedRange(option);

    if (option.value === "custom") {
      setShowCalendar(true);
    } else {
      close();
    }
  };

  useEffect(() => {
    if (selectedRange.value === "custom") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  }, [selectedRange]);

  return (
    <Overlay close={close} width="375px">
      {!showCalendar ? (
        <div className="flex flex-col gap-5 h-full py-8 px-5 text-raiz-gray-950">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-3  cursor-pointer"
            >
              <input
                type="radio"
                name="range"
                value={option.value}
                checked={selectedRange.value === option.value}
                onChange={() => handleChange(option)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                  selectedRange.value === option.value
                    ? "border-indigo-900 border-[5px]"
                    : "border-gray-300"
                }`}
              ></div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-800 text-sm font-bold leading-none">
                  {option.label}
                </span>
                <p className="text-zinc-800 text-xs font-normal  leading-normal">
                  {option.dateRange}
                </p>
              </div>
            </label>
          ))}
        </div>
      ) : (
        <BasicDatePicker value={selectedDate} onChange={handleDateChange} />
      )}
    </Overlay>
  );
};

export default RangeModal;
