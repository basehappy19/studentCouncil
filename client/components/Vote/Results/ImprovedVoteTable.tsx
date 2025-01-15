import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, VolumeOff, Ban } from 'lucide-react';
import { VoteAgree, VoteDisagree, VoteAbstain, NoVote } from '@/app/interfaces/Vote/Vote';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ImprovedVoteTable = ({ agrees, disagrees, abstains, noVotes }: { agrees: VoteAgree[], disagrees: VoteDisagree[], abstains: VoteAbstain[], noVotes: NoVote[] }) => {
  return (
    <Card className="dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl dark:border-0">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-6 w-6 text-green-500 dark:text-green-400" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">เห็นชอบ</h3>
            </div>
            <ul className="space-y-2">
              {agrees.length > 0 ? agrees.map((agree) => (
                <li
                  key={agree.id}
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="mr-2">
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600">
                      <AvatarImage
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + agree.partyList.profile_image_128x128}
                        alt={agree.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {agree.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {agree.partyList.firstName} {agree.partyList.middleName} {agree.partyList.lastName}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {agree.partyList.roles.map((role) => role.role.name).join(', ')}
                    </div>
                  </div>
                  <ThumbsUp className="h-5 w-5 text-green-500 dark:text-green-400" />
                </li>
              )) : (
                <li
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="flex-1">
                    ไม่พบผู้ลงมติเห็นชอบ
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ThumbsDown className="h-6 w-6 text-red-500 dark:text-red-400" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">ไม่เห็นชอบ</h3>
            </div>
            <ul className="space-y-2">
              {disagrees.length > 0 ? disagrees.map((disagree) => (
                <li
                  key={disagree.id}
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="mr-2">
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600">
                      <AvatarImage
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + disagree.partyList.profile_image_128x128}
                        alt={disagree.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {disagree.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {disagree.partyList.firstName} {disagree.partyList.middleName} {disagree.partyList.lastName}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {disagree.partyList.roles.map((role) => role.role.name).join(', ')}
                    </div>
                  </div>
                  <ThumbsDown className="h-5 w-5 text-red-500 dark:text-red-400" />
                </li>
              )) : (
                <li
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="flex-1">
                    ไม่พบผู้ลงมติไม่เห็นชอบ
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <VolumeOff className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">งดออกเสียง</h3>
            </div>
            <ul className="space-y-2">
              {abstains.length > 0 ? abstains.map((abstain) => (
                <li
                  key={abstain.id}
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="mr-2">
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600">
                      <AvatarImage
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + abstain.partyList.profile_image_128x128}
                        alt={abstain.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {abstain.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {abstain.partyList.firstName} {abstain.partyList.middleName} {abstain.partyList.lastName}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {abstain.partyList.roles.map((role) => role.role.name).join(', ')}
                    </div>
                  </div>
                  <VolumeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </li>
              )) : (
                <li
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="flex-1">
                    ไม่พบผู้ลงมติงดออกเสียง
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Ban className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">ไม่ลงคะแนน</h3>
            </div>
            <ul className="space-y-2">
              {noVotes.length > 0 ? noVotes.map((noVote) => (
                <li
                  key={noVote.id}
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="mr-2">
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600">
                      <AvatarImage
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + noVote.partyList.profile_image_128x128}
                        alt={noVote.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {noVote.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {noVote.partyList.firstName} {noVote.partyList.middleName} {noVote.partyList.lastName}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {noVote.partyList.roles.map((role) => role.role.name).join(', ')}
                    </div>
                  </div>
                  <Ban className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </li>
              )) : (
                <li
                  className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md flex items-center"
                >
                  <div className="flex-1">
                    ไม่พบผู้ไม่ลงมติ
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovedVoteTable;