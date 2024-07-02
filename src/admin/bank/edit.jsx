import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Layouts/Sidebar';

import { CiImageOn } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import Button from '../../components/Button';
import baseUrl from '../../routes/BaseUrl';
export default function EditBank() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [logo, setLogo] = useState();
    const [status, setStatus] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [newLogo, setNewLogo] = useState(null);
    useEffect(() => {
        fetchBank();
    }, []);

    const fetchBank = async () => {
        try {
            const response = await axios.get(`/api/banks/${id}`);
            const bankData = response.data;
            setName(bankData.name);
            setDescription(bankData.description);
            setImage(bankData.image);
            setLogo(bankData.logo);
            setStatus(bankData.status);
        } catch (error) {
            console.error('Error fetching bank:', error);
        }
    };

    const updateBank = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('name', name);

        if (newImage) {
            formData.append('image', newImage);
        }

        if (newLogo) {
            formData.append('logo', newLogo);
        }

        formData.append('description', description);
        formData.append('status', status ? 1 : 0);

        try {
            const response = await axios.post(`/api/banks/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Swal.fire({
                icon: "success",
                text: response.data.message,
                confirmButtonText: "ตกลง",
                confirmButtonColor: "black",
                focusConfirm: false,
            });
            navigate("/admin/bank");
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else {
                Swal.fire({
                    text: error.response ? error.response.data.message : 'An error occurred',
                    icon: "error",
                });
            }
        }
    }

    const handleImageUploadImage = () => {
        document.getElementById('imageInput').click();
    };

    const handleImageUploadLogo = () => {
        document.getElementById('logoInput').click();
    };

    const onFileChangeImage = (event) => {
        const file = event.target.files[0];
        setNewImage(file);
    }

    const onFileChangeLogo = (event) => {
        const file = event.target.files[0];
        setNewLogo(file);
    }

    return (
        <Sidebar>
            <h1 className="text-2xl font-semibold text-center mb-8">แก้ไขธนาคาร</h1>
            <form onSubmit={updateBank}>

                <div className="p-4 flex flex-col md:flex-row justify-center gap-4 border rounded-lg">
                    <div>
                        <div className="mx-auto cursor-pointer relative md:w-[24rem] md:h-[34rem] overflow-hidden group rounded-lg">
                            <div
                                className="absolute w-full h-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                onClick={handleImageUploadImage}
                            >
                                <div className="flex flex-col items-center text-white text-xl">
                                    รูปภาพ
                                    <CiImageOn size={100} />
                                </div>
                            </div>
                            {newImage ? (
                                <img className="w-full h-full object-cover" src={URL.createObjectURL(newImage)} alt="อัพโหลดรูปภาพ" />
                            ) : image ? (
                                <img className="w-full h-full object-cover" src={`${baseUrl}/images/bank/${image}`} alt={`รูปภาพของธนาค ${name}`} />
                            ) : (
                                <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ`} />
                            )}
                        </div>
                        <input hidden id="imageInput" type="file" onChange={onFileChangeImage} />
                        {validationError && validationError.image && (
                            <div className="text-red-500 text-sm mt-2">{validationError.image[0]}</div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full">

                        <div>
                            <div className="cursor-pointer relative h-[10rem] w-[10rem] md:h-[15rem] md:w-[15rem] overflow-hidden group rounded-lg">
                                <div
                                    className="absolute w-full h-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    onClick={handleImageUploadLogo}
                                >
                                    <div className="flex flex-col items-center text-white text-xl">
                                        รูปภาพ
                                        <CiImageOn size={100} />
                                    </div>
                                </div>
                                {newLogo ? (
                                    <img className="w-full h-full object-cover" src={URL.createObjectURL(newLogo)} alt={`อัพโหลดรูปภาพ`} />
                                ) : logo ? (
                                    <img className="w-full h-full object-cover" src={`${baseUrl}/images/bank/logo/${logo}`} alt={`รูปภาพของ ${name}`} />
                                ) : (
                                    <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ`} /> 
                                )}
                            </div>
                            <input hidden id="logoInput" type="file" onChange={onFileChangeLogo} />
                            {validationError && validationError.logo && (
                                <div className="text-red-500 text-sm mt-2">{validationError.logo[0]}</div>
                            )}
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="text-lg block text-black font-semibold">ชื่อ</label>
                            <input
                                className="block w-full placeholder:text-sm text-base border-b appearance-none focus:outline-none bg-transparent text-black py-1"
                                type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="กรุณาใส่ชื่อ"
                            />
                            {validationError && validationError.name && (
                                <div className="text-red-500 text-sm mt-2">{validationError.name[0]}</div>
                            )}
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="text-lg block text-black font-semibold">รายละเอียด</label>
                            <textarea
                                className="block w-full placeholder:text-sm text-base border rounded h-20 px-2 appearance-none focus:outline-none bg-transparent text-black py-1"
                                value={description} onChange={(event) => setDescription(event.target.value)} placeholder="กรุณาใส่รายละเอียด"
                            />
                            {validationError && validationError.description && (
                                <div className="text-red-500 text-sm mt-2">{validationError.description[0]}</div>
                            )}
                        </div>

                        <div>
                            <label className="text-lg block text-black font-semibold">สถานะ</label>
                            <input className="accent-black"
                                type="checkbox"
                                checked={status}
                                onChange={(event) => setStatus(event.target.checked)}
                            />
                            {validationError && validationError.status && (
                                <div className="text-red-500 text-sm mt-2">{validationError.status[0]}</div>
                            )}
                        </div>

                    </div>

                </div>


                <Button type="submit" className="mt-8 w-full relative flex justify-center items-center gap-2 border-2 rounded-full border-black bg-transparent py-2 px-5 font-medium uppercase text-black hover:text-white hover:bg-black transition-all duration-300">
                    <div>บันทึก</div>
                </Button>

            </form>

        </Sidebar>
    );
}
