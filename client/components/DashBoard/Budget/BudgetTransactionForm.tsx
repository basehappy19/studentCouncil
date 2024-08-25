import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea";

const BudgetTransactionForm = ({ transaction = {}, budgetId, userId, onSubmit }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      transactionTitle: transaction.transactionTitle || "",
      transactionDescription: transaction.transactionDescription || "",
      transactionAmount: transaction.transactionAmount || "",
      transactionType: transaction.transactionType !== undefined ? transaction.transactionType.toString() : "", 
    },
  });

  const onSubmitForm = (data) => {
    onSubmit({
      ...data,
      budgetId,
      userId,
      transactionAmount: parseFloat(data.transactionAmount),
      transactionType: parseInt(data.transactionType),
      transactionId: transaction._id || undefined, 
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Input
          type="text"
          {...register("transactionTitle", { required: "กรุณาระบุชื่อรายการ" })}
          placeholder="ชื่อรายการ"
        />
        {errors.transactionTitle && <p className="text-red-600">{errors.transactionTitle.message}</p>}
      </div>
      <div>
        <Textarea
          {...register("transactionDescription")}
          placeholder="รายละเอียด"
        />
      </div>
      <div>
        <Input
          type="number"
          {...register("transactionAmount", { required: "กรุณาระบุจำนวนเงิน" })}
          placeholder="จำนวนเงิน"
        />
        {errors.transactionAmount && <p className="text-red-600">{errors.transactionAmount.message}</p>}
      </div>
      <div>
        <Controller
          name="transactionType"
          control={control}
          rules={{ required: "กรุณาเลือกประเภทรายการ" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกประเภทรายการ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">รายรับ</SelectItem>
                <SelectItem value="0">รายจ่าย</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.transactionType && <p className="text-red-600">{errors.transactionType.message}</p>}
      </div>
      <Button className="transition-all ease-in-out duration-300 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400" type="submit">
        {transaction._id ? "อัปเดตรายการ" : "บันทึกรายการ"}
      </Button>
    </form>
  );
};

export default BudgetTransactionForm;
