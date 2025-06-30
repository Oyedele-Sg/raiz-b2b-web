// import { FetchUsBeneficiariesApi, GetUSBeneficiaryFormFields } from '@/services/transactions';
// import { useSendStore } from '@/store/Send';
// import { FormField, IUsBeneficiariesParams } from '@/types/services';
// import { useQuery } from '@tanstack/react-query';
import React from "react";

// interface Props {
//   close: () => void;
// }

const AddZelleBeneficiary = () => {
  // const { actions } = useSendStore();
  // const { data: fieldsData } = useQuery({
  //   queryKey: ["us-bank-benefiary-fields"],
  //   queryFn: GetUSBeneficiaryFormFields,
  // });
  // const { data, isLoading } = useQuery({
  //   queryKey: [
  //     "us-bank-beneficiaries",
  //     {
  //       option_type: "zelle",
  //       page: 1,
  //       limit: 50,
  //     },
  //   ],
  //   queryFn: ({ queryKey }) => {
  //     const [, params] = queryKey as [string, IUsBeneficiariesParams];
  //     return FetchUsBeneficiariesApi(params);
  //   },
  // });
  // const fields: FormField[] = fieldsData?.zelle || [];
  // const beneficiaries = data?.beneficiaries || [];
  return <div>z</div>;
};

export default AddZelleBeneficiary;
