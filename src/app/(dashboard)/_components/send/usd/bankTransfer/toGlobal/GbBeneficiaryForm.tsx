"use client";
import ModalTrigger from "@/components/ui/ModalTrigger";
import { convertField, getReadablePatternMessage } from "@/utils/helpers";
import React, { useState } from "react";
import {
  FormField,
  IIntBeneficiaryPayload,
  IntCountryType,
} from "@/types/services";
import { FormikConfig, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useUser } from "@/lib/hooks/useUser";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateIntBeneficiary } from "@/services/transactions";
import { toast } from "sonner";
import Radio from "@/components/ui/Radio";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import InputLabel from "@/components/ui/InputLabel";
import GbTypeModal from "./GbTypeModal";

export type gbBenType = "DOMESTIC_GBP" | "SEPA_EUR" | null;

interface FieldEntry {
  [key: string]: FormField[];
}

interface FieldsMap {
  [key: string]: FormField[];
  DOMESTIC_GBP: FormField[];
  SEPA_EUR: FormField[];
}

interface Props {
  fields: FieldEntry[];
  countryCode: IntCountryType;
}

interface FormValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const GbBeneficiaryForm = ({ fields, countryCode }: Props) => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState<"type" | null>(null);
  const [type, setType] = useState<gbBenType>(null);
  const typeFields = ["DOMESTIC_GBP", "SEPA_EUR"] as gbBenType[];
  const fieldsMap: FieldsMap = fields.reduce<FieldsMap>(
    (acc, entry) => {
      const key = Object.keys(entry)[0] as "DOMESTIC_GBP" | "SEPA_EUR";
      acc[key] = entry[key];
      return acc;
    },
    { DOMESTIC_GBP: [], SEPA_EUR: [] }
  );

  const formDetail = type !== null ? fieldsMap[type] || [] : [];

  const createValidationSchema = () => {
    const schemaShape: Record<string, z.ZodTypeAny> = {
      country: z.any().refine((val) => val !== "", "Country is required"),
    };

    formDetail.forEach((field) => {
      let fieldSchema = z.string();

      // Add required validation
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.name} is required`);
      }

      // Add pattern validation if it exists
      if (field.pattern) {
        try {
          const regex = new RegExp(field.pattern);
          const readableMessage = getReadablePatternMessage(
            field.pattern,
            field.name
          );

          fieldSchema = fieldSchema.regex(regex, readableMessage);
        } catch (error) {
          console.log(
            `Invalid regex pattern for ${field.name}: ${field.pattern}`,
            error
          );
        }
      }

      let finalSchema: z.ZodType<string> = fieldSchema;

      // Add enum validation if it exists
      if (field.enum) {
        finalSchema = fieldSchema.refine((val) => field.enum!.includes(val), {
          message: `Must be one of: ${field.enum!.join(", ")}`,
        });
      }

      schemaShape[field.name] = finalSchema;
    });

    return z.object(schemaShape);
  };
  const qc = useQueryClient();
  const AddBeneficiaryMutation = useMutation({
    mutationFn: (data: IIntBeneficiaryPayload) => CreateIntBeneficiary(data),
    onSuccess: (response) => {
      toast.warning(response?.message);
      qc.invalidateQueries({ queryKey: ["int-bank-beneficiaries"] });
    },
  });
  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {},
    validationSchema: toFormikValidationSchema(createValidationSchema()),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = {
          country: countryCode,
          customer_email: user?.business_account?.business_email || "",
          data: values,
        };
        await AddBeneficiaryMutation.mutateAsync(payload);
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
  return (
    <div className="my-5">
      <InputLabel content="UK Send type" />
      <ModalTrigger
        onClick={() => setShowModal("type")}
        placeholder="Select type "
        value={convertField(type || "")}
      />
      <form
        onSubmit={formik.handleSubmit}
        className={`flex flex-col gap-[15px] justify-between mt-4 min-h-[75vh]
         pb-7`}
      >
        <div className="flex flex-col gap-[15px]">
          {formDetail.map((field) => (
            <div key={field.name} className="flex flex-col">
              {field.enum ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {convertField(field.name)}
                  </label>
                  <div className="flex flex-col gap-3">
                    {field.enum.map((option) => (
                      <button
                        type="button"
                        onClick={() => formik.setFieldValue(field.name, option)}
                        key={option}
                        className="flex items-center gap-2"
                      >
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
                      </button>
                    ))}
                  </div>
                  {formik.errors[field.name] && formik.touched[field.name] && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors[field.name] as string}
                    </div>
                  )}
                </div>
              ) : field.const ? (
                <InputField
                  label={convertField(field.name)}
                  name={field.name}
                  type="text"
                  disabled
                  value={field.const || ""}
                />
              ) : (
                <InputField
                  label={convertField(field.name)}
                  name={convertField(field.name)}
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
      {showModal === "type" && (
        <GbTypeModal
          data={typeFields}
          close={() => setShowModal(null)}
          setType={setType}
          type={type}
        />
      )}
    </div>
  );
};

export default GbBeneficiaryForm;
