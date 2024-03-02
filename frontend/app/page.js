import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ul>
        {/* Create 4 links */}
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/signup">Signup</Link>
        </li>
        <li>
          <Link href="/community/chats">Community Chats</Link>
        </li>
      </ul>
    </>
  );
}
