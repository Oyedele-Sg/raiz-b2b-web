"use client";
import Avatar from "@/components/ui/Avatar";
import React from "react";

interface IInvoiceItem {
  id: number;
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface IInvoice {
  // Company Details
  companyName: string;
  companyAddress: string;

  // Invoice Info
  id: number;
  invoiceNo: string;
  status: string;
  currency: "USD" | "NGN";

  // Billing Details
  billTo: string;
  contactPerson: string;
  customer: string;

  // Dates
  issueDate: string; // ISO string or formatted date
  dueDate: string; // ISO string or formatted date
  dueDays: string;

  // Financial Details
  items: IInvoiceItem[];
  subTotal: string;
  discount: string;
  tax: string;
  total: string;
  amount: number;

  // Extra Info
  note: string;
  terms: string;

  // Contact
  contact: {
    phone: string;
    email: string;
    website: string;
  };
}

interface Props {
  data: IInvoice;
}

const InvoiceFile = ({ data }: Props) => {
  return (
    <section className="max-w-[1200px] px-14  w-full bg-white rounded-3xl border border-gray-200 inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Header Section */}
      <div className="w-full">
        <div className="w-full  pt-14 pb-5 flex justify-between items-end">
          <div className="flex flex-col gap-3">
            <Avatar className="size-6" src={""} name={""} />
            <div>
              <h1 className="text-zinc-900 text-lg font-bold  leading-snug">
                {data.companyName}
              </h1>
              <p className="text-zinc-700  text-sm mt-2">
                {data.companyAddress}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <h2 className=" text-zinc-900 text-4xl font-semibold  leading-10">
              INVOICE
            </h2>
          </div>
        </div>
        <p className=" text-zinc-900 text-sm font-bold  mb-12 text-right">
          {data.invoiceNo}
        </p>
      </div>

      {/* Bill To Section */}
      <div className="w-full pb-12 flex justify-between items-start">
        <div>
          <p className="text-zinc-700 text-sm mb-2">Bill To:</p>
          <p className="text-zinc-900 text-base font-semibold">{data.billTo}</p>
        </div>
        <div className="flex flex-col gap-3 items-end">
          <div className="flex gap-20">
            <span className=" text-zinc-800 text-sm font-semibold ">
              Issue Date:
            </span>
            <span className="text-zinc-700 text-sm leading-tight">
              {data.issueDate}
            </span>
          </div>
          <div className="flex gap-20">
            <span className=" text-zinc-800 text-sm font-semibold ">
              Due Date:
            </span>
            <span className="text-zinc-700 text-sm leading-tight">
              {data.dueDate}
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full  pb-8">
        <table className="w-full">
          <thead className="text-zinc-700 text-xs">
            <tr className="bg-violet-100/60 border-t border-b border-gray-200">
              <th className="text-left py-4 px-4 text-zinc-700 text-xs font-normal w-12">
                SN.
              </th>
              <th className="text-left py-4 px-4 text-zinc-700 text-xs font-normal">
                Item Details
              </th>
              <th className="text-left py-4 px-4 text-zinc-700 text-xs font-normal w-24">
                Qty
              </th>
              <th className="text-left py-4 px-4 text-zinc-700 text-xs font-normal w-32">
                Unit Price
              </th>
              <th className="text-right py-4 px-4 text-zinc-700 text-xs font-normal w-32">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="font-brSonoma ">
            {data.items.map((item, i) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-6 px-4 text-zinc-700 text-sm">{i + 1}</td>
                <td className="py-6 px-4 text-zinc-900 font-medium text-sm">
                  {item.description}
                </td>
                <td className="py-6 px-4 text-zinc-700 text-sm">{item.qty}</td>
                <td className="py-6 px-4 text-zinc-700 text-sm">
                  {item.unitPrice}
                </td>
                <td className="py-6 px-4 text-zinc-700 text-sm text-right">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="w-full pb-12 gap-8 flex justify-between items-end">
        <div className="flex-1 flex flex-col justify-between ">
          <p className="text-zinc-900 text-sm mb-6">{data?.note}</p>
          <div className="mt-5">
            <h3 className="text-zinc-900 text-base font-semibold mb-2">
              Terms & Conditions
            </h3>
            <p className="text-zinc-700 text-xs leading-relaxed max-w-sm">
              {data.terms}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 min-w-80 border border-gray-100 rounded-lg">
          <div className="flex justify-between pt-6 px-6">
            <span className="text-gray-700 text-sm">Sub Total:</span>
            <span className="text-zinc-900 text-sm font-medium">
              {data.subTotal}
            </span>
          </div>
          <div className="flex justify-between  px-6">
            <span className="text-gray-700 text-sm">Discount:</span>
            <span className="text-zinc-900 text-sm font-medium">
              {data.discount}
            </span>
          </div>
          <div className="flex justify-between  px-6">
            <span className="text-gray-700 text-sm">Tax:</span>
            <span className="text-zinc-900 text-sm font-medium">
              {data.tax}
            </span>
          </div>
          <div className="flex justify-between text-zinc-700 text-base font-semibold  py-4 px-4 bg-gray-100 ">
            <span className="">Total:</span>
            <span className="">{data.total}</span>
          </div>
        </div>
      </div>

      {/* Contact Footer */}
      <div className="w-full  py-8 flex gap-8 text-zinc-800 font-semibold text-sm border-t border-gray-100">
        <span>{data.contact.phone}</span>
        <span>{data.contact.email}</span>
        <span>{data.contact.website}</span>
      </div>
    </section>
  );
};

export default InvoiceFile;
