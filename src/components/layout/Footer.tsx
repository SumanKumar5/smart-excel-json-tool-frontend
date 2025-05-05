import React from "react";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  ExternalLink,
  Github as GithubResourceIcon,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 py-10 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-medium mb-4 text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FileSpreadsheet size={24} className="text-blue-500 dark:text-blue-400" />
              <span>Smart Excel-JSON</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              A powerful tool to seamlessly convert between Excel and JSON
              formats with AI-enhanced processing.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-slate-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/excel-to-json"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-2"
                >
                  <FileSpreadsheet size={16} />
                  <span>Excel to JSON</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/json-to-excel"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-2"
                >
                  <FileSpreadsheet size={16} />
                  <span>JSON to Excel</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/schema-generator"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-2"
                >
                  <FileSpreadsheet size={16} />
                  <span>Schema Generator</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center space-x-2"
                >
                  <FileSpreadsheet size={16} />
                  <span>About</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-slate-800 dark:text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/SumanKumar5/smart-excel-json-tool-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                >
                  <GithubResourceIcon
                    size={16}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>GitHub Repository</span>
                  <ExternalLink size={14} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://smartexceljson.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                >
                  <ExternalLink
                    size={16}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>Production Site</span>
                  <ExternalLink size={14} className="opacity-50" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center transition-colors">
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">
            © {currentYear} Smart Excel-JSON Tool. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/SumanKumar5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/suman-kumar-sol/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
