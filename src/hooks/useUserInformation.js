import React, { useEffect, useState } from "react";

function useUserInformation() {
  const [userInformation, setUserInformation] = useState();

  useEffect(() => {
    const accountString = localStorage.getItem("account");
    const account = JSON.parse(accountString);
    setUserInformation(account);
  }, []);
  return { userInformation };
}

export default useUserInformation;
