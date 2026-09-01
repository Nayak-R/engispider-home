'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutIllustration from '@/components/svg/AboutIllustration';
import TeamIllustration from '@/components/svg/TeamIllustration';
import { FaAward, FaUsers, FaLightbulb, FaHeart, FaRocket, FaShieldAlt, FaChartLine, FaHandshake } from 'react-icons/fa';

export default function AboutPage() {
  const values = [
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We stay ahead with cutting-edge technologies and innovative solutions that drive digital transformation',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FaHeart,
      title: 'Customer First',
      description: 'Your success is our priority. We deliver excellence in every project with dedication and passion',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: FaAward,
      title: 'Quality',
      description: 'We maintain the highest standards in software development, testing, and delivery processes',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: FaUsers,
      title: 'Collaboration',
      description: 'We work closely with clients to understand needs and exceed expectations through teamwork',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const milestones = [
    { icon: FaRocket, title: '1000+ Projects', description: 'Successfully delivered across industries', color: 'from-blue-500 to-cyan-500' },
    { icon: FaUsers, title: '500+ Clients', description: 'Happy clients worldwide', color: 'from-green-500 to-emerald-500' },
    { icon: FaAward, title: '10+ Years', description: 'Of industry excellence', color: 'from-purple-500 to-pink-500' },
    { icon: FaShieldAlt, title: '99% Success', description: 'Project completion rate', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="min-w-0 text-left lg:pl-12 px-4 py-10"
            >
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mt-16"
              >
                <span className="text-blue-400 text-sm font-semibold">About Engispider</span>
              </motion.div> */}

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 break-words bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Transforming Ideas Into Reality
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Your trusted partner in <span className="text-blue-400 font-semibold">digital transformation</span> and innovative software solutions
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 mb-16">
                {[
                  { value: '500+', label: 'Happy Clients' },
                  { value: '1000+', label: 'Projects' },
                  { value: '10+', label: 'Years' },
                  { value: '50+', label: 'Team Members' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                  >
                    <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
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
              <AboutIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-32 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Who <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">We Are</span>
              </h2>

              <p className="text-lg text-gray-600 mb-6">
                <strong className="text-gray-900">Engispider Infotech Private Limited</strong> is a leading software development company based in Bhubaneswar, Odisha. With over a decade of experience in the industry, we specialize in providing comprehensive ERP web applications and custom software solutions designed to streamline and optimize business processes.
              </p>

              <p className="text-lg text-gray-600 mb-6">
                Our solutions are tailored to meet the unique needs of organizations across various industries, ensuring efficiency, accessibility, and scalability. We leverage cutting-edge technologies like <span className="text-blue-600 font-semibold">Angular, React, Next.js, Java Spring Boot,</span> and <span className="text-blue-600 font-semibold">MongoDB</span> to deliver robust, high-performance applications.
              </p>

              <p className="text-lg text-gray-600">
                From HRMS and CRM systems to specialized solutions for pharmacies and restaurants, we provide end-to-end software development services that empower businesses to achieve their digital transformation goals.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Angular', 'React', 'Next.js', 'Java Spring Boot', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px]"
            >
              <TeamIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
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
              Our Core <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide us in delivering excellence to our clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br ${value.color} rounded-xl`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-32 px-4 bg-white pb-48">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milestones that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br ${milestone.color} rounded-2xl`}>
                  <milestone.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
