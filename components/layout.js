import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "../components/nav.js"

export default function Layout({children}) {
  const { data: session } = useSession()
if (!session) {
  return (
    <div className='bg-blue-900 w-screen h-screen flex items-center'>
    <div className='text-center w-full'>
      <button className="bg-white p-2 px-4 rounded-lg" onClick={() => signIn('google')}>Login with Google</button>
    </div>
  </div>
  )
}
  return (
    <div className="min-h-screen flex bg-blue-400">
      <Nav />
      <div className="flex-grow pl-10 pt-10 rounded-l-3xl bg-white mt-5">
        {children}
      </div>
      {/* logged in as {session.user.email} */}
    </div>
  )
}