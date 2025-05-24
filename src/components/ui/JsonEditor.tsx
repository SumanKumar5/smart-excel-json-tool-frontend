import React, { useState, useEffect } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { useTheme } from "../../hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { cn } from "../../utils/cn";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onValidate?: (isValid: boolean) => void; // ✅ NEW PROP
  minHeight?: string;
  className?: string;
  readOnly?: boolean;
  label?: string;
  error?: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  onValidate,
  minHeight = "300px",
  className,
  readOnly = false,
  label,
  error: externalError,
}) => {
  const { theme } = useTheme();
  const [error, setError] = useState<string>("");

  // Configure Monaco Editor theme
  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "string", foreground: "9CA3AF" },
          { token: "number", foreground: "F87171" },
          { token: "keyword", foreground: "93C5FD" },
          { token: "delimiter", foreground: "6B7280" },
        ],
        colors: {
          "editor.background": "#0F172A",
          "editor.foreground": "#E5E7EB",
          "editor.lineHighlightBackground": "#1E293B",
          "editorLineNumber.foreground": "#4B5563",
          "editorLineNumber.activeForeground": "#9CA3AF",
          "editor.selectionBackground": "#2563EB40",
          "editor.inactiveSelectionBackground": "#1E293B",
        },
      });
    });
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value); // just update value, validation handled by onMount
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}

      <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <Editor
          height={minHeight}
          defaultLanguage="json"
          value={value}
          onChange={handleEditorChange}
          onMount={(editor, monaco) => {
            const model = editor.getModel();
            if (!model) return;

            const validate = () => {
              const markers = monaco.editor.getModelMarkers({ resource: model.uri });
              const isValid = markers.length === 0;
              onValidate?.(isValid);
              if (!isValid && markers[0]?.message) {
                setError(markers[0].message);
              } else {
                setError("");
              }
            };

            validate(); // initial check
            editor.onDidChangeModelDecorations(() => {
              requestAnimationFrame(validate);
            });
          }}
          theme={theme === "dark" ? "custom-dark" : "light"}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 16, bottom: 16 },
          }}
          className="rounded-xl"
        />
      </div>

      <AnimatePresence>
        {(error || externalError) && (
          <motion.div
            className="mt-2 p-3 bg-red-50/90 dark:bg-red-900/30 backdrop-blur-sm text-red-700 dark:text-red-300 rounded-xl text-sm shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-start space-x-2">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">JSON is invalid</p>
                <p className="text-xs mt-1 text-red-600 dark:text-red-400">
                  {externalError || error}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JsonEditor;
