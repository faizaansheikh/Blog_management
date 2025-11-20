import React, { useState } from 'react';
import { Avatar, Flex, Layout, Popover } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { RxHamburgerMenu } from "react-icons/rx";
import Menues from '../ui/Menues';

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};
const layoutStyle = {
    borderRadius: 0,
    overflow: 'hidden',
    width: 'calc(1000% - 8px)',
    maxWidth: 'calc(100% - 0px)',
    height: '100vh'
};

const CustomLayout = ({children}) => {
    const [sliderWidth, setSliderWidth] = useState('20%')
    const handleSlider = () => {
        setSliderWidth(sliderWidth === '20%' ? '4%' : '20%')
    }

    return (
        <Flex gap="middle" wrap>


            <Layout style={layoutStyle}>
                <Sider width={sliderWidth} className='bg-primary'>
                    <div className=' h-20 flex justify-end items-center pr-4'>
                        <RxHamburgerMenu size={25} className='cursor-pointer' onClick={handleSlider} />
                    </div>
                    <div>
                        <Menues />
                    </div>
                </Sider>
                <Layout>
                    <Header className='bg-secondary flex justify-between items-center'>
                        <p className='text-2xl'>Blog Management</p>
                        <div>
                            <Popover placement="bottom" title={''}
                                content={
                                    <div className='w-[100px]'>
                                    <p className=' py-1 px-2 rounded-sm text-lg'>Admin</p>
                                    <p className='cursor-pointer hover:bg-secondary py-2 px-2 rounded-sm text-lg'>Logout</p>
                                    </div>
                                }
                            >
                                <Avatar className='cursor-pointer' style={{ verticalAlign: 'middle' }} size="large" >
                                    A
                                </Avatar>
                            </Popover>

                        </div>
                    </Header>
                    <Content>
                        {children}
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                </Layout>
            </Layout>
        </Flex>
    )
}
export default CustomLayout;