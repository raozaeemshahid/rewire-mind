import { useSession } from "next-auth/react";
import Head from "next/head";

import { useRouter } from "next/router";
import HomeLayout from "@/components/HomeLayout";
import CreateContent from "@/components/CreateCourse";

export default function Home() {
  const router = useRouter();
  const { status } = useSession({ required: true });

  return (
    <>
      <Head>
        <title>Rewire Mind</title>
        <meta name="description" content="A Online Learning Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeLayout>
        <CreateContent />
      </HomeLayout>
    </>
  );
}
