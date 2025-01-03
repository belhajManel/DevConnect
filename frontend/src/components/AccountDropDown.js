import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Services/auth/authService";
import { useAuth } from "../context/AuthContext";

export default function AccountDropdown() {
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAvatarMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { user, loading } = useAuth();

  if (loading)
    return (
      <img
        className="w-8 h-8 rounded-full"
        src={"https://avatars.githubusercontent.com/u/33694049?s=200&v=4"}
        alt="User avatar"
      />
    );

  const handleLogout = () => {
    authService.logout();
    setShowAvatarMenu(false);
    navigate("/signin");
  };

  return (
    <>
      <div>
        <div ref={menuRef} className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 ml-2 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="avatar-menu"
            aria-expanded={showAvatarMenu}
            aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation();
              setShowAvatarMenu(!showAvatarMenu);
            }}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={
                user.avatarUrl ||
                "https://avatars.githubusercontent.com/u/33694049?s=200&v=4"
              }
              alt="User avatar"
            />
          </button>

          {showAvatarMenu && (
            <div
              className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="avatar-menu"
            >
              <div class="px-4 py-3 text-sm text-gray-700 ">
                <div>Bonnie Green</div>
                <div class="font-medium truncate">name@website.com</div>
              </div>
              <div className="py-1" role="none">
                <Link
                  to="/profile"
                  className="flex  w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                  onClick={() => setShowAvatarMenu(false)}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 19.5a7.5 7.5 0 0 1 15 0"
                      />
                    </svg>
                  </span>
                  Go to Profile
                </Link>
                <Link
                  to="/home"
                  className="flex  w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                  onClick={() => setShowAvatarMenu(false)}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 19.5a7.5 7.5 0 0 1 15 0"
                      />
                    </svg>
                  </span>
                  Go to Home
                </Link>
                <hr className="my-1 border-t border-gray-200" />
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
