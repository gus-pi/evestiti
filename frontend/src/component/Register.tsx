import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };
    console.log(data);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Register</h2>
        <form
          className="space-y-5 max-w-sm mx-auto pt-8"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            name="username"
            id="usaername"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {message && <p className="text-red-500">{message}</p>}

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            Register
          </button>
        </form>

        <p className="my-5 italic text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 underline">
            Log in
          </Link>{' '}
          here.
        </p>
      </div>
    </section>
  );
};

export default Register;
