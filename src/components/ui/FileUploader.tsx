import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

interface FileUploaderProps {
  acceptedFileTypes: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  className?: string;
  label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  acceptedFileTypes,
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
  onFilesSelected,
  className,
  label = "Drag & drop files here, or click to select files",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        const errorMessage = fileRejections[0].errors[0].message;
        setError(errorMessage);
        return;
      }

      setError(null);
      setFiles(acceptedFiles);
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    multiple,
  });

  const removeFile = (fileToRemove: File) => {
    const newFiles = files.filter((file) => file !== fileToRemove);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className={className}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300",
          isDragActive
            ? "border-blue-400 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-900/20 shadow-lg"
            : "border-slate-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:shadow-lg",
          error &&
            "border-red-300 dark:border-red-500 bg-red-50/50 dark:bg-red-900/20",
        )}
      >
        <div {...getRootProps({ className: 'focus:outline-none' })}>
          <input {...getInputProps()} />
          <motion.div
            className="flex flex-col items-center justify-center space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={cn(
                "p-4 rounded-full",
                isDragActive
                  ? "bg-blue-100/80 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                  : "bg-slate-100/80 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300",
              )}
              animate={{
                scale: isDragActive ? [1, 1.1, 1] : 1,
                rotate: isDragActive ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <Upload size={24} />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              {label}
            </p>
            {!error && (
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {Object.entries(acceptedFileTypes)
                  .map(([key]) => `${key.replace("application/", "")}`)
                  .join(", ")}{" "}
                {maxSize && `(Max: ${maxSize / (1024 * 1024)}MB)`}
              </p>
            )}
            {error && (
              <motion.div
                className="text-red-500 dark:text-red-400 flex items-center space-x-1 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="mt-4 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                    <File
                      size={18}
                      className="text-blue-500 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-[200px] md:max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Remove file"
                >
                  <X size={18} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;
