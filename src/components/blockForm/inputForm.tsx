/** @format */
"use client";
import { memo, useState } from "react";

export interface InputFormI{
	title: string;
  name: string;
  value?: string;
  onchangeEvent?: any;
}
const InputForm: React.FC<InputFormI> = ({title, name,value, onchangeEvent}) => {
  return (
    <div className="col-span-full mt-5">
      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
        {title}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          defaultValue={value}
          onChange={onchangeEvent}
          className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
export default memo(InputForm);
