import Image from "next/image";
import { Poppins } from "next/font/google";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/router";

const pops = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push("/");
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (query) {
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
      }
    }
  };
  return (
    <div className={`pops.className h-screen`}>
      <nav className=" flex flex-row justify-around w-screen py-5 relative z-20 shadow-lg bg-white ">
        <div
          className="logo flex flex-row gap-3 cursor-pointer"
          onClick={handleHomeClick}
        >
          <Image src="/images/logo1.png" width={60} height={60} alt="logo" />
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold text-4xl tracking-wide">Girman</h1>
            <h2 className="text-[10px] tracking-[0.22rem] font-bold">
              TECHNOLOGIES
            </h2>
          </div>
        </div>
        <div className="nav-items flex flex-row items-center gap-10">
          <h1 className=" cursor-pointer underline-offset-4 underline text-primary font-bold">
            SEARCH
          </h1>
          <h1 className=" cursor-pointer hover:font-bold hover:text-primary">
            <Link href="https://girmantech.com">WEBSITE</Link>
          </h1>
          <h1 className=" cursor-pointer hover:font-bold hover:text-primary">
            <Link href="https://www.linkedin.com/company/girmantech/">
              LINKEDIN
            </Link>
          </h1>
          <h1 className=" cursor-pointer hover:font-bold hover:text-primary">
            <a href="mailto:contact@girmantech.com">CONTACT</a>
          </h1>
        </div>
      </nav>
      <div className="main flex justify-center pt-24 h-screen bg-[url('/images/bg.png')] bg-contain bg-no-repeat bg-center">
        <div className="middle w-[700px] flex flex-col gap-1 ">
          <div className="logo flex flex-row gap-6 self-center">
            <Image
              src="/images/logo2.svg"
              width={160}
              height={140}
              alt="logo"
            />
            <h1 className=" text-[140px] font-bold tracking-wide">Girman</h1>
          </div>
          <div className="search flex flex-row items-center border-2 px-5 py-1 bg-white rounded-lg shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#71717A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
              className=""
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input
              placeholder="Search"
              className="focus-visible:ring-transparent border-none font-semibold text-lg text-slate-600"
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
