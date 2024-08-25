import Link from "next/link";
import './not-found.css'

export default function NotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>เอิ่มมม ขอโทษครับแต่เหมือนผมไม่ได้ทำหน้านี้ไว้นะ ลองเข้าใหม่นะครับ 😵</h2>
        <form className="notfound-search">
          <input type="text-custom-text-black" placeholder="ค้นหาหน้า..." />
          <button type="button">Search</button>
        </form>
        <Link href={"/"}>
          <span className="arrow"></span>Return To Homepage
        </Link>
      </div>
    </div>
  );
}
