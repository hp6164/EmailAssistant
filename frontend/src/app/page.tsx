"use client"

import { useState } from 'react';
import Header from "./header";
import LoginPage from './login';


export default function Home() {
  const [page , setPage] = useState<string>("login");
  const [user , setUser] = useState<string>("");

  return (
    <div>
      {page === "login" && <LoginPage setPage={setPage} setUser={setUser}/>}
      {page === "dash"  && <Header user={user} />}
      {/* <Categories /> */}
      {/* <Inbox /> */}
    </div>
  );
}
