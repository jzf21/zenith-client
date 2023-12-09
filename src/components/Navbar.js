import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="w-full h-14 fixed bg-zenith-lav text-white flex flex-row justify-center items-center gap-72">
      <div>
        <Link href="/">
        TEAM ZENITH
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center gap-10">
        <div>
          <Link href="/">
            H0ME
          </Link>
        </div>
        <div>
          <Link href="/Recorder">
            RECORDING
          </Link>
        </div>
        <div>
          <Link href="/view">
            VIEW
          </Link>
        </div>
      </div>
      <div>
        <button className="bg-zenith-black px-10 py-1">LOGOUT</button>
      </div>
    </div>
  );
}
