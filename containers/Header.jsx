"use client"

import { useParams } from 'next/navigation'
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { navigation } from "../constants";
import Button from "../components/Button";
import MenuSvg from "@/public/assets/svg/MenuSvg";
import { HamburgerMenu } from "../components/design/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useHash } from '@/hooks/useHash';

const Header = () => {
    const params = useParams();
    const [openNavigation, setOpenNavigation] = useState(false);
    const [theme, setTheme] = useState(false);

    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    const handleClick = () => {
        if (!openNavigation) return;

        enablePageScroll();
        setOpenNavigation(false);
    };

    const hash = useHash();

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    const toggleTheme = (theme) => {
        localStorage.theme = theme
    }
    useEffect(() => {
        toggleTheme(theme)
        
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])



    return (
        <div
            className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-2 dark:lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-2 dark:bg-n-8" : "bg-n-2 dark:bg-n-8/90 backdrop-blur-sm"
                }`}
        >
            <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                <a className="block w-[12rem] xl:mr-8" href="#hero">
                    <Image
                        src="/assets/brainwave.svg"
                        alt="Brainwave"
                        width={190}
                        height={40}
                    />
                </a>

                <nav
                    className={`${openNavigation ? "flex" : "hidden"
                        } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-2  dark:bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
                >
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={item.url}
                                onClick={handleClick}
                                className={`block relative font-code text-2xl uppercase text-n-9 dark:text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
                                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === hash
                                        ? "z-2 lg:text-n-1"
                                        : "lg:text-n-8 dark:lg:text-n-1/50"
                                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>

                    <HamburgerMenu />
                </nav>

                <a
                    href="#signup"
                    className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
                >
                    New account
                </a>
                <Button className="hidden lg:flex " href="#login">
                    Sign in
                </Button>

                <Button
                    className="ml-auto lg:hidden"
                    px="px-3"
                    onClick={toggleNavigation}
                >
                    <MenuSvg openNavigation={openNavigation} />
                </Button>
            </div>
            {
                localStorage.theme === 'light' ?

                    <div className='absolute w-10 aspect-square bg-n-2 right-2 flex items-center justify-center'>

                        <Image
                            src='/assets/theme/dark.svg'
                            alt='logo'
                            width={30}
                            height={30}
                            className='cursor-pointer z-20'
                            onClick={() => {
                                setTheme('dark')
                                toggleTheme('dark')
                            }}
                        />
                    </div> :
                    <div className='absolute w-10 aspect-square bg-n-6 right-2 flex items-center justify-center'>
                        <Image
                            src='/assets/theme/light.svg'
                            alt='logo'
                            width={30}
                            height={30}
                            className='cursor-pointer z-20'
                            onClick={() => {
                                setTheme('light')
                                toggleTheme('light')
                            }}
                        />
                    </div>

            }
        </div>
    );
};

export default Header;
