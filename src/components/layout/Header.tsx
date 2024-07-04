import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
  
const Header: React.FC = () => {
    const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  console.log(offset);
	return (
		<div className="flex justify-between items-center bg-white px-10 fixed w-full top-0 left-0">
			<ul className="flex w-1/2">
                <li>
                    <Link href="/" className="text-black me-4">Home</Link>
                </li>
                <li>
                    <Link href="/" className="text-black me-4">Services</Link>
                </li>
                <li>
                    <Link href="/" className="text-black me-4">Project</Link>
                </li>
                <li>
                    <Link href="/" className="text-black me-4">Blog</Link>
                </li>
                <li>
                    <Link href="/" className="text-black me-4">Join Us</Link>
                </li>
                <li>
                    <Link href="/" className="text-black me-4 font-semibold">About Us</Link>
                </li>
                <li>
                    <Link href="/" className="text-black me-4">Contact Us</Link>
                </li>
            </ul>
            <div className="w-1/2 py-3">
                <Image
                    className={`logo-animation ${offset > 150 && 'active'}`}
                    width={100}
                    height={100}
                    src="https://assets.it-consultis.com/_next/static/media/logo.b0b21a99.svg"
                    alt=""
                ></Image>
            </div>
		</div>
	);
}
export default Header;