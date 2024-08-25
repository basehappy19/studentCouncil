import { Vote } from "@/app/functions/Vote";
import VoteStaticProgress from "@/components/Vote/VoteStaticProgress";
import NavBarPink from "@/app/layouts/NavbarPink";
import ListVote from "@/components/Vote/ListVote";
import Image from "next/image";
import Link from "next/link";
import { VoteData, VoteMember } from "@/app/interfaces/Vote/Vote";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const vote: VoteData[] = await getVote(id);

  return {
    title: `ติดตามมติ ${vote[0].voteTitle} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
    openGraph: {
      title: `ติดตามมติ ${vote[0].voteTitle} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description:
        "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
    },
  };
}

async function getVote(id: string): Promise<VoteData[]> {
  const response = Vote(id);
  return response;
}

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const vote: VoteData[] = await getVote(id);

  if (!vote || vote.length === 0) {
    throw new Error("Vote data not found");
  }

  const groupVotes = (voteData: VoteMember[]): VoteMember[][] => {
    const groups: VoteMember[][] = [];
    for (let i = 0; i < Math.ceil(voteData.length / 25); i++) {
      groups.push(voteData.slice(i * 25, i * 25 + 25));
    }
    return groups;
  };

  const voteData = vote[0];
  const { voteDocument, voteMaxAttendees, voteAgree, voteDisagree, voteAbstention, voteAbstain } = voteData;

  const voteAgreeCount = voteAgree.length;
  const voteDisagreeCount = voteDisagree.length;
  const voteAbstentionCount = voteAbstention.length;
  const voteAbstainCount = voteAbstain.length;
  const voteAttendees = voteAgreeCount + voteDisagreeCount + voteAbstentionCount + voteAbstainCount;

  const getPercentage = (count: number) => ((count / voteAttendees) * 100).toFixed(2);

  const voteAgreePercentage = getPercentage(voteAgreeCount);
  const voteDisagreePercentage = getPercentage(voteDisagreeCount);
  const voteAbstentionPercentage = getPercentage(voteAbstentionCount);
  const voteAbstainPercentage = getPercentage(voteAbstainCount);

  const maxPercentage = Math.max(
    parseFloat(voteAgreePercentage),
    parseFloat(voteDisagreePercentage),
    parseFloat(voteAbstentionPercentage),
    parseFloat(voteAbstainPercentage)
  );

  let pass = maxPercentage === parseFloat(voteAgreePercentage);

  const thaiDate = new Date(voteData.voteDate).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const profileImgSrc = process.env.NEXT_PUBLIC_APP_USERS_PROFILE_PATH_SERVER;

  const voteAgreeGroups = groupVotes(voteAgree);
  const voteDisagreeGroups = groupVotes(voteDisagree);
  const voteAbstentionGroups = groupVotes(voteAbstention);
  const voteAbstainGroups = groupVotes(voteAbstain);

  return (
    <div className="bg-custom-background">
      <NavBarPink />
      <section className="bg-custom-section-primary p-10">
        <div className="container px-4 mx-auto">
          <h1 className="text-2xl mb-4 font-semibold">{vote[0].voteTitle}</h1>
          <div className="flex items-center">
            {pass ? (
              <div className="text-[16px] font-normal py-1 px-2 rounded-2xl inline-block mr-2 bg-custom-secondary">
                มติผ่าน
              </div>
            ) : (
              <div className="text-[16px] font-normal py-1 px-2 rounded-2xl inline-block mr-2 bg-[#f7465e]">
                มติไม่ผ่าน
              </div>
            )}
            <div>
              {parseFloat(voteAgreePercentage) === 50 ||
                parseFloat(voteDisagreePercentage) === 50 ||
                parseFloat(voteAbstentionPercentage) === 50 ||
                parseFloat(voteAbstainPercentage) === 50 ? (
                <span>มติคะแนนเท่ากัน</span>
              ) : (
                <>
                  {parseFloat(voteAgreePercentage) === maxPercentage && (
                    <span>เห็นด้วย {voteAgreeCount}</span>
                  )}
                  {parseFloat(voteDisagreePercentage) === maxPercentage && (
                    <span>ไม่เห็นด้วย {voteDisagreeCount}</span>
                  )}
                  {parseFloat(voteAbstentionPercentage) === maxPercentage && (
                    <span>งดออกเสียง {voteAbstentionCount}</span>
                  )}
                  {parseFloat(voteAbstainPercentage) === maxPercentage && (
                    <span>ไม่ลงคะแนน {voteAbstainCount}</span>
                  )}
                </>
              )}
              <span className="text-custom-gray opacity-60">/{voteMaxAttendees} คน</span>
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-center gap-5 flex-col md:flex-row">
              <div className="w-[100%] md:w-[66.6%]">
                <div className="py-2 flex justify-between">
                  <div>
                    <div className="font-medium">วันที่</div>
                    <div className="font-extralight">{thaiDate}</div>
                  </div>
                  <div className="text-end">
                    <div className="font-medium">ประชุมครั้งที่</div>
                    <div className="font-extralight">#{vote[0].id}</div>
                  </div>
                </div>
                <hr className="text-custom-white" />
                <div className="py-2 my-4 md:my-0">
                  <div className="font-medium">เนื้อหาการลงมติ</div>
                  <div className="font-extralight">
                    {vote[0].voteContent}
                  </div>
                </div>
              </div>
              <div className="w-[100%] md:w-[33.3%]">
                <div className="rounded-lg bg-custom-white p-5 mx-auto min-h-[150px] max-[300px] border border-[#eee]">
                  <div className="font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="inline-block icon icon-tabler icons-tabler-outline icon-tabler-download"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                      <path d="M7 11l5 5l5 -5" />
                      <path d="M12 4l0 12" />
                    </svg>{" "}
                    เอกสารการประชุม
                  </div>
                  {voteDocument.map((doc, index) => (
                    <div key={index}>
                      <Link href="/">
                        <div className="my-2 text-custom-primary-dark cursor-pointer">
                          <i className="fa-solid fa-file-pdf"></i> {doc.title}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10">
        <div className="container px-4 mx-auto">
          <h1 className="font-semibold text-3xl text-center">ผลการลงมติ</h1>
          <hr className="my-4" />
          <div>
            <h1 className="text-3xl font-semibold">สรุปผลการลงมติ</h1>
            <div className="font-semibold text-2xl my-4">
              {parseFloat(voteAgreePercentage) === 50 ||
                parseFloat(voteDisagreePercentage) === 50 ||
                parseFloat(voteAbstentionPercentage) === 50 ||
                parseFloat(voteAbstainPercentage) === 50 ? (
                "มติคะแนนเท่ากัน 50/50%"
              ) : (
                <>
                  {parseFloat(voteAgreePercentage) === maxPercentage && `${voteAgreePercentage}% เห็นด้วย`}
                  {parseFloat(voteDisagreePercentage) === maxPercentage && `${voteDisagreePercentage}% ไม่เห็นด้วย`}
                  {parseFloat(voteAbstentionPercentage) === maxPercentage && `${voteAbstentionPercentage}% งดออกเสียง`}
                  {parseFloat(voteAbstainPercentage) === maxPercentage && `${voteAbstainPercentage}% ไม่ลงคะแนน`}
                </>
              )}
            </div>
          </div>
          <VoteStaticProgress
            voteAgreePercentage={parseFloat(voteAgreePercentage)}
            voteDisagreePercentage={parseFloat(voteDisagreePercentage)}
            voteAbstentionPercentage={parseFloat(voteAbstentionPercentage)}
            voteAbstainPercentage={parseFloat(voteAbstainPercentage)}
          />
          <ListVote
            voteAgreeCount={voteAgreeCount}
            voteDisagreeCount={voteDisagreeCount}
            voteAbstentionCount={voteAbstentionCount}
            voteAbstainCount={voteAbstainCount}
          />
          {pass ? (
            <div className="my-2 text-[16px] font-normal py-1 px-2 rounded-2xl inline-block mr-2 bg-custom-secondary">
              มติผ่าน
            </div>
          ) : (
            <div className="my-2 text-[16px] font-normal py-1 px-2 rounded-2xl inline-block mr-2 bg-[#f7465e]">
              มติไม่ผ่าน
            </div>
          )}
          <hr />
          <h1 className="text-3xl my-4 font-semibold">ภาพรวมคะแนนลงมติ</h1>
          <div className="my-8">
            <div className="flex flex-col md:flex-row justify-center">
              {voteAgreeCount > 0 && (
                <div className="mr-0 md:mr-4 border-x-2 border-custom-black my-4 w-full max-w-none md:max-w-[300px] md:w-[25%]">
                  <div className="text-center">เห็นด้วย</div>
                  <div className="flex m-4 flex-wrap items-center justify-center">
                    {voteAgreeGroups.map((group, groupIndex) => (
                      <div
                        key={`group-${groupIndex}`}
                        className="grid m-[10px] grid-cols-5 grid-rows-5"
                      >
                        {group.map((person, index) => (
                          <div
                            key={`person-${groupIndex}-${index}`}
                            className="relative w-[10px] h-[10px] group my-0.5 mr-0.5 bg-[#76c8b8]"
                          >
                            <div className="w-[250px] items-center group-hover:flex group-hover:z-50 rounded-b-lg rounded-e-lg hidden absolute top-[10px] left-[10px] bg-[#fff] border-[3px] border-custom-light-2">
                              <div className="my-[10px] mx-[7px] w-[50px]">
                                <Image
                                  className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-[50%] align-middle"
                                  width={50}
                                  height={50}
                                  src={profileImgSrc + person.profilePicture}
                                  alt={person.displayName}
                                />
                              </div>
                              <div className="mr-12 leading-[1.1]">
                                <div className="text-2xl">
                                  {person.displayName}
                                </div>
                                <div>
                                  {person.rolesData.map((role) => (
                                    <div key={`role-${role.id}`}>
                                      {role.roleTitle}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {voteDisagreeCount > 0 && (
                <div className="mr-0 md:mr-4 border-x-2 border-custom-black my-4 w-full max-w-none md:max-w-[300px] md:w-[25%]">
                  <div className="text-center">ไม่เห็นด้วย</div>
                  <div className="flex m-4 flex-wrap items-center justify-center">
                    {voteDisagreeGroups.map((group, groupIndex) => (
                      <div
                        key={`group-${groupIndex}`}
                        className="grid m-[10px] grid-cols-5 grid-rows-5"
                      >
                        {group.map((person, index) => (
                          <div
                            key={`person-${groupIndex}-${index}`}
                            className="relative w-[10px] group h-[10px] my-0.5 mr-0.5 bg-[#f0324b]"
                          >
                            <div className="w-[250px] items-center group-hover:flex group-hover:z-50 rounded-b-lg rounded-e-lg hidden absolute top-[10px] left-[10px] bg-[#fff] border-[3px] border-custom-light-2">
                              <div className="my-[10px] mx-[7px] w-[50px]">
                                <Image
                                  className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-[50%] align-middle"
                                  width={50}
                                  height={50}
                                  src={profileImgSrc + person.profilePicture}
                                  alt={person.displayName}
                                />
                              </div>
                              <div className="mr-12 leading-[1.1]">
                                <div className="text-2xl">
                                  {person.displayName}
                                </div>
                                <div>
                                  {person.rolesData.map((role) => (
                                    <div key={`role-${role.id}`}>
                                      {role.roleTitle}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {voteAbstentionCount > 0 && (
                <div className="mr-0 md:mr-4 border-x-2 border-custom-black my-4 w-full max-w-none md:max-w-[300px] md:w-[25%]">
                  <div className="text-center">งดออกเสียง</div>
                  <div className="flex m-4 flex-wrap items-center justify-center">
                    {voteAbstentionGroups.map((group, groupIndex) => (
                      <div
                        key={`group-${groupIndex}`}
                        className="grid m-[10px] grid-cols-5 grid-rows-5"
                      >
                        {group.map((person, index) => (
                          <div
                            key={`person-${groupIndex}-${index}`}
                            className="relative w-[10px] group h-[10px] my-0.5 mr-0.5 bg-[#ccc]"
                          >
                            <div className="w-[250px] items-center group-hover:flex group-hover:z-50 rounded-b-lg rounded-e-lg hidden absolute top-[10px] left-[10px] bg-[#fff] border-[3px] border-custom-light-2">
                              <div className="my-[10px] mx-[7px] w-[50px]">
                                <Image
                                  className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-[50%] align-middle"
                                  width={50}
                                  height={50}
                                  src={profileImgSrc + person.profilePicture}
                                  alt={person.displayName}
                                />
                              </div>
                              <div className="mr-12 leading-[1.1]">
                                <div className="text-2xl">
                                  {person.displayName}
                                </div>
                                <div>
                                  {person.rolesData.map((role) => (
                                    <div key={`role-${role.id}`}>
                                      {role.roleTitle}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {voteAbstainCount > 0 && (
                <div className="mr-0 md:mr-4 border-x-2 border-custom-black my-4 w-full max-w-none md:max-w-[300px] md:w-[25%]">
                  <div className="text-center">เห็นด้วย</div>
                  <div className="flex m-4 flex-wrap items-center justify-center">
                    {voteAbstainGroups.map((group, groupIndex) => (
                      <div
                        key={`group-${groupIndex}`}
                        className="grid m-[10px] grid-cols-5 grid-rows-5"
                      >
                        {group.map((person, index) => (
                          <div
                            key={`person-${groupIndex}-${index}`}
                            className="relative w-[10px] group h-[10px] my-0.5 mr-0.5 bg-[#494949]"
                          >
                            <div className="w-[250px] items-center group-hover:flex group-hover:z-50 rounded-b-lg rounded-e-lg hidden absolute top-[10px] left-[10px] bg-[#fff] border-[3px] border-custom-light-2">
                              <div className="my-[10px] mx-[7px] w-[50px]">
                                <Image
                                  className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] rounded-[50%] align-middle"
                                  width={50}
                                  height={50}
                                  src={profileImgSrc + person.profilePicture}
                                  alt={person.displayName}
                                />
                              </div>
                              <div className="mr-12 leading-[1.1]">
                                <div className="text-2xl">
                                  {person.displayName}
                                </div>
                                <div>
                                  {person.rolesData.map((role) => (
                                    <div key={`role-${role.id}`}>
                                      {role.roleTitle}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <h1 className="text-3xl my-4 font-semibold">ผลการลงมติรายบุคคล</h1>
          <div>
            <div className="flex flex-wrap mb-3">
              <p className="w-full">หมายเหตุสัญลักษณ์ :</p>
              <span className="font-normal w-[100%] md:w-[25%] text-[#76c8b8]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                เห็นด้วย
              </span>
              <span className="font-normal w-[100%] md:w-[25%] text-[#f0324b]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-circle-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M10 10l4 4m0 -4l-4 4" />
                </svg>
                ไม่เห็นด้วย
              </span>
              <span className="font-normal w-[100%] md:w-[25%] text-[#949494]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-message-circle-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13.593 19.855a9.96 9.96 0 0 1 -5.893 -.855l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c2.128 1.816 3.053 4.363 2.693 6.813" />
                  <path d="M22 22l-5 -5" />
                  <path d="M17 22l5 -5" />
                </svg>
                งดออกเสียง
              </span>
              <span className="font-normal w-[100%] md:w-[25%] text-[#494949]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-help-circle"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M12 16v.01" />
                  <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                </svg>
                ไม่ลงคะแนน
              </span>
            </div>
            <div className="bg-custom-white relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3" scope="col">
                      #
                    </th>
                    <th className="px-6 py-3" scope="col">
                      ชื่อเล่น
                    </th>
                    <th className="px-6 py-3" scope="col">
                      ตำแหน่ง
                    </th>
                    <th className="px-6 py-3" scope="col">
                      การลงมติ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {voteAgree.map((vote, index) => (
                    <tr
                      className="bg-custom-white border-b border-custom-light-2 hover:bg-gray-300"
                      key={vote.id}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th scope="row" className="px-6 py-4">
                        {vote.displayName}
                      </th>
                      <td className="px-6 py-4">
                        {vote.rolesData.map((role) => (
                          <div key={role.id}>{role.roleTitle}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-normal w-[100%] md:w-[25%] text-[#76c8b8]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {voteDisagree.map((vote, index) => (
                    <tr
                      className="bg-custom-white border-b border-custom-light-2 hover:bg-gray-300"
                      key={vote.id}
                    >
                      <td className="px-6 py-4">
                        {voteAgree.length + index + 1}
                      </td>
                      <th scope="row" className="px-6 py-4">
                        {vote.displayName}
                      </th>
                      <td className="px-6 py-4">
                        {vote.rolesData.map((role) => (
                          <div key={role.id}>{role.roleTitle}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-normal w-[100%] md:w-[25%] text-[#f0324b]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-circle-x"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M10 10l4 4m0 -4l-4 4" />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {voteAbstention.map((vote, index) => (
                    <tr
                      className="bg-custom-white border-b border-custom-light-2 hover:bg-gray-300"
                      key={vote.id}
                    >
                      <td className="px-6 py-4">
                        {voteDisagree.length + voteAgree.length + index + 1}
                      </td>
                      <th scope="row" className="px-6 py-4">
                        {vote.displayName}
                      </th>
                      <td className="px-6 py-4">
                        {vote.rolesData.map((role) => (
                          <div key={role.id}>{role.roleTitle}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-normal w-[100%] md:w-[25%] text-[#949494]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-message-circle-x"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M13.593 19.855a9.96 9.96 0 0 1 -5.893 -.855l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c2.128 1.816 3.053 4.363 2.693 6.813" />
                            <path d="M22 22l-5 -5" />
                            <path d="M17 22l5 -5" />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {voteAbstain.map((vote, index) => (
                    <tr
                      className="bg-custom-white border-b border-custom-light-2 hover:bg-gray-300"
                      key={vote.id}
                    >
                      <td className="px-6 py-4">
                        {voteAbstention.length +
                          voteDisagree.length +
                          voteAgree.length +
                          index +
                          1}
                      </td>
                      <th scope="row" className="px-6 py-4">
                        {vote.displayName}
                      </th>
                      <td className="px-6 py-4">
                        {vote.rolesData.map((role) => (
                          <div key={role.id}>{role.roleTitle}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-normal w-[100%] md:w-[25%] text-[#494949]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="mr-2 inline-block icon icon-tabler icons-tabler-outline icon-tabler-help-circle"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                            <path d="M12 16v.01" />
                            <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                          </svg>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
