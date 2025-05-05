import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PlayButton from "./PlayButton";
import Circle from "./Circle";

export interface WorkItemProps {
  id: string;
  title: string;
  category: string;
  description: string;
  client: string;
  image: string;
  detailImages?: string[];
  showDescription?: boolean;
  showClient?: boolean;
  showCircle?: boolean;
}

const WorkItem: React.FC<WorkItemProps> = ({
  id,
  title,
  category,
  description,
  client,
  image,
  showDescription = true,
  showClient = true,
}) => {
  return (
    <Link href={`/work/${id}`} className="block h-full">
      <motion.div
        className="group relative overflow-hidden h-full flex flex-col cursor-pointer border border-gray-200"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="h-[200px] relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-[var(--purple-primary)]/70 flex items-center justify-center opacity-0 transition-opacity duration-100 group-hover:opacity-100">
            <PlayButton size="lg" />
          </div>
        </div>
        <div className="p-6 relative flex-1 flex flex-col overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full">
            <Circle className="absolute top-0 left-0" />
          </div>
          <div className="text-sm text-[var(--purple-primary)] uppercase mb-2">
            {category}
          </div>
          <h3
            className="text-xl font-pragmatica-bold mb-2 line-clamp-2 h-[56px]"
            title={title}
          >
            {title}
          </h3>
          {showDescription && (
            <p
              className="text-gray-600 mb-3 line-clamp-3 flex-1"
              title={description}
            >
              {description}
            </p>
          )}
          {showClient && (
            <p className="text-sm mt-auto flex items-center">
              <span className="font-pragmatica-bold mr-1">Client:</span>
              <span className="truncate inline-block max-w-full" title={client}>
                {client}
              </span>
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default WorkItem;
