import React from 'react'
import Sidebar, { SidebarWidth } from './Sidebar'
import { IoIosSearch } from 'react-icons/io';
import ToggleButton from './ToggleButton';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import PixelFace from './PixelFace';

export const TopbarHeight = 80;
const Topbar = (props) => {

    return (
        <>
            <div className='flex items-center justify-end ' style={{
                marginLeft: SidebarWidth,
                height: TopbarHeight,
                background: '#000',

                paddingLeft: 24,
                paddingRight: 24,
                letterSpacing: '2px',
                color: '#fff'
            }}>
                <div className='bg-[#0f0e0e] rounded-full px-10 py-3 flex gap-3 items-center border-orange-600/40 hover:border-orange-500/60 transition-all' style={{ alignItems: 'center' }}>
                    {/* Toggle Button 
                  <ToggleButton 
                  hide={<TopbarIcon icon={<MdDarkMode />} />} 
                  show={<TopbarIcon icon={<MdLightMode />} />} />
           */}
                    <div className='w-12 h-12 rounded-lg flex items-center justify-center'>
                        <PixelFace size={60} />
                    </div>
                    <div className='flex flex-col gap-0.5'>
                        <h1 className='text-3xl font-bold leading-none' style={{ color: '#fff' }}>{props.userName}</h1>
                        <h2 className='text-xs leading-none' style={{ color: '#d0d0d0' }}>{props.userEmail}</h2>
                    </div>
                    <div onClick={props.handleLogout} className='text-xl text-green-500 hover:text-orange-400 transition-colors ml-2' ><BiLogOut /></div>
                </div>
            </div>
        </>

    )
}

const TopbarIcon = ({ icon }) => {
    return (
        <div className='text-2xl text-green-500 hover:text-orange-400 hover:font-semibold transition-all duration-200 ease-out rounded-full' style={{ cursor: 'pointer', color: '#fff' }}>
            {icon}
        </div>
    )
}


export default Topbar