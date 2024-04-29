import Link from "next/link";

// resources => /resources
// blogs =>/blogs and /blogs/create
// events => /events
// feedback =>/#feedback-section and /feedback_to give feedback
// marketplace => /marketplace and /marketplace/store__to sell user items
// community => /community and /community/chats

const footerItems = [
  {
    title: "Resources",
    links: [
      {
        name: "Blogs",
        path: "/blogs",
      },
      {
        name: "Events",
        path: "/events",
      },
      {
        name: "Marketplace",
        path: "/marketplace",
      },
      {
        name : "Resources",
        path : "/resources"
      }
    ]
  },
  {
    title: "Community",
    links: [
      {
        name: "Feedback",
        path: "/#feedback-section",
      },
      {
        name: "Community",
        path: "/community",
      },
      {
        name: "Chats",
        path: "/community/chats",
      },
      {
        name: "Write a Blog",
        path: "/blogs/create",
      }
    ]
  },
  {
    title: "About Us",
    links: [
      {
        name: "Crop Connect",
        path: "/aboutus",
      },
      {
        name: "Our Mission",
        path: "/aboutus/#our-mission",
      },
      {
        name: "Our Vision",
        path: "/aboutus/#our-vision",
      },
      {
        name: "Our Team",
        path: "/#our-team",
      },
    ]
  },
  {
    title: "Legal",
    links: [
      {
        name: "Privacy Policy",
        path: "/privacyPolicy",
      },
      {
        name: "Give Feedback",
        path: "/feedback",
      },
      {
        name: "Customer Feedbacks",
        path: "/#feedback-section",
      },
      {
        name: "Contact Us",
        path: "/#contact-us",
      },
    ]
  },


]

const Footer = () => {
  return (
    <footer class="text-gray-600 body-font border-t border-gray-200">
      <div class="container px-5  py-8 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src="/logo.jpeg" alt="logo" className="h-12 w-12 rounded-full" />
            <span class="ml-3 text-xl">Crop Connect</span>
          </a>
          <p class="mt-2 text-sm text-gray-500">
            Crop Connect is a platform that connects farmers and buyers. It is a platform that provides a solution to the problems in the agricultural sector.
          </p>
        </div>
        <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {footerItems.map((item, idx) => (
            <div key={idx} class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font text-gray-900 tracking-widest text-md mb-3 font-medium dark:text-green-800">{item.title}</h2>
              <nav class="list-none mb-10">
                {item.links.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.path}>
                      <p class="text-gray-600 hover:text-gray-800 my-1">{link.name}</p>
                    </Link>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div class="bg-gray-100 dark:bg-black">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p class="text-gray-500 text-sm text-center sm:text-left">© {new Date().getFullYear()} Crop Connect —
            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">
              @cropconnect
            </a>
          </p>
        </div>
      </div>
    </footer>
     
  );
};

export default Footer;
