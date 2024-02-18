import React, { useEffect, useState, useTransition } from "react";
import { LuAlignJustify, LuSearch } from "react-icons/lu";
import { VscChromeClose } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import LogIn_Register from "../Auth/LogIn_Register";
import { AvatarIcon } from "@radix-ui/react-icons";
import useAuth from "@/src/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/src/config/firebase";

const Navbar = () => {
  const [openSignOut, setOpenSignOut] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [LoginOrRegister, setLoginOrRegister] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [animationClass, setAnimationClass] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginOrRegister = (value) => {
    setLoginOrRegister(value);
  };
  const { currentUser } = useAuth();
  // console.log(currentUser);

  const handleSignOut = () => {
    setOpenSignOut(true);
  };

  const confirmSignOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
    toast({
      description: "You logged out successfully.",
      action: <ToastAction altText="Close">close</ToastAction>,
      duration: 5000,
    });
    setOpenSignOut(false);
    navigate(`/`);
  };

  const openSearch = () => {
    setAnimationClass("yanimate-search-in");
    setShowSearch(true);
  };
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const closeSearch = () => {
    setAnimationClass("yanimate-search-out");
    setTimeout(() => setShowSearch(false), 200);
  };

  return (
    <div>
      <div className="md:yhidden yspace-x-4 yflex yitems-center">
        {currentUser && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={currentUser.photoURL} />
                  <AvatarFallback>
                    <AvatarIcon className="yw-full yh-full" />
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hi, {currentUser.displayName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <LuSearch onClick={openSearch} className="ycursor-pointer ytext-2xl" />
        <Sheet className="yw-full">
          <SheetTrigger>
            <LuAlignJustify className="ytext-2xl" />
          </SheetTrigger>
          <SheetContent className="yw-[200px]">
            <SheetHeader>
              <SheetDescription className="yflex yflex-col yspace-y-4 yitems-start ytext-xl">
                <SheetClose asChild>
                  <Link to="/explore/movie">Explore</Link>
                </SheetClose>
                {currentUser ? (
                  <>
                    <SheetClose asChild>
                      <Link to="/watchlist">Watchlist</Link>
                    </SheetClose>
                    
                    <AlertDialog open={openSignOut} onOpenChange={setOpenSignOut}>
              <AlertDialogTrigger>
              <SheetClose asChild>
                <div className="!ytext-lg ycursor-pointer" >
                  Logout
                </div>
                </SheetClose>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout?
                </AlertDialogDescription>
                <AlertDialogAction as={Button} onClick={confirmSignOut}>
                  Yes, Logout
                </AlertDialogAction>
                <AlertDialogCancel as={Button}>Cancel</AlertDialogCancel>
              </AlertDialogContent>
            </AlertDialog>
                    
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <div
                        className="ycursor-pointer"
                        onClick={() => {
                          setShowDialog(true);
                          handleLoginOrRegister("Login");
                        }}
                      >
                        Log in
                      </div>
                    </SheetClose>
                    <SheetClose asChild>
                      <div
                        className="ycursor-pointer"
                        onClick={() => {
                          setShowDialog(true);
                          handleLoginOrRegister("Register");
                        }}
                      >
                        Register
                      </div>
                    </SheetClose>
                  </>
                )}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="yhidden md:yflex md:yspace-x-4 ">
        <Link to="/explore/movie">
          <Button className="!ytext-lg" variant="ghost">
            Explore
          </Button>
        </Link>
        <Button onClick={openSearch} className="!ytext-lg" variant="ghost">
          Search
        </Button>
        {currentUser ? (
          <>
            <Link to="/watchlist">
              <Button className="!ytext-lg" variant="ghost">
                Watchlist
              </Button>
            </Link>

            <AlertDialog open={openSignOut} onOpenChange={setOpenSignOut}>
              <AlertDialogTrigger>
                <Button className="!ytext-lg ypt-1" variant="ghost">
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout?
                </AlertDialogDescription>
                <AlertDialogAction as={Button} onClick={confirmSignOut}>
                  Yes, Logout
                </AlertDialogAction>
                <AlertDialogCancel as={Button}>Cancel</AlertDialogCancel>
              </AlertDialogContent>
            </AlertDialog>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarImage src={currentUser.photoURL} />
                    <AvatarFallback>
                      <AvatarIcon className="yw-full yh-full" />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hi, {currentUser.displayName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setShowDialog(true);
                handleLoginOrRegister("Login");
              }}
              className="!ytext-lg"
              variant="ghost"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setShowDialog(true);
                handleLoginOrRegister("Register");
              }}
              className="!ytext-lg"
              variant="ghost"
            >
              Register
            </Button>
          </>
        )}
      </div>
      {showSearch && (
        <div
          className={`ypx-2 yabsolute ytop-12 yright-0 yw-full yh-16 ybg-gray-800 ${animationClass}`}
        >
          <div className="yflex yjustify-center yitems-center yh-16 yw-full">
            <input
              className="yrounded-lg youtline-none ybg-gray-800 yw-4/5  yborder-none  "
              type="search"
              placeholder="Search for a film..."
              onKeyUp={searchQueryHandler}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <VscChromeClose
              className="ycursor-pointer yshrink-0 ytext-lg"
              onClick={closeSearch}
            />
          </div>
        </div>
      )}
      {showDialog && (
        <LogIn_Register
          LoginOrRegister={LoginOrRegister}
          onClose={() => {
            setShowDialog(false);
            setLoginOrRegister("");
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
