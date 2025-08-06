"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [darkMode, setDarkMode] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects"];
      let current = "about";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 200) {
          current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const fadeSlideVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const animatedLink = (href: string, text: string, highlight?: boolean) => (
  <Link
    href={href}
    target="_blank"  // Always open in new tab
    rel="noopener noreferrer"  // Security best practice
    className={`group mt-4 inline-flex items-center gap-2 text-lg relative overflow-hidden transition-transform duration-200 ${
      highlight ? 'text-teal-300 hover:text-teal-200' : 'text-blue-400 hover:text-blue-300'
    } transform hover:scale-105`}
  >
    <span className="relative z-10 font-medium">{text}</span>
    <FiArrowUpRight className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
    <span
      className={`absolute left-0 bottom-0 w-full h-[1px] ${
        highlight ? 'bg-teal-300' : 'bg-blue-400'
      } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
    ></span>
  </Link>
);


  return (
    <main className={`${darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"} flex min-h-screen flex-col md:flex-row font-sans transition-colors relative overflow-hidden`}>
      <div
        className="pointer-events-none fixed w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl z-0"
        style={{ transform: `translate(${cursorPos.x - 128}px, ${cursorPos.y - 128}px)` }}
      ></div>

      <aside className="w-full md:w-1/4 p-6 flex flex-col justify-between fixed top-0 left-0 h-screen z-50 bg-gray-900">
        <div>
          <h1 className="text-3xl font-bold">Shardul More</h1>
          <p className="mt-2 text-gray-400">AI/ML Engineer | Python Developer</p>
        </div>
        <nav className="mt-6 space-y-4 hidden md:block relative">
          {['about', 'projects'].map((id) => (
            <div key={id} className="relative">
              <a href={`#${id}`} className={`block pl-2 transition ${activeSection === id ? 'text-blue-400 font-bold' : 'hover:text-blue-400'}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
              {activeSection === id && (
                <motion.div layoutId="indicator" className="absolute left-0 top-1 h-6 w-1 bg-blue-400 rounded"></motion.div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex gap-4 mt-4 md:mt-auto">
          <Link href="https://github.com/ShardulMorecode" target="_blank"><FaGithub className="text-2xl hover:text-blue-400" /></Link>
          <Link href="https://linkedin.com/in/shardulmore7271" target="_blank"><FaLinkedin className="text-2xl hover:text-blue-400" /></Link>
          <Link href="mailto:morepatilshardul@gmail.com"><FaEnvelope className="text-2xl hover:text-blue-400" /></Link>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="mt-4 px-3 py-1 bg-gray-700 rounded hover:bg-blue-500 transition">Toggle Mode</button>
      </aside>

      <section className="md:ml-[25%] flex-1 p-8 space-y-32 scroll-smooth relative z-10">
        <motion.div id="about" initial="hidden" animate="visible" variants={fadeSlideVariants} className="min-h-screen flex flex-col justify-center">
          <p className="mt-4 text-lg max-w-3xl text-gray-400 leading-relaxed">
            I’m a developer passionate about building intelligent, AI-driven systems and crafting seamless user interfaces that combine data-driven insights with robust engineering. My focus is on creating AI and ML applications that not only perform at scale but are thoughtfully designed for usability and impact.
            <br /><br />
            I’m working with a robotics company on an automation system that extracts data, fills forms, and converts them into PDFs for large-scale models. Recently, I interned at Internship Studio (Dec 2024 – May 2025), where I worked on data preprocessing, built logistic regression models, and optimized accuracy with feature selection techniques. Before that, as the Creative Head of the Knowledge Club at my university, I organized events, managed teams, and fostered a culture of innovation.
            <br /><br />
            I have worked with tools like Python, PyTorch, TensorFlow, FastAPI, Streamlit, and I enjoy bridging the gap between AI research and practical deployment. My experience also includes building computer vision projects like AI-Vista, and generative AI solutions such as MEDGAN for medical imaging.
            <br /><br />
            I’m continuously exploring new ideas in AI, automation, and user experience design.
          </p>
          {animatedLink("/Shardul_More.pdf", "View Full Résumé", true)}
        </motion.div>

        <motion.div id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeSlideVariants}>
          <h2 className="text-3xl font-semibold mb-6">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[{
              name: 'MEDGAN', desc: 'GAN-based medical image enhancement platform for healthcare professionals.', link: 'https://github.com/ShardulMorecode/MedGan'
            }, {
              name: 'AI-Vista', desc: 'Real-time object detection system using YOLOv5 and OpenCV.', link: 'https://github.com/ShardulMorecode/AI_vista'
            }, {
              name: 'Smart Resume Analyser', desc: 'NLP-powered resume parsing app with 95% accuracy.', link: 'https://github.com/ShardulMorecode/Smart_Resume_Analyser_App-master'
            }, {
              name: 'AI Generation System', desc: 'AI content and media generation framework.', link: 'https://github.com/ShardulMorecode/ai-generation-system'
            }, {
              name: 'Local Business Chatbot', desc: 'Conversational AI assistant for local businesses (in progress).', link: 'https://github.com/ShardulMorecode/ai-chatbot-local-business'
            }].map((p) => (
              <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeSlideVariants} className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-105 transition">
                <h3 className="text-xl font-bold text-white transition-colors duration-300">{p.name}</h3>
                <p className="text-gray-400 mt-2">{p.desc}</p>
                {animatedLink(p.link, "View Project")}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeSlideVariants}>
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-xl">Reach out via email or LinkedIn. I’m open to AI, ML, data science, and full-stack development opportunities.</p>
          {animatedLink("mailto:morepatilshardul@gmail.com", "Say Hello")}
        </motion.div>
      </section>
    </main>
  );
}
