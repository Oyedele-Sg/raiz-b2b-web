// "use client"
// import { useSendStore } from '@/store/Send';
// import { passwordHash } from '@/utils/helpers';
// import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
// import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
// import EnterPin from './EnterPin';
// import { ITransaction } from '@/types/transactions';

// interface BasePayload {
//   transaction_reason: string;
//   transaction_pin: string;
//   transaction_category_id: number;
//   amount: number;
// }

// interface BaseProps<T extends BasePayload, R> {
//   close: () => void;
//   goNext: () => void;
//   setPaymentError: Dispatch<SetStateAction<string>>;
//   mutation: UseMutationResult<R, unknown, T, unknown>;
//   preparePayload: (data: {
//     purpose: string;
//     pin: string;
//     categoryId: number;
//     amount: number;
//     beneficiary: any;
//   }) => T;
//   onSuccessHandler?: (response: R) => void;
// }

// function PaymentHandler<T extends BasePayload, R>({
//   close,
//   goNext,
//   setPaymentError,
//   mutation,
//   preparePayload,
//   onSuccessHandler,
// }: BaseProps<T, R>) {
//   const [pin, setPin] = useState<string>("");
//   const { usdBeneficiary, purpose, category, amount, actions } = useSendStore();
//   const qc = useQueryClient();

//   const handleSend = () => {
//     const payload = preparePayload({
//       purpose,
//       pin: passwordHash(pin),
//       categoryId: category?.transaction_category_id || 0,
//       amount: Number(amount),
//       beneficiary: usdBeneficiary,
//     });

//     mutation.mutate(payload);
//   };

//   useEffect(() => {
//     if (pin.length === 4) {
//       handleSend();
//     }
//   }, [pin]);

//   // Default mutation handlers
//   const defaultOnSuccess = (response: R) => {
//     qc.refetchQueries({ queryKey: ["user"] });
//     qc.invalidateQueries({ queryKey: ["user"] });
//     qc.invalidateQueries({ queryKey: ["transactions-report"] });
//     qc.invalidateQueries({ queryKey: ["p2p-beneficiaries-recents"] });

//     // Type assertion since we don't know the exact response structure
//     const res = response as  ITransaction
//     if (res?.transaction_status?.transaction_status === "completed") {
//       actions.setStatus("success");
//     } else if (res?.transaction_status?.transaction_status === "pending") {
//       actions.setStatus("pending");
//     }
//     actions.setTransactionDetail(response);
//   };
// return <EnterPin pin={pin} setPin={setPin} close={close} />;
// }

// export default PaymentHandler
