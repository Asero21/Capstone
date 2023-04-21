import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function Home() {
  const {data : session} = useSession();
  if (!session) return;
  return <Layout>
        <div className="text-black flex">
          <img src={session?.user?.image} className="w-12 h-12" alt=""/>
          <span className="bg-gray-300 py-2.5 px-2 rounded-r-lg">
                {session.user.name}
          </span>
        </div>
        </Layout>
}