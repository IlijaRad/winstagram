import { useEffect } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar/";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="flex max-w-screen-lg justify-center lg:mx-auto lg:grid lg:grid-cols-7 lg:justify-between lg:gap-4">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
