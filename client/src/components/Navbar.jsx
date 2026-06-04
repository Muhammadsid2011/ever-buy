import React from 'react';
import { Link } from 'react-router';
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/react";
import { ShoppingBag, Plus, User } from "lucide-react";
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <header className="navbar bg-base-300 border-b border-base-200">
            <nav className="max-w-6xl mx-auto w-full px-4 flex items-center justify-between">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <ShoppingBag className="size-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">EverBuy</h1>
                </Link>

                {/* Navigation Actions */}
                <div className="flex items-center gap-2">
                    <ThemeSelector />

                    <div className="h-6 w-px bg-base-content/20 mx-1" />

                    {!isSignedIn ? (
                        <>
                            <SignInButton mode="modal">
                                <button className="btn btn-ghost btn-sm font-medium">Log In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="btn btn-primary btn-sm shadow-sm">Join Now</button>
                            </SignUpButton>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/create" className="btn btn-primary btn-sm gap-2">
                                <Plus className="size-4" />
                                <span className="hidden md:inline">Add Product</span>
                            </Link>
                            <Link to="/profile" className="btn btn-ghost btn-sm gap-2">
                                <User className="size-4" />
                                <span className="hidden md:inline">Account</span>
                            </Link>
                            <div className="ml-2">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;