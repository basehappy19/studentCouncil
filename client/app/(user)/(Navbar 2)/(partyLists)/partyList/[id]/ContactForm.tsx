'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle } from 'lucide-react';
import { PartyList } from '@/app/interfaces/PartyList/partylist';

const ContactForm = ({ partyList }:{ partyList : PartyList }) => {
  const [formData, setFormData] = useState({
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.message) {
      setIsSubmitting(false);
      return;
    }

    try {
      console.log(formData.message);
      
      
      setFormData({
        message: ''
      });
    } catch (e : unknown) {
      console.error(e);
      throw new Error(`Failed To Send Message`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative my-10">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-pink-400 text-white py-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="w-8 h-8" />
                <span className="text-2xl">ติดต่อผู้สมัคร</span>
              </CardTitle>
              <div className="text-white/80">
                ส่งข้อความถึง {partyList.nickName}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6 bg-white dark:bg-slate-700">
            <form onSubmit={handleSubmit} className="space-y-4">
        

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  ข้อความ
                </label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="เขียนข้อความถึงผู้สมัคร"
                  required
                  rows={4}
                  className="w-full"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-pink-400 hover:bg-pink-600 text-white"
                >
                  {isSubmitting ? (
                    <span>กำลังส่ง...</span>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      ส่งข้อความ
                    </>
                  )}
                </Button>
              </div>
        
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;