import React from "react";
import Circle from "./Circle";

interface ServiceCardProps {
  title: string;
  description: string;
  subtext: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  subtext,
  icon,
}) => {
  return (
    <div className="group p-8 border border-gray-200 transition-all relative h-full">
      <div className="relative h-16 mb-8 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-pragmatica-bold">{title}</h3>

          <div className="text-[var(--purple-primary)] z-10">{icon}</div>
        </div>
        <div className="absolute top-1/2 left-10 transform -translate-x-1/2 -translate-y-[65%] w-20 h-20 ">
          <Circle variant="purple" />
        </div>
      </div>

      <p className="mb-4">{description}</p>
      <p className="text-sm text-gray-600">{subtext}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Media Production",
      description:
        "Unleash the power of visually stunning content, captivating audio, and seamless post-production with our comprehensive media production services.",
      subtext: "Tailored solutions for marketing and advertising needs.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "Events Management",
      description:
        "Elevate your event with expert management and printing services, from creative design to on-site execution, leaving a lasting impression.",
      subtext: "Including memorable branded takeaways.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      title: "PR Management",
      description:
        "Maximize your brand&apos;s exposure and reputation with strategic PR services.",
      subtext: "Specializing in media relations and crisis communication.",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Our Services</h2>
        <p className="section-subheading text-center">
          We offer a comprehensive range of media and event services to help
          your brand stand out in today&apos;s competitive landscape.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              subtext={service.subtext}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
