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
    path: "/partylist",
  },
  {
    title: "นโยบาย",
    path: "/policy",
  },
  {
    title: "ติดตามนโยบาย",
    path: "/policy/track",
  },
  {
    title: "ติดตามการทำงาน",
    path: "/work",
  },
  {
    title: "ติดตามการลงมติ",
    path: "/vote",
  },
  {
    title: "ติดตามสภานักเรียน",
    path: "/partylist/track",
  },
  {
    title: "งบประมาณ",
    path: "/budget",
  },
  {
    title: "แจ้งปัญหา",
    path: "/",
  },
];
