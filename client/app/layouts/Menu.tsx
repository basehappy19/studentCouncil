interface Menu {
  id: number;
  title: string;
  path: string;
  icon: string;
}

export const Menu: Menu[] = [
  {
    id: 1,
    title: "สภาโปร่งใสคืออะไร",
    path: "/about",
    icon: "information.png",
  },
  {
    id: 2,
    title: "รู้จักสมาชิกพรรค",
    path: "/partyLists",
    icon: "man.png",
  },
  {
    id: 3,
    title: "นโยบาย",
    path: "/policies",
    icon: "policy.png",
  },
  {
    id: 4,
    title: "ติดตามนโยบาย",
    path: "/policy/watch",
    icon: "route.png",
  },
  {
    id: 5,
    title: "ติดตามการทำงาน",
    path: "/works",
    icon: "meeting.png",
  },
  {
    id: 6,
    title: "ติดตามการลงมติ",
    path: "/votes",
    icon: "elections.png",
  },
  {
    id: 7,
    title: "ติดตามการเข้าทำงาน",
    path: "/partyList/tracks",
    icon: "schedule.png",
  },
  {
    id: 8,
    title: "งบประมาณ",
    path: "/budgets",
    icon: "budget.png",
  },
  {
    id: 9,
    title: "แจ้งปัญหา",
    path: "/traffy-fondue",
    icon: "clipboard.png",
  },
];
