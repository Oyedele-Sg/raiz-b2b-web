/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Radio from "@/components/ui/Radio";
import { GlobalCountryConfig } from "@/constants/send";
import { FormField, IntCountryType } from "@/types/services";
import { convertField } from "@/utils/helpers";
import { FormikProps } from "formik";
import React from "react";

interface Props {
  fields: FormField[];
  formik: FormikProps<any>;
  fieldsData: Record<string, FormField[]>;
  reset: () => void;
}

const DynamicBeneficiaryForm = ({
  fields,
  formik,
  fieldsData,
  reset,
}: Props) => {
  if (!fields.length || !formik.values.country?.value) {
    return null;
  }

  const countryCode = formik.values.country.value as string;
  const config = GlobalCountryConfig[countryCode];

  if (!config) {
    // Fallback to generic form for unconfigured countries
    return (
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[15px] justify-between mt-4 h-full pb-7"
      >
        <div className="flex flex-col gap-[15px]">
          {fields.map((field) => (
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
    );
  }
  const {
    countryName,
    bankDetailsFields,
    formComponent,
    banks: defaultBanks,
  } = config;
  const FormComponent = formComponent;

  const banks =
    (defaultBanks?.length ?? 0) > 0
      ? defaultBanks
      : fieldsData?.[countryCode]?.find(
          (field: any) => field.name === "bank_code"
        )?.banks || [];

  return (
    <FormComponent
      fields={fields}
      countryCode={countryCode as IntCountryType}
      countryName={countryName}
      bankDetailsFields={bankDetailsFields}
      banks={banks}
      reset={reset}
    />
  );
};

export default DynamicBeneficiaryForm;
