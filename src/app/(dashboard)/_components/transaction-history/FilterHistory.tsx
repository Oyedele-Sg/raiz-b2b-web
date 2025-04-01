import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import InputLabel from "@/components/ui/InputLabel";
import ModalTrigger from "@/components/ui/ModalTrigger";
import { convertField } from "@/utils/helpers";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { ITransactionClass } from "@/types/transactions";
import dayjs from "dayjs";
import MonthModal from "./MonthModal";
import { z } from "zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { toast } from "sonner";
import { customDateType } from "./TxnHistory";

interface Props {
  close: () => void;
  period: string;
  activity: number;
  customStartDate: customDateType;
  customEndDate: customDateType;
  setActivity: Dispatch<SetStateAction<number>>;
  setPeriod: Dispatch<SetStateAction<string>>;
  setCustomStartDate: Dispatch<SetStateAction<customDateType>>;
  setCustomEndDate: Dispatch<SetStateAction<customDateType>>;
  activities: ITransactionClass[];
  setParams: Dispatch<
    SetStateAction<{
      transaction_class_id: number;
      start_date: string;
      end_date: string;
    }>
  >;
  clearAll: () => void;
}

const dateComponentSchema = z.object({
  day: z
    .string()
    .regex(/^\d{1,2}$/)
    .transform(Number)
    .refine((val) => val >= 1 && val <= 31, "Invalid day"),
  month: z
    .string()
    .regex(/^\d{1,2}$/)
    .transform(Number)
    .refine((val) => val >= 1 && val <= 12, "Invalid month"),
  year: z
    .string()
    .regex(/^\d{4}$/)
    .transform(Number)
    .refine((val) => val >= 1900 && val <= 9999, "Invalid year"),
});

const dateOutputSchema = z
  .object({
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })
  .refine(
    (data) => dayjs(data.end).isAfter(dayjs(data.start)),
    "End date must be after start date"
  );

const FilterHistory = ({
  close,
  activities,
  setParams,
  customEndDate,
  customStartDate,
  activity,
  period,
  setActivity,
  setPeriod,
  setCustomEndDate,
  setCustomStartDate,
  clearAll,
}: Props) => {
  const [modal, setModal] = useState<"start" | "end" | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const periods = ["Custom", "Current week", "Last week", "Current month"];

  const validateCustomDate = (date: typeof customStartDate, prefix: string) => {
    try {
      dateComponentSchema.parse(date);
      const formattedDate = `${date.year}-${date.month.padStart(
        2,
        "0"
      )}-${date.day.padStart(2, "0")}`;
      if (!dayjs(formattedDate).isValid()) {
        throw new Error("Invalid date");
      }
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${prefix}Date`];
        return newErrors;
      });
      return true;
    } catch (error) {
      const zodError = error as z.ZodError;
      setErrors((prev) => ({
        ...prev,
        [`${prefix}Date`]: zodError?.errors[0]?.message || "Invalid date",
      }));
      return false;
    }
  };

  const getPeriodDates = () => {
    const today = dayjs();
    let startDate, endDate;

    switch (period) {
      case "Current week":
        startDate = today.startOf("week");
        endDate = today.endOf("week");
        break;
      case "Last week":
        startDate = today.subtract(1, "week").startOf("week");
        endDate = today.subtract(1, "week").endOf("week");
        break;
      case "Current month":
        startDate = today.startOf("month");
        endDate = today.endOf("month");
        break;
      case "Custom":
        const startFormatted = `${
          customStartDate.year
        }-${customStartDate.month.padStart(
          2,
          "0"
        )}-${customStartDate.day.padStart(2, "0")}`;
        const endFormatted = `${
          customEndDate.year
        }-${customEndDate.month.padStart(2, "0")}-${customEndDate.day.padStart(
          2,
          "0"
        )}`;

        startDate =
          customStartDate.day && customStartDate.month && customStartDate.year
            ? dayjs(startFormatted)
            : today.startOf("month");

        endDate =
          customEndDate.day && customEndDate.month && customEndDate.year
            ? dayjs(endFormatted)
            : today;
        break;
      default:
        startDate = today.startOf("month");
        endDate = today;
    }

    const dates = {
      start: startDate.format("YYYY-MM-DD"),
      end: endDate.format("YYYY-MM-DD"),
    };

    try {
      dateOutputSchema.parse(dates);
      return dates;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message);
      return {
        start: today.startOf("month").format("YYYY-MM-DD"),
        end: today.format("YYYY-MM-DD"),
      };
    }
  };

  const clearFilter = () => {
    setActivity(0);
    setPeriod("");
    setCustomStartDate({ day: "", month: "", year: "" });
    setCustomEndDate({ day: "", month: "", year: "" });
    setErrors({});
    clearAll();
  };

  const handleApply = () => {
    if (period === "Custom") {
      const startValid = validateCustomDate(customStartDate, "start");
      const endValid = validateCustomDate(customEndDate, "end");
      if (!startValid || !endValid) return;
    }

    const dates = getPeriodDates();
    setParams({
      transaction_class_id: activity,
      start_date: new Date(dates.start).toISOString(),
      end_date: new Date(dates.end).toISOString(),
    });
    close();
  };
  return (
    <div className="flex flex-col h-full">
      <SideWrapperHeader
        title="Transaction History"
        close={close}
        titleColor="text-zinc-900"
      />
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* activity */}
          <div className="">
            <h4 className="text-zinc-900 text-xs font-bold leading-tight mb-[9px]">
              Activity
            </h4>
            <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
              {activities.map((each, index) => (
                <button
                  onClick={() => setActivity(each.transaction_class_id)}
                  className={`p-2 rounded-lg whitespace-nowrap  border-[0.5px] leading-tight text-xs ${
                    each.transaction_class_id === activity
                      ? "border-indigo-900 text-indigo-900 bg-indigo-100/60 "
                      : "border-zinc-400 text-zinc-800   "
                  } `}
                  key={index}
                >
                  {convertField(each.transaction_class)}
                </button>
              ))}
            </div>
          </div>
          {/* Period */}
          <div className="mt-[30px]">
            <h4 className="text-zinc-900 text-xs font-bold leading-tight mb-[9px]">
              Period
            </h4>
            <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
              {periods.map((each, index) => (
                <button
                  onClick={() => setPeriod(each)}
                  className={`p-2 rounded-lg whitespace-nowrap  border-[0.5px] leading-tight text-xs ${
                    each === period
                      ? "border-indigo-900 text-indigo-900 bg-indigo-100/60 "
                      : "border-zinc-400 text-zinc-800   "
                  } `}
                  key={index}
                >
                  {each}
                </button>
              ))}
            </div>
            {/* Custom */}
            <div
              className={`${
                period === "Custom" ? "h-auto opacity-100" : "h-0 opacity-0"
              } transition-all ease-in-out mt-5`}
            >
              <InputLabel content="Start Date" labelClass=" !text-xs" />
              <div className="grid grid-cols-3 gap-[15px] mt-2 mb-4">
                <InputField
                  name="startDay"
                  placeholder="Day"
                  value={customStartDate.day}
                  onChange={(e) =>
                    setCustomStartDate({
                      ...customStartDate,
                      day: e.target.value,
                    })
                  }
                />
                <ModalTrigger
                  onClick={() => setModal("start")}
                  placeholder="Month"
                  value={convertField(customStartDate.month || "")}
                />
                <InputField
                  name="startYear"
                  placeholder="Year"
                  value={customStartDate.year}
                  onChange={(e) =>
                    setCustomStartDate({
                      ...customStartDate,
                      year: e.target.value,
                    })
                  }
                />
              </div>
              {errors.startDate && <ErrorMessage message={errors.startDate} />}

              <InputLabel content="End Date" labelClass=" !text-xs" />
              <div className="grid grid-cols-3 gap-[15px] mt-2  mb-4">
                <InputField
                  name="endDay"
                  placeholder="Day"
                  value={customEndDate.day}
                  onChange={(e) =>
                    setCustomEndDate({ ...customEndDate, day: e.target.value })
                  }
                />
                <ModalTrigger
                  onClick={() => setModal("end")}
                  placeholder="Month"
                  value={convertField(customEndDate?.month || "")}
                />
                <InputField
                  name="endYear"
                  placeholder="Year"
                  value={customEndDate.year}
                  onChange={(e) =>
                    setCustomEndDate({ ...customEndDate, year: e.target.value })
                  }
                />
              </div>
              {errors.endDate && <ErrorMessage message={errors.endDate} />}

              <Button variant="tertiary" className="!border-[#6F5B86] gap-2">
                <Image
                  src={"/icons/docs-download.svg"}
                  alt="download"
                  width={16}
                  height={16}
                />
                Bank Statement
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <Button onClick={handleApply}>Apply</Button>
          <Button onClick={clearFilter} variant="secondary">
            Clear all
          </Button>
        </div>
      </div>

      {modal === "start" && (
        <MonthModal
          setMonth={setCustomStartDate}
          close={() => setModal(null)}
        />
      )}

      {modal === "end" && (
        <MonthModal setMonth={setCustomEndDate} close={() => setModal(null)} />
      )}
    </div>
  );
};

export default FilterHistory;
