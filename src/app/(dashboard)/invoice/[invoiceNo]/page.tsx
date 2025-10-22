"use client";
import React from "react";
import InvoiceFile, { IInvoice } from "../_components/InvoiceFile";
import InvoiceTableMoreOpts from "../_components/InvoiceTableMoreOpts";
import Button from "@/components/ui/Button";
import { useParams } from "next/navigation";
import InvoiceActivity from "../_components/InvoiceActivity";

export const data: IInvoice = {
  // Company Details
  companyName: "Stripe Technologies Inc.",
  companyAddress: "123 Innovation Drive, San Francisco, CA 94107",

  // Invoice Info
  id: 2049,
  invoiceNo: "INV-2049",
  status: "Pending",
  currency: "USD",

  // Billing Details
  billTo: "Acme Corporation",
  contactPerson: "John Doe",
  customer: "Acme Corporation Ltd.",

  // Dates
  issueDate: "2025-10-08",
  dueDate: "2025-11-08",
  dueDays: "30 Days",

  // Financial Details
  items: [
    {
      id: 1,
      description: "Website Design and Development (Oct-Dec 2025)",
      qty: 1,
      unitPrice: 3000.99,
      amount: 3000.99,
    },
    {
      id: 2,
      description: "Maintenance & Hosting (Monthly Plan)",
      qty: 6,
      unitPrice: 200.5,
      amount: 1203.0,
    },
    {
      id: 3,
      description: "SEO Optimization Package",
      qty: 2,
      unitPrice: 100.5,
      amount: 201.0,
    },
    {
      id: 4,
      description: "Cloud Backup Subscription",
      qty: 7,
      unitPrice: 50.0,
      amount: 350.0,
    },
  ],
  subTotal: "$4,754.99",
  discount: "$70.00",
  tax: "$42.00",
  total: "$4,726.99",
  amount: 4726.99,

  // Extra Info
  note: "Thank you for your business and prompt payment!",
  terms:
    "Payment is due within 30 days. Late payments may incur a 5% fee. Please contact our billing department for any questions.",

  // Contact
  contact: {
    phone: "+1 (800) 555-9020",
    email: "billing@stripe.com",
    website: "https://stripe.com",
  },
};

const InvoiceDetail = () => {
  const { invoiceNo } = useParams<{ invoiceNo: string }>();

  return (
    <section className="mt-10 h-full flex flex-col items-center">
      <h1 className="text-zinc-900 text-2xl font-bold  leading-7 text-left mb-12 w-full">
        {invoiceNo}
      </h1>
      <section className="flex justify-between gap-12 w-full ">
        <div className="w-[80%]">
          <InvoiceFile data={data} />
        </div>
        <aside className="w-[20%]">
          <InvoiceActivity />
        </aside>
      </section>
      <div className="w-full px-8 py-6 mt-8 border-t border-gray-100 flex justify-between items-center">
        <InvoiceTableMoreOpts
          invoice={data}
          isLast={true}
          onEdit={() => {}}
          onCopyLink={() => {}}
          onDownloadPDF={() => {}}
          from="preview"
        />
        <Button
          className="w-[200px]"
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3334 13.6666H4.66671C2.66671 13.6666 1.33337 12.6666 1.33337 10.3333V5.66659C1.33337 3.33325 2.66671 2.33325 4.66671 2.33325H11.3334C13.3334 2.33325 14.6667 3.33325 14.6667 5.66659V10.3333C14.6667 12.6666 13.3334 13.6666 11.3334 13.6666Z"
                stroke="#FCFCFD"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3333 6L9.24662 7.66667C8.55996 8.21333 7.43329 8.21333 6.74662 7.66667L4.66663 6"
                stroke="#FCFCFD"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          iconClassName="left-[19%]"
        >
          Send Email
        </Button>
      </div>
    </section>
  );
};

export default InvoiceDetail;
