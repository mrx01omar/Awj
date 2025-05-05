"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "./components/Button";
import Header from "./components/Header";
import Circle from "./components/Circle";

export default function NotFound() {
  return (
    <>
      <Header theme="light" />
      <div className=" h-screen pt-28 pb-20 min-h-[calc(100vh-200px)] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 opacity-10">
              <Circle variant="purple" />
            </div>
            <div className="absolute -z-10 -bottom-20 -left-20 w-80 h-80 opacity-10">
              <Circle variant="gradient" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-pragmatica-bold mb-6 text-[var(--purple-primary)]">
                404
              </h1>
              <h2 className="section-heading mb-4">Page Not Found</h2>
              <p className="text-lg text-gray-600 mb-10">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button variant="primary" href="/" withPlayButton>
                  Return to Home
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
