/** @format */
"use client";
import {
  TrashIcon,
  ArrowDownIcon,
  ArrowUpIcon
} from '@heroicons/react/20/solid'
import Image from "next/image";
import { memo, useState } from "react";
import ImageForm from "./ImageForm";
import InputForm from "./inputForm";
import CustomEditor from "./CustomEditor";

export interface BoxFormChildrenI {
  title?: string;
  name?: string;
  data?: any;
  index?: number;
  onchangeEvent?: any;
  onDelete?: any;
  onUpEvent?: any;
  onDownEvent?: any;
}
const BoxFormChildren: React.FC<BoxFormChildrenI> = ({ index, data, onchangeEvent, onDelete, onUpEvent, onDownEvent }) => {
  const [description, setDescription] = useState<string>(data ? data.description : "");
  const [titleVal, setTitleVal] = useState<string>(data ? data.title : "");
  let timeoutCurrent: any;
  let formData = {
    ...data,
    title: titleVal,
    images: data.images,
    index,
  };

  const changeCKeditor = (event: any, editor: any) => {
    clearTimeout(timeoutCurrent);
    timeoutCurrent = setTimeout(() => {
      setDescription(editor.getData());
      onchangeEvent({
        ...formData,
        description: editor.getData(),
      });
    }, 200);
  };
  const changeFormChildrenFunc = (event: any) => {
    clearTimeout(timeoutCurrent);
    timeoutCurrent = setTimeout(() => {
      setTitleVal(event.target.value);
      onchangeEvent({
        ...formData,
        title: event.target.value,
      });
    }, 200);
  };
 
  return (
    <div className="w-full p-3 mb-5 border border-indigo-600 rounded-lg box-form-iframe">
      <div className="flex justify-between">
        <div className="flex">
          <button className='p-1 bg-gray-400 rounded-md text-gray-600' onClick={()=> onUpEvent(data,index)} title='up'>
            <ArrowUpIcon  aria-hidden="true" className='h-5 w-5 text-white' />
          </button>
          <button className='p-1 ms-2 bg-gray-400 rounded-md text-gray-600' onClick={()=> onDownEvent(data,index)} title='down'>
            <ArrowDownIcon  aria-hidden="true" className='h-5 w-5 text-white' />
          </button>
        </div>
        <button className='p-1 bg-red-600 rounded-md text-gray-600' onClick={()=> onDelete(data,index)} title='delete'>
          <TrashIcon  aria-hidden="true" className='h-5 w-5 text-white' />
        </button>
      </div>
      <ImageForm
        title="Image"
        name="file_upload_children"
        images={data.images}
        onchangeEvent={(e: string) =>
          onchangeEvent({
            ...formData,
            images: e,
          })
        }
      />
      <InputForm title="title" name="title_children" value={titleVal} onchangeEvent={changeFormChildrenFunc} />
      <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <CustomEditor onchangeEvent={changeCKeditor} value={description} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(BoxFormChildren);
