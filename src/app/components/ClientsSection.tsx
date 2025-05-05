import React from "react";
import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";

interface ClientLogoProps {
  src: string;
  alt: string;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ src, alt }) => {
  return (
    <motion.div
      className="border border-gray-200 group transition-all relative overflow-hidden h-[180px] flex items-center justify-center bg-white"
      whileHover={{ borderColor: "var(--purple-primary)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full p-8 flex items-center justify-center">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            className="grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ClientsSection: React.FC = () => {
  const clients = [
    { src: "/photo/clients/client-1.png", alt: "Client 1" },
    { src: "/photo/clients/client-2.png", alt: "Client 2" },
    { src: "/photo/clients/client-3.png", alt: "Client 3" },
    { src: "/photo/clients/client-4.png", alt: "Client 4" },
    { src: "/photo/clients/client-5.png", alt: "Client 5" },
    { src: "/photo/clients/client-6.png", alt: "Client 6" },
    { src: "/photo/clients/client-8.png", alt: "Client 8" },
  ];

  return (
    <section id="clients" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">
          Trusted by Leading Companies
        </h2>
        <p className="section-subheading text-center">
          We collaborate with forward-thinking companies and organizations that
          value innovation and excellence.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {clients.map((client, index) => (
            <ClientLogo key={index} src={client.src} alt={client.alt} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button variant="primary" href="#contact" withPlayButton>
              Become Our Client
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
