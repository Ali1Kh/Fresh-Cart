import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
export default function Profile() {
  const [name, setName] = useState(null);

  useEffect(() => {
    const { name } = jwtDecode(localStorage.getItem("Token"));
    setName(name);
  }, []);

  return (
    <>
      <div className="container">
        <h1>{name}</h1>
      </div>
    </>
  );
}
