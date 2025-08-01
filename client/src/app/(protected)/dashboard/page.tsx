import React from "react";
import {auth} from "@/auth";
async function DashBoard() {
    const session = await auth();
    return (
        <div>
            <div>DashBoard</div>
            <div>{JSON.stringify(session)}</div>
        </div>
    );
}

export default DashBoard;
