import React from 'react'
import MessageCloudPage from './pageCSR'
import { GetFakbokMessages } from '@/app/functions/Fakbok';

export const dynamic = 'force-dynamic';

export interface Fakbok {
  id: number;
  likes: number;
  color: string;
  content: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
}

const Fakbok = async () => {
  const messages: Fakbok[] = await GetFakbokMessages();

  return (
    <MessageCloudPage messages={messages} />
  )
}

export default Fakbok