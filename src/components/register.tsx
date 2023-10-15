import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import { api } from "~/utils/api";

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulCreate, setSuccessfulCreate] = useState(false);
  const user = useUser();

  //DB mutation
  const { mutate } = api.users.createUser.useMutation({
    onSuccess: () => {
      setErrorMessage("");
      setSuccessfulCreate(true);
    },
    onError: (err) => {
        setSuccessfulCreate(false);
        const errorMessage = err?.data?.zodError?.fieldErrors?.content;
        if (errorMessage && errorMessage[0]){
            setErrorMessage(errorMessage[0]);
        } else {
            setErrorMessage("Failed to add user! Please try again later.");
        }
    },
});

  function handleRegisterSubmit() {
    if (phoneNumber.length === 11) {
        const name = user?.user?.fullName;
        //TODO: Get email from prop maybe
        const email = user?.user?.primaryEmailAddress?.emailAddress;
        const phone = phoneNumber;
        //TODO: Shorten validator
        if (typeof name !== "string") {
            setErrorMessage("Full Name from Clerk AUTH is invalid, please contact our customer support");
        } else if (typeof email !== "string") {
            setErrorMessage("Email from Clerk AUTH is invalid, please contact our customer support");
        } else {
            const newUser = {
                name,
                email,
                phone,
            };
            //Create new user
            mutate(newUser);
        }
    }
    else {
        setErrorMessage("Please Enter a valid phone number in the above format");
    }
  };

  return (
    <>
        {!successfulCreate && <div>
            <h2>Finish Registration by adding a phone number to your account!</h2>
            <input id="phone" type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} pattern="\d*" placeholder="Phone Number" maxLength={11}/>
            <h3><i>include country code, no spaces. "12223333"</i></h3>
            <h3><b>{errorMessage}</b></h3>
            <button onClick={handleRegisterSubmit}>REGISTER</button>
        </div>}
        {successfulCreate && <div>
                <h2>Your user information has been successfully added to our system!</h2>
            </div>}
    </>
  );
}
