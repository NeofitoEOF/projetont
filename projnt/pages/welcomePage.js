import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function welcomePage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      const token = localStorage.getItem("token");
      if (!!token) {
        router.push("/");
        return false;
      }
      setToken(token);
      fetch("http://localhost:3333/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          console.log(user.consultTask);
          setUsers(user.infoUser.map((el) => el.username));
        });
    }
  }, []);
  return (
    <>
      <h1>Welcome {users}</h1>
      <h3>Task{users.consultTask}</h3>
    </>
  );
}
export default welcomePage;
