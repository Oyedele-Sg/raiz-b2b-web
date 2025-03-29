"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import EmptyList from "@/components/ui/EmptyList";
import InputField from "@/components/ui/InputField";
import ModalTrigger from "@/components/ui/ModalTrigger";
import Radio from "@/components/ui/Radio";
import Spinner from "@/components/ui/Spinner";
import { useUser } from "@/lib/hooks/useUser";
import {
  CreateIntBeneficiary,
  FetchIntBeneficiariesApi,
  GetIntBeneficiaryFormFields,
} from "@/services/transactions";
import { useSendStore } from "@/store/Send";
import {
  FormField,
  IIntBeneficiariesParams,
  IIntBeneficiaryPayload,
  //   IntCountryType,
} from "@/types/services";
import { truncateString } from "@/utils/helpers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormikConfig, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import IntCountriesModal from "../toInternaional/IntCountriesModal";
import { IIntCountry } from "@/constants/send";

interface FormValues {
  country: IIntCountry | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Props {
  close: () => void;
}

const InternationalBeneficiary = ({ close }: Props) => {
  const { actions } = useSendStore();
  const { user } = useUser();
  const [showModal, setShowModal] = useState<"country" | "beneficiary" | null>(
    null
  );
  const [fields, setFields] = useState<FormField[]>([]);
  const { data: fieldsData, isLoading: fieldLoading } = useQuery({
    queryKey: ["int-bank-benefiary-fields"],
    queryFn: GetIntBeneficiaryFormFields,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "us-bank-beneficiaries",
      {
        option_type: "bank",
        // label: labelFilter,
        page: 1,
        limit: 50,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IIntBeneficiariesParams];
      return FetchIntBeneficiariesApi(params);
    },
  });
  const beneficiaries = data?.beneficiaries || [];
  const qc = useQueryClient();
  const AddBeneficiaryMutation = useMutation({
    mutationFn: (data: IIntBeneficiaryPayload) => CreateIntBeneficiary(data),
    onSuccess: () => {
      toast.success("Beneficiary added!");
      qc.invalidateQueries({ queryKey: ["us-bank-beneficiaries"] });
    },
  });

  const initialValues: FormValues = {
    country: null,
  };

  const createValidationSchema = (fields: FormField[]) => {
    const schemaShape: Record<string, z.ZodTypeAny> = {
      country: z.any().refine((val) => val !== "", "Country is required"),
    };

    fields.forEach((field) => {
      let fieldSchema = z.string();
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.name} is required`);
      }
      let finalSchema: z.ZodType<string> = fieldSchema;
      if (field.enum) {
        finalSchema = fieldSchema.refine((val) => field.enum!.includes(val), {
          message: `Must be one of: ${field.enum!.join(", ")}`,
        });
      }
      schemaShape[field.name] = finalSchema;
    });

    return z.object(schemaShape);
  };

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    validationSchema: toFormikValidationSchema(createValidationSchema(fields)),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const { country, ...restValues } = values;
        const payload: IIntBeneficiaryPayload = {
          country: country?.value || "",
          customer_email: user?.business_account?.business_email || "",
          data: { ...restValues },
        };
        // await AddBeneficiaryMutation.mutateAsync(payload);
        console.log("payload", payload);
        resetForm();
      } catch (error) {
        console.log("Submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
    validateOnMount: true,
  };

  const formik = useFormik<FormValues>(formikConfig);

  // Update fields and validation when country changes
  useEffect(() => {
    if (fieldsData && formik.values.country) {
      const newFields: FormField[] =
        typeof formik.values.country === "string" || !formik.values.country
          ? []
          : (fieldsData?.[formik.values.country.value] as FormField[]) || [];

      setFields(newFields);
      formik.setFormikState((prev) => ({
        ...prev,
        validationSchema: toFormikValidationSchema(
          createValidationSchema(newFields)
        ),
      }));
      const newValues: FormValues = {
        country: formik.values.country,
        ...newFields.reduce<Record<string, string>>(
          (acc: Record<string, string>, field: FormField) => {
            acc[field.name] = formik.values[field.name] || "";
            return acc;
          },
          {}
        ),
      };
      formik.setValues(newValues);
    }
  }, [formik.values.country, fieldsData]);

  if (fieldLoading) {
    return (
      <div className="flex flex-col gap-5 mt-10 justify-center items-center">
        <Spinner />
        <p> Loading form fields...</p>
      </div>
    );
  }

  //   console.log("vall cont", formik.values.country);
  return (
    <div>
      <SideWrapperHeader
        title="International Bank"
        close={close}
        titleColor="text-zincc-900"
      />
      <div className="mb-11">
        <h5 className="text-raiz-gray-950 text-sm font-bold  leading-[16.80px] mb-[15px]">
          Beneficiary
        </h5>
        {isLoading ? (
          <div>Loading beneficiaries...</div>
        ) : beneficiaries?.length > 0 ? (
          <div className="flex gap-2 overflow-x-scroll no-scrollbar">
            {beneficiaries?.map((user) => (
              <button
                key={user?.entity_foreign_payout_beneficiary_id}
                className="flex flex-col justify-center items-center gap-1 px-2 flex-shrink-0"
                onClick={() => actions.selectIntBeneficiary(user)}
              >
                <Avatar
                  src={""}
                  name={user?.foreign_payout_beneficiary?.beneficiary_name}
                />
                <p className="text-center text-raiz-gray-950 text-[13px] font-semibold leading-none">
                  {truncateString(
                    user?.foreign_payout_beneficiary?.beneficiary_name || "",
                    20
                  )}
                </p>
                <p className="text-center text-raiz-gray-700 text-xs leading-[18px]">
                  {user?.foreign_payout_beneficiary
                    ?.beneficiary_account_number || ""}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <EmptyList text={"No beneficiary yet"} />
        )}
      </div>
      <div className="flex justify-between w-full mb-[15px]">
        <h4 className="text-zinc-900 text-sm font-bold leading-none">
          Add Beneficiary
        </h4>
        {beneficiaries?.length > 0 && (
          <button
            type="button"
            onClick={() => setShowModal("beneficiary")}
            className="text-indigo-900 text-xs font-bold leading-tight"
          >
            Choose Beneficiary
          </button>
        )}
      </div>
      <ModalTrigger
        onClick={() => setShowModal("country")}
        placeholder="Enter country"
        value={
          typeof formik.values.country === "string"
            ? formik.values.country
            : formik.values.country?.name || ""
        }
      />
      {fields.length > 0 && (
        <form
          onSubmit={formik.handleSubmit}
          className={`flex flex-col gap-[15px] justify-between ${
            beneficiaries?.length > 0 ? "min-h-[75vh]" : "min-h-[80vh]"
          } pb-7`}
        >
          <div className="flex flex-col gap-[15px]">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col">
                {field.enum ? (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {field.name}
                    </label>
                    <div className="flex flex-col gap-3">
                      {field.enum.map((option) => (
                        <div key={option} className="flex items-center gap-2">
                          <Radio
                            checked={formik.values[field.name] === option}
                            onChange={() =>
                              formik.setFieldValue(field.name, option)
                            }
                          />
                          <span className="text-sm text-gray-700">
                            {option
                              .replace(/_/g, " ")
                              .toLowerCase()
                              .replace(/^./, (c) => c.toUpperCase())}
                          </span>
                        </div>
                      ))}
                    </div>
                    {formik.errors[field.name] &&
                      formik.touched[field.name] && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors[field.name] as string}
                        </div>
                      )}
                  </div>
                ) : (
                  <InputField
                    label={field.name
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                    name={field.name}
                    type="text"
                    value={formik.values[field.name] || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                      formik.touched[field.name] && formik.errors[field.name]
                        ? (formik.errors[field.name] as string)
                        : undefined
                    }
                    status={
                      formik.touched[field.name] && formik.errors[field.name]
                        ? "error"
                        : null
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <Button
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
            type="submit"
            loading={formik.isSubmitting}
          >
            Add Beneficiary
          </Button>
        </form>
      )}
      {showModal === "country" && (
        <IntCountriesModal
          setCountry={(country) => formik.setFieldValue("country", country)}
          close={() => setShowModal(null)}
        />
      )}
    </div>
  );
};

export default InternationalBeneficiary;
