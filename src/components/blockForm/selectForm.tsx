/** @format */
"use client"

export interface SelectFormI{
	onchangeEvent: any;
  value?: number | string;
  disabled?: boolean;
  typeSelect?: string;
  title?: string;
}
interface Item {
  id: number | string;
  text: string;
}

interface Data {
  type: Item[];
  imagePosition: Item[];
}
const listValue:Data = {
  type: [
    {id: 1, text: 'Text'},
    {id: 2, text: 'Pillars'},
    {id: 3, text: 'Highlight'},
    {id: 4, text: 'Core values'},
    {id: 5, text: 'Carousel'},
  ],
  imagePosition: [
    {id: 'left', text: 'left'},
    {id: 'right', text: 'right'}
  ]
}
const SelectForm: React.FC<SelectFormI> = ({onchangeEvent,value, title, disabled, typeSelect = 'type'}) => {
  return (
    <div className="flex-1">
          <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
            {title}
          </label>
          <div className="mt-2">
            <select
              onChange={onchangeEvent}
              disabled={disabled}
              value={value}
              name="type"
              className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {typeSelect == 'type' ? listValue.type?.map((item: any,index:number)=>{
                return (<option key={index} value={item.id} >{item.text}</option>)
              }):listValue.imagePosition?.map((item: any,index:number)=>{
                return (<option key={index} value={item.id} >{item.text}</option>)
              })}
            </select>
          </div>
        </div>
  );
};
export default SelectForm;
