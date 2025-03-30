import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
// import EmptyList from "@/components/ui/EmptyList";
import InputField from "@/components/ui/InputField";
// import Spinner from "@/components/ui/Spinner";
import {
  CreateUsBeneficiary,
  FetchUsBeneficiariesApi,
  GetUSBeneficiaryFormFields,
} from "@/services/transactions";
// import { useSendStore } from "@/store/Send";
import {
  FormField,
  IUsBeneficiariesParams,
  IUsBeneficiaryPayload,
} from "@/types/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface FormValues {
  label: string;
  name: string;
  card_number: string;
  expiry_month: string;
  expiry_year: string;
}

interface Props {
  close: () => void;
}

const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  // Split into groups of 4 and join with spaces
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(" ").slice(0, 19); // Limit to 19 chars (16 digits + 3 spaces)
};

const AddCardBeneficiary = ({ close }: Props) => {
  // const { actions } = useSendStore();
  const { data: fieldsData } = useQuery({
    queryKey: ["us-bank-benefiary-fields"],
    queryFn: GetUSBeneficiaryFormFields,
  });
  const { data } = useQuery({
    queryKey: [
      "us-bank-beneficiaries",
      {
        option_type: "card",
        page: 1,
        limit: 50,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IUsBeneficiariesParams];
      return FetchUsBeneficiariesApi(params);
    },
  });
  const fields: FormField[] = fieldsData?.card || [];
  const beneficiaries = data?.beneficiaries || [];
  const createValidationSchema = () => {
    return z.object({
      label: z.string().min(1, "Label is required"),
      name: z.string().min(1, "Name is required"),
      card_number: z
        .string()
        .min(16, "Card number must be at least 16 digits")
        .regex(
          /^\d{4}\s\d{4}\s\d{4}\s\d{4}$|^\d{16}$/,
          "Invalid card number format"
        ),
      expiry_month: z
        .string()
        .min(2, "Month must be 2 digits")
        .max(2, "Month must be 2 digits")
        .regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
      expiry_year: z
        .string()
        .min(4, "Year must be 4 digits")
        .max(4, "Year must be 4 digits")
        .regex(/^\d{4}$/, "Invalid year")
        .refine((val) => parseInt(val) >= new Date().getFullYear(), {
          message: "Year must be current or future",
        }),
    });
  };
  const qc = useQueryClient();
  const AddBeneficiaryMutation = useMutation({
    mutationFn: (data: IUsBeneficiaryPayload) => CreateUsBeneficiary(data),
    onSuccess: (response) => {
      console.log("response", response);
      toast.success("Beneficiary added!");
      qc.invalidateQueries({ queryKey: ["us-bank-beneficiaries"] });
    },
  });

  const initialValues: FormValues = {
    label: "",
    name: "",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(createValidationSchema()),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload: IUsBeneficiaryPayload = {
          label: values.label,
          name: values.name,
          account: values.card_number,
          optionType: "card",
        };

        await AddBeneficiaryMutation.mutateAsync(payload);
        resetForm();
      } catch (error) {
        console.log("Submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    formik.setFieldValue("card_number", formattedValue);
  };

  //   if (fieldLoading) {
  //     return (
  //       <div className="flex flex-col gap-5 mt-10 justify-center items-center">
  //         <Spinner />
  //         <p> Loading form fields...</p>
  //       </div>
  //     );
  //   }
  return (
    <div>
      <SideWrapperHeader
        title="Send to Debit Card"
        close={close}
        titleColor="text-zincc-900"
      />
      <div className="mb-11">
        <h5 className="text-raiz-gray-950 text-sm font-bold  leading-[16.80px] mb-[15px]">
          Recent
        </h5>
        {/* {isLoading ? (
          <div>Loading beneficiaries...</div>
        ) : beneficiaries?.length > 0 ? (
          <div className="flex gap-2 overflow-x-scroll no-scrollbar">
            {beneficiaries?.map((user) => (
              <button
                key={user?.usd_beneficiary_id}
                className="flex flex-col justify-center items-center gap-1 px-2 flex-shrink-0"
                onClick={() => actions.selectUsdBeneficiary(user)}
              >
                Card
              </button>
            ))}
          </div>
        ) : (
          <EmptyList text={"No beneficiary yet"} />
        )} */}
        <div className="flex gap-2 justify-between overflow-x-scroll no-scrollbar">
          <div className="flex justify-between items-end bg-[url('/images/')]   bg-raiz-usd-primary rounded-2xl p-4 w-full">
            <div className="flex flex-col gap-1">
              <h5 className="text-white text-sm font-normal leading-tight">
                Khadijah Arowosegbe
              </h5>
              <p className=" text-gray-100 text-xs font-normal  leading-none">
                **** 1256
              </p>
            </div>
            <p className="text-gray-100">Visa</p>
          </div>
        </div>
      </div>
      {fields.length > 0 && (
        <form
          onSubmit={formik.handleSubmit}
          className={`flex flex-col gap-[15px] justify-between ${
            beneficiaries?.length > 0 ? "min-h-[75vh]" : "min-h-[80vh]"
          } pb-7`}
        >
          <div className="flex flex-col gap-[15px] h-full">
            <InputField
              label="Label/Nickname"
              placeholder="E.g. mikey"
              {...formik.getFieldProps("label")}
              type="text"
              errorMessage={formik.touched.label && formik.errors.label}
              status={
                formik.touched.label && formik.errors.label ? "error" : null
              }
            />
            <InputField
              label="Name on card"
              placeholder="Enter name on card"
              {...formik.getFieldProps("name")}
              type="text"
              errorMessage={formik.touched.name && formik.errors.name}
              status={
                formik.touched.name && formik.errors.name ? "error" : null
              }
            />
            <InputField
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              value={formik.values.card_number}
              onChange={handleCardNumberChange}
              onBlur={formik.handleBlur}
              name={"card_number"}
              type="text"
              errorMessage={
                formik.touched.card_number && formik.errors.card_number
              }
              status={
                formik.touched.card_number && formik.errors.card_number
                  ? "error"
                  : null
              }
            />
            <div className="flex gap-3 justify-between">
              <InputField
                label="Expiry Month"
                placeholder="02"
                {...formik.getFieldProps("expiry_month")}
                type="text"
                errorMessage={
                  formik.touched.expiry_month && formik.errors.expiry_month
                }
                status={
                  formik.touched.expiry_month && formik.errors.expiry_month
                    ? "error"
                    : null
                }
              />
              <InputField
                label="Expiry Year"
                placeholder="2025"
                {...formik.getFieldProps("expiry_year")}
                type="text"
                errorMessage={
                  formik.touched.expiry_year && formik.errors.expiry_year
                }
                status={
                  formik.touched.expiry_year && formik.errors.expiry_year
                    ? "error"
                    : null
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            loading={formik.isSubmitting}
          >
            Continue
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddCardBeneficiary;
