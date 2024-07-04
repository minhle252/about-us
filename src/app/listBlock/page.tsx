/** @format */
"use client";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColDef, ColGroupDef, ValueGetterParams, GridReadyEvent } from "ag-grid-community";
import { deteData, getdata, sortData } from "@/services/apiService";
import Link from "next/link";
import { toast } from "react-toastify";

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
export default function ListBlock() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  let currentTimemout: any;
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<(ColDef<any, any> | ColGroupDef<any>)[]>([
    { field: "id" },
    { field: "title" },
    { field: "description" },
    {
      field: "type",
      cellRenderer: function (params: any) {
        let text = "";
        if (params.value == 1) {
          text = "Text";
        } else if (params.value == 2) {
          text = "Pillars";
        } else if (params.value == 3) {
          text = "Highlight";
        } else if (params.value == 4) {
          text = "Core values";
        } else if (params.value == 5) {
          text = "Carousel";
        }
        return text;
      },
    },
    {
      field: "sorts",
      headerName: "Sort",
      cellRenderer: function (params: any) {
        return (
          <input
            type="number"
            defaultValue={params.value}
            onChange={(e: any) => sortItemFunc(params.data.id, e.target.value)}
            className="px-3"
          />
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      cellRenderer: function (params: any) {
        return (
          <div className="d-flex">
            <Link
              href={`/editBlock/${params.value}`}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </Link>
            <button
              onClick={(e:any)=> deleteItems(params.value)}
              className="rounded-md bg-red-600 ms-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: false,
      sortable: true,
      flex: 1,
      minWidth: 100,
      floatingFilter: true,
      filter: true,
      resizable: true,
    };
  }, []);
  const onGridReady = useCallback(async (params: GridReadyEvent) => {
    let { results } = await getdata();
    setRowData(results);
  }, []);
  const deleteItems = async (val: any)=>{
    let text = 'Are you delete this component ?';
    
    if(val && confirm(text) == true){

       await deteData(val);
      let { results } = await getdata();
      setLoading(true)
      setRowData(results);
    }
    toast.success('Delete data successfully!', {
      position: 'bottom-left'
    });
  }
  useEffect(() => {
    setLoading(false);
  }, [rowData]);
  const sortItemFunc = async (id: number, sort: number) => {
    clearTimeout(currentTimemout);
    currentTimemout = setTimeout(async () => {
      await sortData(id, sort).then((res: any) => {
        console.log(res);
      });
      let { results } = await getdata();
      setRowData(results);
      setLoading(true);
    }, 200);
  };
  return (
    // wrapping container with theme & size
    <div className="w-[95vw] m-auto">
      <div className="flex justify-end my-5">
        <Link
          href={`/createBlock`}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </Link>
      </div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: "80vh" }} // the Data Grid will fill the size of the parent container
      >
        {!loading ? (
          <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} onGridReady={onGridReady} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
