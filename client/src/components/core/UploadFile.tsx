"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface FileWithPreview extends File {
  preview: string;
}

const UploadFile = ({ className }: { className?: string }) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      rejectedFiles: FileRejection[],
      event: DropEvent
    ) => {
      if (acceptedFiles?.length) {
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles?.length) {
        setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected(files => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach(file => formData.append("file", file));
    formData.append("upload_preset", "friendsbook");

    // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    // const data = await fetch(URL, {
    //   method: "POST",
    //   body: formData,
    // }).then(res => res.json());

    // console.log(data);
  };

  return (
    <div>
      <div>
        <div
          {...getRootProps({
            className: cn(
              "border border-dashed bg-slate-100 hover:shadow-md duration-200 rounded-md p-5",
              className
            ),
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <UploadCloud className="w-10 h-10" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & Drop files here, or click to select files</p>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="mt-10">
          {/* <h2 className="title text-xl font-semibold">Preview</h2>
          <div className="flex gap-4">
            <Button type="button" variant={"destructive"} onClick={removeAll}>
              Remove all files
            </Button>
            <Button type="submit">Upload</Button>
          </div> */}

          <ul className="">
            {files.map(file => (
              <li
                key={file.name}
                className="relative rounded-md shadow-lg border"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                />
                <button
                  type="button"
                  className="w-7 h-7 border border-red-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-red-500 transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  <X className="w-5 h-5 fill-red-500 hover:fill-red-500 transition-colors" />
                </button>
                <p className="m-2 text-neutral-500 text-[12px] font-medium text-center">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
