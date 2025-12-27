'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InnovationIllustration from '@/components/svg/InnovationIllustration';
import { FaUsers, FaChartLine, FaBox, FaCapsules, FaUtensils, FaBriefcase } from 'react-icons/fa';

export default function SolutionsPage() {
  const solutions = [
    {
      title: 'HRMS Software',
      description: 'Complete HR management system for efficient workforce management, payroll, attendance, and employee performance tracking across your organization',
      href: '/solutions/hrms',
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      Icon: FaUsers
    },
    {
      title: 'CRM System',
      description: 'Customer relationship management for business growth, lead tracking, sales pipeline management, and improved customer satisfaction',
      href: '/solutions/crm',
      gradient: 'from-purple-600 via-purple-500 to-pink-500',
      Icon: FaChartLine
    },
    {
      title: 'Inventory Manager',
      description: 'Smart inventory tracking and management solution with real-time stock monitoring, automated alerts, and seamless stock control',
      href: '/solutions/inventory',
      gradient: 'from-green-600 via-green-500 to-emerald-500',
      Icon: FaBox
    },
    {
      title: 'Pharmacy Manager',
      description: 'Specialized software for pharmacy operations with billing, prescription management, inventory tracking, and regulatory compliance',
      href: '/solutions/pharmacy',
      gradient: 'from-red-600 via-red-500 to-orange-500',
      Icon: FaCapsules
    },
    {
      title: 'Restaurant Manager',
      description: 'Complete POS and management system for restaurants with order management, kitchen display, billing, and table reservations',
      href: '/solutions/restaurant',
      gradient: 'from-yellow-600 via-yellow-500 to-amber-500',
      Icon: FaUtensils
    },
    {
      title: 'Business Solutions',
      description: 'Custom enterprise software solutions tailored to your specific business needs, workflows, and industry requirements',
      href: '/solutions/business',
      gradient: 'from-indigo-600 via-indigo-500 to-blue-500',
      Icon: FaBriefcase
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>

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
                className="inline-block mb-6 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mt-16"
              >
                <span className="text-indigo-400 text-sm font-semibold">Our Solutions</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                Industry-Specific Solutions
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Streamline operations and drive growth with our <span className="text-indigo-400 font-semibold">tailored software solutions</span>
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 mb-16">
                {[
                  { label: 'HRMS', value: 'Workforce' },
                  { label: 'CRM', value: 'Sales' },
                  { label: 'Inventory', value: 'Stock' },
                  { label: 'Custom', value: 'Solutions' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center"
                  >
                    <div className="text-lg font-bold text-indigo-400">{item.label}</div>
                    <div className="text-sm text-gray-400 mt-1">{item.value}</div>
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
              <InnovationIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid Section */}
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
              Explore Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-specific software solutions designed to meet your unique business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Link href={solution.href} className="block h-full">
                  <div className={`relative h-full p-8 bg-gradient-to-br ${solution.gradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.8)_0%,_transparent_50%)]"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
                      >
                        <solution.Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                        {solution.title}
                      </h3>

                      <p className="text-white/90 mb-6 leading-relaxed">
                        {solution.description}
                      </p>

                      <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                        Learn More
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Why Choose Our <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built with cutting-edge technology and industry best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Customizable', description: 'Tailored to your specific needs', color: 'from-blue-500 to-cyan-500' },
              { title: 'Scalable', description: 'Grows with your business', color: 'from-purple-500 to-pink-500' },
              { title: 'Secure', description: 'Enterprise-grade security', color: 'from-green-500 to-emerald-500' },
              { title: 'Support', description: '24/7 technical assistance', color: 'from-orange-500 to-red-500' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br ${feature.color} rounded-2xl`}>
                  <span className="text-3xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-10 text-white/90">
              Choose the right solution for your industry and start your digital transformation journey today
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
            >
              Request a Demo
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
