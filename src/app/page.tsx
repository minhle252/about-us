/** @format */

"use client";
import Header from "@/components/layout/Header";
import { getdata } from "@/services/apiService";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import Footer from "@/components/layout/footer";

export default function Home() {
  const [listCompoent, setListCompoent] = useState<any>([]);
  
  const loadData = async () => {
    let { results } = await getdata();
    setListCompoent(results);
  };
  
  useEffect(() => {
    loadData();
  }, []);


  return (
    <main className="mt-10">
      <Header />
      {listCompoent?.map((item: any, index: number) => {
        let textColor = "#000";
        if (item.background) {
          textColor = "#fff";
        }
        if (item.type == "1") {
          return (
            <div
              key={index}
              className="px-[20%] py-24 text-center"
              style={{ background: item.background, color: textColor }}
            >
              {item.title && <h5 className="text-3xl font-semibold mb-5">{item.title}</h5>}
              <div>{parse(item.description)}</div>
            </div>
          );
        } else if (item.type == "2") {
          return (
            <div key={index} className="px-[20%] py-24 text-center">
              {item.title && <h5 className="text-xl font-semibold mb-5">{item.title}</h5>}
              <div>{parse(item.description)}</div>
              <div className="flex">
                {item?.children &&
                  item?.children.map((itemChild: any, indexChild: number) => {
                    return (
                      <div key={index + indexChild} className="w-3/12 px-3 mt-3">
                        <div className="bg-gray-200 p-3 w-full h-full rounded-xl">
                          {itemChild.images && (
                            <Image
                              src={itemChild.images}
                              width={100}
                              height={100}
                              className="w-full"
                              alt="Picture of the author"
                            />
                          )}
                          <p className="font-semibold">{itemChild.title}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {item.link && (
                <div className="d-flex justify-center py-10">
                  <Link href={item.link} className="bg-black py-4 px-10 mt-5 text-white">
                    Learn More
                  </Link>
                </div>
              )}
            </div>
          );
        } else if (item.type == "3") {
          return (
            <div
              className={`flex bg-gray-200 p-5 px-[20%] ${item.image_position == "left" ? "flex-row-reverse" : ""}`}
            >
              <div key={index} className="flex-1 py-24 px-5 text-start items-center">
                <p className="mb-3">{item.subtitle}</p>
                {item.title && <h5 className="text-3xl font-semibold mb-5">{item.title}</h5>}
                <div>{parse(item.description)}</div>
              </div>
              <div className="w-3/12 flex items-center">
                <Image src={item.images} width={100} height={100} className="w-full" alt="Picture of the author" />
              </div>
            </div>
          );
        } else if (item.type == "4") {
          return (
            <div key={index} className="px-[20%] py-24 bg-gray-200 text-center">
              {item.title && <h5 className="text-xl font-semibold mb-5">{item.title}</h5>}
              <div>{parse(item.description)}</div>
              <div className="flex flex-col">
                {item?.children &&
                  item?.children.map((itemChild: any, indexChild: number) => {
                    return (
                      <div
                        key={index + indexChild}
                        className="w-full py-5 px-8 my-4 bg-white flex items-center rounded-xl"
                      >
                        <div className=" p-3 h-full rounded-xl w-2/12">
                          {itemChild.images && (
                            <Image
                              src={itemChild.images}
                              width={100}
                              height={100}
                              className="w-full"
                              alt="Picture of the author"
                            />
                          )}
                        </div>
                        <div className="flex-1 text-start">
                          <p className="text-lg font-semibold mb-2">{itemChild.title}</p>
                          <div>{parse(itemChild.description)}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {item.link && (
                <div className="d-flex justify-center py-10">
                  <Link href={item.link} className="bg-black py-4 px-10 mt-5 text-white">
                    Learn More
                  </Link>
                </div>
              )}
            </div>
          );
        } else if (item.type == "5") {
          return (
            <div key={index} className="px-[20%] py-24  text-center">
              {item.title && <h5 className="text-3xl font-semibold mb-20">{item.title}</h5>}
              <div>{parse(item.description)}</div>
              <div>
                <Swiper rewind={true} navigation={true} modules={[Navigation]} className="mySwiper">
                  {item?.children &&
                    item?.children.map((itemChild: any, indexChild: number) => {
                      return (
                        <SwiperSlide>
                          <div className="flex  h-[500px] text-start">
                            <div className="w-1/4 rounded-xl overflow-hidden">
                              <Image
                                src={itemChild.images}
                                width={100}
                                height={100}
                                className="h-full object-cover"
                                alt="Picture of the author"
                              />
                            </div>
                            <div className="flex-1 px-5">
                              <h4 className="text-4xl font-light">{itemChild.title}</h4>
                              <div className="content-Swiper">{parse(itemChild.description)}</div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          );
        }
      })}
      <Footer/>
    </main>
  );
}
