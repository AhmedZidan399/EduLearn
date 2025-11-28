import { useState, useEffect, useRef } from 'react';

import Icon from './AppIcon';

interface UserProfileDropdownProps {
    userName: string;
    userRole: 'student' | 'admin';
    userEmail?: string;
    onLogout: () => void;
}

const UserProfileDropdown = ({
                                 userName,
                                 userRole,
                                 userEmail,
                                 onLogout,
                             }: UserProfileDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        handleClose();
        onLogout();
    };

    const menuItems = [
        {
            icon: 'User',
            label: 'Profile Settings',
            onClick: handleClose,
        },
        {
            icon: 'Settings',
            label: 'Account Settings',
            onClick: handleClose,
        },
    ];

    if (userRole === 'student') {
        menuItems.unshift({
            icon: 'LayoutDashboard',
            label: 'Dashboard',
            onClick: handleClose,
        });
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-smooth hover:bg-muted"
                aria-label="User profile menu"
                aria-expanded={isOpen}
            >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-primary-foreground">
            {userName.charAt(0).toUpperCase()}
          </span>
                </div>
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-text-primary">{userName}</p>
                    <p className="text-xs text-text-secondary capitalize">{userRole}</p>
                </div>
                <Icon
                    name="ChevronDown"
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-md elevation-md animate-scale-in z-[1010]">
                    <div className="p-4 border-b border-border">
                        <p className="text-sm font-semibold text-popover-foreground">{userName}</p>
                        {userEmail && (
                            <p className="text-xs text-muted-foreground mt-1">{userEmail}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1 capitalize">{userRole} Account</p>
                    </div>

                    <div className="py-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                            >
                                <Icon name={item.icon} size={18} />
                                <span>{item.label}</span>
                            </button>
                        ))}

                        <div className="my-2 border-t border-border" />

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-smooth"
                        >
                            <Icon name="LogOut" size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown;