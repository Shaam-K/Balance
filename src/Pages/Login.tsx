import PhoneInput from 'react-phone-number-input/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import IndiaFlag from '@/components/IndiaFlag';
import { auth, db } from '../config/firebase.ts';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { UserAuth } from '@/context/AuthContext.tsx';
import { doc, getDoc, setDoc } from "firebase/firestore"; 



import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any; // You can also specify the exact type if known
  }
}

const Login = () => {
  const [phone, setPhone] = useState("");
  const [startOtp, setStartOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const { setIsAdmin } = UserAuth();

  const initCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          startPhoneNumber();
        }
      });
    }
  }

  const startPhoneNumber = () => {
    initCaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier).then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setStartOtp(true);
    }).catch((err) => {
      console.log(err);
    })
  }
  

  const verifyOtp = () => {
    window.confirmationResult.confirm(otpValue).then(async (res:any) => {
      const fetchUser = await getDoc(doc(db,"users", res.user.uid));

      if (!fetchUser.data()) {
        const userData = {
          phone: res.user.phoneNumber
        };

        await setDoc(doc(db,"users",res.user.uid), userData);
      } else {
        if (fetchUser.data()?.type == "admin") {
          setIsAdmin(true);
        }
      }
    }).catch((err: Error) => {
        console.log(err.message);
    })
  }


  return (
    <>
      <section className="md:w-6/12 mt-[20vh] md:mx-auto mx-5 ">
        <div id="sign-in-button" className='display-hidden'></div>
        {startOtp ?

          <div>
            <h1 className="text-3xl mb-3">Enter Otp </h1>
            <h3 className="text-lg text-zinc-600 md:max-w-[40vw] mb-5">
              Otp has been sent to {phone}
            </h3>
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={setOtpValue}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="mt-10">
              <Button className="text-xl" variant="outline" onClick={verifyOtp}>Verify</Button>
            </div>
          </div>

          :
          <>
            <h1 className="text-3xl mb-3">Enter Phone No</h1>
            <h3 className="text-lg text-zinc-600 md:max-w-[40vw]">
              We will be sending you an Otp for Verification (Only +91 Numbers)
            </h3>
            <div className="flex items-center space-x-3 mt-5">
              <IndiaFlag />
              <PhoneInput
                className="bg-inherit border-2 dark:border-zinc-300 border-zinc-700 p-1 text-lg"
                country="IN"
                value={phone}
                onChange={(value) => setPhone(value ?? "")}
              />
            </div>
            <div className="mt-10">
              <Button className="text-xl" variant="outline" onClick={startPhoneNumber}>Send Otp</Button>
            </div>
          </>
        }
      </section>
    </>

  );
};

export default Login;
