"use client";

import {signIn} from "next-auth/react";

export default function SignIn() {
    return <button onClick={() => signIn("github")}>Sign In</button>;
}
