import React from "react";
import Image from "next/image";
import Button from "./Button";
import { motion } from "framer-motion";
const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square relative z-10">
              <Image
                src="/awj-svg/10-years-image.png"
                alt="AWJ 10 Years"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="z-10"
              />
            </div>
          </div>

          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="section-heading">About Us</h2>
            <p className="text-lg mb-6">
              AWJ is a media production and events planning company founded in
              2012, with offices in Baghdad, Erbil, Dubai, and Istanbul. We
              provide comprehensive services including video production, event
              management, marketing, and advertising.
            </p>
            <p className="text-lg mb-10">
              Serving clients across the Middle East and beyond, our team of
              creative professionals is dedicated to delivering exceptional
              results that exceed expectations.
            </p>
            <div className="flex mt-12 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button variant="primary" href="#contact" withPlayButton>
                  Get in Touch
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
