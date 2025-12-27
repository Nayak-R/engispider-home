'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesIllustration from '@/components/svg/ServicesIllustration';
import DevelopmentIllustration from '@/components/svg/DevelopmentIllustration';
import { FaCode, FaLaptopCode, FaMobile, FaShoppingCart, FaPalette, FaCloud, FaDatabase, FaCogs, FaRocket, FaCheckCircle } from 'react-icons/fa';

export default function ServicesPage() {
  const services = [
    {
      icon: FaLaptopCode,
      title: 'Custom Website Development',
      description: 'Stunning, high-converting websites tailored to your vision. From landing pages to complete web applications, we bring your ideas to life with modern design and cutting-edge technology.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile-First'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaCode,
      title: 'Software Development',
      description: 'Robust, scalable software solutions using Angular, React, Java Spring Boot, and MongoDB. We create enterprise-grade applications that solve complex business challenges.',
      features: ['Custom Development', 'API Integration', 'Scalable Architecture', 'Clean Code'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaMobile,
      title: 'Web Application Development',
      description: 'Dynamic, feature-rich web applications that enhance user experience and business efficiency. We specialize in building powerful SaaS and enterprise applications.',
      features: ['Real-time Features', 'Cloud Integration', 'Secure Authentication', 'Data Analytics'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaPalette,
      title: 'Website Designing',
      description: 'Visually appealing and functional designs that reflect your brand identity. Our designs are user-centered, engaging, and optimized for conversions.',
      features: ['UI/UX Design', 'Brand Identity', 'Prototyping', 'User Research'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FaShoppingCart,
      title: 'E-commerce Development',
      description: 'Tailored e-commerce platforms with seamless user interfaces and secure payment integration. Drive sales and customer satisfaction with our solutions.',
      features: ['Shopping Cart', 'Payment Gateway', 'Inventory Sync', 'Order Management'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: FaCloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud-based applications with high availability and performance. We help businesses migrate to the cloud and build cloud-native solutions.',
      features: ['Cloud Migration', 'AWS/Azure', 'Auto-scaling', 'Cost Optimization'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FaDatabase,
      title: 'Database Solutions',
      description: 'Expert database design, optimization, and management. We work with SQL and NoSQL databases to ensure your data is secure and performant.',
      features: ['Database Design', 'Performance Tuning', 'Backup Solutions', 'Migration Services'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: FaCogs,
      title: 'API Development',
      description: 'RESTful and GraphQL API development for seamless integration. We build secure, scalable APIs that power your applications and services.',
      features: ['REST APIs', 'GraphQL', 'API Documentation', 'Security'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left pl-8 lg:pl-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mt-16"
              >
                <span className="text-purple-400 text-sm font-semibold">Our Services</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Comprehensive Software Solutions
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Empowering your <span className="text-purple-400 font-semibold">digital transformation</span> with cutting-edge technology and expertise
              </p>

              <div className="flex flex-wrap gap-4 mt-8 mb-16">
                {[
                  { icon: FaCheckCircle, text: 'Enterprise Solutions' },
                  { icon: FaCheckCircle, text: 'Custom Development' },
                  { icon: FaCheckCircle, text: 'Cloud & DevOps' },
                  { icon: FaCheckCircle, text: '24/7 Support' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <item.icon className="w-5 h-5 text-green-400" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[500px]"
            >
              <ServicesIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-32 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">We Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Full-stack development services tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-2xl transition-all">
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br ${service.color} rounded-xl`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px]"
            >
              <DevelopmentIllustration />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Process</span>
              </h2>

              <div className="space-y-6">
                {[
                  { step: '01', title: 'Discovery & Planning', description: 'We analyze your requirements and create a detailed roadmap' },
                  { step: '02', title: 'Design & Architecture', description: 'Creating scalable and user-friendly system designs' },
                  { step: '03', title: 'Development & Testing', description: 'Building robust solutions with rigorous quality assurance' },
                  { step: '04', title: 'Deployment & Launch', description: 'Seamless deployment with zero downtime' },
                  { step: '05', title: 'Support & Maintenance', description: 'Ongoing support to ensure optimal performance' }
                ].map((process, index) => (
                  <motion.div
                    key={process.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 items-start"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{process.step}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{process.title}</h3>
                      <p className="text-gray-400">{process.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Let's discuss how we can help you achieve your goals with our expert software development services
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              <FaRocket />
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
