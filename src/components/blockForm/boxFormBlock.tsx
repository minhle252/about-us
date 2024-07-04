/** @format */
"use client";
import CustomEditor from "./CustomEditor";
import { useEffect, useState } from "react";
import SelectForm from "./selectForm";
import InputForm from "./inputForm";
import ImageForm from "./ImageForm";
import BoxDrawers from "./boxDrawers";
import { createAndUpdate, getdata } from "@/services/apiService";
import { ToastContainer, toast } from 'react-toastify';
import {useRouter} from "next/navigation";

import 'react-toastify/dist/ReactToastify.css';
export interface BoxFormBlockI {
  id?: string;
}
const BoxFormBlock: React.FC<BoxFormBlockI> = ({id}) => {
  const [description, setDescription] = useState<string>("");
  const [imagePosition, setImagePosition] = useState<string>("left");
  const [title, setTitle] = useState<string>("");
  const [linkCustom, setLinkCustom] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [subtitle, setSubTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkType, setCheckType] = useState<number>(1);
  const [images, setImages] = useState<string>('');
  const [children, setChildren] = useState<any[]>([]);
	const router = useRouter();

  const changeCKeditor = (event: any, editor: any) => {
    setDescription(editor.getData());
  };
  const fetchInitialData = async () => {
    try {
      const {results,error} = await getdata(id);
      if(!error){
        setLoading(false)
      }

      setTitle(results?.title)
      setDescription(results?.description);
      setImagePosition(results?.image_position || '' );
      setCheckType(results?.type);
      setChildren(results?.children);
      setImages(results?.images);
      setSubTitle(results?.subtitle);
      setSubTitle(results?.background);
      setLinkCustom(results?.link);
      
    } catch (error) {
      throw new Error('Failed to fetch data')
    }
  }
  useEffect(() => {
    if(id){
      fetchInitialData();
    }else{
      setLoading(false)
    }
  },[id])
  const handleSubmit = async (event: any) => {
    let form = event.target;
    event.preventDefault();
    let data = {
      type: checkType,
      subtitle: form?.subtitle?.value,
      title: form.title.value,
      link: form?.linkCustom?.value,
      background: form?.backgroundColor?.value,
      images: images,
      description: description,
      image_position: imagePosition,
      children
    };
    console.log(data);
    
    try {
      await createAndUpdate(JSON.stringify(data),id);
      toast.success("Success Notification !", {
        position: "bottom-right"
      });
      setTimeout(() => {
        location.href = '/listBlock';
      },500)
    } catch (error) {
      console.log(error);
      
      throw new Error('Failed to fetch data')
    }
  };
  
  return (
    <form className="w-[1000px] m-auto" onSubmit={handleSubmit}  >
      <div>
        <div className="flex">
          <SelectForm value={checkType} title="Type" disabled={id ? true : false} onchangeEvent={(event: any) => setCheckType(event.target.value)} />
          {checkType == 3 && (<SelectForm value={imagePosition} title="Image position" typeSelect='imagePosition'  onchangeEvent={(event:any)=> setImagePosition(event.target.value)} />)}
          
          {checkType == 2 || checkType >= 4 ? (
            <button
              className="flex items-center border-dashed border border-gray-900/25 px-5"
              type="button"
              onClick={() => setOpen(true)}
            >
              <span>Show list Item</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          {checkType >= 2 ? <ImageForm title="Image" name="file_upload" images={images} onchangeEvent={(e: any) => setImages(e)} /> : ""}
          {checkType == 2? <InputForm title="Link" name="linkCustom" value={linkCustom} /> : ""}
          {checkType == 3? <InputForm title="Subtitle" name="subtitle" value={subtitle} /> : ""}
          {checkType == 1? <InputForm title="Background color" name="backgroundColor" value={background} /> : ""}
          
          <InputForm title="Title" name="title" value={title} />
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                {!loading? (<CustomEditor onchangeEvent={changeCKeditor} value={description} />):''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
      <ToastContainer />
      {checkType == 2 && !loading || checkType >= 4 && !loading ? <BoxDrawers title="List children" show={open} showEvent={setOpen} data={children} onchangeEvent={(e:any)=> setChildren(e) }  /> : ""}
    </form>
  );
};
export default BoxFormBlock;
