import DefaultLayout from "@/components/Layout";
import Createroom from "@/components/Huddle/Createroom";
import Sidebar from "@/components/Sidebar";
import FocusArea from "@/components/FocusArea";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="h-screen w-full flex flex-row gap-10">
        <Sidebar />
        <FocusArea />
      </div>
    </DefaultLayout>
  );
}
