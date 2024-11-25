"use client"
import { AddVote, AllVote, RemoveVote } from '../../../functions/Vote';
import { VoteData } from '../../../interfaces/Vote/Vote';
import { RemoveVoteFunction } from '../../../types/functions/Vote';
import { ToastType } from '../../../types/Other/toast';
import VoteCardDashBoard from '../../../../components/DashBoard2/Vote/VoteCardDashboard';
import VoteForm from '../../../../components/DashBoard2/Vote/VoteForm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Votes = () => {
    const [votes, setVotes] = useState<VoteData[]>([]);
    const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
    const router = useRouter()
    const getVotes = async () => {
        try {
          const res = await AllVote();
          setVotes(res);
        } catch (e) {
          console.error(e);
        }
    }

    useEffect(() => {
      getVotes()
    }, []);
    const removeVote : RemoveVoteFunction = async (id : number) => {      
      await RemoveVote(id).then((res)=>{
        try {
          const { message, type } = res;
          if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
            toast[type as ToastType](message);
          } else {
            toast.error("เซิฟเวอร์ไม่ตอบสนอง");
          }
          getVotes();
        } catch (e) {
          console.error(e);
          toast.error("ไม่สามารถลบมติได้");
        }
      })
    }
    const onSubmit = async (values : any) => {              
        const formData = new FormData();
        formData.append('voteTitle', values.title);
        formData.append('voteDescription', values.description);
        formData.append('voteContent', values.content);
        formData.append('voteRefer', values.refer);
        formData.append('voteDate', values.date);
        formData.append('voteDocuments', JSON.stringify(values.documents));
        values.documentsFile.forEach((file: File) => {
          formData.append('voteDocumentFiles', file);          
        });
        formData.append('voteAgree', JSON.stringify(values.agree)); 
        formData.append('voteDisagree', JSON.stringify(values.disagree)); 
        formData.append('voteAbstain', JSON.stringify(values.abstain)); 
        formData.append('voteAbstention', JSON.stringify(values.abstention)); 
        formData.append('voteMaxAttendees', values.maxAttendees);
        await AddVote(formData).then((res)=>{
            try {
                const { message, type } = res;
                if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
                  toast[type as ToastType](message);
                  if(type === 'success') {
                      router.refresh();
                      getVotes();
                      setIsOpenAdd(!isOpenAdd)
                  }
                } else {
                    toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                }
            } catch (e) {
                toast.error("เซิฟเวอร์ไม่ตอบสนอง");
                console.error(e);
            }
        })
        
    }

    return (
      <div>
        <div className="flex justify-between">
          <h1 className='text-2xl font-semibold'>{!isOpenAdd ? "มติทั้งหมด" : "เพิ่มบันทึกการประชุม"}</h1>
          <div>
            <button
              onClick={() => setIsOpenAdd(!isOpenAdd)}
              type="button"
              className={`${isOpenAdd ? "bg-orange-400 hover:bg-orange-500 focus:ring-orange-300" : "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-400"} transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap`}
            >
              {isOpenAdd ? "ย้อนกลับ" : "เพิ่มบันทึกการประชุม"}
            </button>
          </div>
        </div>
        {isOpenAdd &&
          <VoteForm onSubmit={onSubmit} />
        }
        {!isOpenAdd &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {votes.map((vote) => (
              <div className="col-span-2 md:col-span-1" key={vote.id}>
                <VoteCardDashBoard vote={vote} onRemove={removeVote} />
              </div>
            ))}
          </div>
        }
      </div>
    )
}

export default Votes