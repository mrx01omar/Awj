import React from "react";
import Circle from "./Circle";
interface AchievementCardProps {
  count: string;
  label: string;
  icon: React.ReactNode;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  count,
  label,
  icon,
}) => {
  return (
    <div className="p-8 border border-gray-200 transition-all hover:border-[var(--purple-primary)] text-center group relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 -right-1/2 w-full h-full">
          <Circle className="absolute top-0 left-0" />
        </div>
      </div>
      <div className="text-[var(--purple-primary)] mb-6 flex justify-center">
        {icon}
      </div>
      <div className="text-4xl font-pragmatica-bold mb-2">{count}</div>
      <div className="text-lg">{label}</div>
    </div>
  );
};

const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      count: "50",
      label: "Clients",
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
    {
      count: "128",
      label: "Projects",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      count: "11+",
      label: "Years of Success",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      count: "33",
      label: "Hard Workers",
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">
          What We Have Achieved So Far
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              count={achievement.count}
              label={achievement.label}
              icon={achievement.icon}
            />
          ))}
        </div>

        <p className="text-center text-lg font-pragmatica-medium mt-12">
          Delivering excellence across 4 international offices
        </p>
      </div>
    </section>
  );
};

export default AchievementsSection;
