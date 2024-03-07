"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import NoSsr from "./NoSsr";

const Logo = ({ size }: { size?: number }) => {
  const { resolvedTheme } = useTheme();

  return (
    <NoSsr>
      {resolvedTheme === "dark" ? (
        <Image
          alt="logo"
          height={size ?? 30}
          width={size ?? 30}
          src={"/logowhiteletters.png"}
        />
      ) : (
        <Image
          alt="logo"
          height={size ?? 30}
          width={size ?? 30}
          src={"/logoblackletters.png"}
        />
      )}
    </NoSsr>
  );
};

export default Logo;
