import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const items = [
    {
        key: '1',
        icon: <MailOutlined />,
        label: 'User Management',
        children: [
            { key: '11', label: 'Users', path: '/dashboard/users' },
        ],
    },
    {
        key: '2',
        icon: <AppstoreOutlined />,
        label: 'Blog Management',
        children: [
            { key: '12', label: 'Posts', path: '/dashboard/posts' },
            { key: '13', label: 'Comments', path: '/dashboard/users' },

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
    const navigate = useNavigate();
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
    const handleMenu = ({ key, keyPath, domEvent }) => {
        const findItem = (itemsList) => {
            for (let item of itemsList) {
                if (item.key === key && item.path) return item;
                if (item.children) {
                    const found = findItem(item.children);
                    if (found) return found;
                }
            }
            return null;
        };

        const item = findItem(items);
        if (item?.path) {
            navigate(item.path);
        }

    }
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            style={{ width: '100%' }}
            items={items}
            onClick={handleMenu}
        />
    );
};
export default Menues;