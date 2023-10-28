import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const HomeLayout: React.FC<{
  children?: JSX.Element | JSX.Element[] | string;
}> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  return (
    <div>
      <div className="fixed top-0 flex w-screen flex-wrap items-center justify-between bg-gray-800 px-6 py-2">
        <Link className="bold font-sans text-xl text-gray-200" href="/">
          Rewire Mind
        </Link>
        <div className="flex flex-wrap items-center text-gray-200">
          <Link
            className="rounded-lg px-6 py-1 hover:bg-gray-900 hover:text-gray-200"
            href="/courses/create"
          >
            Create Content
          </Link>
          {status == "authenticated" && (
            <button
              className="rounded-lg px-6  py-1 text-red-400 hover:bg-gray-200 hover:text-red-500"
              onClick={() => {
                void signOut();
              }}
            >
              Sign Out
            </button>
          )}
          {status == "unauthenticated" && (
            <button
              className="rounded-lg px-6 py-1 text-green-400 hover:bg-gray-200 hover:text-green-700"
              onClick={() => {
                void router.push("/login");
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <div className="m-5 mt-16 text-white">{children}</div>
    </div>
  );
};

export default HomeLayout;
