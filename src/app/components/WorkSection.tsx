import React, { useState } from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import WorkItem, { WorkItemProps } from "./WorkItem";

const WorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("events");

  const workItems: WorkItemProps[] = [
    {
      id: "corporate-event-planning",
      title: "Corporate Event Planning",
      category: "Events Management",
      description: "Complete event management for annual corporate gathering",
      client: "TechCorp International",
      image: "/photo/work/portfolio-1.jpg",
      detailImages: [
        "/photo/work/portfolio-details-1.jpg",
        "/photo/work/portfolio-details-2.jpg",
        "/photo/work/portfolio-details-3.jpg",
      ],
    },
    {
      id: "brand-documentary",
      title: "Brand Documentary",
      category: "Media",
      description: "Full production of brand history documentary",
      client: "Global Enterprises",
      image: "/photo/work/portfolio-2.jpg",
      detailImages: [
        "/photo/work/portfolio-details-2.jpg",
        "/photo/work/portfolio-details-1.jpg",
        "/photo/work/portfolio-details-3.jpg",
      ],
    },
    {
      id: "media-relations-campaign",
      title: "Media Relations Campaign",
      category: "PR Services",
      description: "Strategic PR campaign for product launch",
      client: "Innovation Labs",
      image: "/photo/work/portfolio-3.jpg",
      detailImages: [
        "/photo/work/portfolio-details-3.jpg",
        "/photo/work/portfolio-details-1.jpg",
        "/photo/work/portfolio-details-2.jpg",
      ],
    },
    {
      id: "conference-production",
      title: "Conference Production",
      category: "Events Management",
      description: "Full production services for international conference",
      client: "Global Forum",
      image: "/photo/work/portfolio-4.jpg",
      detailImages: [
        "/photo/work/earthlink1.jpg",
        "/photo/work/earthlink2.jpg",
        "/photo/work/portfolio-details-1.jpg",
      ],
    },
    {
      id: "brand-video-series",
      title: "Brand Video Series",
      category: "Media",
      description: "Series of promotional videos for social media",
      client: "FutureStyle Retail",
      image: "/photo/work/portfolio-5.jpg",
      detailImages: [
        "/photo/work/portfolio-details-2.jpg",
        "/photo/work/portfolio-9.jpg",
        "/photo/work/portfolio-details-3.jpg",
      ],
    },
    {
      id: "crisis-management",
      title: "Crisis Management",
      category: "PR Services",
      description: "Comprehensive PR crisis management and resolution",
      client: "Confidential",
      image: "/photo/work/portfolio-6.jpg",
      detailImages: [
        "/photo/work/portfolio-details-3.jpg",
        "/photo/work/portfolio-7.jpg",
        "/photo/work/portfolio-8.jpg",
      ],
    },
  ];

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

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Our Work</h2>
        <p className="section-subheading text-center">
          Check out our most recent projects, spanning media production, events
          management, and PR services for clients around the world.
        </p>

        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`px-4 py-2 text-sm ${
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWork.map((work) => (
            <WorkItem key={work.id} {...work} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button variant="primary" href="/work" withPlayButton>
              Explore Our Full Work
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Export the workItems for use in the work details page
export const getWorkItems = () => {
  return [
    {
      id: "corporate-event-planning",
      title: "Corporate Event Planning",
      category: "Events Management",
      description: "Complete event management for annual corporate gathering",
      client: "TechCorp International",
      image: "/photo/work/portfolio-1.jpg",
      detailImages: [
        "/photo/work/portfolio-details-1.jpg",
        "/photo/work/portfolio-details-2.jpg",
        "/photo/work/portfolio-details-3.jpg",
      ],
    },
    {
      id: "brand-documentary",
      title: "Brand Documentary",
      category: "Media",
      description: "Full production of brand history documentary",
      client: "Global Enterprises",
      image: "/photo/work/portfolio-2.jpg",
      detailImages: [
        "/photo/work/portfolio-details-2.jpg",
        "/photo/work/portfolio-details-1.jpg",
        "/photo/work/portfolio-details-3.jpg",
      ],
    },
    {
      id: "media-relations-campaign",
      title: "Media Relations Campaign",
      category: "PR Services",
      description: "Strategic PR campaign for product launch",
      client: "Innovation Labs",
      image: "/photo/work/portfolio-3.jpg",
      detailImages: [
        "/photo/work/portfolio-details-3.jpg",
        "/photo/work/portfolio-details-1.jpg",
        "/photo/work/portfolio-details-2.jpg",
      ],
    },
    {
      id: "conference-production",
      title: "Conference Production",
      category: "Events Management",
      description: "Full production services for international conference",
      client: "Global Forum",
      image: "/photo/work/portfolio-4.jpg",
      detailImages: [
        "/photo/work/earthlink1.jpg",
        "/photo/work/earthlink2.jpg",
        "/photo/work/portfolio-details-1.jpg",
      ],
    },
    {
      id: "brand-video-series",
      title: "Brand Video Series",
      category: "Media",
      description: "Series of promotional videos for social media",
      client: "FutureStyle Retail",
      image: "/photo/work/portfolio-5.jpg",
      detailImages: [
        "/photo/work/portfolio-details-2.jpg",
        "/photo/work/portfolio-9.jpg",
        "/photo/work/portfolio-details-3.jpg",
      ],
    },
    {
      id: "crisis-management",
      title: "Crisis Management",
      category: "PR Services",
      description: "Comprehensive PR crisis management and resolution",
      client: "Confidential",
      image: "/photo/work/portfolio-6.jpg",
      detailImages: [
        "/photo/work/portfolio-details-3.jpg",
        "/photo/work/portfolio-7.jpg",
        "/photo/work/portfolio-8.jpg",
      ],
    },
  ];
};

export default WorkSection;
