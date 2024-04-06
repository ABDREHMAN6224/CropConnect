"use client";
import { useRouter } from "next/navigation";
import NavBar from "../../../components/NavBar";
import { useAppSelector } from "../../store/hooks";
import Image from "next/image";
import Swal from "sweetalert2";
import useLocalStorage from "/hooks/useLocalStorage";

export default function Profile() {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const isLoggedIn = useAppSelector((state) => state.auth).token !== "";
  console.log(userState);

  if (!isLoggedIn) {
    return router.push("/login");
  }

  const handleLogout = (e) => {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "You would need password to login again",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("hehe");
        localStorage.clear();
        router.replace("/login");
      }
    });
  };

  return (
    <>
      <NavBar />
      <main className="dark:bg-gray-900">
        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-5 flex-col sm:flex-row">
            <h1 className="text-4xl mt-4 mb-5">User profile</h1>
          </header>
          <section className="">
            <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="border-b px-4 pb-6">
                <div className="my-4 w-full flex justify-start gap-8 items-center">
                  <Image
                    className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 my-4"
                    src={userState?.avatar}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <article className="py-2 flex flex-col gap-2">
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                      {userState.name}
                    </h3>
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 w-fit">
                      {userState.role}
                    </span>
                    <p className="text-gray-800 dark:text-white mb-1">
                      {userState.email}
                    </p>
                  </article>
                  <button
                    type="submit"
                    className="w-fit ml-auto text-white bg-meta-1 hover:bg-meta-7 focus:ring-4 focus:outline-none focus:ring-meta-6 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-meta-6"
                    onClick={handleLogout}
                  >
                    Sign out?
                  </button>
                </div>
              </div>
            </div>
            <div className="mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg mt-4 p-4">
              asdf
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
