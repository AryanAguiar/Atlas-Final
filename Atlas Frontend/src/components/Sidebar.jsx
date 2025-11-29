import React, { useState } from 'react'
import { BiChevronRight, BiLogOut } from 'react-icons/bi'
import { FaHome } from 'react-icons/fa'
import { FaHistory } from 'react-icons/fa'
import { IoSettings } from 'react-icons/io5'
 import { NavLink } from 'react-router-dom'

export const SidebarWidth = 80;
const Sidebar = () => {
    
    const [isSelected, setIsSelected] = useState(null);

    const handleSelect = (label) => {
        setIsSelected(label);
        console.log(isSelected);
    };


  return (
    <>
    <div className='flex flex-col h-screen fixed top-0 items-center shadow-lg' style={{
        width: SidebarWidth,
        background: '#000',
        color: '#ff9a4d',
        borderRight: '2px solid rgba(255,107,53,0.12)',
        fontFamily: 'Courier New, monospace',
        letterSpacing: '2px'
    }}>
        <div className='w-17 m-4 p-1 rounded-full flex items-center justify-center' style={{background: 'linear-gradient(90deg,#1f1b17,#2b2724)', border: '2px solid rgba(255,107,53,0.18)'}}>
            <img src="/images/Logo.jpg" alt="Logo" className='w-16 rounded-full shadow-sm ' />
        </div>
        <div></div>
        <SidebarIcon icon={<FaHome />} path={"/home"} label={"Home"} />
        <SidebarIcon icon={<FaHistory />} path={"/history"} label={"History"}/>
    
        <footer className='mt-auto text-gray-500'>
            <p className='text-xs mt-4'>
            &copy; 2025 AAAG Inc.
            v1.0.0</p>
        </footer>
            
    
    </div>
    </>  
  )
}

const SidebarIcon = ({icon,path, label}) => {
    return (
            <NavLink to={path} 
                        className={({isActive})=> {
                            return isActive ? 
                            "w-full h-20 my-5 flex flex-col items-center justify-center text-orange-400 font-bold bg-[#0f0e0e] border-l-4 border-orange-500 rounded-r-md" : 
                            `w-full h-20 my-5 flex flex-col items-center justify-center text-orange-300 hover:text-orange-400 py-3 transition-colors duration-200 ease-in-out hover:bg-[#0f0e0e] hover:border-l-4 hover:border-orange-500
                            `
                        
                        }}
                >
                    
                    <div>
                        {icon}
                    </div>
                    <div className='text-xs my-1'>
                        {label}
                    </div>
            </NavLink>
    )}

export default Sidebar