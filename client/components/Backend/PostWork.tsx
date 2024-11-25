"use client"
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AddWork } from '../../app/functions/Work';
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Loading from '../Other/Loading';
import { useUser } from '../../app/context/User';
import { UserData } from '../../app/interfaces/User/User';

const PostWork = ({ listUser, workTag }) => {  
  const user : UserData | null = useUser();
  const router = useRouter();
  const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      workTitle: '',
      workDescription: '',
      workOperators: [{ operator: '' }],
      workTagId: '',
      workImages: [{ image: null }],
    }
  });
  const { fields: operatorFields, append: appendOperator, remove: removeOperator } = useFieldArray({
    control,
    name: "workOperators",
    rules: { minLength: 1 }
  });
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "workImages"
  });

  const watchImages = watch("workImages");

  const onSubmit = async (data : any) => {
    
    const formData = new FormData();
    formData.append("workTitle", data.workTitle);
    formData.append("workDescription", data.workDescription);
    formData.append("workPostBy", user.id);
    if (data.workTagId) {
      formData.append("workTagId", data.workTagId);
    }
    data.workOperators.forEach((operator) => {
      formData.append("workOperator", operator.operator);
    });
    data.workImages.forEach((imageForm) => {
      if (imageForm.image[0]) {
        formData.append(`workImage`, imageForm.image[0]);
      }
    });
    await AddWork(formData).then((res)=>{
        try {
            const { message, type } = res;
            if (message && type) {
              toast[type](message);
              reset();
              router.refresh();
            } else {
              toast.error("เซิฟเวอร์ไม่ตอบสนอง");
            }
        } catch (e) {
          toast.error("เซิฟเวอร์ไม่ตอบสนอง");
          console.log(e);
        }
    });
    
  };

  if (!user) {
    return <Loading />
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">สร้างโพสต์งานใหม่</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="workTitle">หัวข้อ</Label>
          <Input
            id="workTitle"
            {...register("workTitle", { required: "กรุณากรอกหัวข้อ" })}
            className="mt-1"
          />
          {errors.workTitle && <p className="mt-1 text-sm text-red-600">{errors.workTitle.message}</p>}
        </div>

        <div>
          <Label htmlFor="workDescription">คำอธิบาย</Label>
          <Textarea
            id="workDescription"
            {...register("workDescription", { required: "กรุณากรอกคำอธิบาย" })}
            className="mt-1"
            rows={4}
          />
          {errors.workDescription && <p className="mt-1 text-sm text-red-600">{errors.workDescription.message}</p>}
        </div>

        <div>
          <Label>ผู้ดำเนินการ (อย่างน้อย 1 คน)</Label>
          {operatorFields.map((field, index) => (
            
            <div key={field.id}>
              {errors.workOperators && errors.workOperators[index] && errors.workOperators[index].operator && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.workOperators[index].operator.message}
                </p>
              )}
              <div className='flex items-center space-x-2 mt-1'>
                <Controller
                  name={`workOperators.${index}.operator`}
                  control={control}
                  rules={{ required: "กรุณาเลือกผู้ดำเนินการ" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกผู้ดำเนินการ">
                          {listUser.find(user => user.id === parseInt(field.value))?.displayName || "เลือกผู้ดำเนินการ"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {listUser.map((user) => (
                          <SelectItem key={user.id} value={(user.id).toString()}>
                            {user.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removeOperator(index)}
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                )}
              </div>
              
            </div>
          ))}
          <Button
            type="button"
            onClick={() => appendOperator({ operator: '' })}
            variant="outline"
            className="mt-2"
          >
            เพิ่มผู้ดำเนินการ
          </Button>
        </div>

        <div>
          <Label>รูปภาพ</Label>
          {imageFields.map((field, index) => (
            <div key={field.id} className="mt-1 flex items-center space-x-2">
              <input
                type="file"
                accept="image/*"
                {...register(`workImages.${index}.image` as const, { required: index === 0 ? "กรุณาเลือกรูปภาพอย่างน้อย 1 รูป" : false })}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeImage(index)}
                  variant="destructive"
                  size="icon"
                  className="rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              )}
              {errors.workImages && errors.workImages[index] && errors.workImages[index].image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.workImages[index].image.message}
                </p>
              )}
            </div>
          ))}
          <div className='flex flex-wrap gap-3'>
            {watchImages.map((image, index) => (
              image.image && image.image[0] && (
                <div key={index} className="mt-2">
                  <img
                    src={URL.createObjectURL(image.image[0])}
                    alt={`Preview ${index + 1}`}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                </div>
              )
            ))}
          </div>
          <Button
            type="button"
            onClick={() => appendImage({ image: null })}
            variant="outline"
            className="mt-2"
          >
            เพิ่มรูปภาพ
          </Button>
        </div>

        <div>
          <Label htmlFor="workTagId">แท็ก (ไม่จำเป็น)</Label>
          <Controller
            name="workTagId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกแท็ก">
                    {workTag.find(tag => tag.id === parseInt(field.value))?.tagTitle || "เลือกแท็ก"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {workTag.map((tag, i) => (
                    <SelectItem key={tag.id} value={(tag.id).toString()}>
                      {i + 1}. {tag.tagTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600">
          โพสต์
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </form>
    </div>
  );
};

export default PostWork;