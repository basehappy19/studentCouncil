import React from "react";
import NavbarPink from "../layouts/NavbarPink";
import Link from "next/link";
export const metadata = {
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
      <NavbarPink />
      <section className="bg-custom-primary -rotate-[3deg] scale-[1.25] md:scale-105">
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-gavel"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385" />
                <path d="M6 9l4 4" />
                <path d="M13 10l-4 -4" />
                <path d="M3 21h7" />
                <path d="M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-user-heart"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
                <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-eye-question"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M14.071 17.764a8.989 8.989 0 0 1 -2.071 .236c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.346 0 6.173 1.727 8.482 5.182" />
                <path d="M19 22v.01" />
                <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-run"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M13 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M4 17l5 1l.75 -1.5" />
                <path d="M15 21l0 -4l-4 -3l1 -6" />
                <path d="M7 12l0 -3l5 -1l3 3l3 1" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-certificate"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
                <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
                <path d="M6 9l12 0" />
                <path d="M6 12l3 0" />
                <path d="M6 15l2 0" />
              </svg>
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057z" />
              </svg>
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
