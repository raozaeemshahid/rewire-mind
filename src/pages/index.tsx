import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useRouter } from "next/router";
import HomeLayout from "@/components/HomeLayout";
import HomePage from "@/components/HomePage";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Rewire Mind</title>
        <meta name="description" content="A Online Learning Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeLayout>
        <HomePage></HomePage>
      </HomeLayout>
    </>
  );
}

