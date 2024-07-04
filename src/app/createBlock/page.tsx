/** @format */

import dynamic from "next/dynamic";

const BoxFormBlock = dynamic(() => import("@/components/blockForm/boxFormBlock"), { ssr: false });

export default function Admin() {
  return (
    <div className="pb-10">
      <h1 className="text-lg font-semibold leading-7 text-center mt-5 text-gray-900">Change UI component</h1>
      <BoxFormBlock />
    </div>
  );
}
