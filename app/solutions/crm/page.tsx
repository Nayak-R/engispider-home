'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CRMIllustration from '@/components/svg/CRMIllustration';
import { FaUserFriends, FaChartLine, FaEnvelope, FaTasks, FaPhoneAlt, FaFileAlt, FaMobileAlt, FaRobot } from 'react-icons/fa';

export default function CRMPage() {
  const features = [
    { icon: FaUserFriends, title: 'Contact Management', description: 'Centralized customer database with complete interaction history' },
    { icon: FaChartLine, title: 'Sales Pipeline', description: 'Visual sales funnel tracking from lead to conversion' },
    { icon: FaEnvelope, title: 'Email Integration', description: 'Built-in email campaigns and automated follow-ups' },
    { icon: FaTasks, title: 'Task Management', description: 'Assign tasks and track team productivity in real-time' },
    { icon: FaPhoneAlt, title: 'Call Management', description: 'Integrated calling with logging and analytics' },
    { icon: FaFileAlt, title: 'Report & Analytics', description: 'Comprehensive dashboards for data-driven decisions' },
    { icon: FaMobileAlt, title: 'Mobile CRM', description: 'Access customer data on-the-go with mobile apps' },
    { icon: FaRobot, title: 'Automation', description: 'Automate repetitive tasks and streamline sales process' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-purple-800/50 to-pink-700/50"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left lg:pl-12">
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6 mt-16">
                CRM System for Businesses
                <span className="block text-pink-400 mt-2 text-3xl md:text-4xl">Elevate Customer Relationships</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300 mb-8">
                Powerful CRM software to manage leads, track sales, automate workflows, and boost revenue. Built for Indian businesses.
              </motion.p>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-16">
                <Link href="/contact" className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-xl">
                  Request Demo
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative h-96">
              <CRMIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete CRM Features</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-black/50 backdrop-blur-sm border border-purple-500/20 p-6 rounded-2xl hover:border-purple-500/50 transition-all">
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Boost Your Sales?</h2>
            <Link href="/contact" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
