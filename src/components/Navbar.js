export default function Navbar() {
  return (
    <div className="w-full h-14 fixed bg-zenith-lav text-white flex flex-row justify-center items-center gap-72">
      <div>
        <p>TEAM ZENITH</p>
      </div>
      <div className="flex flex-row justify-center items-center gap-10">
        <div>HOME</div>
        <div>RECORDING</div>
        <div>VIEW</div>
      </div>
      <div>
        <button className="bg-zenith-black px-10 py-1">LOGOUT</button>
      </div>
    </div>
  );
}
