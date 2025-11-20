import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        key: '1',
        icon: <MailOutlined />,
        label: 'User Management',
        children: [
            { key: '11', label: 'Users' },
            { key: '12', label: 'Roles' },
        ],
    },
    {
        key: '2',
        icon: <AppstoreOutlined />,
        label: 'Blog Management',
        children: [
            { key: '21', label: 'Posts' },
        
        ],
    },
   
];
const getLevelKeys = items1 => {
    const key = {};
    const func = (items2, level = 1) => {
        items2.forEach(item => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
const levelKeys = getLevelKeys(items);
const Menues = () => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    const onOpenChange = openKeys => {
        const currentOpenKey = openKeys.find(key => !stateOpenKeys.includes(key));
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter(key => key !== currentOpenKey)
                .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            style={{ width: '100%' }}
            items={items}
        />
    );
};
export default Menues;