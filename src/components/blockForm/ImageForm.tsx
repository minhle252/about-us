/** @format */
"use client";
import { uploadImage } from "@/services/apiService";
import Image from "next/image";
import { memo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ImageFormI {
  title: string;
  name: string;
  images?: string;
  onchangeEvent?: any;
}
const ImageForm: React.FC<ImageFormI> = ({ title, name, images, onchangeEvent }) => {
  const [preview, setPreview] = useState(images);
  let uuid = uuidv4();

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    try {
      const {status, linkImg} = await uploadImage(selectedFile);
        if(status === 'success'){
          onchangeEvent( linkImg);
          setPreview( linkImg);
        }
      // Handle response as needed
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="col-span-full mt-5">
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        {title}
      </label>
      <label
        htmlFor={`file-upload${uuid}`}
        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
        {preview ? (
          <Image src={preview} width={100} height={100} className="w-full" alt="Picture of the author" />
        ) : (
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor={`file-upload${uuid}`}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <input
          id={`file-upload${uuid}`}
          onChange={handleFileChange}
          name={name + uuid}
          type="file"
          className="sr-only"
        />
      </label>
    </div>
  );
};
export default memo(ImageForm);
