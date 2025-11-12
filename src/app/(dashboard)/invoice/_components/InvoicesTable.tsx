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
  blobToBase64,
  convertField,
  convertTime,
  copyToClipboard,
  downloadInvoice,
  formatAmount,
  generateInvoicePDFBlob,
  getCurrencySymbol,
  truncateString,
} from "@/utils/helpers";
import dayjs from "dayjs";
import Skeleton from "react-loading-skeleton";
import InvoiceTableMoreOpts from "./InvoiceTableMoreOpts";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import SideModalWrapper from "../../_components/SideModalWrapper";
import AddNewCustomer from "../../customers/_components/AddNewCustomer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IFectchInvoiceParams } from "@/types/services";
import {
  FetchInvoicesApi,
  SendInvoiceMailApi,
  UpdateInvoiceStatusApi,
} from "@/services/invoice";
import Pagination from "@/components/ui/Pagination";
import { IInvoice } from "@/types/invoice";
import InvoiceFile from "./InvoiceFile";
import { toast } from "sonner";
import { useUser } from "@/lib/hooks/useUser";
import SearchBox from "@/components/ui/SearchBox";
import { useDebounce } from "@/lib/hooks/useDebounce";
import EmptyInvoiceTable from "./EmptyInvoiceTable";

const columnHelper = createColumnHelper<IInvoice>();

const InvoicesTable = () => {
  const [showDateRange, setShowDateRange] = useState(false)
  const [dateRange, setDateRange] = useState<{
    startDate?: Date;
    endDate?: Date;
  }>({});
  // const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
  //   null
  // );
    const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [invoiceToDownload, setInvoiceToDownload] = useState<IInvoice | null>(
    null
  );
  const [invoiceToEmail, setInvoiceToEmail] = useState<IInvoice | null>(null);
  const [sendingMail, setSendingmail] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    { value: "", label: "All" },
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    // { value: "overdue", label: "Overdue" },
    // { value: "cancelled", label: "Cancelled" },
    { value: "draft", label: "Draft" },
    { value: "awaiting_payment", label: "Awaiting payment" },
  ];

  const handleDownloadInvoice = async (invoice: IInvoice) => {
    try {
      setInvoiceToDownload(invoice);

      setTimeout(async () => {
        if (!invoiceRef.current) return;

        await downloadInvoice(invoiceRef, invoice.invoice_number, "pdf");
        setInvoiceToDownload(null);
        toast.success("Pdf downloaded successfully ");
      }, 200);
    } catch (error) {
      console.error("Failed to download invoice:", error);
      setInvoiceToDownload(null);
      toast.error("Error downloading pdf");
    }
  };

  const qc = useQueryClient();

  const StatusMutation = useMutation({
    mutationFn: (invoice: IInvoice) =>
      UpdateInvoiceStatusApi(invoice?.invoice_id, invoice.status),
    onSuccess: () => {
      toast.success("Invoice status updated successfully!");
      qc.invalidateQueries({ queryKey: ["invoice-detail"] });
      qc.invalidateQueries({ queryKey: ["invoices-list"] });
      qc.invalidateQueries({ queryKey: ["invoice-activity"] });
    },
  });

  const handleSendEmail = async (invoice: IInvoice) => {
    if (sendingMail) return;

    setSendingmail(true);
    setInvoiceToEmail(invoice);
    const toastId = toast.loading("Generating invoice PDF...");

    // Wait for the invoice to render
    setTimeout(async () => {
      try {
        if (!invoiceRef.current) {
          throw new Error("Invoice reference not found");
        }

        const pdfBlob = await generateInvoicePDFBlob(invoiceRef);
        if (!pdfBlob) throw new Error("Failed to generate invoice PDF");

        toast.loading("Converting PDF to base64...", { id: toastId });
        const pdfBase64 = await blobToBase64(pdfBlob);

        const payload = {
          payment_link: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${user?.business_account?.username}`,
          invoice_pdf_url: pdfBase64,
        };

        toast.loading("Sending invoice email...", { id: toastId });
        await SendInvoiceMailApi(invoice.invoice_id, payload);
        toast.success("Invoice email sent successfully!", { id: toastId });

        qc.invalidateQueries({
          queryKey: ["invoices-list"],
        });
        qc.invalidateQueries({
          queryKey: ["invoice-detail", invoice.invoice_id],
        });
        qc.invalidateQueries({
          queryKey: ["invoice-activity", invoice.invoice_id],
        });
      } catch (err) {
        console.error("Email sending failed:", err);
        toast.error("Failed to send invoice email. Please try again.", {
          id: toastId,
        });
      } finally {
        setSendingmail(false);
        setInvoiceToEmail(null);
      }
    }, 200);
  };

  const handleMarkAsPaid = (invoice: IInvoice) => {
    StatusMutation.mutate({ ...invoice, status: "paid" });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<IInvoice, any>[] = [
    columnHelper.accessor("customer.business_name", {
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
    columnHelper.accessor("invoice_number", {
      header: "Invoice #",
      cell: (info) => (
        <span className="text-sm font-medium text-raiz-gray-950">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("created_at", {
      header: "Date Created",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {dayjs(convertTime(info.getValue())).format("DD MMM YYYY")}
        </span>
      ),
    }),
    columnHelper.accessor("issue_date", {
      header: "Date Issued",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {dayjs(convertTime(info.getValue())).format("DD MMM YYYY")}
        </span>
      ),
    }),
    columnHelper.accessor("customer.full_name", {
      header: "Contact Person",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("due_date", {
      header: "Due Date",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {dayjs(convertTime(info.getValue())).format("DD MMM YYYY")}
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
            : status === "draft"
            ? "bg-[#CED3D2]"
            : status === "sent"
            ? "bg-[#0D90DC]"
            : "bg-red-500";

        return (
          <div className="w-fit flex items-center capitalize px-1.5 py-0.5 gap-1 text-xs font-brSonoma border border-raiz-gray-200 rounded-md">
            <span className={`w-2 h-2 rounded-full  ${dotColor}`}></span>
            {convertField(status)}
          </div>
        );
      },
    }),
    columnHelper.accessor("total_amount", {
      header: "Amount",
      cell: (info) => {
        return (
          <span
            className={`text-sm font-normal  font-brSonoma  text-raiz-gray-700`}
          >
            {`+ ${getCurrencySymbol(info.row.original?.currency)}${formatAmount(
              info?.getValue()
            )}`}
          </span>
        );
      },
    }),
    columnHelper.accessor("customer.email", {
      header: "Email Address",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("customer.phone_number", {
      header: "Phone Number",
      cell: (info) => (
        <span className="text-sm font-brSonoma text-raiz-gray-700">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: "due_days",
      header: "Due Days",
      cell: (info) => {
        const dueDate = dayjs(convertTime(info.row.original.due_date));
        const now = dayjs();
        const diff = dueDate.diff(now, "day");

        let label = "";

        if (diff > 0) {
          label = `${diff} day${diff > 1 ? "s" : ""} left`;
        } else if (diff === 0) {
          label = "Due today";
        } else {
          label = `${Math.abs(diff)} day${
            Math.abs(diff) > 1 ? "s" : ""
          } overdue`;
        }

        return <span className={`text-sm font-brSonoma }`}>{label}</span>;
      },
    }),
    columnHelper.accessor("invoice_id", {
      header: "",
      cell: (info) => {
        const totalRows = info.table.getRowModel().rows.length;
        const currentIndex = info.row.index;
        const shouldShowUpward =
          totalRows <= 3
            ? currentIndex === totalRows - 1
            : currentIndex >= totalRows - 3;
        const invoice = info.row.original;
        return (
          <InvoiceTableMoreOpts
            invoice={info.row.original}
            isLast={shouldShowUpward}
            onEdit={() =>
              router.push(`/invoice/${info?.row?.original?.invoice_id}/edit`)
            }
            onCopyLink={() => {
              copyToClipboard(
                `${window.location.origin}/invoice/${invoice.invoice_id}`
              );
            }}
            onDownloadPDF={() => handleDownloadInvoice(invoice)}
            onSendEmail={() => handleSendEmail(invoice)}
            onView={() =>
              router.push(`/invoice/${info?.row?.original?.invoice_id}`)
            }
            onMarkAsPaid={() => handleMarkAsPaid(invoice)}
            from="table"
          />
        );
      },
    }),
  ];

  const debouncedSearch = useDebounce(searchTerm, 500)

  const pageSize = 10;
  const params: IFectchInvoiceParams = {
    status: status ? status : undefined,
    search: debouncedSearch ? debouncedSearch : undefined,
    issued_date_from: dateRange.startDate
      ? dayjs(dateRange.startDate).format("YYYY-MM-DD")
      : undefined,
    issued_date_to: dateRange.endDate
      ? dayjs(dateRange.endDate).format("YYYY-MM-DD")
      : undefined,
    page: currentPage,
    limit: pageSize,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["invoices-list", params],
    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, params] = queryKey as [string, IFectchInvoiceParams];
      return FetchInvoicesApi(params);
    },
  });

  const InvoiceList = data?.invoices || [];
  const totalPages = data?.pagination?.total_pages
    ? data.pagination?.total_pages
    : Math.ceil(InvoiceList?.length / pageSize) || 1;

  const table = useReactTable({
    data: InvoiceList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // const customerBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="w-full h-full">
      {/* {InvoiceList?.length > 0 && ( */}
      <div className="flex gap-3 items-center mb-6">
        {/* Customer search */}
        {/* <div className="relative">
          <button
            ref={customerBtnRef}
            onClick={() => setShowSearchBox(!showSearchBox)}
            className="w-48 gap-2  px-3.5 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border  border-zinc-200 inline-flex justify-between items-center"
          >
            <span className="text-zinc-800 text-sm font-bold  leading-none">
              {selectedCustomer ? selectedCustomer?.full_name : "Customers"}
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
              addNew={() => setShowAddCustomer(true)}
              onSelectCustomer={(customer) => {
                setSelectedCustomer(customer);
              }}
              selectedCustomerId={selectedCustomer?.customer_id}
              onUnselectCustomer={() => setSelectedCustomer(null)}
            />
          )}
        </div> */}
        <SearchBox
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="!w-[285px] !h-10 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-zinc-200 "
          inputClassName="rounded-lg bg-white"
          iconClassName="top-[9.5px]"
        />
        {/* Status */}
        <SelectField
          placeholder="Status"
          options={statusOptions}
          // value={status}
          value={
            status
              ? statusOptions.find((option) => option.value === status) || null
              : null
          }
          onChange={(i) => setStatus(i?.value as string)}
          bgColor="#fff"
         width="160px"
          style={{
            height: "40px"
          }}
          minHeight="40px"
          height="40px"
          placeholderStyle={{
            fontWeight: "bold",
            color: "#2C2435",
          }}
        />
        {/* dates */}
        <div className="relative ">
          <button
            onClick={() => setShowDateRange(!showDateRange)}
            className="flex h-10 gap-1.5 items-center px-3.5 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-zinc-200 "
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
        {/* <button className="flex h-11 gap-1.5 items-center px-3.5 py-2.5 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-offset-[-1px] outline-zinc-200 ">
          <Image
            src={"/icons/export.svg"}
            alt="Export"
            width={20}
            height={20}
          />
          <span className="text-zinc-800 text-sm font-bold leading-none">
            Export
          </span>
        </button> */}
      </div>
      {/* )} */}
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
                <td colSpan={columns.length}>
                  <Skeleton count={4} className="mb-3" height={48} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : InvoiceList.length > 0 ? (
        <>
          <div className="w-full overflow-x-auto h-full ">
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
            <div
              className="fixed inset-0 -z-50 overflow-hidden pointer-events-none"
              aria-hidden="true"
            >
              {(invoiceToDownload || invoiceToEmail) && (
                <div className="absolute top-[100vh] left-0 w-full">
                  <InvoiceFile
                    ref={invoiceRef}
                    data={invoiceToEmail || invoiceToDownload!}
                  />
                </div>
              )}
            </div>
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      ) : (
        <EmptyInvoiceTable />
      )}
      <AnimatePresence>
        {showAddCustomer ? (
          <SideModalWrapper close={() => setShowAddCustomer(false)}>
            <AddNewCustomer close={() => setShowAddCustomer(false)} />
          </SideModalWrapper>
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default InvoicesTable;
