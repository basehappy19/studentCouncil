'use client'
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { X, Plus, ImagePlus } from "lucide-react";
import Image from 'next/image';
import { Option } from '@/app/interfaces/Work/Work';
import { AddWork } from '@/app/functions/Work';
import { Response } from '@/app/interfaces/Response';
import { toast } from 'react-toastify';

// Zod validation schema
const workSchema = z.object({
  title: z.string().min(2, "หัวข้อต้องมีอย่างน้อย 2 ตัวอักษร"),
  description: z.string().min(10, "คำอธิบายต้องมีอย่างน้อย 10 ตัวอักษร"),
  tags: z.array(z.string()).optional(),
  images: z.array(z.instanceof(File)).optional(),
  operators: z.array(z.number()).optional()
});

const WorkPostModal = ({ options }: { options: Option }) => {
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [operators, setOperators] = useState<number[]>([]);

  const form = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      images: [],
      operators: []
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const onSubmit = async (data: z.infer<typeof workSchema>) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    images.forEach((image) => {
      formData.append('images', image);
    });

    formData.append('operators', JSON.stringify(operators));
    formData.append('tags', JSON.stringify(tags));

    try {
      const res: Response = await AddWork({
        title: data.title,
        description: data.description,
        images: images,
        operators: operators,
        tags: tags
      });
      if (res.message && res.type) {
        toast[res.type](res.message);
        form.reset();
        setImages([]);
        setTags([]);
        setOperators([]);
      }
    } catch (e) {
      console.error(e);
      toast.error(`มีปัญหาบางอย่างเกิดขึ้น ไม่สามารถโพสต์งานได้`, { position: `bottom-right` });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap bg-green-500 hover:bg-green-600 focus:ring-green-400'>
          <Plus className="mr-2" /> โพสต์งานใหม่
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            โพสต์งานใหม่
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>หัวข้องาน</FormLabel>
                  <FormControl>
                    <Input placeholder="กรอกหัวข้องาน" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียดงาน</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="อธิบายรายละเอียดงานโดยละเอียด"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>แท็ก</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tagId) => {
                  const tagSelected = options.tags.find(t => t.id === tagId);
                  return (
                    tagSelected && (
                      <div
                        key={tagId}
                        className="bg-blue-100 px-2 py-1 rounded-full flex items-center"
                      >
                        {tagSelected.title}
                        <X
                          className="ml-2 cursor-pointer"
                          size={16}
                          onClick={() => setTags(tags.filter(t => t !== tagId))}
                        />
                      </div>
                    )
                  );
                })}
              </div>
              <Select
                onValueChange={(value) => {
                  const numValue = parseInt(value, 10);
                  if (!tags.includes(numValue)) {
                    setTags([...tags, numValue]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกแท็ก" />
                </SelectTrigger>
                <SelectContent>
                  {options.tags.map((tag, index) => (
                    <SelectItem key={tag.id} value={tag.id.toString()}>
                      {(index + 1).toString()}.{tag.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <FormLabel>ผู้ร่วมงาน</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {operators.map((operatorId) => {
                  const userSelected = options.users.find(u => u.id === operatorId);
                  return (
                    <div
                      key={operatorId}
                      className="bg-green-100 px-2 py-1 rounded-full flex items-center"
                    >
                      {userSelected?.fullName} ({userSelected?.partyList.roles.map(role => role.role.name).join(', ')})
                      <X
                        className="ml-2 cursor-pointer"
                        size={16}
                        onClick={() => setOperators(operators.filter(o => o !== operatorId))}
                      />
                    </div>
                  );
                })}
              </div>
              <Select
                onValueChange={(value) => {
                  const numValue = parseInt(value, 10);
                  if (!operators.includes(numValue)) {
                    setOperators([...operators, numValue]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกผู้ร่วมงาน" />
                </SelectTrigger>
                <SelectContent>
                  {options.users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.partyList.order.toString()}.{user.fullName} ({user.partyList.roles.map(role => role.role.name).join(', ')})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div>
              <FormLabel>รูปภาพ</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {images.map((image, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <Image fill src={URL.createObjectURL(image)} alt={index.toString()} className="w-full h-full object-cover rounded" />
                    <X className="absolute top-0 right-0 bg-red-500 text-white rounded-full cursor-pointer" size={16} onClick={() => removeImage(index)} />
                  </div>
                ))}
                <label htmlFor="image-upload" className="border-2 border-dashed w-20 h-20 flex items-center justify-center cursor-pointer">
                  <ImagePlus />
                  <input type="file" id="image-upload" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <Button className='transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap bg-green-500 hover:bg-green-600 focus:ring-green-400 w-full' type="submit">
              โพสต์งาน
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkPostModal;
