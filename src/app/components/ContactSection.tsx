import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

// Define the form values interface
interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create validation schema with Yup
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string()
    .min(5, "Subject is too short")
    .max(100, "Subject is too long")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message is too short")
    .max(1000, "Message is too long")
    .required("Message is required"),
});

const ContactSection: React.FC = () => {
  // Initial form values
  const initialValues: FormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  // Form submission handler
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      // In a real application, you would send the form data to your backend here
      console.log("Form submitted:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and show success message
      resetForm();
      setStatus({ success: true });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({});
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({ error: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading text-center">Get in Touch</h2>
        <p className="section-subheading text-center">
          Ready to start your project? Have questions about our services?
          We&apos;d love to hear from you. Reach out and let&apos;s create
          something amazing together.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-12 text-center lg:text-left">
          <div>
            <div className="relative mb-8">
              <h3 className="text-xl font-pragmatica-bold mb-4">
                Contact Details
              </h3>
              <div className="space-y-3">
                <p>
                  <span className="font-pragmatica-bold">Locations:</span>{" "}
                  Baghdad | Erbil | Dubai | Istanbul
                </p>
                <p>
                  <span className="font-pragmatica-bold">Email:</span>{" "}
                  <a
                    href="mailto:home@awj.co"
                    className="text-[var(--purple-primary)]"
                  >
                    home@awj.co
                  </a>
                </p>
                <p>
                  <span className="font-pragmatica-bold">Phone:</span>{" "}
                  <a
                    href="tel:+9647818808808"
                    className="text-[var(--purple-primary)]"
                  >
                    +964 781 880 8808
                  </a>
                </p>
              </div>
            </div>

            <motion.div
              className="mt-8 border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-none overflow-hidden h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.1097911604883!2d44.384491475495474!3d33.33325407978443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577e66a9dc3feb%3A0x7a5721c3e36932f!2sAWJ%20MEDIA%20%26%20EVENTS!5e0!3m2!1sen!2sus!4v1721234567890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AWJ Media & Events Location"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </div>

          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors, status }) => (
                <Form className="space-y-4">
                  {status?.success && (
                    <motion.div
                      className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-md"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Thank you for your message! We&apos;ll get back to you
                      soon.
                    </motion.div>
                  )}

                  {status?.error && (
                    <motion.div
                      className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      There was an error sending your message. Please try again.
                    </motion.div>
                  )}

                  <div className="relative">
                    <label htmlFor="name" className="block mb-2 text-left">
                      Your Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full p-3 border ${
                        touched.name && errors.name
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } focus:outline-none focus:border-[var(--purple-primary)] transition-colors`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1 text-left"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block mb-2 text-left">
                      Your Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full p-3 border ${
                        touched.email && errors.email
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } focus:outline-none focus:border-[var(--purple-primary)] transition-colors`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1 text-left"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="subject" className="block mb-2 text-left">
                      Subject
                    </label>
                    <Field
                      type="text"
                      id="subject"
                      name="subject"
                      className={`w-full p-3 border ${
                        touched.subject && errors.subject
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } focus:outline-none focus:border-[var(--purple-primary)] transition-colors`}
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-red-500 text-sm mt-1 text-left"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="block mb-2 text-left">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows={5}
                      className={`w-full p-3 border ${
                        touched.message && errors.message
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      } focus:outline-none focus:border-[var(--purple-primary)] transition-colors`}
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm mt-1 text-left"
                    />
                  </div>

                  <div className="flex justify-center lg:justify-start mt-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        variant="primary"
                        withPlayButton={false}
                        type="submit"
                        className={`btn-primary relative ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
