import React from "react";
import { Button } from "./ui/button";
import {
  LogOut,
  Settings,
  ChartLine,
  LayoutDashboard,
  School,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "./DarkMode";

const Navbar = () => {
  const user = true;
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-6xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className=" flex items-center gap-2 ">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">Academix</h1>
        </div>
        <div className=" flex items-center gap-8 ">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <ChartLine />
                    <span>My Learning</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className=" flex items-center gap-2 ">
              <Button variant="outline"> Login </Button>
              <Button> Signup </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      <div className=" flex md:hidden items-center justify-between px-4 h-full ">
        <h1 className=" font-extrabold text-2xl ">Academix</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size ='icon' className = " rounded-full bg-gray-200 hover:bg-gray-200 " variant="outline">
            <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className = "flex flex-row">
        <SheetHeader className = "flex flex-row items-center justify-between mt-2 " >
          <SheetTitle>Academix</SheetTitle>
          <DarkMode />
        </SheetHeader>

        <nav className=" ">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <span>Log out</span>
        </nav>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
