import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CiCamera } from 'react-icons/ci';
import { FaRegSave } from 'react-icons/fa';
import { UserContext } from '../../../context/UserContext';
import baseUrl from '../../../routes/BaseUrl';
export default function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    axios.get('/api/user').then(response => {
      if (response.data.status === 200) {
        setUser(response.data.user);
        setName(response.data.user.name);
        setLoading(false);
      } else if (response.data.status === 400) {
        Swal.fire({
          icon: "error",
          text: response.data.message,
          confirmButtonText: "ตกลง",
          confirmButtonColor: "black",
          focusConfirm: false,
        }).then(() => {
          navigate('/');
        });
      } else if (response.data.status === 401) {
        Swal.fire({
          icon: "warning",
          text: response.data.message,
          confirmButtonText: "ตกลง",
          confirmButtonColor: "black",
          focusConfirm: false,
        }).then(() => {
          navigate('/');
        });
      }
    });
  }

  const updateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (name) {
      formData.append('name', name);
    }
    if (newAvatar) {
      formData.append('avatar', newAvatar);
    }

    const response = await axios.post(`/api/profile/update-information`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.status === 200) {
      Swal.fire({
        icon: 'success',
        text: response.data.message,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: 'black',
        focusConfirm: false,
      }).then(() => {
        fetchUser();
      });
    } else if (response.data.status === 400) {
      navigate('/');
      Swal.fire({
        icon: 'error',
        text: response.data.message,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: 'black',
        focusConfirm: false,
      });
    } else if (response.data.status === 401) {
      navigate('/');
      Swal.fire({
        icon: 'warning',
        text: response.data.message,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: 'black',
        focusConfirm: false,
      });
    } else if (response.data.status === 422) {
      setError(response.data.errors)
    }
  }

  const handleavatarUpload = () => {
    document.getElementById('avatarInput').click();
  };

  const onFileChange = (event) => {
    setNewAvatar(event.target.files[0]);
  };


  return (
    <div>
      <form onSubmit={updateProfile}>
        <div className="mx-auto cursor-pointer relative w-[10rem] h-[10rem] overflow-hidden rounded-full group">
          <div
            className="absolute w-full h-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={handleavatarUpload}
          >
            <div className="flex flex-col items-center text-white text-xl">
              รูปภาพ
              <CiCamera size={50} />
            </div>
          </div>
          {newAvatar ? (
            <img className="w-full h-full object-cover" src={URL.createObjectURL(newAvatar)} alt="New Uploaded avatar" />
          ) : user && user.avatar ? (
            <img className="w-full h-full object-cover" src={`${baseUrl}/images/avatar/${user.avatar}`} alt={`รูปภาพของ ${user.name}`} />
          ) : (
            <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ Avatar`} />
          )}
          <input hidden id="avatarInput" type="file" onChange={onFileChange} />
          <div className="text-red-700 text-sm">{error.avatar}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2">ชื่อ</label>
            <input
               className="block w-full placeholder:text-sm text-base border-b appearance-none focus:outline-none bg-transparent text-black py-1"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="กรุณาใส่ชื่อ"
            />
            <div className="text-red-700 text-sm">{error.name}</div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 relative flex justify-center w-full items-center gap-2 border-2 rounded-lg border-black bg-transparent py-2 px-5 font-medium uppercase text-black transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-black before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100"
        >
          <div>
            <FaRegSave size={20} />
          </div>
          <div>
            บันทึก
          </div>
        </button>
      </form>
    </div>
  );
}