"use client";
import React from "react";

const activities = [
  {
    id: 1,
    color: "bg-[#6B5B95]", // purple
    text: "Sent on 08 Oct 2025",
  },
  {
    id: 2,
    color: "bg-[#6B5B95]", // purple
    text: "Viewed on 10 Oct 2025",
  },
  {
    id: 3,
    color: "bg-[#E74C3C]", // red
    text: "Invoice became overdue on 08 Nov 2025.",
  },
  {
    id: 4,
    color: "bg-[#6B5B95]", // purple
    text: "Reminder email sent to client (Stripe Corp) regarding overdue invoice @ 10am",
  },
];

const InvoiceActivity = () => {
  return (
    <div className="w-full p-[30px]">
      <h3 className="mb-6 text-zinc-900 text-base font-bold leading-tight">
        Activities
      </h3>

      <div className="flex flex-col relative">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start relative pb-5 last:pb-0"
          >
            {/* Circle */}
            <div className="flex flex-col items-center">
              <span
                className={`w-3 h-3 rounded-full ${activity.color} mt-[3px]`}
              ></span>
              {/* Vertical line */}
              {index !== activities.length - 1 && (
                <div className="w-px flex-1 bg-gray-100 mt-1 mb-0.5"></div>
              )}
            </div>

            {/* Text */}
            <p className="ml-3  text-zinc-700 text-xs leading-tight">
              {activity.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceActivity;
