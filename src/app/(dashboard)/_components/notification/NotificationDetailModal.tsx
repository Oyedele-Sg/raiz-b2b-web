import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import { NotificationItemProps } from "@/types/misc";

interface Props {
  notification: NotificationItemProps;
  close: () => void;
}

const NotificationDetailModal = ({ close, notification }: Props) => {
  return (
    <Overlay width="375px" close={close}>
      <div className="flex flex-col  h-full py-8 px-5 ">
        <Image
          src={"/icons/notif-promo.svg"}
          alt="close"
          width={40}
          height={40}
        />
        <h4 className="text-raiz-gray-950 text-xl font-semibold leading-normal mt-[28px] mb-3">
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
