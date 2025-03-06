"use client";
import React, { useState } from "react";
import Image from "next/image";
import { truncateString } from "@/utils/helpers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NotificationItemProps } from "@/types/misc";
import NotificationDetailModal from "./NotificationDetailModal";

dayjs.extend(relativeTime);

const notificationsArr = [
  {
    notification_title: "Payment Received",
    notification_body: "Your payment of $250 has been processed successfully.",
    read: true,
    notification_category_id: 1,
    created_at: dayjs().toDate(), // Today
    updated_at: dayjs().toDate(),
    notification_category: {
      notification_category_name: "Payments",
      notification_category_description: "Notifications related to payments",
      notification_category_code: 101,
      notification_category_id: 1,
      created_at: dayjs().toDate(),
      updated_at: dayjs().toDate(),
    },
  },
  {
    notification_title: "Documents approval in progresss",
    notification_body:
      "Your utility billl approval is still pending and under review. We'll get back to yo in 3 business days",
    read: true,
    notification_category_id: 1,
    created_at: dayjs().toDate(), // Today
    updated_at: dayjs().toDate(),
    notification_category: {
      notification_category_name: "Payments",
      notification_category_description: "Notifications related to payments",
      notification_category_code: 101,
      notification_category_id: 1,
      created_at: dayjs().toDate(),
      updated_at: dayjs().toDate(),
    },
  },
  {
    notification_title: "Payment Reversed",
    notification_body: "Your payment of $250 has been reversed successfully.",
    read: false,
    notification_category_id: 1,
    created_at: dayjs().toDate(), // Today
    updated_at: dayjs().toDate(),
    notification_category: {
      notification_category_name: "Payments",
      notification_category_description: "Notifications related to payments",
      notification_category_code: 101,
      notification_category_id: 1,
      created_at: dayjs().toDate(),
      updated_at: dayjs().toDate(),
    },
  },
  {
    notification_title: "Payment Received",
    notification_body: "Your payment of $250 has been processed successfully.",
    read: false,
    notification_category_id: 1,
    created_at: dayjs().toDate(), // Today
    updated_at: dayjs().toDate(),
    notification_category: {
      notification_category_name: "Payments",
      notification_category_description: "Notifications related to payments",
      notification_category_code: 101,
      notification_category_id: 1,
      created_at: dayjs().toDate(),
      updated_at: dayjs().toDate(),
    },
  },
  {
    notification_title: "Order Shipped",
    notification_body: "Your order #12345 has been shipped and is on the way.",
    read: true,
    notification_category_id: 2,
    created_at: dayjs().subtract(1, "day").toDate(), // Yesterday
    updated_at: dayjs().subtract(1, "day").toDate(),
    notification_category: {
      notification_category_name: "Orders",
      notification_category_description: "Order updates and tracking",
      notification_category_code: 102,
      notification_category_id: 2,
      created_at: dayjs().subtract(1, "day").toDate(),
      updated_at: dayjs().subtract(1, "day").toDate(),
    },
  },
  {
    notification_title: "New Message",
    notification_body: "You have a new message from support.",
    read: false,
    notification_category_id: 3,
    created_at: dayjs().subtract(2, "day").toDate(), // 2 days ago
    updated_at: dayjs().subtract(2, "day").toDate(),
    notification_category: {
      notification_category_name: "Messages",
      notification_category_description:
        "Direct messages and support responses",
      notification_category_code: 103,
      notification_category_id: 3,
      created_at: dayjs().subtract(2, "day").toDate(),
      updated_at: dayjs().subtract(2, "day").toDate(),
    },
  },
  {
    notification_title: "Security Alert",
    notification_body: "A new login was detected from an unknown device.",
    read: true,
    notification_category_id: 4,
    created_at: dayjs().subtract(3, "day").toDate(), // 3 days ago
    updated_at: dayjs().subtract(3, "day").toDate(),
    notification_category: {
      notification_category_name: "Security",
      notification_category_description: "Security-related alerts and updates",
      notification_category_code: 104,
      notification_category_id: 4,
      created_at: dayjs().subtract(3, "day").toDate(),
      updated_at: dayjs().subtract(3, "day").toDate(),
    },
  },
  {
    notification_title: "Subscription Renewal",
    notification_body: "Your subscription has been renewed successfully.",
    read: false,
    notification_category_id: 5,
    created_at: dayjs().subtract(5, "day").toDate(), // 5 days ago
    updated_at: dayjs().subtract(5, "day").toDate(),
    notification_category: {
      notification_category_name: "Subscription",
      notification_category_description: "Billing and subscription updates",
      notification_category_code: 105,
      notification_category_id: 5,
      created_at: dayjs().subtract(5, "day").toDate(),
      updated_at: dayjs().subtract(5, "day").toDate(),
    },
  },
  {
    notification_title: "Discount Offer",
    notification_body: "Get 20% off on your next purchase!",
    read: false,
    notification_category_id: 6,
    created_at: dayjs().subtract(10, "day").toDate(), // 10 days ago
    updated_at: dayjs().subtract(10, "day").toDate(),
    notification_category: {
      notification_category_name: "Promotions",
      notification_category_description: "Exclusive discounts and promotions",
      notification_category_code: 106,
      notification_category_id: 6,
      created_at: dayjs().subtract(10, "day").toDate(),
      updated_at: dayjs().subtract(10, "day").toDate(),
    },
  },
  {
    notification_title: "System Update",
    notification_body: "A new system update has been installed successfully.",
    read: true,
    notification_category_id: 7,
    created_at: dayjs("2024-01-15").toDate(), // Specific past date
    updated_at: dayjs("2024-01-15").toDate(),
    notification_category: {
      notification_category_name: "System",
      notification_category_description: "System updates and patches",
      notification_category_code: 107,
      notification_category_id: 7,
      created_at: dayjs("2024-01-15").toDate(),
      updated_at: dayjs("2024-01-15").toDate(),
    },
  },
  {
    notification_title: "Reminder: Event Tomorrow",
    notification_body: "Don't forget your event scheduled for tomorrow.",
    read: false,
    notification_category_id: 8,
    created_at: dayjs().subtract(6, "day").toDate(), // 6 days ago
    updated_at: dayjs().subtract(6, "day").toDate(),
    notification_category: {
      notification_category_name: "Reminders",
      notification_category_description: "Important reminders and alerts",
      notification_category_code: 108,
      notification_category_id: 8,
      created_at: dayjs().subtract(6, "day").toDate(),
      updated_at: dayjs().subtract(6, "day").toDate(),
    },
  },
  {
    notification_title: "Product Review Request",
    notification_body: "Share your thoughts on your recent purchase.",
    read: false,
    notification_category_id: 9,
    created_at: dayjs("2024-01-10").toDate(), // Specific past date
    updated_at: dayjs("2024-01-10").toDate(),
    notification_category: {
      notification_category_name: "Reviews",
      notification_category_description: "Requests for product/service reviews",
      notification_category_code: 109,
      notification_category_id: 9,
      created_at: dayjs("2024-01-10").toDate(),
      updated_at: dayjs("2024-01-10").toDate(),
    },
  },
];

const NotificationItem = ({
  notification_body,
  notification_title,
  read,
  notification_category,
}: NotificationItemProps) => {
  return (
    <div
      className={`pl-4 py-5 ${
        read ? "bg-transparent" : "bg-[#eaecff]/50"
      } rounded-[20px] justify-start items-start gap-3 inline-flex w-full`}
    >
      <div className="w-10 h-10 relative">
        <Image
          src={"/icons/notif-credit.svg"}
          alt={notification_category.notification_category_name}
          width={40}
          height={40}
        />
        {!read && (
          <span className="w-2 h-2 bg-[#db180d] rounded-full absolute top-1 right-0" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h6 className="text-raiz-gray-950 text-[13px] font-bold  leading-[18.20px]">
          {notification_title}
        </h6>
        <p className="text-raiz-gray-950 text-[13px] font-normal  leading-tight">
          {truncateString(notification_body, 40)}
        </p>
      </div>
    </div>
  );
};

const groupNotificationsByDate = (notifications: NotificationItemProps[]) => {
  const grouped: Record<string, NotificationItemProps[]> = {};

  notifications.forEach((notification) => {
    const createdAt = dayjs(notification.created_at);
    let groupKey = createdAt.format("D MMMM"); // Default to "2nd February"

    if (createdAt.isSame(dayjs(), "day")) {
      groupKey = "Today";
    } else if (createdAt.isSame(dayjs().subtract(1, "day"), "day")) {
      groupKey = "Yesterday";
    } else if (createdAt.isSame(dayjs().subtract(2, "day"), "day")) {
      groupKey = "2 days ago";
    }

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(notification);
  });

  return grouped;
};

const Notifications = ({ close }: { close: () => void }) => {
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItemProps | null>(null);
  const groupedNotifications = groupNotificationsByDate(notificationsArr);

  return (
    <>
      <div className=" h-full overflow-hidden">
        <div className="sticky bg-raiz-gray-50 w-full h-[49px] flex  items-center z-10 ">
          <div className="flex  justify-between w-1/2 items-center ">
            <button onClick={close}>
              <Image
                src={"/icons/close.svg"}
                alt="go back"
                width={16}
                height={16}
              />
            </button>
            <h5 className="text-center text-raiz-gray-950 text-base font-bold  leading-tight">
              Inbox
            </h5>
          </div>
        </div>
        <div className="flex flex-col gap-[49px] mt-3 h-full overflow-y-scroll no-scrollbar pb-[100px]">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.keys(groupedNotifications).map((dateLabel) => (
              <div key={dateLabel}>
                <h4 className="text-raiz-gray-950 text-base font-medium font-brSonoma leading-tight">
                  {dateLabel}
                </h4>
                <div className="flex flex-col gap-2 mt-2">
                  {groupedNotifications[dateLabel].map(
                    (notification, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedNotification(notification)}
                        className="text-left w-full"
                        aria-label={`View notification: ${notification.notification_title}`}
                        role="button"
                      >
                        <NotificationItem {...notification} />
                      </button>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center h-full items-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path
                  d="M58.6669 24V42.6667C58.6669 47.0933 55.0935 50.6667 50.6669 50.6667H21.3335C19.2802 50.6667 17.4402 49.8933 16.0269 48.64L19.7335 45.3333H42.6669C47.0935 45.3333 50.6669 41.76 50.6669 37.3333V18.6667C50.6669 17.7333 50.5069 16.8267 50.1869 16H50.6669C55.0935 16 58.6669 19.5733 58.6669 24Z"
                  fill="#444B8C"
                />
                <path
                  d="M58.6667 37.4136V54.5602C58.6667 58.0269 54.5868 59.8402 52.0001 57.5469L41.2534 48.0002H53.3334V38.4536L58.6667 37.4136Z"
                  fill="#444B8C"
                />
                <path
                  opacity="0.35"
                  d="M42.6668 10.6665H13.3335C8.91483 10.6665 5.3335 14.2478 5.3335 18.6665V49.2372C5.3335 52.6878 9.41083 54.5198 11.9922 52.2265L19.7442 45.3332H42.6668C47.0855 45.3332 50.6668 41.7518 50.6668 37.3332V18.6665C50.6668 14.2478 47.0855 10.6665 42.6668 10.6665Z"
                  fill="#5633E3"
                />
                <path
                  d="M7.99985 58.6665C7.31719 58.6665 6.63452 58.4052 6.11452 57.8852C5.07185 56.8425 5.07185 55.1572 6.11452 54.1145L54.1145 6.11452C55.1572 5.07185 56.8425 5.07185 57.8852 6.11452C58.9279 7.15719 58.9279 8.84252 57.8852 9.88519L9.88519 57.8852C9.36519 58.4052 8.68252 58.6665 7.99985 58.6665Z"
                  fill="#1E1924"
                />
              </svg>
              <h2 className="text-raiz-gray-950 text-lg font-bold mb-8 leading-snug">
                You have no messages yet
              </h2>
              <p className="text-center text-raiz-gray-950 text-sm font-normal  leading-tight">
                If there were any new updates or important messages for you they
                would appear here.
              </p>
              <p className="text-center text-raiz-gray-950 text-sm font-normal  leading-tight mt-6">
                Keep exploring and engaging with the app to stay connected and
                receive timely notifcations
              </p>
            </div>
          )}
        </div>
      </div>
      {selectedNotification ? (
        <NotificationDetailModal
          notification={selectedNotification}
          close={() => setSelectedNotification(null)}
        />
      ) : null}
    </>
  );
};

export default Notifications;
