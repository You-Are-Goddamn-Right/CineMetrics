import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "@/src/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthForm = ({ LoginOrRegister, closeDialog }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const { toast } = useToast();
  // console.log(email, password, username);

  const registerUser = async (e) => {
    e.preventDefault();

    setAuthLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      await updateProfile(user, {
        displayName: username,
      });
      console.log(userCredentials.user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        watchlist: [],
        likedlist: [],
      });

      setAuthLoading(false);
      closeDialog();
      toast({
        description: `Welcome, ${user.displayName}!`,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    } catch (err) {
      setAuthLoading(false);
      console.log(err.message);
      toast({
        description: err.message,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      // console.log(user);
      setAuthLoading(false);
      closeDialog();
      toast({
        description: `Welcome, ${user.displayName}!`,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    } catch (err) {
      setAuthLoading(false);
      console.log(err);
      toast({
        description: err.message,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    }
  };

  const handleGoogleAuth = async () => {
    setAuthLoading(true);
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;
      // console.log(user);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      // console.log(userDocRef)
      // console.log(userDocSnap)

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          watchlist: [],
          likedlist: [],
        });
      }
      setAuthLoading(false);
      closeDialog();
      toast({
        description: `Welcome, ${user.displayName}!`,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    } catch (error) {
      setAuthLoading(false);
      console.log(error);
      toast({
        description: err.message,
        action: (
          <ToastAction altText="Close">
            close
          </ToastAction>
        ),
        duration: 5000,
      });
    }
  };



  return (
    <Tabs defaultValue={LoginOrRegister} className="">
      <TabsList className="ygrid yw-full ygrid-cols-2 ymt-4">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="Register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
        <Card className="ycontainer yborder-none">
          <CardHeader className="yspace-y-1">
            <CardTitle className="ytext-2xl ytext-center">Login</CardTitle>
            <CardDescription className="ytext-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <>
              <form onSubmit={loginUser}>
                <div className="yflex yflex-col ygap-4">
                  <div className=" yflex yflex-col ygap-2">
                    <Label htmlFor="email">Email &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className=" yflex yflex-col ygap-2">
                    <Label htmlFor="password">Password &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type="password"
                    />
                  </div>
                  <div className=" yflex yflex-col ygap-2">
                    <Button
                      type="submit"
                      variant="outline"
                      className="ymt-4 ymb-4 yw-full yborder-none"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </>
          </CardContent>
          <div className="yrelative ymb-2">
            <div className="yabsolute yinset-0 yflex yitems-center">
              <span className="yw-full yborder-t" />
            </div>
            <div className="yrelative yflex yjustify-center ytext-xs yuppercase">
              <span className="ybg-background ypx-2 ytext-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="yflex yjustify-center ycontainer">
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="ymt-4 yw-full yborder-none"
            >
              <FcGoogle className="ymr-2" /> Google
            </Button>
          </div>
          <CardFooter>
            <div className="yw-full ymt-4 ytext-xs ytext-center  ymb-2">
              {" "}
              Don't have an account?{" "}
              <TabsList className="">
                <TabsTrigger className="" value="Register">
                  Register
                </TabsTrigger>{" "}
              </TabsList>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Register">
        <Card className="ycontainer yborder-none">
          <CardHeader className="yspace-y-1">
            <CardTitle className="ytext-2xl ytext-center">Register</CardTitle>
            <CardDescription className="ytext-center">
              Enter the required details below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <>
              <form onSubmit={registerUser}>
                <div className="yflex yflex-col ygap-4">
                  <div className=" yflex yflex-col ygap-2">
                    <Label htmlFor="username">Username &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setUsername(e.target.value)}
                      id="username"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <div className=" yflex yflex-col ygap-2">
                    <Label htmlFor="emailRegister">Email &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setEmail(e.target.value)}
                      id="emailRegister"
                      type="email"
                      placeholder=""
                    />
                  </div>
                  <div className=" yflex yflex-col ygap-2">
                    <Label htmlFor="passwordRegister">Password &gt;&gt;</Label>
                    <Input
                    required
                      onChange={(e) => setPassword(e.target.value)}
                      id="passwordRegister"
                      type="password"
                    />
                  </div>
                  <div className=" yflex yflex-col ygap-2">
                    <Button
                      type="submit"
                      variant="outline"
                      className="ymt-4 ymb-4 yw-full yborder-none"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            </>
          </CardContent>
          <div className="yrelative ymb-2">
            <div className="yabsolute yinset-0 yflex yitems-center">
              <span className="yw-full yborder-t" />
            </div>
            <div className="yrelative yflex yjustify-center ytext-xs yuppercase">
              <span className="ybg-background ypx-2 ytext-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="yflex yjustify-center ycontainer">
            <Button
              onClick={handleGoogleAuth}
              variant="outline"
              className="ymt-4 yw-full yborder-none"
            >
              <FcGoogle className="ymr-2" /> Google
            </Button>
          </div>
          <CardFooter>
            <div className="yw-full ymt-4 ytext-xs ytext-center  ymb-2">
              {" "}
              Already have an account?{" "}
              <TabsList>
                <TabsTrigger value="Login">Login</TabsTrigger>{" "}
              </TabsList>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
