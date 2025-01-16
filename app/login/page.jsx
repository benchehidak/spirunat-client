"use client";
import Link from "next/link";
import React, {useState} from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

const LoginComponent = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response.error) {
        toast.error(response.error);
        return;
      }
      toast.success("Connexion réussie");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (error) {
      toast.error("Erreur lors de la connexion");
    }
  }

  if (session) {
    redirect("/");
    return null;
  }

  return (
    <div className="relative flex  flex-col">
      <div className="">
        <div className="flex  flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                <div className="grid p-0 md:grid-cols-2 bg-slate-100">
                  <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Se connecter</h1>
                      </div>
                      <div className="grid gap-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          id="email"
                          placeholder="m@exemple.com"
                          value={data.email}
                          onChange={(e) => setData({...data, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="password"
                          >
                            Mot de passe
                          </label>
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Mot de passe oublié ?
                          </a>
                        </div>
                        <input
                          type="password"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          id="password"
                          placeholder="********"
                          value={data.password}
                          onChange={(e) => setData({...data, password: e.target.value})}
                          required
                        />
                      </div>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#3bb67d] text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                        type="submit"
                      >
                        Se connecter
                      </button>
                      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10  px-2 text-muted-foreground">
                          Ou continuez avec
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input  shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full"
                          onClick={() => signIn('google', { callbackUrl : '/' })}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <span className="sr-only">Login with Google</span>
                        </button>
                      </div>
                      <div className="text-center text-sm">
                      Pas encore inscrit ? {" "}
                        <Link href="/sign-up"
                          className="underline underline-offset-4"
                        >
                          Créer un compte
                        </Link>
                      </div>
                    </div>
                  </form>
                  <div className="relative hidden bg-muted md:block">
                    <img
                      src="/assets/imgs/bglogin.svg"
                      alt="Image"
                      className="absolute inset-0 h-full w-full object-cover "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;