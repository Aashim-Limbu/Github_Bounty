import {auth} from "@/auth";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import React from "react";

async function HomePage() {
    const session = await auth();
    return (
        <div className="w-full flex justify-between p-2 bg-gray-100 px-4">
            <span className="font-semibold text-indigo-400">HomePage</span>
            <div>{session?.user ? <SignOut /> : <SignIn />}</div>
        </div>
    );
}

export default HomePage;
