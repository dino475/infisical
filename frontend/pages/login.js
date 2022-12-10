import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "~/components/basic/buttons/Button";
import Error from "~/components/basic/Error";
import InputField from "~/components/basic/InputField";
import attemptLogin from "~/utilities/attemptLogin";

import getWorkspaces from "./api/workspace/getWorkspaces";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(async () => {
    let userWorkspace;
    try {
      const userWorkspaces = await getWorkspaces();
      userWorkspace = userWorkspaces[0]._id;
      router.push("/dashboard/" + userWorkspace);
    } catch (error) {
      console.log("Error - Not logged in yet");
    }
  }, []);

  /**
   * This function check if the user entered the correct credentials and should be allowed to log in.
   */
  const loginCheck = async () => {
    setIsLoading(true);
    await attemptLogin(
      email,
      password,
      setErrorLogin,
      router,
      false,
      true
    ).then(() => {
      setTimeout(function () {
        setIsLoading(false);
      }, 2000);
    });
  };

  return (
    <div className="bg-bunker-800 h-screen flex flex-col justify-start px-6">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/infisical.ico" />
        <meta property="og:image" content="/images/message.png" />
        <meta property="og:title" content="Log In to Infisical" />
        <meta
          name="og:description"
          content="Infisical a simple end-to-end encrypted platform that enables teams to sync and manage their .env files."
        />
      </Head>
      <Link href="/">
        <div className="flex justify-center mb-8 mt-20 cursor-pointer">
          <Image
            src="/images/biglogo.png"
            height={90}
            width={120}
            alt="long logo"
          />
        </div>
      </Link>
      <div className="bg-bunker w-full max-w-md mx-auto h-7/12 py-4 pt-8 px-6 rounded-xl drop-shadow-xl">
        <p className="text-4xl flex justify-center font-semibold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-primary">
          Log In
        </p>
        <div className="flex flex-row items-center justify-center">
          <p className="text-md flex justify-center mt-2 text-gray-400">
            Need an Infisical account?
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:pb-4 max-h-24 max-w-md mx-auto">
          <Link href="/signup">
            <button className="w-full pb-3 hover:opacity-90 duration-200">
              <u className="font-normal text-md text-sky-500">
                Create an account
              </u>
            </button>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full md:p-2 rounded-lg mt-4 md:mt-0 max-h-24 md:max-h-28">
          <InputField
            label="Email"
            onChangeHandler={setEmail}
            type="email"
            value={email}
            placeholder=""
            isRequired
            autocomplete="username"
          />
        </div>
        <div className="flex items-center justify-center w-full md:p-2 rounded-lg md:mt-2 mt-6 max-h-24 md:max-h-28">
          <InputField
            label="Password"
            onChangeHandler={setPassword}
            type="password"
            value={password}
            placeholder=""
            isRequired
            autoComplete="current-password"
            id="current-password"
          />
        </div>
        {errorLogin && <Error text="Your email and/or password are wrong." />}
        <div className="flex flex-col items-center justify-center w-full md:p-2 max-h-20 max-w-md mt-4 mx-auto text-sm">
          <div className="text-l mt-6 m-8 px-8 py-3 text-lg">
            <Button
              text="Log In"
              onButtonPressed={loginCheck}
              loading={isLoading}
              size="lg"
            />
          </div>
        </div>
        {/* <div className="flex items-center justify-center w-full md:p-2 rounded-lg max-h-24 md:max-h-28">
          <p className="text-gray-400">I may have <Link href="/login"><u className="text-sky-500 cursor-pointer">forgotten my password.</u></Link></p>
        </div> */}
      </div>
      {false && (
        <div className="w-full p-2 flex flex-row items-center bg-white/10 text-gray-300 rounded-md max-w-md mx-auto mt-4">
          <FontAwesomeIcon icon={faWarning} className="ml-2 mr-6 text-6xl" />
          We are experiencing minor technical difficulties. We are working on
          solving it right now. Please come back in a few minutes.
        </div>
      )}
    </div>
  );
}
