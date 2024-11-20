import Image from "next/image"
import { VoteAgrees } from "../Vote"

const AgreeZone = ({agrees} : { agrees : VoteAgrees[] }) => {
    
    return (
        <div className="my-8">
            <div className="mr-0 md:mr-4 border-x-2 border-custom-black my-4 w-full max-w-none md:max-w-[300px] md:w-[25%]">
                <div className="text-center">เห็นด้วย</div>
                <div className="flex m-4 flex-wrap items-center justify-center">
                    {agrees.map((agree) => (
                        <div
                            key={agree.id}
                            className="grid m-[10px] grid-cols-5 grid-rows-5"
                        >
                                <div
                                    className="relative w-[10px] h-[10px] group my-0.5 mr-0.5 bg-[#76c8b8]"
                                >
                                    <div className="w-[250px] items-center group-hover:flex group-hover:z-50 rounded-b-lg rounded-e-lg hidden absolute top-[10px] left-[10px] bg-[#fff] border-[3px] border-custom-light-2">
                                        <div className="my-[10px] mx-[7px] w-[50px]">
                                            <Image
                                                className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-[50%] align-middle"
                                                width={50}
                                                height={50}
                                                src={`${process.env.NEXT_PUBLIC_PARTYLIST_IMG_FULL_PATH}${agree.partyList.profileImg}`}
                                                alt={agree.partyList.nickName}
                                            />
                                        </div>
                                        <div className="mr-12 leading-[1.1]">
                                            <div className="text-2xl">
                                                {agree.partyList.firstName}{agree.partyList.middleName}{agree.partyList.lastName}
                                            </div>
                                            <div>
                                                {agree.partyList.roles.map((role) => (
                                                    <div key={role.id}>
                                                        {role.role.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AgreeZone