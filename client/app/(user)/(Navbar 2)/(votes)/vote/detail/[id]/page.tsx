import { getVote } from "@/app/functions/Vote";
import Link from "next/link";
import { Vote } from "@/app/interfaces/Vote/Vote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Download, FileText, Hash, ChevronRight, Users, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import VoteStatistics from "@/components/Vote/VoteStatistics";
import VoteSummary from "@/components/Vote/VoteSummary";
import { NoVoteZone, VoteAbstainZone, VoteAgreeZone, VoteDisagreeZone } from "@/components/Vote/Results/VoteResultZone";
import ImprovedVoteTable from "@/components/Vote/Results/ImprovedVoteTable";
import SearchBar from "@/components/Vote/Results/SearchBar";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  const vote: Vote = await getVote({ id: parseInt(id), search: undefined });

  return {
    title: `ติดตามมติ ${vote.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
    openGraph: {
      title: `ติดตามมติ ${vote.title} ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description: "เพื่อทำให้สภาโปร่งใส มติก็เป็นหนึ่งสิ่งที่เราให้ความสำคัญในการเปิดเผยกับทุกคน",
    },
  };
}

const VoteResult = async (props: { searchParams: { [key: string]: string | string[] | undefined }, params: Promise<{ id: string }> }) => {
  const params = await props.params
  const searchParams = await props.searchParams
  const id = params.id
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;    
  const vote: Vote = await getVote({ id: parseInt(id), search: undefined });
  const voteResultPerPartyLists: Vote = await getVote({ id: parseInt(id), search: search });

  const getStatusBadge = (type: string) => {
    const badges = {
      Agree: <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-1">
        <CheckCircle className="w-4 h-4 mr-2" />เห็นชอบ | ผ่าน
      </Badge>,
      Disagree: <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-1">
        <XCircle className="w-4 h-4 mr-2" />ไม่เห็นชอบ | ไม่ผ่าน
      </Badge>,
      Abstain: <Badge className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-1">
        <MinusCircle className="w-4 h-4 mr-2" />งดออกเสียง
      </Badge>
    };

    if (type in badges) {
      return badges[type as 'Agree' | 'Disagree' | 'Abstain'];
    }
    return <Badge>ไม่สามารถสรุปได้</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border-0">
          <div className="relative">
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20" />
            <CardHeader className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {vote.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">
                      {vote.result.total?.totalPartyListCount.toString() || "N/A"}/{vote.result.total?.maxAttendees.toString() || "N/A"} คน
                    </span>
                  </div>

                </div>
                {getStatusBadge(vote.result.summary.type)}
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-blue-500" />
                        <div>
                          <div className="font-medium text-gray-700 dark:text-gray-300">วันที่</div>
                          <div className="text-gray-600 dark:text-gray-200">
                            {new Date(vote.createdAt).toLocaleDateString("th-TH", {
                              year: "numeric",
                              month: "long",
                              day: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Hash className="w-6 h-6 text-indigo-500" />
                        <div>
                          <div className="font-medium text-gray-700 dark:text-gray-300">ประชุมครั้งที่</div>
                          <div className="text-gray-600 dark:text-gray-200">#{vote.id}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      เนื้อหาการลงมติ
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {typeof vote.content === "string" ? vote.content : JSON.stringify(vote.content)}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Download className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      เอกสารการประชุม
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {vote.documents.map((doc) => (
                      <Link
                        key={doc.id}
                        target="_blank"
                        href={`${process.env.NEXT_PUBLIC_VOTE_DOCUMENT_PATH}id_${doc.id}/${doc.document.path}`}
                        className="flex items-center gap-2 p-3 bg-white/70 dark:bg-gray-700/70 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-all duration-200"
                      >
                        <FileText className="w-4 h-4 text-blue-500" />
                        {typeof doc.document.name === "string" ? doc.document.name : JSON.stringify(doc.document.name)}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="mt-8 space-y-8">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl border-0">
            <div className="relative">
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20" />

              <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    ผลการลงมติ
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    สรุปคะแนนและสถิติการลงมติ
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      สรุปผล
                    </h3>
                    <VoteSummary summary={vote.result.summary} />
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r
                  ${vote.result.summary.type === "Agree" &&
                          `from-blue-600 to-indigo-600`}
                        ${vote.result.summary.type === "Disagree" &&
                          `from-rose-600 to-red-600`}
                        ${vote.result.summary.type === "Abstain" &&
                          `from-yellow-600 to-orange-600`}
                        ${vote.result.summary.type === "Tie | no result" &&
                          `from-gray-600 to-black-600`}
                  bg-clip-text text-transparent`}>
                    {vote.result.summary.type === "Tie | no result" ? (
                      "มติคะแนนเท่ากัน | ไม่สามารถสรุปได้"
                    ) : (
                      <>
                        {vote.result.summary.type === "Agree" &&
                          `${vote.result.percentages.agreePercentage}% เห็นด้วย`}
                        {vote.result.summary.type === "Disagree" &&
                          `${vote.result.percentages.disagreePercentage}% ไม่เห็นด้วย`}
                        {vote.result.summary.type === "Abstain" &&
                          `${vote.result.percentages.abstainPercentage}% งดออกเสียง`}
                      </>
                    )}
                  </div>
                  <VoteStatistics result={vote.result} />
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl border-0">
            <div className="relative">
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20" />

              <CardContent className="p-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    ภาพรวมคะแนนลงมติ
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    รายละเอียดการลงคะแนนแยกตามประเภท
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <VoteAgreeZone agrees={vote.result.agrees} />
                  <VoteDisagreeZone disagrees={vote.result.disagrees} />
                  <VoteAbstainZone abstains={vote.result.abstains} />
                  <NoVoteZone noVotes={vote.result.noVotes} />
                </div>
              </CardContent>
            </div>
          </Card>
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl border-0">
            <div className="relative">
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20" />

              <CardContent className="p-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    ผลการลงมติรายบุคคล
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    รายละเอียดการลงคะแนนแต่ละคน
                  </p>
                </div>
                <SearchBar />
                <ImprovedVoteTable agrees={voteResultPerPartyLists.result.agrees} disagrees={voteResultPerPartyLists.result.disagrees} abstains={voteResultPerPartyLists.result.abstains} noVotes={voteResultPerPartyLists.result.noVotes} />
              </CardContent>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default VoteResult;