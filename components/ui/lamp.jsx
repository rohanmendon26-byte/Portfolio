"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[420px] md:min-h-[500px] flex-col items-center justify-center overflow-hidden w-full z-10 pointer-events-auto",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 pointer-events-none">
        {/* Left Conic Light Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at 50% 0%, #06b6d4 0deg, rgba(6, 182, 212, 0.2) 40deg, transparent 60deg)`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] text-white opacity-100"
        >
          <div className="absolute w-full left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right Conic Light Beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at 50% 0%, transparent 300deg, rgba(6, 182, 212, 0.2) 320deg, #06b6d4 360deg)`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white opacity-100"
        >
          <div className="absolute w-40 h-full right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Background Backdrop Blur & Radial Glow */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black/40 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        
        {/* Glowing Cyan Aura Spheres */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500/50 blur-3xl" />
        
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "18rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-72 -translate-y-[6rem] rounded-full bg-cyan-400/80 blur-2xl"
        />

        {/* Horizontal Laser Glow Bar */}
        <motion.div
          initial={{ width: "14rem" }}
          whileInView={{ width: "32rem" }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-1 w-[32rem] -translate-y-[7rem] bg-cyan-300 shadow-[0_0_30px_#06b6d4,0_0_10px_#22d3ee]"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-transparent" />
      </div>

      {/* Content Wrapped Under the Lamp */}
      <div className="relative z-50 flex flex-col items-center px-5 -mt-16 md:-mt-20">
        {children}
      </div>
    </div>
  );
};
