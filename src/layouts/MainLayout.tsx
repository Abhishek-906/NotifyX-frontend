import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getCurrentUser } from '../utils/auth'
import { disconnectSocket } from "../services/socket";

function MainLayout() {
    const user = getCurrentUser();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        disconnectSocket();
        navigate("/login");
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <div>
            <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                        className="text-2xl"
                    >
                        ☰
                    </button>
                    <h2>NotifyX</h2>
                </div>
                <div ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setShowDropdown(prev => !prev)}
                    >
                        👤 {user.fullName}
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Profile
                            </button>

                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </header>


            <div className="flex min-h-screen">

                <aside
                    className={`
    bg-white
    shadow-lg
    transition-all
    duration-300
    overflow-hidden
    ${isSidebarOpen ? "w-64" : "w-0"}
  `}
                >
                    <div className="p-5 whitespace-nowrap">

                        <h2 className="text-xl font-bold mb-8">
                            Menu
                        </h2>

                        <ul className="space-y-3">
                            <li className="p-3 rounded hover:bg-gray-100 cursor-pointer"  onClick={()=>{navigate('/dashboard')}}   >
                                Dashboard
                            </li>

                            <li className="p-3 rounded hover:bg-gray-100 cursor-pointer" onClick={()=>{navigate('/management')}}>
                                Management
                            </li>

                            <li className="p-3 rounded hover:bg-gray-100 cursor-pointer">
                                Notifications
                            </li>
                        </ul>

                    </div>
                </aside>

                <main className="flex-1">
                    <Outlet />
                </main>

            </div>
            <footer>
                <p>NotifyX Footer</p>
            </footer>
        </div>
    )
}

export default MainLayout;