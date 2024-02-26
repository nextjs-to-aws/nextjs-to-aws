"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const Logo = ({ size }: { size?: number }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div>
      <Image
        alt="logo"
        height={size ?? 30}
        width={size ?? 30}
        src={
          resolvedTheme == "dark"
            ? "/logowhiteletters.png"
            : "/logoblackletters.png"
        }
      />
    </div>
  );
};

export default Logo;
