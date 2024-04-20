import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-white bg-green-400 w-full">
      <div className="conatiner py-8 text-lg">
        <div className="grid grid-cols-5 text-center">
          <h1 className="font-extrabold text-2xl">
            <Link href={"/"}>CropConnect</Link>
          </h1>
          <div>
            <h2 className="text-xl font-bold">
              <Link href={"/"}>Home</Link>
            </h2>{" "}
            <p>
              <Link href={"/user/profile"}>User Profile</Link>
            </p>
            <p>
              <Link href={"/about"}>About</Link>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              <Link href={"/marketplace"}>Marketplace</Link>
            </h2>
            <p>
              <Link href={"/marketplace/products"}>Products</Link>
            </p>
            <p>
              <Link href={"/marketplace/store"}>Store</Link>
            </p>
            <p>
              <Link href={"/resources"}>resources</Link>{" "}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">
              <Link href={"/community"}>Community</Link>
            </h2>
            <p>
              <Link href={"/community/Chats"}>Chats</Link>{" "}
            </p>
            <p>
              <Link href={"/blogs"}>Blogs</Link>{" "}
            </p>
            <p>
              <Link href={"/events"}>Events</Link>{" "}
            </p>{" "}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              <Link href={"/feedback"}>Contact Us</Link>
            </h2>
            <p>
              <Link href={"/feedback"}>Feedback</Link>
            </p>
            <p>admin@cc.com</p>
            <p>Ph: 123-456-7890</p>
          </div>

          <div className="col-span-5 flex justify-between mx-16 mt-4">
              <a
                href="#"
                className=" ml-1"
                rel="noopener noreferrer"
              >
                @cropconnect
              </a>
              <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                <a className="">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-3 ">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-3 ">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="ml-3 ">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
