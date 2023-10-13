import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { api } from "~/utils/api";

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useUser();

  function handleRegisterSubmit() {
    if (phoneNumber.length === 11) {
        console.log("DATABASE CALL WITH CORRECT PHONE NUMBER");
        setErrorMessage("");
    }
    else {
        setErrorMessage("Please Enter a valid phone number in the above format");
    }
  };

  return (
    <>
        <h2>Finish Registration by adding a phone number to your account!</h2>
        <input id="phone" type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} pattern="\d*" placeholder="Phone Number" maxLength={11}/>
        <h3><i>include country code, no spaces. "12223333"</i></h3>
        <h3><b>{errorMessage}</b></h3>
        <button onClick={handleRegisterSubmit}>REGISTER</button>
    </>
  );
}
