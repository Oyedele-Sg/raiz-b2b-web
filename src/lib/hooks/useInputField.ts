/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from "formik";

interface UseInputFieldProps<T extends Record<string, any>> {
  formik: FormikProps<T>;
}

const useInputField = <T extends Record<string, any>>({
  formik,
}: UseInputFieldProps<T>) => {
  const hasError = (field: keyof T) => {
    return formik.touched[field] && formik.errors[field];
  };

  const getErrorMessage = (field: keyof T) => {
    return hasError(field) ? String(formik.errors[field]) : "";
  };

  const getStatus = (field: keyof T) => {
    return hasError(field) ? "error" : null;
  };

  const customHandleBlur = (field: keyof T) => {
    return () => formik.validateField(String(field));
  };

  return {
    hasError,
    getErrorMessage,
    getStatus,
    customHandleBlur,
  };
};

export default useInputField;
