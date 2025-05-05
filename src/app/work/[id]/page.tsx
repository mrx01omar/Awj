"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getWorkItems } from "../../components/WorkSection";
import Circle from "../../components/Circle";
import Header from "../../components/Header";
import WorkItem from "../../components/WorkItem";
import Button from "../../components/Button";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkDetailsPage = ({ params }: PageProps) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const workItems = getWorkItems();
  const work = workItems.find((item) => item.id === id);

  if (!work) {
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
                <h1 className="section-heading mb-4">Work not found</h1>
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

  return (
    <>
      <Header theme="light" />
      <div className="pt-28 pb-20" id="workDetailsPage">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/work"
              className="text-[var(--purple-primary)] hover:underline mb-8 inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-sm transition-all hover:bg-gray-100"
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
              Back to All Work
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start mt-6">
              <div className="relative">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="absolute -z-10 -left-8 -bottom-8 w-1/2 h-1/2 opacity-20">
                  <Circle variant="purple" />
                </div>
              </div>

              <div>
                <div className="text-sm text-[var(--purple-primary)] uppercase mb-2">
                  {work.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-pragmatica-bold mb-4">
                  {work.title}
                </h1>
                <p className="text-lg mb-6">{work.description}</p>

                <div className="mb-8">
                  <h3 className="font-pragmatica-bold text-lg mb-2">Client:</h3>
                  <p>{work.client}</p>
                </div>

                <div className="mb-8">
                  <h3 className="font-pragmatica-bold text-lg mb-2">
                    Services Provided:
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {work.category === "Media" && (
                      <>
                        <li>Professional videography and photography</li>
                        <li>Editing and post-production</li>
                        <li>Audio production and sound design</li>
                        <li>Motion graphics and visual effects</li>
                      </>
                    )}
                    {work.category === "Events Management" && (
                      <>
                        <li>Event planning and coordination</li>
                        <li>Venue selection and management</li>
                        <li>Logistics and scheduling</li>
                        <li>Technical production</li>
                      </>
                    )}
                    {work.category === "PR Services" && (
                      <>
                        <li>Public relations strategy</li>
                        <li>Media relations and outreach</li>
                        <li>Press release development</li>
                        <li>Crisis communication management</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {work.detailImages && work.detailImages.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-pragmatica-bold mb-8">
                Project Gallery
              </h2>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {work.detailImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="aspect-video relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={image}
                      alt={`${work.title} detail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          <div className="mt-16">
            <h2 className="text-2xl font-pragmatica-bold mb-8">
              More Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workItems
                .filter((item) => item.id !== work.id)
                .slice(0, 3)
                .map((relatedWork) => (
                  <WorkItem key={relatedWork.id} {...relatedWork} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkDetailsPage;
