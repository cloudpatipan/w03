import React, { useEffect, useContext, useState } from 'react';
import Modal from './Modal';
import Dropdown from './Dropdown';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PiUserGearThin } from "react-icons/pi";
import { MdFullscreen } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { PiShoppingBagOpenThin } from "react-icons/pi";
import { PiUserThin } from "react-icons/pi";
import { PiArrowLineLeftThin } from "react-icons/pi";
import { PiArrowLineRightThin } from "react-icons/pi";
import { CiHome } from "react-icons/ci";
import { PiSquaresFourThin } from "react-icons/pi";
import { PiUserPlusThin } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import Button from './Button';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import ModalImage from './ModalImage';
import baseUrl from '../routes/BaseUrl';

export default function Navbar() {

  const menus = [
    { name: "หน้าหลัก", link: "/", icon: CiHome },
    { name: "ประเภทสินค้า", link: "/category", icon: PiSquaresFourThin },
  ]


  const navigate = useNavigate();
  const { user, token, setUser, setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const { cartCount, setCartCount } = useContext(CartContext);


  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    axios.get(`/api/cart`).then(response => {
      if (response.data.status === 200) {
        setCarts(response.data.carts);
        setCartCount(response.data.carts.length);
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
        navigate('/')
      }
    });
  }

  const handleResponseError = (data) => {
    // จัดการข้อผิดพลาดที่ได้รับจากเซิร์ฟเวอร์
    console.error('Response error:', data);
  };

  const SubmitLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/logout', null,);
      navigate('/');
      setIsModalOpenLogin(false);
      setIsModalOpenRegister(false);
      setIsDropdownOpen(false);
      // แสดงข้อความสำเร็จ
      Swal.fire({
        icon: "success",
        text: response.data.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "black",
        focusConfirm: false,
      });
      // ล้างข้อมูลใน localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        text: response.data.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "black",
        focusConfirm: false,
      });
    }
  };

  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  const openModalLogin = () => {
    setIsModalOpenLogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenLogin(false);
  };

  const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);

  const openModalRegister = () => {
    setIsModalOpenRegister(true);
  };

  const closeModalRegister = () => {
    setIsModalOpenRegister(false);
  };


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isModalOpenAvatar, setIsModalOpenAvatar] = useState(false);

  const openModalAvatar = () => {
    setIsModalOpenAvatar(true);
  };

  const closeModalAvatar = () => {
    setIsModalOpenAvatar(false);
  };

  return (
    <nav className="w-full mx-auto gap-4 text-black mt-1">
      <div className="flex items-center justify-between">

        <Link to={'/'}>
          <h1 className="text-2xl  text-[#fc823f]">The Reader</h1>
        </Link>

        <div className="hidden md:flex gap-4">
          {
            menus?.map((menu, i) => (
              <Link to={menu?.link} key={i}>
                <Button icon={React.createElement(menu?.icon, { size: "25" })}>
                  <h2
                    className={``}>
                    {menu.name}
                  </h2>
                </Button>
              </Link>
            ))
          }
        </div>

        <div>
          {!token ? (
            <div className="hidden md:flex items-center gap-4">
              <Button className="text-sm md:text-base" icon={<PiArrowLineLeftThin size={25} />} onClick={openModalLogin}>
                เข้าสู่ระบบ
              </Button>

              <Modal isOpen={isModalOpenLogin} onClose={closeModalLogin}>
                <Login />
              </Modal>

              <Button className="text-sm md:text-base" icon={<PiUserPlusThin size={25} />} onClick={openModalRegister}>
                สมัครสมาชิก
              </Button>

              <Modal isOpen={isModalOpenRegister} onClose={closeModalRegister}>
                <Register />
              </Modal>
            </div>
          ) : (
            <div>

              {user && token ? (
                <div className="flex gap-4">

                  <Link to={'/cart'}>
                    <button className="text-black w-[3rem] h-[3rem] rounded-full overflow-hidden cursor-pointer group flex items-center justify-center">
                      <div className="relative">
                        {cartCount ? (
                          <div className="absolute top-[-0.2rem] right-[-0.2rem] w-[1rem] h-[1rem] flex items-center justify-center bg-black text-white text-xs rounded-full">
                            {cartCount}
                          </div>
                        ) : null}
                        <PiShoppingBagOpenThin size={30} />
                      </div>
                    </button>
                  </Link>

                  <Dropdown
                    header={
                      <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden cursor-pointer" onClick={handleToggleDropdown}>
                        {user.avatar ? (
                          <img className="w-full h-full object-cover" src={`${baseUrl}/images/avatar/${user.avatar}`} alt={`รูปภาพของ ${user.name}`} />
                        ) : (
                          <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ Avatar`} />
                        )}
                      </div>
                    }
                  >

                    <div className="flex items-center gap-x-4">
                      <div onClick={openModalAvatar} className="relative cursor-pointer w-[4rem] h-[4rem] rounded-full overflow-hidden group">
                        <div className="absolute w-full h-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="flex flex-col items-center text-white text-xl">
                            <MdFullscreen className="cursour-pointer" />
                          </div>
                        </div>

                        {user.avatar ? (
                          <img className="w-full h-full object-cover" src={`${baseUrl}/images/avatar/${user.avatar}`} alt={`รูปภาพของ ${user.name}`} />
                        ) : (
                          <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ Avatar`} />
                        )}
                      </div>
                      <ModalImage isOpen={isModalOpenAvatar} onClose={closeModalAvatar}>
                        <div className="w-[24rem] h-[34rem] overflow-hidden">
                          {user.avatar ? (
                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/avatar/${user.avatar}`} alt={`รูปภาพของ ${user.name}`} />
                          ) : (
                            <img className="w-full h-full object-cover" src={`${baseUrl}/images/product/No_image.png`} alt={`ไม่มีรูปภาพ Avatar`} />
                          )}
                        </div>
                      </ModalImage>
                      <div className="flex flex-col">
                        <div className="text-xs text-center relative flex justify-center items-center gap-2 rounded-full border uppercase">
                          {user.role}
                        </div>
                        <p className="text-xl  text-black">{user.name}</p>
                      </div>

                    </div>

                    {user.role == 'admin' && ( // เช็คว่ามีผู้ใช้ล็อคอินและเป็น admin หรือไม่
                      <Link to={'/dashboard'}>
                        <Button icon={<PiUserGearThin size={20} />} className="mt-1 w-full">
                          แอดมิน
                        </Button>
                      </Link>
                    )}
                    <Link to={'/order'}>
                      <Button icon={<PiShoppingBagOpenThin size={20} />} className="mt-1 w-full">
                        รายการสังซื้อ
                      </Button>
                    </Link>
                    <Link to={'/profile'}>
                      <Button icon={<PiUserThin size={20} />} className="mt-1 w-full">
                        โปรไฟล์
                      </Button>
                    </Link>

                    <Button icon={<PiArrowLineRightThin size={20} />} className="mt-1 w-full" onClick={SubmitLogout} >
                      ออกจการะบบ
                    </Button>
                  </Dropdown>
                </div>
              ) : null}

            </div>
          )}

        </div>

        <div className="md:hidden">
          <button className="border p-1 rounded-full" id="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <IoClose size={25} /> : <GiHamburgerMenu size={25} />}
          </button>
        </div>

      </div>
      <div>

        {isMenuOpen ? (
          <div className="relative">
            <div className="absolute bg-white py-1 z-10 w-full flex flex-col md:hidden font-medium uppercase">
              {
                menus?.map((menu, i) => (
                  <Link to={menu?.link} key={i}>
                    <Button className={`w-full mt-1 bg-white`} icon={React.createElement(menu?.icon, { size: "25" })}>
                      <h2
                        className={``}>
                        {menu.name}
                      </h2>
                    </Button>
                  </Link>
                ))
              }
              {!token ? (
                <div>

                  <Button className={`w-full mt-1 text-sm md:text-base bg-white`} icon={<PiArrowLineLeftThin size={25} />} onClick={openModalLogin}>
                    เข้าสู่ระบบ
                  </Button>

                  <Modal isOpen={isModalOpenLogin} onClose={closeModalLogin}>
                    <Login />
                  </Modal>

                  <Button className={`w-full mt-1 text-sm md:text-base bg-white`} icon={<PiUserPlusThin size={25} />} onClick={openModalRegister}>
                    สมัครสมาชิก
                  </Button>

                  <Modal isOpen={isModalOpenRegister} onClose={closeModalRegister}>
                    <Register />
                  </Modal>

                </div>
              ) : null}


            </div>
          </div>

        ) : null}

      </div>

    </nav>
  )
}