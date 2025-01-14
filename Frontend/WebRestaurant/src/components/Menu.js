import React, { useState } from "react";
import {
  FiBox,
  FiEye,
  FiEyeOff,
  FiHardDrive,
  FiHome,
  FiLogOut,
} from "react-icons/fi";
import { FaStore, FaStoreSlash } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import ToggleSwitch from "../components/ToggleSwitch";
import { toast } from "react-toastify";
import Texts from "../constants/Texts";

import api from "../services/api";

const TopMenu = ({ toggleMenu, isOpen }) => {
  const { getUser, openEstablishment, refreshOpenawait } = useAuth();
  const user = getUser();
  const handlerBnt = async (res) => {
    try {
      const { data } = await api.put(
        "/api/auth/establishments/status/handler/" + user.id
      );
      await refreshOpenawait();
    } catch (e) {
      console.log(e);
    }
    if (res && openEstablishment) toast.success(Texts.establishment_open);
    else toast.error("Seu estabelecimento foi fechado.");
  };

  return (
    <div className="bg-menu1 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex row item-center justify-center align-middle gap-4">
          <div className="text-xl font-bold ml-4">
            {user?.establishment?.name}
          </div>
        </div>
        <div className="flex items-center w-auto gap-16">
          <div className="flex row justify-center items-center gap-2 w-20">
            <div>
              <FaStoreSlash color={"white"} size={24} />
            </div>
            <div className="ml-2">
              <ToggleSwitch checked={openEstablishment} onChange={handlerBnt} />
            </div>
            <div>
              <FaStore color="white" size={24} />
            </div>
          </div>

          <div>
            {isOpen ? (
              <FiEye
                className="h-6 w-6 mr-4 cursor-pointer"
                onClick={toggleMenu}
              />
            ) : (
              <FiEyeOff
                className="h-6 w-6 mr-4 cursor-pointer"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SideMenu = ({ isOpen }) => {
  const { logout } = useAuth();
  const MENUS = [
    {
      title: Texts.meus_pedidos,
      href: "/",
      icon: (
        <FiHome className={`h-6 w-6 ${isOpen ? "mr-4" : ""} cursor-pointer`} />
      ),
    },
    {
      title: "Gestor de Cardápio",
      href: "/gestor-cardapio",
      icon: (
        <FiBox className={`h-6 w-6 ${isOpen ? "mr-4" : ""} cursor-pointer`} />
      ),
    },
    {
      title: "Relatórios",
      icon: (
        <FiHardDrive
          className={`h-6 w-6 ${isOpen ? "mr-4" : ""} cursor-pointer`}
        />
      ),
    },
    {
      title: "Sair",
      bottom: true,
      icon: (
        <FiLogOut
          className={`h-6 w-6 ${isOpen ? "mr-4" : ""} cursor-pointer`}
        />
      ),
      onPress: logout,
    },
  ];
  return (
    <div
      className={`bg-menu2 text-white h-screen  ${
        isOpen ? "w-60" : "w-25"
      } flex flex-col`}
    >
      <div className="text-xl font-bold py-4 px-6"></div>
      <ul className="mt-8">
        {MENUS.map((i) => (
          <li
            className={`mb-6 flex  items-center ${i.bottom ? " mt-10 " : ""} ${
              !isOpen ? "justify-center" : "justify-start ml-4"
            }`}
            onClick={() =>
              i.onPress ? i.onPress() : (window.location.href = i.href)
            }
          >
            {i.icon}
            {isOpen ? (
              <a href="#" className="hover:text-gray-400 font-bold">
                {i.title}
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MenuLayout = ({ children }) => {
  const tagitem = "ISOPEN";
  const getItem = localStorage.getItem(tagitem);
  const [isOpen, setIsOpen] = useState(getItem ? getItem == "true" : false);

  const toggleMenu = () => {
    const res = !isOpen;
    setIsOpen(res);
    localStorage.setItem(tagitem, JSON.stringify(res));
  };

  return (
    <div className="flex row ">
      <div className="fixed">
        <SideMenu isOpen={isOpen} />
      </div>
      <div className={`flex-grow ${isOpen ? "ml-60" : ""}`}>
        <div>
          <TopMenu toggleMenu={toggleMenu} isOpen={isOpen} />
        </div>
        <div
          className={`container overflow-x-hidden mx-auto mt-4 items-center ${
            isOpen ? "sm:ml-0 md:ml-0 lg:ml-0" : "sm:ml-9 md:ml-24 lg:ml-24"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;
