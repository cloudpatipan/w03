import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdOutlineFullscreen } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../components/Layouts/Layout';
import ModalImage from '../../components/ModalImage';
import { PiShoppingBagOpenThin } from "react-icons/pi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import Button from '../../components/Button';
import { CartContext } from '../../context/CartContext';
import { CgDetailsMore } from "react-icons/cg";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { IoCloseCircleOutline } from "react-icons/io5";
import { PiTelegramLogoThin } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { UserContext } from '../../context/UserContext';
import { IoTrashBin } from "react-icons/io5";
import ReactPaginate from 'react-paginate';
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import baseUrl from '../../routes/BaseUrl';
import { Rings } from 'react-loader-spinner'
export default function ProductDetail() {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { setCartCount } = useContext(CartContext);
    const [product, setProduct] = useState([]);
    const [product_random, setProductRandom] = useState([]);
    const [additional_images, setAdditionalImages] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // จำนวนสินค้าค่าเริ่ม ต้นเป็น 1
    const { slug } = useParams();
    const [pageNumber, setPageNumber] = useState(0);
    const commentsPerPage = 4;

    const pageCount = Math.ceil(comments.length / commentsPerPage);

    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };

    const displayedComments = comments.slice(pageNumber * commentsPerPage, (pageNumber + 1) * commentsPerPage);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }
    const handleIncrement = () => {
        if (quantity < product.qty) {
            setQuantity(prevCount => prevCount + 1);
        } else {
            Swal.fire({
                text: "จำนวนสินค้าสูงสุดแล้ว",
                icon: "warning",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "black",
                focusConfirm: false,
            });
        }
    }


    useEffect(() => {
        const fetchProductDetail = async () => {

            const response = await axios.get(`/api/product-detail/${slug}`);
            if (response.data.status === 200) {
                setProduct(response.data.products);
                document.title = response.data.products.name;
                setProductRandom(response.data.product_random);
                setAdditionalImages(response.data.products.additional_images);
                setLoading(false);
            } else if (response.data.status === 400) {
                Swal.fire({
                    icon: "error",
                    text: response.data.message,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "black",
                    focusConfirm: false,
                });
            } else if (response.data.status === 401) {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "black",
                    focusConfirm: false,
                });
                navigate('/');
            }

        };

        fetchProductDetail();
    }, [slug]);

    useEffect(() => {
        const fetchCommnets = async () => {

            const response = await axios.get(`/api/product-detail/${slug}`);
            if (response.data.status === 200) {
                setComments(response.data.products.comments);
                setLoading(false);
            } else if (response.data.status === 400) {
                Swal.fire({
                    icon: "error",
                    text: response.data.message,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "black",
                    focusConfirm: false,
                });
            } else if (response.data.status === 401) {
                Swal.fire({
                    icon: "warning",
                    text: response.data.message,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "black",
                    focusConfirm: false,
                });
                navigate('/');
            }

        };

        fetchCommnets();
    }, [comments]);


    const addToCart = async () => {
        const data = {
            product_id: product.id,
            product_qty: quantity,
        };

        const response = await axios.post('/api/add-to-cart', data);
        if (response.data.status === 200) {
            setCartCount((prevCount) => prevCount + 1);
            Swal.fire({
                icon: "success",
                text: response.data.message,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "black",
                focusConfirm: false,
            });
        } else if (response.data.status === 400) {
            Swal.fire({
                icon: "error",
                text: response.data.message,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "black",
                focusConfirm: false,
            });
        } else if (response.data.status === 401) {
            Swal.fire({
                icon: "warning",
                text: response.data.message,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "black",
                focusConfirm: false,
            });
        }
    }

    const [text, setText] = useState("");

    const [error, setError] = useState([]);

    const addComment = async (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            text: text,
        };

        axios.post(`/api/comments/${product.id}`, data, {}).then(response => {
            if (response.data.status === 200) {
                setComments(comments.map(comment => comment.id === commentId ? response.data.comment : comment));
                setError([]);
            } else if (response.data.status === 422) {
                setError(response.data.errors);
            }
        });
    }

    const startEditing = (comment) => {
        setEditingCommentId(comment.id);
        setEditingText(comment.text);
    }

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditingText("");
    }

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const updateComment = async (commentId) => {

        const data = {
            text: editingText,
        };

        const response = await axios.put(`/api/comments/${commentId}`, data);
        if (response.data.status === 200) {
            cancelEditing();
        } else if (response.data.status === 422) {
            setError(response.data.errors);
        }
    };


    const deleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`/api/comments/${commentId}`);
            if (response.data.status === 200) {
            } else if (response.data.status === 422) {
                setError(response.data.errors);
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const [isModalOpenImage, setIsModalOpenImage] = useState(false);

    const openModalImage = () => {
        setIsModalOpenImage(true);
    };

    const closeModalImage = () => {
        setIsModalOpenImage(false);
    };

    const [isModalOpenAdditionImages, setIsModalOpenAdditionImages] = useState(false);

    const openModalAdditionImages = () => {
        setIsModalOpenAdditionImages(true);
    };

    const closeModalAdditionImages = () => {
        setIsModalOpenAdditionImages(false);
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    return (
        <>
            <Layout>
                <section>
                    {loading ? (
                        (<Rings
                            visible={true}
                            height="500"
                            width="500"
                            color="black"
                            ariaLabel="rings-loading"
                            wrapperStyle={{}}
                            wrapperClass="flex justify-center"
                        />)
                    ) : (
                        <div>
                            <Link to={`/`}>
                                <Button icon={<IoMdArrowDropleft size={20} />} className={`mb-2`}>
                                    กลับ
                                </Button>
                            </Link>

                            <div className="flex flex-col md:flex-row gap-8 justify-between">

                                <div className="w-full md:w-[30%]">
                                    <div className="relative overflow-hidden rounded-lg group">
                                        <div className="absolute w-full h-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="flex flex-col items-center text-white text-xl">
                                                <MdOutlineFullscreen className="cursour-pointer size-28 hover:size-32 transition-all duration-50" onClick={openModalImage} />
                                            </div>
                                        </div>
                                        {product.image ? (
                                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/${product.image}`} alt={`รูปภาพสินค้า ${product.name}`} />
                                        ) : (
                                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพสินค้า`} />
                                        )}
                                        <div>
                                            <ModalImage isOpen={isModalOpenImage} onClose={closeModalImage}>
                                                {product.image ? (
                                                    <img className="rounded-lg w-full h-full object-cover" src={`${baseUrl}/images/product/${product.image}`} alt="" />
                                                ) : (
                                                    <img className=" rounded-lg w-full h-full object-cover" src="${baseUrl}/images/product/No_image.png" alt="No Image" />
                                                )}
                                            </ModalImage>
                                        </div>

                                    </div>

                                    <div className={`grid grid-container grid-cols-4 mt-1`}>
                                        {additional_images.length > 0 ? (
                                            additional_images.map((item, index) => (
                                                <div key={index} className="relative overflow-hidden rounded-lg group">
                                                    <div className="absolute w-full h-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                        <div className="flex flex-col items-center text-white text-xl">
                                                            {/* ปุ่มเปิด Modal ภาพเพิ่มเติม */}
                                                            <MdOutlineFullscreen className="cursor-pointer size-8 hover:size-10 transition-all duration-50" onClick={() => openModalAdditionImages(index)} />
                                                        </div>
                                                    </div>
                                                    {/* รูปภาพเพิ่มเติม */}
                                                    <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/${item.additional_image}`} alt="" />
                                                </div>
                                            ))
                                        ) : null}

                                        {/* Modal แสดงรูปภาพเพิ่มเติม */}
                                        {isModalOpenAdditionImages && (
                                            <div className="fixed z-10 flex justify-center items-center top-0 left-0 right-0 bottom-0 w-full h-full bg-black/40">
                                                <div className="relative overflow-hidden w-full rounded-lg">

                                                    <div className="rounded-lg">
                                                        <div className="flex justify-between items-center">

                                                            <div className="cursor-pointer" onClick={() => setCurrentImageIndex((currentImageIndex - 1 + additional_images.length) % additional_images.length)}>
                                                                <IoIosArrowBack className="text-gray-300 hover:text-black text-4xl" />
                                                            </div>

                                                            <div className="w-[20rem] h-[30rem] overflow-hidden rounded-lg relative">
                                                                <button
                                                                    className="absolute top-0 right-0 drop-shadow text-white text-lg bg-transparent border-transparent cursor-pointer font-medium"
                                                                    onClick={closeModalAdditionImages}
                                                                >
                                                                    <IoCloseCircleOutline size={40} />
                                                                </button>
                                                                <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/${additional_images[currentImageIndex]?.additional_image}`} alt="" />
                                                            </div>

                                                            <div className="cursor-pointer" onClick={() => setCurrentImageIndex((currentImageIndex + 1) % additional_images.length)}>
                                                                <IoIosArrowForward className="text-gray-300 hover:text-black text-4xl" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className="w-full md:w-[80%]">
                                    <h2 className="text-sm block text-black/30 md:text-base">{product?.category.name}</h2>
                                    {console.log(product.category.name)}
                                    <h1 className="text-base md:text-lg mb-4">{product.name}</h1>
                                    <span className="text-base">รายละเอียด</span>
                                    <p className="text-sm">{product.description}</p>
                                    <p className="mt-4 text-base md:text-lg">
                                        <span className="text-sm md:text-base block text-black/30">
                                            ราคารวม
                                        </span>
                                        {product.price} บาท
                                    </p>

                                    <div className="my-2 flex items-center justify-center gap-4 rounded-full border h-8 w-[6rem] uppercase">
                                        <button onClick={handleDecrement}><FaMinus /></button>
                                        <div>
                                            {quantity}
                                        </div>
                                        <button onClick={handleIncrement}><FaPlus /></button>
                                    </div>

                                    {product.qty > 0 ? (
                                        <Button onClick={addToCart} type="submit" icon={<PiShoppingBagOpenThin size={26} />}>
                                            เพิ่มลงตระกร้า
                                        </Button>
                                    ) : (
                                        <Button type="disabled" icon={<MdOutlineErrorOutline size={25} />}>
                                            สินค้าหมด
                                        </Button>
                                    )}

                                </div>
                            </div>

                            <div>
                                <h1 className="text-sm md:text-base font-semibold my-2">สินค้าที่คุณอาจจะสนใจ</h1>

                                <div className={`grid grid-container grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4`}>
                                    {product_random.length > 0 ? (
                                        product_random.map((item, index) => (
                                            <div key={index} className="overflow-hidden">
                                                <Link to={`/product/detail/${item.slug}`}>
                                                    <div className="relative overflow-hidden rounded-lg group h-[16rem]">
                                                        <div className="absolute w-full h-full bg-black/40 flex items-center justify-center group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                            <div className="flex flex-col items-center text-white text-xl">
                                                                รายละเอียด
                                                                <CgDetailsMore size={28} />
                                                            </div>
                                                        </div>
                                                        {item.image ? (
                                                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/${item.image}`} alt={`รูปภาพสินค้า ${item.name}`} />
                                                        ) : (
                                                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/no_image.png`} alt={`ไม่มีรูปภาพ`} />
                                                        )}
                                                    </div>
                                                </Link>
                                                <div className="mt-1">
                                                    <p className="text-sm text-ellipsis overflow-hidden text-balance h-[4rem]">{item.name}</p>
                                                    <p className="text-xs text-clip overflow-hidden text-black/40 font-semibold">{item.category.name}</p>
                                                    <span className="text-base">{item.price} บาท</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center rounded-lg col-span-3 md:col-span-6">
                                            <span className="text-3xl font-semibold">ไม่มีสินค้าที่สุ่ม</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-base md:text-lg">ความคิดเห็น</h2>
                                <div className="flex flex-col gap-4 mt-2 overscroll-auto py-1">
                                    {displayedComments.length > 0 ? (
                                        displayedComments.map((comment, index) => (
                                            <div key={index}>
                                                <div className="flex gap-2">

                                                    <div className="w-[3rem] h-[3rem] rounded-lg overflow-hidden cursor-pointer">
                                                        {comment.user && comment.user.avatar ? (
                                                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/avatar/${comment.user.avatar}`} alt={`รูปภาพของ ${comment.user.name}`} />
                                                        ) : (
                                                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ Avatar`} />
                                                        )}

                                                    </div>

                                                    <div className="flex flex-col">
                                                        {comment.user ? (
                                                            <>
                                                                <p className="border rounded-full px-2 text-center text-sm">{comment.user.role}</p>
                                                                <p className="text-base">{comment.user.name}</p>
                                                            </>
                                                        ) : (
                                                            <p>ผู้ใช้ไม่ทราบ</p>
                                                        )}

                                                    </div>

                                                </div>


                                                {editingCommentId === comment.id ? (
                                                    <>
                                                        <textarea
                                                            value={editingText}
                                                            onChange={(e) => setEditingText(e.target.value)}
                                                            placeholder="พิมพ์ความคิดเห็น"
                                                            className="h-[5rem] p-2 border rounded-lg mt-2 w-full"
                                                        />
                                                        <div className="flex gap-2 mt-2">
                                                            <Button className="flex justify-end" icon={<PiPaperPlaneTiltThin size={20} />}
                                                                onClick={(e) => updateComment(comment.id)}
                                                            >
                                                                อัพเดท
                                                            </Button>
                                                            <Button className="flex justify-end" icon={<MdCancel size={20} />}
                                                                onClick={cancelEditing}
                                                            >
                                                                ยกเลิก
                                                            </Button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>

                                                        <p>{comment.text}</p>
                                                        {user && user.id === comment.user_id && (
                                                            <div className="flex gap-2">
                                                                <Button className="flex justify-end" icon={<MdEdit size={20} />}
                                                                    onClick={() => startEditing(comment)}
                                                                >
                                                                    แก้ไข
                                                                </Button>
                                                                <Button className="flex justify-end" icon={<IoTrashBin size={20} />} onClick={() => deleteComment(comment.id)}>
                                                                    ลบ
                                                                </Button>
                                                            </div>

                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-base md:text-base font-semibold p-4 flex items-center justify-center rounded-lg">
                                            ไม่มีความคิดเห็น
                                        </div>
                                    )}
                                </div>

                                {user ? (
                                    <form onSubmit={addComment}>
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="เขียนความคิดเห็นของคุณที่นี่..."
                                            className="p-2 border-b mt-2 w-full"
                                        />
                                        <div className="flex gap-2">
                                            <Button type="submit" icon={<PiTelegramLogoThin size={20} />}>
                                                ส่งความคิดเห็น
                                            </Button>
                                        </div>
                                    </form>
                                ) : null}

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

                            </div>

                        </div>
                    )}
                </section>
            </Layout>
        </>
    )
}
