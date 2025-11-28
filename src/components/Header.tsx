import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';
import Button from './ui/Button';

interface HeaderProps {
    isAuthenticated?: boolean;
    userRole?: 'student' | 'admin' | null;
    userName?: string;
    onLoginClick?: () => void;
    onLogoutClick?: () => void;
}

interface NavItem {
    label: string;
    path: string;
    icon: string;
    roles?: ('student' | 'admin')[];
    requiresAuth?: boolean;
}

const Header = ({
                    isAuthenticated = false,
                    userRole = null,
                    userName = '',
                    onLoginClick,
                    onLogoutClick,
                }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const location = useLocation();

    const navItems: NavItem[] = [
        {
            label: 'Home',
            path: '/home-landing',
            icon: 'Home',
        },
        {
            label: 'Courses',
            path: '/course-catalog',
            icon: 'BookOpen',
        },
        {
            label: 'Dashboard',
            path: '/student-dashboard',
            icon: 'LayoutDashboard',
            roles: ['student'],
            requiresAuth: true,
        },
        {
            label: 'Admin',
            path: '/admin-course-management',
            icon: 'Settings',
            roles: ['admin'],
            requiresAuth: true,
        },
    ];

    const filteredNavItems = navItems.filter((item) => {
        if (item.requiresAuth && !isAuthenticated) return false;
        if (item.roles && userRole && !item.roles.includes(userRole)) return false;
        return true;
    });

    const isActivePath = (path: string) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.profile-dropdown')) {
                setIsProfileDropdownOpen(false);
            }
        };

        if (isProfileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleProfileDropdownToggle = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLoginClick = () => {
        setIsMobileMenuOpen(false);
        onLoginClick?.();
    };

    const handleLogoutClick = () => {
        setIsProfileDropdownOpen(false);
        setIsMobileMenuOpen(false);
        onLogoutClick?.();
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-[1000]">
            <div className="h-16 px-4 md:px-6 lg:px-8 flex items-center justify-between">
                <Link
                    to="/home-landing"
                    className="flex items-center gap-2 transition-smooth hover:opacity-80"
                    onClick={handleNavClick}
                >
                    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
                        <Icon name="GraduationCap" size={24} color="white" />
                    </div>
                    <span className="text-xl font-bold text-primary hidden sm:inline">
            EduLearn
          </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-smooth ${
                                isActivePath(item.path)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-text-primary hover:bg-muted'
                            }`}
                            onClick={handleNavClick}
                        >
                            <Icon name={item.icon} size={18} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="profile-dropdown relative">
                            <button
                                onClick={handleProfileDropdownToggle}
                                className="flex items-center gap-2 px-3 py-2 rounded-md transition-smooth hover:bg-muted"
                                aria-label="User profile menu"
                            >
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">
                    {userName.charAt(0).toUpperCase() || 'U'}
                  </span>
                                </div>
                                <span className="hidden sm:inline text-sm font-medium text-text-primary">
                  {userName || 'User'}
                </span>
                                <Icon
                                    name="ChevronDown"
                                    size={16}
                                    className={`transition-transform duration-200 ${
                                        isProfileDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md elevation-md animate-scale-in z-[1010]">
                                    <div className="p-3 border-b border-border">
                                        <p className="text-sm font-semibold text-popover-foreground">
                                            {userName || 'User'}
                                        </p>
                                        <p className="text-xs text-muted-foreground capitalize">
                                            {userRole || 'Student'}
                                        </p>
                                    </div>
                                    <div className="py-2">
                                        {userRole === 'student' && (
                                            <Link
                                                to="/student-dashboard"
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                                                onClick={() => {
                                                    setIsProfileDropdownOpen(false);
                                                    handleNavClick();
                                                }}
                                            >
                                                <Icon name="LayoutDashboard" size={16} />
                                                <span>Dashboard</span>
                                            </Link>
                                        )}
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                                            onClick={() => {
                                                setIsProfileDropdownOpen(false);
                                            }}
                                        >
                                            <Icon name="User" size={16} />
                                            <span>Profile Settings</span>
                                        </button>
                                        <button
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                                            onClick={handleLogoutClick}
                                        >
                                            <Icon name="LogOut" size={16} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            variant="default"
                            size="default"
                            onClick={handleLoginClick}
                            iconName="LogIn"
                            iconPosition="left"
                            iconSize={18}
                            className="hidden sm:flex"
                        >
                            Login
                        </Button>
                    )}

                    <button
                        onClick={handleMobileMenuToggle}
                        className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
                        aria-label="Toggle mobile menu"
                    >
                        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-[1015] animate-fade-in md:hidden"
                        onClick={handleMobileMenuToggle}
                    />
                    <div className="fixed top-16 right-0 bottom-0 w-72 bg-card border-l border-border z-[1020] animate-slide-in-right md:hidden overflow-y-auto">
                        <nav className="p-4 space-y-2">
                            {filteredNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-smooth ${
                                        isActivePath(item.path)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-text-primary hover:bg-muted'
                                    }`}
                                    onClick={handleNavClick}
                                >
                                    <Icon name={item.icon} size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            ))}

                            {!isAuthenticated && (
                                <Button
                                    variant="default"
                                    size="default"
                                    onClick={handleLoginClick}
                                    iconName="LogIn"
                                    iconPosition="left"
                                    iconSize={18}
                                    fullWidth
                                    className="mt-4"
                                >
                                    Login
                                </Button>
                            )}
                        </nav>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;