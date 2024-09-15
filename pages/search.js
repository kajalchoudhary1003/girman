import { useState, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/router";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  useEffect(() => {
    // If query is undefined or empty, do not fetch
    if (!query) {
      setLoading(false);
      setUsers([]);
      return;
    }
    const fetchUsers = async () => {
      try {
        console.log("Fetching users with query:", query);
        const res = await fetch(
          `/api/users?query=${encodeURIComponent(query)}`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(true);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [query]);

  return (
    <div className="bg-gradient-to-t from-blue-200 to-white/20">
      <nav className=" flex flex-row justify-around w-screen bg-white py-5 shadow-lg ">
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
        <div className="search flex flex-row items-center w-[500px] h-[50px] border-2 px-3 rounded-xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 20 20"
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
            className="focus-visible:ring-transparent p-0 ml-2 border-none font-semibold text-slate-600"
            onKeyDown={handleSearch}
          />
        </div>
      </nav>
      <div className="h-screen ">
        {loading ? (
          <p className=" text-center pt-10">Loading...</p>
        ) : error || users.length === 0 && query ? (
          <div className="flex flex-col items-center pt-32 gap-5">
            <Image
              src="/images/nofound.svg"
              width={350}
              height={350}
              alt="nofound"
            />
            <p className="text-[#999999]">No results found.</p>
          </div>
        ) : (
          <div className=" container px-10 mx-auto mt-14 flex flex-row gap-6 justify-center">
            {users.map((user) => (
              <UserCard key={user.contact_number} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <AlertDialog>
      <div className="p-4 rounded-2xl w-[340px] bg-white">
        <section className="flex flex-col gap-2">
          <Image
            src="/images/profile.png"
            width={80}
            height={80}
            className="rounded-full border p-2 border-slate-200"
            alt="profile"
          />
          <h1 className=" text-3xl font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          <span className="flex flex-row gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#425763"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-map-pin"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h1 className="text-[12px] text-[#425763]">{user.city}</h1>
          </span>
        </section>
        <div className="h-[1px] bg-slate-100 mt-8"></div>
        <section className="mt-2">
          <div className="flex flex-row justify-between">
            <div className="phone flex flex-col">
              <div className="icon flex flex-row gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="black"
                  stroke="currentColor"
                  stroke-width="0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-phone"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <h1 className="text-[12px] font-semibold">
                  {user.contact_number}
                </h1>
              </div>
              <h1 className="text-[10px] text-[#AFAFAF]">Available on phone</h1>
            </div>
            <AlertDialogTrigger asChild>
              <Button>Fetch Details</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Fetch Details</AlertDialogTitle>
                <AlertDialogDescription>
                  <h1 className="mb-2">
                    Here are the details of following employee.
                  </h1>
                  <h1 className="text-black">
                    Name: {user.first_name} {user.last_name}
                  </h1>
                  <h1 className="text-black">Location: {user.city}</h1>
                  <h1 className="text-black">
                    Contact Number: {user.contact_number}
                  </h1>
                  <h1 className="text-black my-2">Profile Image:</h1>
                  <Image
                    src="/images/profile.png"
                    width={180}
                    height={140}
                    className=""
                    alt="profile"
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </div>
        </section>
      </div>
    </AlertDialog>
  );
}
