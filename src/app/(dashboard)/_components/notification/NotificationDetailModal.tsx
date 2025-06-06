import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import { INotification } from "@/types/user";
import { categoryIcons } from "./Notifications";

interface Props {
  notification: INotification;
  close: () => void;
}

const NotificationDetailModal = ({ close, notification }: Props) => {
  const categoryIcon =
    categoryIcons.find(
      (icon) =>
        icon.code ===
        notification?.notification_category.notification_category_id
    )?.icon || "/icons/notif-general.svg";
  return (
    <Overlay width="375px" close={close}>
      <div className="flex flex-col  h-full py-8 px-5 ">
        <Image src={categoryIcon} alt="close" width={40} height={40} />
        <h4 className="text-raiz-gray-950 text-xl font-semibold leading-normal mt-[28px] mb-3 break-words">
          {notification?.notification_title}
        </h4>
        <p className="text-raiz-gray-700 text-[13px] font-normal leading-tight">
          {notification?.notification_body}
        </p>
      </div>
    </Overlay>
  );
};

export default NotificationDetailModal;
