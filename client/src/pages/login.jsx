import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useRegisterUserMutation, useLoginUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const [registerUser, { 
    data: registerData, 
    error: registerError, 
    isLoading: registerIsLoading, 
    isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { 
    data: loginData,
    error: loginError, 
    isLoading: loginIsLoading, 
    isSuccess: loginIsSuccess }] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput
    const action = type === "signup" ? registerUser : loginUser
    await action(inputData);
  }
  useEffect(() =>{
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "User registered successfully");
    }
    if(registerError){
      toast.error(registerData.data.message || "Something went wrong");
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.data.message || "Logged in successfully");
    }
    if(loginError){
      toast.error(loginData.data.message || "Something went wrong");
    }
  }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError])
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  id="name"
                  name="name"
                  value={signupInput.name}
                  placeholder="username"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={signupInput.password}
                  placeholder="password"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled= {registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                      <Loader2 className = "mr-2 h-4 w-4 animate-spin" />Loading...
                    </>
                  ) : "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After Signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  required="true"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                      <Loader2 className = "mr-2 h-4 w-4 animate-spin" />Loading...
                    </>
                  ) : "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
