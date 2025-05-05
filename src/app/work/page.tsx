"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getWorkItems } from "../components/WorkSection";
import Header from "../components/Header";
import WorkItem from "../components/WorkItem";

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState("events");
  const workItems = getWorkItems();

  const filters = [
    { id: "all", label: "All Work" },
    { id: "media", label: "Media" },
    { id: "events", label: "Events Management" },
    { id: "pr", label: "PR Services" },
  ];

  const filteredWork = workItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "media" && item.category === "Media") return true;
    if (activeFilter === "events" && item.category === "Events Management")
      return true;
    if (activeFilter === "pr" && item.category === "PR Services") return true;
    return false;
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <>
      <Header theme="light" />
      <div className="pt-28 pb-20" id="workPage">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12 relative">
            <Link
              href="/#work"
              className="text-[var(--purple-primary)] hover:underline inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-sm transition-all hover:bg-gray-100 absolute left-0 top-0 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </Link>

            <div className="relative mb-16 w-full">
              <div className="relative ">
                <h1 className="mt-20 section-heading text-center">
                  Our Work Portfolio
                </h1>
                <p className="section-subheading text-center">
                  Explore our comprehensive range of projects across media
                  production, events management, and PR services
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mb-12 gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                className={`px-6 py-3 text-sm ${
                  activeFilter === filter.id
                    ? "bg-[var(--purple-primary)] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredWork.map((work) => (
              <motion.div key={work.id} variants={item}>
                <WorkItem {...work} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default WorkPage;
