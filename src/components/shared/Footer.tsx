import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/icon.png";
import { FaGithub, FaTwitter, FaGlobe } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <Image src={logo} alt="StudyMind AI Logo" className="w-8 h-8" />
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                StudyMind <span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs mb-8 leading-relaxed">
              Empowering learners worldwide with personalized AI study
              experiences. Master any topic, at any time.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://x.com/arsaad_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                title="Twitter / X"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/ar-saad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                title="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link
                href="https://ar-saad.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                title="Developer Portfolio"
              >
                <FaGlobe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/explore"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  AI Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  F.A.Q.
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/ar-saad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Creator GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy#cookies"
                  className="text-slate-500 hover:text-blue-600 dark:text-slate-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} StudyMind AI. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
              Built with Gemini & Next.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
