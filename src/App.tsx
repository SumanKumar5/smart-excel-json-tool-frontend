import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ExcelToJsonPage from "./pages/ExcelToJsonPage";
import JsonToExcelPage from "./pages/JsonToExcelPage";
import SchemaGeneratorPage from "./pages/SchemaGeneratorPage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/layout/ScrollToTop";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors relative">
          {/* Noise texture overlay */}
          <div className="noise-bg" />

          {/* Mesh gradient background */}
          <div className="mesh-gradient" />

          {/* Dot pattern overlay */}
          <div className="dot-pattern fixed inset-0 opacity-[0.05] pointer-events-none" />

          <Header />
          <main className="flex-1 relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/excel-to-json" element={<ExcelToJsonPage />} />
              <Route path="/json-to-excel" element={<JsonToExcelPage />} />
              <Route
                path="/schema-generator"
                element={<SchemaGeneratorPage />}
              />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
