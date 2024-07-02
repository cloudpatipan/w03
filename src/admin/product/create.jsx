import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar';
import { CiImageOn } from "react-icons/ci";
import Button from '../../components/Button';
import { FaSave } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import baseUrl from '../../routes/BaseUrl';
export default function CreateProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [brand_id, setBrandId] = useState("");
    const [image, setImage] = useState();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [featured, setFeatured] = useState(false);
    const [popular, setPopular] = useState(false);
    const [status, setStatus] = useState(false);
    const [additionalImages, setAdditionalImages] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/all-category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching Categories:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get('/api/all-brand');
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching Brands:', error);
        }
    };

    const [error, setError] = useState([]);

    const addProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('qty', qty);
        formData.append('category_id', category_id);
        formData.append('brand_id', brand_id);
        formData.append('image', image);
        formData.append('featured', featured ? 1 : 0);
        formData.append('popular', popular ? 1 : 0);
        formData.append('status', status ? 1 : 0);

        for (let i = 0; i < additionalImages.length; i++) {
            formData.append('additional_images[]', additionalImages[i]);
        }

        axios.post('api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            if (response.data.status === 200) {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "black",
                    focusConfirm: false,
                });
                setError([]);
                navigate("/admin/product");
            } else if (response.data.status === 422) {
                setError(response.data.errors);
                console.log(response.data.errors);
            }
        });
    }


    const handleImageUpload = () => {
        document.getElementById('imageInput').click();
    };

    const onFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    }

    const [dragOver, setDragOver] = useState(false);

    const onAdditionalFileChange = (event) => {
        const files = Array.from(event.target.files);
        setAdditionalImages([...additionalImages, ...files]);
    };

    const deleteAdditionalImage = (index) => {
        const updatedImages = [...additionalImages];
        updatedImages.splice(index, 1);
        setAdditionalImages(updatedImages);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const files = Array.from(event.dataTransfer.files);
        setAdditionalImages([...additionalImages, ...files]);
        setDragOver(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragOver(false);
    };


    return (
        <Sidebar>
            <h1 className="text-2xl font-semibold mb-4 border-b p-1 mb-4">เพิ่มสินค้า</h1>
            <form onSubmit={addProduct}>
                <div className="p-4 flex flex-col md:flex-row justify-center gap-4 border rounded-lg">

                    <div className="w-full md:w-[40%]">
                        <div className="cursor-pointer relative overflow-hidden group rounded-lg">
                            <div
                                className="absolute w-full h-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                onClick={handleImageUpload}
                            >
                                <div className="flex flex-col items-center text-white text-xl">
                                    รูปภาพ
                                    <CiImageOn size={100} />
                                </div>
                            </div>
                            {image ? (
                                <img className="w-full h-full object-cover" src={URL.createObjectURL(image)} alt="อัพโหลดรูปภาพ" />
                            ) : (
                                <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ`} />
                            )}
                        </div>
                        <input hidden id="imageInput" type="file" onChange={onFileChange} />
                        <div className="text-red-700 text-sm">{error.image}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-[60%]">

                        <div className="col-span-2">
                            <label className="text-sm md:text-base block text-black font-semibold">ชื่อ</label>
                            <input
                                className="block w-full placeholder:text-sm text-base border-b appearance-none focus:outline-none bg-transparent text-black py-1"
                                type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="กรุณาใส่ชื่อ"
                            />
                            <div className="text-red-700 text-sm">{error.name}</div> <div className="text-red-700 text-sm">{error.name}</div>
                        </div>

                        <div className="col-span-2">
                            <label className="text-sm md:text-base block text-black font-semibold">รายละเอียด</label>
                            <textarea
                                className="block w-full placeholder:text-sm text-base border rounded h-20 px-2 appearance-none focus:outline-none bg-transparent text-black py-1"
                                value={description} onChange={(event) => setDescription(event.target.value)} placeholder="กรุณาใส่รายละเอียด"
                            />
                            <div className="text-red-700 text-sm">{error.description}</div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base block text-black font-semibold">ราคา</label>
                            <input
                                type="number"
                                className="block w-full placeholder:text-sm text-base border-b appearance-none focus:outline-none bg-transparent text-black py-1"
                                value={price} onChange={(event) => setPrice(event.target.value)} placeholder="กรุณาใส่ราคา"
                            />
                            <div className="text-red-700 text-sm">{error.price}</div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base block text-black font-semibold">จำนวน</label>
                            <input
                                type="number"
                                className="block w-full placeholder:text-sm text-base border-b appearance-none focus:outline-none bg-transparent text-black py-1"
                                value={qty} onChange={(event) => setQty(event.target.value)} placeholder="กรุณาใส่จำนวน"
                            />
                            <div className="text-red-700 text-sm">{error.qty}</div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base block text-black font-semibold">ประเภท</label>
                            <select
                                className="text-xs md:text-sm w-full border rounded-md text-black p-1"
                                value={category_id} onChange={(event) => setCategoryId(event.target.value)}
                            >
                                <option disabled value="">-- เลือกประเภท --</option>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled value="">ไม่มีประเภทสินค้า</option>
                                )}
                            </select>
                            <div className="text-red-700 text-sm">{error.category_id}</div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="text-sm md:text-base block text-black font-semibold">แบรนด์</label>
                            <select
                                className="text-xs md:text-sm w-full border rounded-md text-black p-1"
                                value={brand_id} onChange={(event) => setBrandId(event.target.value)}
                            >
                                <option disabled value="">-- เลือกแบรนด์ --</option>
                                {brands.length > 0 ? (
                                    brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled value="">ไม่มีแบรนด์สินค้า</option>
                                )}
                            </select>
                            <div className="text-red-700 text-sm">{error.brand_id}</div>
                        </div>

                        <div>

                            <div className="flex items-center gap-2">
                                <input className="accent-black"
                                    type="checkbox"
                                    checked={popular}
                                    onChange={(event) => setPopular(event.target.checked)}
                                />
                                <label className="text-sm md:text-base block text-black font-semibold">ยอดนิยม</label>
                                <div className="text-red-700 text-sm">{error.popular}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input className="accent-black"
                                    type="checkbox"
                                    checked={featured}
                                    onChange={(event) => setFeatured(event.target.checked)}
                                />
                                <label className="text-sm md:text-base block text-black font-semibold">แนะนำ</label>
                                <div className="text-red-700 text-sm">{error.featured}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input className="accent-black"
                                    type="checkbox"
                                    checked={status}
                                    onChange={(event) => setStatus(event.target.checked)}
                                />
                                <label className="text-sm md:text-base block text-black font-semibold">สถานะ</label>
                                <div className="text-red-700 text-sm">{error.status}</div>
                            </div>

                        </div>

                        <div className="col-span-2"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}>
                            <label className="text-sm md:text-base block text-black font-semibold">รูปภาพเพิ่มเติม</label>
                            <input type="file" id="additionalImageInput" multiple onChange={onAdditionalFileChange} style={{ display: 'none' }} />
                            <div
                                className={`border rounded-lg text-center hover:underline p-4 ${dragOver ? 'border-dashed border-black' : ''}`}
                                onClick={() => document.getElementById('additionalImageInput').click()}
                            >
                                อัพโหลดรูปภาพเพิ่มเติมตรงนี้
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 mt-1 col-span-2">
                            {additionalImages.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        className="w-full h-full object-cover rounded"
                                        src={URL.createObjectURL(image)}
                                        alt={`รูปภาพเพิ่มเติม ${index}`}
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                        onClick={() => deleteAdditionalImage(index)}
                                    >
                                        <span className="text-white text-lg"><IoTrashBinOutline size={50} /></span>
                                    </div>
                                </div>
                            ))}

                            <div className="text-red-700 text-sm">
                                {error.additional_images && error.additional_images.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

                <Button icon={<FaSave size={20} />} type="submit" className="mt-1 w-full">
                    <div>
                        บันทึก
                    </div>
                </Button>

            </form>
        </Sidebar>
    );
}
