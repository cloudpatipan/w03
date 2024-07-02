import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { CgDetailsMore } from "react-icons/cg";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import baseUrl from '../../routes/BaseUrl';
export default function ProductFeatured({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 12;

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(pageNumber * productsPerPage, (pageNumber + 1) * productsPerPage);

  return (
    <section>
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between">

          <div className="w-full">
            <h1 className="text-base">แนะนำสินค้าออกใหม่</h1>
          </div>
          
          <div className="relative flex">
            <input type="text" placeholder="ค้นหาสินค้าแนะนำ"
           className="md:w-[10rem] w-full pl-8 placeholder:text-sm text-sm border-b appearance-none focus:outline-none bg-transparent text-black py-1"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <FaSearch className="absolute top-2 left-0" />
          </div>
        </div>

        <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 grid-auto-rows-min-content object-cover my-1">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product, index) => (
                <div key={index} className="overflow-hidden">
                <Link to={`/product/detail/${product.slug}`}>
                <div className="relative overflow-hidden rounded-lg group h-[16rem]">
                    <div className="absolute w-full h-full bg-black/40 flex items-center justify-center group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex flex-col items-center text-white text-xl">
                        รายละเอียด
                        <CgDetailsMore size={28} />
                      </div>
                    </div>
                      {product.image ? (
                        <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/${product.image}`} alt={`รูปภาพสินค้า ${product.name}`} />
                      ) : (
                        <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/no_image.png`} alt={`ไม่มีรูปภาพ`} />
                      )}
                    </div>
                  </Link>
                  <div className="mt-1">
                    <p className="text-sm text-ellipsis overflow-hidden text-balance h-[4rem]">{product.name}</p>
                    <p className="text-xs text-clip overflow-hidden text-black/40 font-semibold">{product.category.name}</p>
                    <span className="text-base">{product.price} บาท</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center rounded-lg col-span-3 md:col-span-6">
                <span className="text-3xl font-semibold">ไม่มีสินค้าแนะนำ</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={
            <span className="w-10 h-10 flex items-center justify-center border rounded-full">
              <IoMdArrowDropleft size={20} />
            </span>
          }
          nextLabel={
            <span className="w-10 h-10 flex items-center justify-center border rounded-full">
              <IoMdArrowDropright size={20} />
            </span>
          }
          pageCount={pageCount}
          breakLabel={<span className="mr-4">...</span>}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center gap-2 mt-2"
          pageClassName="block w-10 h-10 flex items-center justify-center border rounded-full"
          activeClassName="border-4"
        />
      )}
    </section>
  );
}
