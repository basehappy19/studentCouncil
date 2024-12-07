'use client'
import { Vote } from '@/app/interfaces/Vote/Vote'
import VoteCard from './VoteCard';
import { User } from '@/app/interfaces/User/User';
import AddVote from './AddVote';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const VoteZone = ({ votes, users }: { votes: Vote[], users: User[] }) => {
    const [openAddForm, setOpenAddForm] = useState<boolean>(false);

    // const router = useRouter()
    // const getVotes = async () => {
    //     try {
    //       const res = await AllVote();
    //       setVotes(res);
    //     } catch (e) {
    //       console.error(e);
    //     }
    // }

    // useEffect(() => {
    //   getVotes()
    // }, []);
    // const removeVote : RemoveVoteFunction = async (id : number) => {      
    //   await RemoveVote(id).then((res)=>{
    //     try {
    //       const { message, type } = res;
    //       if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
    //         toast[type as ToastType](message);
    //       } else {
    //         toast.error("เซิฟเวอร์ไม่ตอบสนอง");
    //       }
    //       getVotes();
    //     } catch (e) {
    //       console.error(e);
    //       toast.error("ไม่สามารถลบมติได้");
    //     }
    //   })
    // }
    // const onSubmit = async (values : any) => {              
    //     const formData = new FormData();
    //     formData.append('voteTitle', values.title);
    //     formData.append('voteDescription', values.description);
    //     formData.append('voteContent', values.content);
    //     formData.append('voteRefer', values.refer);
    //     formData.append('voteDate', values.date);
    //     formData.append('voteDocuments', JSON.stringify(values.documents));
    //     values.documentsFile.forEach((file: File) => {
    //       formData.append('voteDocumentFiles', file);          
    //     });
    //     formData.append('voteAgree', JSON.stringify(values.agree)); 
    //     formData.append('voteDisagree', JSON.stringify(values.disagree)); 
    //     formData.append('voteAbstain', JSON.stringify(values.abstain)); 
    //     formData.append('voteAbstention', JSON.stringify(values.abstention)); 
    //     formData.append('voteMaxAttendees', values.maxAttendees);
    //     await AddVote(formData).then((res)=>{
    //         try {
    //             const { message, type } = res;
    //             if (message && type && ['success', 'error', 'info', 'warning'].includes(type)) {
    //               toast[type as ToastType](message);
    //               if(type === 'success') {
    //                   router.refresh();
    //                   getVotes();
    //                   setIsOpenAdd(!isOpenAdd)
    //               }
    //             } else {
    //                 toast.error("เซิฟเวอร์ไม่ตอบสนอง");
    //             }
    //         } catch (e) {
    //             toast.error("เซิฟเวอร์ไม่ตอบสนอง");
    //             console.error(e);
    //         }
    //     })

    // }
    return (
        <div>
            <div className='flex flex-row justify-between items-center mb-3'>
                <h1 className='text-2xl font-semibold mb-3'>{`${openAddForm ? 'เพิ่มบันทึกการลงมติ' : `การลงมติทั้งหมด (${votes.length.toString()})`}`}</h1>
                <Button
                    onClick={() => setOpenAddForm(!openAddForm)}
                    className="transition-all ease-in-out duration-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 whitespace-nowrap"
                >
                    {openAddForm ? 'ย้อนกลับ' : `เพิ่มบันทึกการลงมติ`}
                </Button>
            </div>
            {openAddForm && (
                <AddVote users={users} />
            )}
            {!openAddForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {votes.map((vote) => (
                        <div className="col-span-2 md:col-span-1" key={vote.id}>
                            <VoteCard vote={vote} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VoteZone