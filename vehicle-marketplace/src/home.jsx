import React from "react";
import { Button } from "./components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

function Home() {
  return (
    <div>
      <SignInButton mode="modal" forceRedirectUrl="/">
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  );
}

export default Home;
