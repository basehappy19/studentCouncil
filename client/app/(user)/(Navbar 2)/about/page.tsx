import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: `เกี่ยวกับ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
  description:
    "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  openGraph: {
    title: `เกี่ยวกับ ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
      "ทุกคนสามารถติดตามการทำงาน นโยบาย สภานักเรียน งบประมาณ หรือแม้กระทั่งมติที่ประชุมได้ที่นี้",
  },
};

function About() {
  return (
    <div className="bg-custom-white pb-40">
      <section className="bg-custom-primary -rotate-[3deg] scale-[1.25] md:scale-105">
        <div className="container px-0 md:px-4 mx-auto scale-[0.75] md:scale-95 -rotate-[-3deg] -translate-y-20 md:-translate-y-0">
          <div className="text-custom-black flex flex-col h-screen items-center justify-center">
            <div className="mb-8">
              {/* SVG */}
            </div>
            <div className="drop-shadow-lg text-center text-3xl font-semibold">
              สภาโปร่งใส คืออะไร
            </div>
            <div className="drop-shadow-lg text-center">
              ทุกการเลือกตั้งปี 64 ถึง 67
              <br />
              เราใช้สิทธิ์เลือกพรรคที่ชอบ แต่หลังจากนั้น สภานักเรียนทำอะไรไปบ้าง
              <br />
              ผลักดันนโยบายอะไรไปแล้วบ้าง คงเป็นคำถามที่ตอบยาก
              <br />
              มาร่วมสร้างสภานักเรียนโปร่งใส ที่เห็นผลการทำงานชัดเจน
              <br />
              ด้วย 5 เสาหลัก ยกระดับมาตรฐานสภานักเรียนไทย
            </div>
          </div>
        </div>
      </section>
      <section className="bg-custom-secondary -rotate-[3deg] scale-[1.25] md:scale-105">
        <div className="container px-0 md:px-4 mx-auto scale-[0.75] md:scale-95 -rotate-[-3deg] -translate-y-20 md:-translate-y-0">
          <div className="text-custom-black flex flex-col h-screen items-center justify-center">
            <div className="mb-8">
              {/* SVG */}
            </div>
            <div className="drop-shadow-lg text-center text-3xl font-semibold">
              ขายคุณภาพชีวิต ไม่ได้ขายฝัน
            </div>
            <div className="drop-shadow-lg text-center">
              พรรคเราตั้งใจคิดนโยบายไม่ว่าจะเกี่ยวกับ
              <br />
              กิจกรรม การศึกษา คุณภาพชีวิต การศึกษานอกห้องเรียน
              <br />
              ทุกนโยบายมีหลักคิดอยู่ 3 หลักที่จะเกิดมาเป็นนโยบายคือ
              <br />
              • ปัญหาที่ต้องการแก้ไข
              <br />
              • ข้อเสนอทำยังไง ไม่ใช่มีนโยบายอะไรบ้าง How? Not How Many?
              <br />
              • งบประมาณ ต้องใช้เงินไหม ใช้ยังไง เอาเงินมาจากไหน
              <br />
            </div>
            <div className="text-custom-primary-dark font-bold">
              <Link href="/policy">ดูนโยบายพรรค {">"}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-custom-primary -rotate-[3deg] scale-[1.25] md:scale-105">
        <div className="container px-0 md:px-4 mx-auto scale-[0.75] md:scale-95 -rotate-[-3deg] -translate-y-20 md:-translate-y-0">
          <div className="text-custom-black flex flex-col h-screen items-center justify-center">
            <div className="mb-8">
              {/* SVG */}
            </div>
            <div className="drop-shadow-lg text-center text-3xl font-semibold">
              ติดตามความคืบหน้านโยบาย
            </div>
            <div className="drop-shadow-lg text-center">
              เมื่อมีนโยบายที่ดีแล้ว ก็ต้องมีความคืบหน้าที่ดีด้วย
              <br />
              นักเรียนทุกคน เจ้าของโรงเรียนทุกคน
              <br />
              ก็ย่อมที่มีสิทธิ์ในการตรวจสอบ ผู้แทนนักเรียนของตัวเอง
              <br />
              พรรคเราจะเปิดเผยความคืบหน้านโยบาย
              <br />
              ที่เคยให้คำสัญญากับนักเรียนทุกคน
              <br />
              คะแนนที่ให้เรามา เราไม่เอาแค่คะแนนไปแล้วจบแค่นั้นแน่นอน
              <br />
            </div>
            <div className="text-custom-primary-dark font-bold">
              <Link href="/policy/track">จับตาความคืบหน้านโยบาย {">"}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-custom-secondary -rotate-[3deg] scale-[1.25] md:scale-105">
        <div className="container px-0 md:px-4 mx-auto scale-[0.75] md:scale-95 -rotate-[-3deg] -translate-y-20 md:-translate-y-0">
          <div className="text-custom-black flex flex-col h-screen items-center justify-center">
            <div className="mb-8">
              {/* SVG */}
            </div>
            <div className="drop-shadow-lg text-center text-3xl font-semibold">
              ทำความรู้จักสมาชิกพรรค
            </div>
            <div className="drop-shadow-lg text-center">
              เราจะเปิดเผย ความสามารถส่วนบุคคล ประสบการณ์ ทัศนคติ
              <br />
              ติดตามจุดยืน การลงมติประเด็นต่าง ๆ ในโรงเรียน
              <br />
              และยังสามารถติดตามการเข้าทำงานของคน ๆ นั้น
              <br />
              ได้อีกด้วย มีผลงานอะไรบ้างทั้งวาระการทำงาน
            </div>
            <div className="text-custom-primary-dark font-bold">
              <Link href="/partylist">ทำความรู้จักสมาชิกพรรค {">"}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-custom-primary -rotate-[3deg] scale-[1.25] md:scale-105">
        <div className="container px-0 md:px-4 mx-auto scale-[0.75] md:scale-95 -rotate-[-3deg] -translate-y-20 md:-translate-y-0">
          <div className="text-custom-black flex flex-col h-screen items-center justify-center">
            <div className="mb-8">
              {/* SVG */}
            </div>
            <div className="drop-shadow-lg text-center text-3xl font-semibold">
              หน้าตาไม่ใช่ตัววัด การทำงานล้วนๆ
            </div>
            <div className="drop-shadow-lg text-center">
              เราจะเปิดให้นักเรียนสามารถติดตามการทำงานของเรา
              <br />
              ได้ทั้งหมด ไม่ว่าจะใน 1 วัน 1 เดือน 1 วาระ
              <br />
              เราได้ทำประโยชน์อะไรให้โรงเรียน และ นักเรียนไปแล้วบ้าง
              <br />
              และยังจะสรุปผลงานทุกคนว่าตลอดวาระได้ทำอะไรบ้าง
            </div>
            <div className="text-custom-primary-dark font-bold">
              <Link href="/work">ติดตามการทำงาน {">"}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-custom-secondary -rotate-[3deg] scale-[1.25] md:scale-105">
        <div className="container px-0 md:px-4 mx-auto scale-[0.75] md:scale-95 -rotate-[-3deg] -translate-y-20 md:-translate-y-0">
          <div className="text-custom-black flex flex-col h-screen items-center justify-center">
            <div className="mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-mood-search"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 12a9 9 0 1 0 -9 9" />
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M9.5 15c.658 .672 1.56 1 2.5 1" />
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M20.2 20.2l1.8 1.8" />
              </svg>
            </div>
            <div className="drop-shadow-lg text-center text-3xl font-semibold">
              โหวตอะไรไป รู้หมดนะ
            </div>
            <div className="drop-shadow-lg text-center">
              เราจะเปิดให้นักเรียนสามารถติดตามการประชุม
              <br />
              การลงมติประเด็นต่าง ๆ ได้ทั้งหมด และยังสามารถรู้จุดยืน
              <br />
              ของสมาชิกได้ทุกคนว่ามีจุดยืนต่อประเด็นที่ประชุมยังไง
              <br />
              เห็นด้วย ไม่เห็นด้วย เปิดเผยข้อมูลทั้งหมด
            </div>
            <div className="text-custom-primary-dark font-bold">
              <Link href="/vote">ติดตามการลงมติ {">"}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-custom-primary -rotate-[3deg] scale-[1.25] md:scale-105">
        <div className="container px-0 md:px-4 mx-auto scale-[0.75] md:scale-95 -rotate-[-3deg] -translate-y-20 md:-translate-y-0">
          <div className="text-custom-black flex flex-col h-screen items-center justify-center">
            <div className="mb-8">
              {/* SVG */}
            </div>
            <div className="drop-shadow-lg text-center text-3xl font-semibold">
              เปิดเผยงบประมาณ
            </div>
            <div className="drop-shadow-lg text-center">
              เราจะเปิดเผย งบประมาณการเงินทุกฝ่าย
              <br />
              เพื่อยกระดับความโปร่งใส และให้นักเรียนติดตาม
              <br />
              รายรับ รายจ่ายของฝ่ายต่าง ๆ ได้อีกด้วย
              <br />
              และทุกคนยังสามารถเสนองบประมาณ
              <br />
              ให้พี่ๆ สภานักเรียนนำงบมาเพิ่มเติม
              <br />
              ให้ส่วนที่นักเรียนต้องการได้
            </div>
            <div className="text-custom-primary-dark font-bold">
              <Link href="/budget">ติดตามงบประมาณ {">"}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
