import AppBar from "@/components/AppBar";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();
  return (
   <div>
    <AppBar/>
    {JSON.stringify(session)}
   </div>
  );
}
