'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HRMSIllustration from '@/components/svg/HRMSIllustration';
import {
  FaUsers, FaCalendarCheck, FaClock, FaChartBar,
  FaFileInvoiceDollar, FaUserTie, FaMobile, FaShieldAlt
} from 'react-icons/fa';

export default function HRMSPage() {
  const features = [
    {
      icon: FaUsers,
      title: 'Employee Management',
      description: 'Comprehensive employee database with complete profile management and document storage'
    },
    {
      icon: FaCalendarCheck,
      title: 'Leave Management',
      description: 'Automated leave tracking, approval workflows, and balance management'
    },
    {
      icon: FaClock,
      title: 'Attendance Tracking',
      description: 'Biometric integration, real-time attendance monitoring, and automated reports'
    },
    {
      icon: FaFileInvoiceDollar,
      title: 'Payroll Processing',
      description: 'Automated salary calculation, tax deductions, and direct payment integration'
    },
    {
      icon: FaChartBar,
      title: 'Performance Management',
      description: 'Goal setting, performance reviews, KPI tracking, and analytics'
    },
    {
      icon: FaUserTie,
      title: 'Recruitment Module',
      description: 'End-to-end recruitment process from job posting to onboarding'
    },
    {
      icon: FaMobile,
      title: 'Mobile Access',
      description: 'Employee self-service portal accessible from mobile devices'
    },
    {
      icon: FaShieldAlt,
      title: 'Data Security',
      description: 'Enterprise-grade security with role-based access control'
    }
  ];

  const benefits = [
    'Reduce HR administrative workload by 70%',
    'Eliminate manual errors in payroll processing',
    'Improve employee satisfaction and engagement',
    'Real-time insights into workforce analytics',
    'Ensure compliance with labor laws',
    'Streamline recruitment and onboarding'
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/50 to-cyan-700/50"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left lg:pl-12">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold text-white mb-6 mt-16"
              >
                HRMS Software India
                <span className="block text-cyan-400 mt-2 text-3xl md:text-4xl">Transform Your HR Operations</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-300 mb-8"
              >
                Complete Human Resource Management System designed for Indian businesses. Streamline HR processes, manage payroll, track attendance, and boost productivity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-16"
              >
                <Link
                  href="/contact"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  Request Demo
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-96"
            >
              <HRMSIllustration />
            </motion.div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Comprehensive HRMS Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your workforce efficiently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Why Choose Our HRMS Solution?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Designed specifically for Indian businesses, our HRMS software helps you automate HR processes, ensure compliance, and focus on strategic initiatives.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-2xl shadow-2xl text-white"
            >
              <h3 className="text-3xl font-bold mb-6">Key Statistics</h3>
              <div className="space-y-6">
                {[
                  { label: 'Time Saved on HR Tasks', value: '70%' },
                  { label: 'Improved Employee Engagement', value: '85%' },
                  { label: 'Payroll Accuracy', value: '99.9%' },
                  { label: 'User Satisfaction', value: '95%' }
                ].map((stat) => (
                  <div key={stat.label} className="border-b border-white/20 pb-4 last:border-0">
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-lg text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Revolutionize Your HR Operations?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Schedule a free demo and see how our HRMS software can transform your workforce management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Get Free Demo
              </Link>
              <Link
                href="/services"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
              >
                View All Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
