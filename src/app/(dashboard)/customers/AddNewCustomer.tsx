"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { useFormik } from "formik";
import React from "react";
import AddressAutocomplete from "@/components/ui/AddressAutocomplete";

import PhoneNumberInput from "@/components/ui/PhoneNumberInput";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddCustomerPayload } from "@/types/services";
import { AddCustomerApi } from "@/services/invoice";

interface Props {
  close: () => void;
}

const AddCustomerSchema = z.object({
  fullname: z.string().optional(),
  companyName: z.string().min(2, "Business name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .regex(/^\+?[1-9]\d{6,14}$/, "Enter a valid phone number"), // basic E.164 pattern
  address: z.string().min(3, "Address is required"),
});

const AddNewCustomer = ({ close }: Props) => {
  const qc = useQueryClient();
  const AddMutation = useMutation({
    mutationFn: (payload: IAddCustomerPayload) => AddCustomerApi(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
      close();
    },
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      companyName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country_code: "",
    },
    validationSchema: toFormikValidationSchema(AddCustomerSchema),
    onSubmit: (values) => {
      const payload: IAddCustomerPayload = {
        ...(values.fullname && { full_name: values.fullname }),
        email: values.email,
        phone_number: values.phone,
        street_address: values.address,
        city: values?.city,
        state: values?.state,
        country: values?.country_code,
        business_name: values?.companyName,
      };
      AddMutation.mutate(payload);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="h-full flex flex-col">
      <SideWrapperHeader
        title="New Customer"
        close={close}
        titleColor="text-zinc-900"
      />
      <div className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <InputField
            label="Full Name (optional)"
            {...formik.getFieldProps("fullname")}
            status={
              formik.touched.fullname && formik.errors.fullname ? "error" : null
            }
            errorMessage={formik.touched.fullname && formik.errors.fullname}
          />
          <InputField
            label="Business Name"
            {...formik.getFieldProps("companyName")}
            status={
              formik.touched.companyName && formik.errors.companyName
                ? "error"
                : null
            }
            errorMessage={
              formik.touched.companyName && formik.errors.companyName
            }
          />
          <InputField
            label="Email"
            type="email"
            {...formik.getFieldProps("email")}
            status={
              formik.touched.email && formik.errors.email ? "error" : null
            }
            errorMessage={formik.touched.email && formik.errors.email}
          />
          <div className="">
            <PhoneNumberInput
              label="Phone Number"
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              error={formik.errors.phone}
              touched={formik.touched.phone}
            />
          </div>
          <AddressAutocomplete
            label="Business Address"
            value={formik.values.address}
            onChange={(value) => formik.setFieldValue("address", value)}
            onAddressSelect={(components) => {
              formik.setValues({
                ...formik.values,
                ...components,
              });
            }}
            touched={formik.touched.address}
            error={formik.errors.address}
          />
        </div>
        <div className="space-y-[15px]">
          <Button
            disabled={!formik.dirty || AddMutation.isPending}
            loading={AddMutation.isPending}
            type="submit"
          >
            Save and Continue
          </Button>
          <Button type="button" onClick={close} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewCustomer;
