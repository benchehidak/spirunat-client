"use client";
import React from "react";

const LoginComponent = () => {
  return (
    <div className="relative flex  flex-col">
      <div className="">
        <div className="flex  flex-col items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-sm md:max-w-3xl">
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
                <div className="grid p-0 md:grid-cols-2 bg-slate-100">
                  <form className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Mot de passe oublié</h1>
                        {/* <p className="text-balance text-muted-foreground">
                          Login to your Acme Inc account
                        </p> */}
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
                          required
                        />
                      </div>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#3bb67d] text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
                        type="submit"
                      >
                        Envoyer
                      </button>
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