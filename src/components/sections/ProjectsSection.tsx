'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Cpu, Smartphone, ArrowUpRight, X } from 'lucide-react';
import TiltCard from '../effects/TiltCard';

const projects = [
  {
    title: 'Smart Soil Analyzer & Crop Advisor',
    description:
      'An IoT-powered system for comprehensive soil analysis and intelligent crop recommendations. Features real-time sensor integration and custom Python data processing pipelines.',
    tech: ['IoT', 'Sensors', 'Python', 'Data Analysis'],
    role: 'Solo Developer',
    icon: Cpu,
    gradient: 'from-[#0066FF] to-[#00D4FF]',
    color: '#0066FF',
    glowColor: 'rgba(0, 102, 255, 0.15)',
    github: null,
  },
  {
    title: 'Gaming Monitor System',
    description:
      "A dual-app Flutter ecosystem for monitoring and managing children's gaming habits. Features real-time tracking, parental controls, and an insightful analytics dashboard.",
    tech: ['Flutter', 'Firebase', 'Dart', 'Mobile'],
    role: 'App Developer',
    icon: Smartphone,
    gradient: 'from-[#FF0055] to-[#FF3366]',
    color: '#FF0055',
    glowColor: 'rgba(255, 0, 85, 0.15)',
    github: 'https://github.com/Jeseem24/gaming_monitor_app',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Lock body scroll when modal is open
  if (typeof window !== 'undefined') {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-16 md:py-20 px-4 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Parallax bg */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D10] to-[#0A0A0A]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-sm uppercase tracking-[0.3em] text-[#0066FF] font-mono mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-orbitron tracking-wide">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] mx-auto rounded-full" />
          <p className="text-gray-500 mt-5 max-w-lg mx-auto text-base">
            A showcase of problems I&apos;ve solved and products I&apos;ve built
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-6 relative">
          {projects.map((project, index) => (
            <motion.div
              layoutId={`project-container-${project.title}`}
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <TiltCard intensity={5}>
                <motion.div
                  className="group relative glass rounded-3xl overflow-hidden"
                  whileHover={{
                    boxShadow: `0 25px 60px ${project.glowColor}`,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`h-[2px] bg-gradient-to-r ${project.gradient}`} />

                  <div className="p-7 md:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-shrink-0">
                        <motion.div
                          layoutId={`project-icon-${project.title}`}
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ type: 'spring' }}
                          style={{ boxShadow: `0 10px 30px ${project.glowColor}` }}
                        >
                          <project.icon className="w-7 h-7 text-white" />
                        </motion.div>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <motion.h3 
                            layoutId={`project-title-${project.title}`}
                            className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#00D4FF] transition-colors duration-300"
                          >
                            {project.title}
                          </motion.h3>
                          <motion.div
                            className="flex-shrink-0 p-2 rounded-full border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-all"
                            whileHover={{ scale: 1.1 }}
                          >
                            <ArrowUpRight className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        </div>

                        <p className="text-sm font-medium" style={{ color: project.color }}>
                          {project.role}
                        </p>

                        <p className="text-gray-400 leading-relaxed text-base md:text-lg max-w-2xl">
                          {project.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <motion.span
                                key={tech}
                                className="px-3 py-1.5 text-xs font-medium bg-white/[0.04] text-gray-400 rounded-lg border border-white/[0.06] hover:border-[#0066FF]/30 hover:text-white transition-all"
                                whileHover={{ scale: 1.05, y: -2 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>

                          {project.github && (
                            <motion.div
                              className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-[#00D4FF] transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span>View Details</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 50%, ${project.color}06, transparent 60%)`,
                    }}
                  />
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/Jeseem24"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:border-[#0066FF]/50 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 102, 255, 0.1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">Explore More on GitHub</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </motion.div>
      </div>

      {/* Expandable Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-container-${selectedProject.title}`}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-[3px] w-full bg-gradient-to-r ${selectedProject.gradient}`} />
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-300 hover:text-white" />
              </button>

              <div className="p-8 md:p-12 space-y-8">
                <div className="flex items-center gap-6">
                  <motion.div
                    layoutId={`project-icon-${selectedProject.title}`}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedProject.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <selectedProject.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3 
                      layoutId={`project-title-${selectedProject.title}`}
                      className="text-3xl md:text-5xl font-bold text-white mb-2"
                    >
                      {selectedProject.title}
                    </motion.h3>
                    <p className="text-lg font-medium" style={{ color: selectedProject.color }}>
                      {selectedProject.role}
                    </p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-xl leading-relaxed text-gray-300">
                    {selectedProject.description}
                  </p>
                  {/* Mock Detailed Content */}
                  <div className="mt-8 space-y-4 text-gray-400">
                    <h4 className="text-white text-xl font-orbitron tracking-wide mb-4">Core Features</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Real-time data synchronization across all end-user endpoints.</li>
                      <li>Highly secure authenticated data pipelines and cloud storage.</li>
                      <li>Custom-built dashboard with data visualization tracking metrics.</li>
                      <li>Optimized performance boasting 99.9% uptime and zero-latency triggers.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h4 className="text-white text-lg font-orbitron tracking-wide mb-4">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-sm font-medium bg-white/5 text-gray-300 rounded-xl border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.github && (
                  <div className="pt-6">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-semibold transition-all hover:scale-[1.02]"
                    >
                      <Github className="w-5 h-5" />
                      View Source Code
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}