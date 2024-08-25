import PartyListTrack from "./PartyListTrack";

export const metadata = {
    title: `ติดตามการเข้าทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "นักเรียนทุกคนสามารถติดตามการเข้าทำงาน ของพี่ๆสภาได้ทุกคนที่นี่",
    openGraph: {
      title: `ติดตามการเข้าทำงาน ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description:
        "นักเรียนทุกคนสามารถติดตามการเข้าทำงาน ของพี่ๆสภาได้ทุกคนที่นี่",
    },
  };

export default function page() {
  return (
    <PartyListTrack />
  );
}
