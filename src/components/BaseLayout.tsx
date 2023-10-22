import React from "react";
import NavigationCard from "./cards/NavigationCard";
import Header from "../components/Header";
import { ThemeProvider } from "next-themes";

interface BaseLayoutProps {
    children: React.ReactNode;
    hideNav: boolean;
}

export default function BaseLayout({ children, hideNav }: BaseLayoutProps) {
    let rightRightColumnClasses = '';
    if (hideNav) {
        rightRightColumnClasses += 'w-full justify-center flex items-center h-screen pt-16';
    } else {
        rightRightColumnClasses += 'mx-1 md:mx-0 md:w-3/4 pt-20 h-full';
    }
    return (
        <ThemeProvider attribute="class">
            <Header />
            <div className='flex justify-center bg-socialBg font-font1 bg-lBgMain dark:bg-dBgMain transition-all duration-300 w-full min-h-screen h-full'>
                <div className='md:flex max-w-4xl mx-4 gap-6 w-full'>
                    {!hideNav && (
                        <div className="hidden md:block md:w-1/4 pt-16 z-40">
                            <NavigationCard />
                        </div>
                    )}
                    <div className={rightRightColumnClasses}>
                        {children}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
