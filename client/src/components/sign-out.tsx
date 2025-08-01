"use client";

import {signOut} from "next-auth/react";

export default function SignOut() {
    return (
        <button className="bg-white text-blue-600 p-2 rounded-md cursor-pointer" onClick={() => signOut()}>
            SignOut
        </button>
    );
}
