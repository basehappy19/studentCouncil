interface Menu {
  title: string;
  path: string;
}

export const Menu: Menu[] = [
  {
    title: "สภาโปร่งใสคืออะไร",
    path: "/about",
  },
  {
    title: "รู้จักสภานักเรียน",
    path: "/partyLists",
  },
  {
    title: "นโยบาย",
    path: "/policies",
  },
  {
    title: "ติดตามนโยบาย",
    path: "/policy/watch",
  },
  {
    title: "ติดตามการทำงาน",
    path: "/works",
  },
  {
    title: "ติดตามการลงมติ",
    path: "/votes",
  },
  {
    title: "ติดตามสภานักเรียน",
    path: "/partyList/tracks",
  },
  {
    title: "งบประมาณ",
    path: "/budgets",
  },
  {
    title: "แจ้งปัญหา",
    path: "/traffy-fondue",
  },
];
