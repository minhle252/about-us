/** @format */
"use client";
import { memo, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import BoxFormChildren from './boxFormChildren';
import { deteData } from '@/services/apiService';
import { ToastContainer, toast } from 'react-toastify';

export interface BoxDrawersI {
  title: string;
  show: boolean;
  showEvent: any;
  data?: any[];
  onchangeEvent?: any;
}

const BoxDrawers: React.FC<BoxDrawersI> = ({ title, show, showEvent, data = [], onchangeEvent}) => {
    const [listDataChildren, setListDataChildren] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=>{
        // setListDataChildren(data);
        sortListChildren(data)
    },[])
    useEffect(()=>{
      setLoading(false)
    },[listDataChildren])
    const addDataChildrenFunc = () => {
        let initData = {
            title: '',
            description: '',
            images: '',
            sorts: 0,
        };
        setListDataChildren([...listDataChildren,initData]);
    }
    const changeFormChildren = (data: any) => {
      let list = listDataChildren.map((item:any,index:number) =>{
        if(data.index == index) item = data;
        return item;
      })
      onchangeEvent(list)
      setListDataChildren(list)
    }
    const deleteItems = async (item: any, indexItem: number)=>{
      setLoading(true)
      let list = listDataChildren.filter((item:any,index:number) => index != indexItem)
      onchangeEvent(list)
      setListDataChildren(list)
      if(item.id){
        const {error, message} = await deteData(item.id);
      }
      toast.success('Delete data successfully!', {
        position: 'bottom-left'
      });
    }
    const upEventFunc = (item: any, indexItem: number) => {
      let list = listDataChildren;
      list = list.map((item:any,index:any) => {
        if(index == indexItem && item.sorts >= 1){
          item.sorts -= 1;
        }
        if(index == indexItem - 1){
          item.sorts += 1;
        }
        return item;
      })
      sortListChildren(list);
    }
    const downEventFunc = (item: any, indexItem: number) => {
      let list = listDataChildren;
      list = list.map((item:any,index:any) => {
        if(index == indexItem ){
          item.sorts += 1;
        }
        if(index == indexItem + 1){
          item.sorts -= 1;
        }
        return item;
      })
      sortListChildren(list);
    }
    const sortListChildren = (d:any = false) =>{
      let list = d ? d : listDataChildren;
      list.sort(function(a:any, b:any){return a.sorts - b.sorts});
      list = list.map((item:any,index:any) => {
        item.sorts = index;
        return item;
      })
      setLoading(true)
      onchangeEvent(list)
      setListDataChildren(list)
    }
  return (
    <Dialog className="relative z-10" open={show} onClose={showEvent}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            {/* <p name="list_children"></p> */}
            <input type="hidden" name="list_children"/>
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6 flex justify-between items-center">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">{title}</DialogTitle>
                  <button
                    type="button"
                    className="relative rounded-md text-gray-600 "
                    onClick={() => showEvent(false)}
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Start content */}
                    {listDataChildren?.length > 0 && !loading && listDataChildren.map((item:any,index:number) => (<BoxFormChildren onchangeEvent={(data:any) => changeFormChildren(data)} onUpEvent={upEventFunc} onDownEvent={downEventFunc} index={index} key={index} data={item} onDelete={deleteItems}/>))}
                    <button type="button" onClick={addDataChildrenFunc} className="w-full border border-indigo-600 rounded-lg py-3 flex items-center justify-center">
                        <span>Add</span>
                        <PlusIcon className="h-4 w-4" aria-hidden="true"/>
                    </button>
                    {/* End content */}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
      <ToastContainer />

    </Dialog>
  );
};
export default memo(BoxDrawers);
