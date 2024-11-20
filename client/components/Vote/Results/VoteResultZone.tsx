import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ban, ThumbsDown, ThumbsUp, VolumeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NoVote, VoteAbstain, VoteAgree, VoteDisagree } from '@/app/interfaces/Vote/Vote';

export const VoteAgreeZone = ({ agrees = [] } : { agrees : VoteAgree[] }) => {
  return (
    <Card className="dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl dark:border-0">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          <CardTitle className="text-gray-900 dark:text-gray-100">เห็นชอบ</CardTitle>
          <Badge variant="secondary" className="text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700">
            {agrees.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full max-h-[400px] w-full rounded-md">
          <div className="flex flex-wrap gap-3 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            {agrees.map((agree) => (
              <TooltipProvider key={agree.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600 hover:scale-110 transition-transform">
                      <AvatarImage 
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + agree.partyList.profile_image_128x128}
                        alt={agree.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {agree.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="dark:bg-gray-700">
                    <Card className="border-none shadow-none dark:bg-gray-600">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-300 dark:border-gray-600">
                          <AvatarImage 
                            src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + agree.partyList.profile_image_128x128}
                            alt={agree.partyList.nickName}
                          />
                          <AvatarFallback className="text-gray-900 dark:text-gray-100">
                            {agree.partyList.nickName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {agree.partyList.nickName}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {agree.partyList.roles.map((role) => (
                              <Badge key={role.role.id} variant="secondary" className="mr-2 mb-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                {role.role.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const VoteDisagreeZone = ({ disagrees = [] } : { disagrees : VoteDisagree[] }) => {
  return (
    <Card className="dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl dark:border-0">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
          <CardTitle className="text-gray-900 dark:text-gray-100">ไม่เห็นชอบ</CardTitle>
          <Badge variant="secondary" className="text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700">
            {disagrees.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full max-h-[400px] w-full rounded-md">
          <div className="flex flex-wrap gap-3 p-4 bg-red-50 dark:bg-red-900 rounded-lg">
            {disagrees.map((disagree) => (
              <TooltipProvider key={disagree.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600 hover:scale-110 transition-transform">
                      <AvatarImage 
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + disagree.partyList.profile_image_128x128}
                        alt={disagree.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {disagree.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="dark:bg-gray-700">
                    <Card className="border-none shadow-none dark:bg-gray-600">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-300 dark:border-gray-600">
                          <AvatarImage 
                            src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + disagree.partyList.profile_image_128x128}
                            alt={disagree.partyList.nickName}
                          />
                          <AvatarFallback className="text-gray-900 dark:text-gray-100">
                            {disagree.partyList.nickName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {disagree.partyList.nickName}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {disagree.partyList.roles.map((role) => (
                              <Badge key={role.role.id} variant="secondary" className="mr-2 mb-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                {role.role.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const VoteAbstainZone = ({ abstains = [] } : { abstains : VoteAbstain[] }) => {
  return (
    <Card className="dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl dark:border-0">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <VolumeOff className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <CardTitle className="text-gray-900 dark:text-gray-100">งดออกเสียง</CardTitle>
          <Badge variant="secondary" className="text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700">
            {abstains.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full max-h-[400px] w-full rounded-md">
          <div className="flex flex-wrap gap-3 p-4 bg-gray-100 dark:bg-gray-600 rounded-lg">
            {abstains.map((abstain) => (
              <TooltipProvider key={abstain.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600 hover:scale-110 transition-transform">
                      <AvatarImage 
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + abstain.partyList.profile_image_128x128}
                        alt={abstain.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {abstain.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="dark:bg-gray-700">
                    <Card className="border-none shadow-none dark:bg-gray-600">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-300 dark:border-gray-600">
                          <AvatarImage 
                            src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + abstain.partyList.profile_image_128x128}
                            alt={abstain.partyList.nickName}
                          />
                          <AvatarFallback className="text-gray-900 dark:text-gray-100">
                            {abstain.partyList.nickName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {abstain.partyList.nickName}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {abstain.partyList.roles.map((role) => (
                              <Badge key={role.role.id} variant="secondary" className="mr-2 mb-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                {role.role.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export const NoVoteZone = ({ noVotes = [] } : { noVotes : NoVote[] }) => {
  return (
    <Card className="dark:bg-gray-800/90 backdrop-blur-sm shadow-xl rounded-xl dark:border-0">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Ban className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <CardTitle className="text-gray-900 dark:text-gray-100">ไม่ลงคะแนน</CardTitle>
          <Badge variant="secondary" className="text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700">
            {noVotes.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full max-h-[400px] w-full rounded-md">
          <div className="flex flex-wrap gap-3 p-4 bg-gray-300 dark:bg-gray-900 rounded-lg">
            {noVotes.map((noVote) => (
              <TooltipProvider key={noVote.id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-14 w-14 border-2 border-gray-100 dark:border-gray-600 hover:scale-110 transition-transform">
                      <AvatarImage 
                        src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + noVote.partyList.profile_image_128x128}
                        alt={noVote.partyList.nickName}
                      />
                      <AvatarFallback className="text-gray-900 dark:text-gray-100">
                        {noVote.partyList.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="dark:bg-gray-700">
                    <Card className="border-none shadow-none dark:bg-gray-600">
                      <CardContent className="flex items-center gap-4 p-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-300 dark:border-gray-600">
                          <AvatarImage 
                            src={process.env.NEXT_PUBLIC_PARTYLIST_IMG_128X128_PATH + noVote.partyList.profile_image_128x128}
                            alt={noVote.partyList.nickName}
                          />
                          <AvatarFallback className="text-gray-900 dark:text-gray-100">
                            {noVote.partyList.nickName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {noVote.partyList.nickName}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {noVote.partyList.roles.map((role) => (
                              <Badge key={role.role.id} variant="secondary" className="mr-2 mb-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                {role.role.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};