import DefaultLayout from "@/components/Layout";
import Createroom from "@/components/Huddle/Createroom";
import Sidebar from "@/components/Sidebar";
import FocusArea from "@/components/FocusArea";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="h-screen w-full flex flex-row gap-10">
        <Sidebar />
        <Createroom />
      </div>
    </DefaultLayout>
  );
}
