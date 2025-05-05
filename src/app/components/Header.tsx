/** @jsxImportSource react */

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Define theme type
type HeaderTheme = "light" | "dark";

// Define props interface with optional theme prop
interface HeaderProps {
  theme?: HeaderTheme;
}

// Define all theme style objects outside the component to prevent recreation on each render
const headerStyles = {
  light: "bg-white/90 backdrop-blur-sm shadow-sm py-3",
  dark: "bg-transparent py-5",
};

const logoSrc = {
  light: "/awj-svg/awj-logo-dark.svg",
  dark: "/awj-svg/awj-logo-light.svg",
};

const navLinkStyles = {
  light: "text-gray-700",
  dark: "text-white",
};

const activeLinkStyles = {
  light: "text-[var(--purple-primary)] font-pragmatica-bold",
  dark: "text-white font-pragmatica-bold",
};

const underlineStyles = {
  light: "bg-[var(--purple-primary)]",
  dark: "bg-white",
};

const mobileButtonStyles = {
  light: "text-[var(--purple-primary)]",
  dark: "text-white",
};

const mobileMenuStyles = {
  light: "bg-white",
  dark: "bg-[var(--purple-primary)]",
};

const mobileNavItemStyles = {
  light: {
    normal: "text-gray-700 hover:bg-gray-100",
    active: "bg-[var(--purple-primary)] text-white font-pragmatica-bold",
  },
  dark: {
    normal: "text-white hover:bg-white/10",
    active: "bg-white/10 text-white font-pragmatica-bold",
  },
};

const mobileFooterStyles = {
  light: "text-gray-500",
  dark: "text-white/70",
};

// Predefined section IDs to avoid array creation on each render
const sectionIds = ["home", "about", "services", "work", "clients", "contact"];

// Create navLinks array outside component to prevent recreation on each render
const navLinks = [
  { name: "Home", href: "/#home", id: "home" },
  { name: "About", href: "/#about", id: "about" },
  { name: "Services", href: "/#services", id: "services" },
  { name: "Work", href: "/#work", id: "work" },
  { name: "Clients", href: "/#clients", id: "clients" },
  { name: "Contact", href: "/#contact", id: "contact" },
];

// Animation variants for framer-motion to optimize animations
const headerAnimation = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const menuOverlayAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const menuPanelAnimation = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Header: React.FC<HeaderProps> = ({ theme: forcedTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastActiveSection = useRef("home");
  const isNavigating = useRef(false);
  const scrollPositionRef = useRef(0);
  const pathname = usePathname();
  const isHomePage = useMemo(
    () => pathname === "/" || pathname === "",
    [pathname]
  );

  // Determine if we should use the theme prop or scroll-based theme
  const useScrollBasedTheme = forcedTheme === undefined;

  // Calculate current theme - either forced or based on scroll position
  const currentTheme = useMemo<HeaderTheme>(() => {
    return useScrollBasedTheme ? (isScrolled ? "light" : "dark") : forcedTheme;
  }, [useScrollBasedTheme, isScrolled, forcedTheme]);

  // Memoize the handleScroll function to prevent recreating it on every render
  const handleScroll = useCallback(() => {
    const debouncedScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Create the debounced function inside the callback
    const timeoutId = setTimeout(debouncedScroll, 10);
    return () => clearTimeout(timeoutId);
  }, []);

  // Immediate check for scroll position on component mount
  useEffect(() => {
    // Only track scroll if we're using scroll-based theme
    if (!useScrollBasedTheme) {
      setIsInitialized(true);
      return;
    }

    const checkInitialScrollPosition = () => {
      // Set initial scroll state
      setIsScrolled(window.scrollY > 20);
      setIsInitialized(true);
    };

    // Check scroll position immediately on mount
    checkInitialScrollPosition();

    // Also check after a short delay to handle any dynamic content loading
    const timer = setTimeout(checkInitialScrollPosition, 100);

    return () => clearTimeout(timer);
  }, [useScrollBasedTheme]);

  // Check for hash in URL when on home page and scroll to that section
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const section = document.getElementById(sectionId);

      if (section) {
        // Wait a bit for the page to fully load
        const timer = setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
          setActiveLink(sectionId);
          lastActiveSection.current = sectionId;
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [isHomePage]);

  // Track sections with IntersectionObserver - memoize the observer setup
  useEffect(() => {
    // Only track sections on home page
    if (!isHomePage) return;

    let prevYPosition = 0;
    let direction = "down";

    const options = {
      root: null,
      rootMargin: "-80px 0px -80px 0px", // Adjust rootMargin to control when sections are considered visible
      threshold: 0.2, // Percentage of section visible to trigger callback
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Don't update during navigation or when menu is open
      if (isNavigating.current || isMobileMenuOpen) return;

      // Get current scroll direction
      const currentYPosition = window.scrollY;
      direction = currentYPosition > prevYPosition ? "down" : "up";
      prevYPosition = currentYPosition;

      // Find sections in view
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.id);

      // If no sections are currently visible, don't update
      if (visibleSections.length === 0) return;

      // If we're scrolling down, prefer the first visible section
      // If we're scrolling up, prefer the last visible section
      const activeSection =
        direction === "down"
          ? visibleSections[0]
          : visibleSections[visibleSections.length - 1];

      // Only update if the section has changed
      if (activeSection !== activeLink) {
        setActiveLink(activeSection);
        lastActiveSection.current = activeSection;
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    // Observe all sections
    const observedSections: HTMLElement[] = [];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
        observedSections.push(section);
      }
    });

    // Only add scroll listener if we're using scroll-based theme
    if (useScrollBasedTheme) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Cleanup
    return () => {
      // Unobserve all sections that were observed
      observedSections.forEach((section) => {
        observer.unobserve(section);
      });
      observer.disconnect();

      // Only remove the listener if we added it
      if (useScrollBasedTheme) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [
    isMobileMenuOpen,
    isHomePage,
    useScrollBasedTheme,
    activeLink,
    handleScroll,
  ]);

  // Lock body scroll when mobile menu is open - this is an expensive operation
  // that should only run when absolutely necessary
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position before locking
      scrollPositionRef.current = window.scrollY;

      // Apply fixed position to body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Reset body styles first
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Then restore scroll position with a slight delay to ensure styles are reset
      if (scrollPositionRef.current !== undefined) {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "instant", // Use instant instead of auto/smooth to prevent visible jumping
        });
      }
    }

    // Cleanup in case component unmounts while menu is open
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Memoize handlers to prevent recreating functions on each render
  const handleNavClick = useCallback(
    (id: string) => {
      isNavigating.current = true;
      setActiveLink(id);
      lastActiveSection.current = id;
      setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked

      // If we're already on home page, smooth scroll to section
      if (isHomePage) {
        const element = document.getElementById(id);
        if (element) {
          // Add a small delay to allow the mobile menu to close first
          setTimeout(() => {
            // Update URL hash without causing a page reload
            window.history.pushState(null, "", `/#${id}`);

            element.scrollIntoView({ behavior: "smooth" });

            // Re-enable automatic section detection after scrolling completes
            setTimeout(() => {
              isNavigating.current = false;
            }, 1000);
          }, 300);
        } else {
          // If element not found, reset navigation state
          isNavigating.current = false;
        }
      } else {
        // If we're not on home page, navigate to the home page with the section hash
        // Use window.location instead of router.push to force a full page load that will process the hash
        window.location.href = `/#${id}`;
      }
    },
    [isHomePage]
  );

  const toggleMobileMenu = useCallback(() => {
    // When opening menu, ensure we keep the current active section
    if (!isMobileMenuOpen) {
      setActiveLink(lastActiveSection.current);
    }
    // Simply toggle the menu state without triggering navigation
    setIsMobileMenuOpen((prev) => !prev);
  }, [isMobileMenuOpen]);

  // Show a loading state until we've checked initial scroll position
  if (!isInitialized) {
    return null; // Or return a minimal loading state
  }

  return (
    <>
      <motion.header
        variants={headerAnimation}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${headerStyles[currentTheme]}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          <motion.a
            href="/#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="relative h-12 w-36 z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src={logoSrc[currentTheme]}
              alt="AWJ Logo"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </motion.a>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className={`text-base font-pragmatica-medium relative px-1 py-1 
                  ${navLinkStyles[currentTheme]} 
                  ${
                    activeLink === link.id && isHomePage
                      ? activeLinkStyles[currentTheme]
                      : ""
                  }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {link.name}
                <motion.span
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${underlineStyles[currentTheme]}`}
                  initial={{
                    scaleX: activeLink === link.id && isHomePage ? 1 : 0,
                  }}
                  animate={{
                    scaleX: activeLink === link.id && isHomePage ? 1 : 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:block"></div>

          <motion.button
            className={`lg:hidden z-50 w-10 h-10 flex items-center justify-center ${
              isMobileMenuOpen ? "text-white" : mobileButtonStyles[currentTheme]
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
                <path
                  d="M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile menu overlay - separate from header to avoid layout issues */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[45]">
            <motion.div
              variants={menuOverlayAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />
            <motion.div
              variants={menuPanelAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`fixed top-0 right-0 h-full w-4/5 max-w-sm 
                ${mobileMenuStyles[currentTheme]} 
                shadow-xl overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-20 pb-6 px-6">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.name}
                      onClick={() => handleNavClick(link.id)}
                      className={`text-lg font-pragmatica-medium py-4 px-4 rounded-lg transition-all text-left
                        ${
                          activeLink === link.id && isHomePage
                            ? mobileNavItemStyles[currentTheme].active
                            : mobileNavItemStyles[currentTheme].normal
                        }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span>{link.name}</span>
                        <motion.div
                          animate={{
                            x: activeLink === link.id && isHomePage ? 0 : -4,
                            opacity:
                              activeLink === link.id && isHomePage ? 1 : 0,
                          }}
                          className="ml-auto"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 12L10 8L6 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className={`text-sm ${mobileFooterStyles[currentTheme]}`}>
                    AWJ International Media Production & Events Management
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Header);
