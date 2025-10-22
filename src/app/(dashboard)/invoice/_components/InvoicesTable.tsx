"use client";
import React, { useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import Image from "next/image";
import { format } from "date-fns";
import DateRange from "../../transactions/_components/DateRange";
import SelectField from "@/components/ui/SelectField";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Avatar from "@/components/ui/Avatar";
import {
  convertTime,
  getCurrencySymbol,
  truncateString,
} from "@/utils/helpers";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";
import InvoiceTableMoreOpts from "./InvoiceTableMoreOpts";
import EmptyInvoiceTable from "./EmptyInvoiceTable";
import { CustomerSearchBox } from "./CustomerSearchbox";
import { useRouter } from "next/navigation";
import { IInvoice } from "./InvoiceFile";

export const sampleInvoices: IInvoice[] = [
  {
    companyName: "Stripe Technologies Inc.",
    companyAddress: "123 Innovation Drive, San Francisco, CA 94107",
    id: 2049,
    invoiceNo: "INV-2049",
    status: "Pending",
    currency: "USD",
    billTo: "Acme Corporation",
    contactPerson: "John Doe",
    customer: "Acme Corporation Ltd.",
    issueDate: "2025-10-08",
    dueDate: "2025-11-08",
    dueDays: "30 Days",
    items: [
      {
        id: 1,
        description: "Website Design and Development",
        qty: 1,
        unitPrice: 3000.99,
        amount: 3000.99,
      },
      {
        id: 2,
        description: "Maintenance & Hosting",
        qty: 6,
        unitPrice: 200.5,
        amount: 1203,
      },
    ],
    subTotal: "$4,203.99",
    discount: "$70.00",
    tax: "$42.00",
    total: "$4,175.99",
    amount: 4175.99,
    note: "Thank you for your business!",
    terms: "Payment is due within 30 days.",
    contact: {
      phone: "+1 (800) 555-9020",
      email: "billing@stripe.com",
      website: "https://stripe.com",
    },
  },
  {
    companyName: "Flutterwave Ltd.",
    companyAddress: "19 Olubunmi Owa Street, Lekki, Lagos",
    id: 3051,
    invoiceNo: "INV-3051",
    status: "Paid",
    currency: "NGN",
    billTo: "Tech Innovations NG",
    contactPerson: "Aisha Bello",
    customer: "Tech Innovations NG",
    issueDate: "2025-09-02",
    dueDate: "2025-09-30",
    dueDays: "28 Days",
    items: [
      {
        id: 1,
        description: "API Integration Service",
        qty: 1,
        unitPrice: 250000,
        amount: 250000,
      },
      {
        id: 2,
        description: "Technical Support",
        qty: 3,
        unitPrice: 40000,
        amount: 120000,
      },
    ],
    subTotal: "₦370,000.00",
    discount: "₦20,000.00",
    tax: "₦15,000.00",
    total: "₦365,000.00",
    amount: 365000,
    note: "Thanks for trusting Flutterwave!",
    terms: "Payment received in full.",
    contact: {
      phone: "0800-FLUTTER",
      email: "support@flutterwave.com",
      website: "https://flutterwave.com",
    },
  },
  {
    companyName: "Paystack Nigeria",
    companyAddress: "126 Joel Ogunnaike St, Ikeja GRA, Lagos",
    id: 1843,
    invoiceNo: "INV-1843",
    status: "Overdue",
    currency: "NGN",
    billTo: "Bright Systems",
    contactPerson: "Emeka Chukwu",
    customer: "Bright Systems Ltd.",
    issueDate: "2025-08-01",
    dueDate: "2025-08-31",
    dueDays: "30 Days",
    items: [
      {
        id: 1,
        description: "Payment Gateway Setup",
        qty: 1,
        unitPrice: 150000,
        amount: 150000,
      },
      {
        id: 2,
        description: "Custom Integration",
        qty: 2,
        unitPrice: 60000,
        amount: 120000,
      },
    ],
    subTotal: "₦270,000.00",
    discount: "₦10,000.00",
    tax: "₦5,000.00",
    total: "₦265,000.00",
    amount: 265000,
    note: "Please settle your invoice promptly.",
    terms: "Late payment fee applies after 7 days overdue.",
    contact: {
      phone: "+234 1 631 6160",
      email: "accounts@paystack.com",
      website: "https://paystack.com",
    },
  },
  {
    companyName: "Google Cloud",
    companyAddress: "1600 Amphitheatre Pkwy, Mountain View, CA",
    id: 4098,
    invoiceNo: "INV-4098",
    status: "Paid",
    currency: "USD",
    billTo: "DataSoft Analytics",
    contactPerson: "Sarah Lee",
    customer: "DataSoft Analytics Inc.",
    issueDate: "2025-09-10",
    dueDate: "2025-10-10",
    dueDays: "30 Days",
    items: [
      {
        id: 1,
        description: "Cloud Hosting Services",
        qty: 3,
        unitPrice: 120.0,
        amount: 360.0,
      },
      {
        id: 2,
        description: "Storage Add-on",
        qty: 1,
        unitPrice: 50.0,
        amount: 50.0,
      },
    ],
    subTotal: "$410.00",
    discount: "$10.00",
    tax: "$15.00",
    total: "$415.00",
    amount: 415.0,
    note: "Thank you for using Google Cloud.",
    terms: "Auto-renewal applies every month.",
    contact: {
      phone: "+1 800 355 5787",
      email: "support@googlecloud.com",
      website: "https://cloud.google.com",
    },
  },
  {
    companyName: "Amazon Web Services",
    companyAddress: "410 Terry Ave N, Seattle, WA 98109",
    id: 5023,
    invoiceNo: "INV-5023",
    status: "Pending",
    currency: "USD",
    billTo: "NextGen Solutions",
    contactPerson: "Carlos Jimenez",
    customer: "NextGen Solutions LLC",
    issueDate: "2025-10-05",
    dueDate: "2025-11-05",
    dueDays: "30 Days",
    items: [
      {
        id: 1,
        description: "EC2 Compute Instances",
        qty: 5,
        unitPrice: 80,
        amount: 400,
      },
      { id: 2, description: "S3 Storage", qty: 10, unitPrice: 10, amount: 100 },
    ],
    subTotal: "$500.00",
    discount: "$0.00",
    tax: "$25.00",
    total: "$525.00",
    amount: 525,
    note: "Auto-payment enabled.",
    terms: "No manual invoice settlement required.",
    contact: {
      phone: "+1 888 280 4331",
      email: "aws-billing@amazon.com",
      website: "https://aws.amazon.com",
    },
  },
  {
    companyName: "InterSwitch",
    companyAddress: "1648C Oko Awo St, Victoria Island, Lagos",
    id: 6010,
    invoiceNo: "INV-6010",
    status: "Paid",
    currency: "NGN",
    billTo: "QuickBuy Retailers",
    contactPerson: "Ngozi Eze",
    customer: "QuickBuy Retailers Ltd.",
    issueDate: "2025-07-20",
    dueDate: "2025-08-19",
    dueDays: "30 Days",
    items: [
      {
        id: 1,
        description: "POS Device Rental",
        qty: 4,
        unitPrice: 30000,
        amount: 120000,
      },
      {
        id: 2,
        description: "Transaction Fees",
        qty: 1,
        unitPrice: 10000,
        amount: 10000,
      },
    ],
    subTotal: "₦130,000.00",
    discount: "₦0.00",
    tax: "₦6,500.00",
    total: "₦136,500.00",
    amount: 136500,
    note: "POS units successfully delivered.",
    terms: "Fees cover monthly usage and support.",
    contact: {
      phone: "0700-INTERSWITCH",
      email: "support@interswitch.com",
      website: "https://interswitchgroup.com",
    },
  },
  {
    companyName: "Meta Platforms Inc.",
    companyAddress: "1 Hacker Way, Menlo Park, CA 94025",
    id: 7027,
    invoiceNo: "INV-7027",
    status: "Pending",
    currency: "USD",
    billTo: "Visionary Media Group",
    contactPerson: "Elena Costa",
    customer: "Visionary Media Group",
    issueDate: "2025-10-01",
    dueDate: "2025-10-31",
    dueDays: "30 Days",
    items: [
      {
        id: 1,
        description: "Ad Campaign Management",
        qty: 2,
        unitPrice: 750,
        amount: 1500,
      },
      {
        id: 2,
        description: "Audience Analytics",
        qty: 1,
        unitPrice: 250,
        amount: 250,
      },
    ],
    subTotal: "$1,750.00",
    discount: "$0.00",
    tax: "$70.00",
    total: "$1,820.00",
    amount: 1820,
    note: "Pending confirmation of next campaign.",
    terms: "Due before next billing cycle.",
    contact: {
      phone: "+1 650 543 4800",
      email: "finance@meta.com",
      website: "https://meta.com",
    },
  },
  {
    companyName: "Microsoft Corporation",
    companyAddress: "One Microsoft Way, Redmond, WA 98052",
    id: 8092,
    invoiceNo: "INV-8092",
    status: "Overdue",
    currency: "USD",
    billTo: "CloudTek Enterprises",
    contactPerson: "Jason Miller",
    customer: "CloudTek Enterprises Inc.",
    issueDate: "2025-07-15",
    dueDate: "2025-08-15",
    dueDays: "30 Days",
    items: [
      {
        id: 1,
        description: "Microsoft 365 Business License",
        qty: 25,
        unitPrice: 15,
        amount: 375,
      },
      {
        id: 2,
        description: "Azure Storage",
        qty: 3,
        unitPrice: 60,
        amount: 180,
      },
    ],
    subTotal: "$555.00",
    discount: "$20.00",
    tax: "$15.00",
    total: "$550.00",
    amount: 550,
    note: "License renewal pending payment.",
    terms: "Overdue — please make payment to avoid suspension.",
    contact: {
      phone: "+1 425 882 8080",
      email: "accounts@microsoft.com",
      website: "https://microsoft.com",
    },
  },
];

const columnHelper = createColumnHelper<IInvoice>();

const InvoicesTable = () => {
  const [showDateRange, setShowDateRange] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});
  const router = useRouter();
  const isLoading = false;
  const statusOptions = [
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "overdue", label: "Overdue" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<IInvoice, any>[] = [
    columnHelper.accessor("customer", {
      header: "Customer",
      cell: (info) => (
        <div className="flex items-center gap-2 font-brSonoma">
          <Avatar name="" src={""} />
          <span className="text-sm font-medium text-raiz-gray-950">
            {truncateString(info.getValue(), 28)}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("invoiceNo", {
      header: "Invoice #",
      cell: (info) => (
        <span className="text-sm font-medium text-raiz-gray-950">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("issueDate", {
      header: "Date Issued",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {dayjs(convertTime(info.getValue())).format("DD MMM YYYY @ h:mm A")}
        </span>
      ),
    }),
    columnHelper.accessor("contactPerson", {
      header: "Contact Person",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("dueDate", {
      header: "Due Date",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {dayjs(convertTime(info.getValue())).format("DD MMM YYYY @ h:mm A")}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue()?.toLowerCase();
        const dotColor =
          status === "paid"
            ? "bg-green-500"
            : status === "pending"
            ? "bg-yellow-500"
            : "bg-red-500";

        return (
          <div className="w-fit flex items-center px-1.5 py-0.5 gap-1 text-xs font-brSonoma border border-raiz-gray-200 rounded-md">
            <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
            {status}
          </div>
        );
      },
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => {
        return (
          <span
            className={`text-sm font-normal  font-brSonoma  text-raiz-gray-700`}
          >
            {`+ ${getCurrencySymbol(info.row.original?.currency)}${Math.abs(
              info?.getValue()
            )?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </span>
        );
      },
    }),
    columnHelper.accessor("contact.email", {
      header: "Email Address",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("contact.phone", {
      header: "Phone Number",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("dueDays", {
      header: "Due Days",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("id", {
      header: "",
      cell: (info) => {
        const isLast =
          info.row.index >= info.table.getRowModel().rows.length - 3;
        return (
          <InvoiceTableMoreOpts
            invoice={info.row.original}
            isLast={isLast}
            onEdit={() =>
              router.push(`/invoice/${info?.row?.original?.invoiceNo}`)
            }
            onCopyLink={() => {}}
            onDownloadPDF={() => {}}
            onSendEmail={() => {}}
            from="table"
          />
        );
      },
    }),
  ];

  const table = useReactTable({
    data: sampleInvoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const customerBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="w-full h-full">
      {sampleInvoices?.length > 0 && (
        <div className="flex gap-3 items-center mb-6">
          {/* Customer search */}
          <div className="relative">
            <button
              ref={customerBtnRef}
              onClick={() => setShowSearchBox(!showSearchBox)}
              className="w-48 gap-2  px-3.5 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border  border-zinc-200 inline-flex justify-between items-center"
            >
              <span className="text-zinc-800 text-sm font-bold  leading-none">
                Customers
              </span>
              <Image
                src={"/icons/search.svg"}
                alt="search"
                width={20}
                height={20}
              />
            </button>
            {showSearchBox && (
              <CustomerSearchBox
                setShowSearchBox={setShowSearchBox}
                btnRef={customerBtnRef}
              />
            )}
          </div>
          {/* Status */}
          <SelectField
            placeholder="Status"
            options={statusOptions}
            value={""}
            onChange={() => {}}
            bgColor="#fff"
            width={"160px"}
            minHeight="44px"
            height="44px"
            placeholderStyle={{
              fontWeight: "bold",
              color: "#2C2435",
            }}
          />
          {/* dates */}
          <div className="relative ">
            <button
              onClick={() => setShowDateRange(!showDateRange)}
              className="flex h-11 gap-1.5 items-center px-3.5 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-zinc-200 "
            >
              <Image
                src={"/icons/calendar.svg"}
                alt="calendar"
                width={20}
                height={20}
              />
              <span className="text-zinc-800 text-sm font-bold leading-none">
                {dateRange.startDate && dateRange.endDate
                  ? `${format(dateRange.startDate, "dd MMM")} - ${format(
                      dateRange.endDate,
                      "dd MMM"
                    )}`
                  : "Select dates"}
              </span>
            </button>
            {showDateRange && (
              <DateRange
                onApply={setDateRange}
                onClose={() => setShowDateRange(false)}
              />
            )}
          </div>
          {dateRange.startDate && (
            <button
              onClick={() => setDateRange({})}
              className="flex items-center justify-center w-10 h-10 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-zinc-200"
            >
              <LiaTimesSolid />
            </button>
          )}

          {/* export */}
          <button className="flex h-11 gap-1.5 items-center px-3.5 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-zinc-200 ">
            <Image
              src={"/icons/export.svg"}
              alt="Export"
              width={20}
              height={20}
            />
            <span className="text-zinc-800 text-sm font-bold leading-none">
              Export
            </span>
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="w-full overflow-x-auto ">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="whitespace-nowrap ">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-4 text-raiz-gray-700 bg-[#EAECFF99] text-[13px] font-normal font-monzo"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y">
              <tr>
                <td colSpan={5}>
                  <Skeleton count={4} className="mb-3" height={48} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : sampleInvoices.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto ">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b ">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="whitespace-nowrap">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="py-3 px-4 text-raiz-gray-700 bg-[#EAECFF99] text-[13px] font-normal font-monzo"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 whitespace-nowrap"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <EmptyInvoiceTable />
      )}
    </section>
  );
};

export default InvoicesTable;
