import PhoneInput from 'react-phone-number-input/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import IndiaFlag from '@/components/IndiaFlag';

const Login = () => {
  const [phone, setPhone] = useState<string>();
  return (
    <section className="md:w-6/12 mt-[20vh] md:mx-auto mx-5 ">
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
          onChange={setPhone}
        />
      </div>
      <div className="mt-10">
        <Button className="text-xl" variant="outline">Enter</Button>
      </div>
    </section>
  );
};

export default Login;
