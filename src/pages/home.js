import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "../features/login/userSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const dispatch = useDispatch();
  const navigate= useNavigate();
  let user = useSelector((state) => state.user.loggedInUser);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  async function handleSubmitLogin(e) {
    e.preventDefault();
    console.log(loginData)
    try {
      const response = await axios.post("http://localhost:4000/login" ,{...loginData, credentials:true}, { withCredentials: true });
      console.log("User loggedin successfully:", response.data);
      const { loggedInUser } = response.data;
      dispatch(userLoggedIn({ ...loggedInUser, loggedIn: true }));
      console.log(user)
      navigate("/chat");

    }
    catch(error){
      console.log(error)
    }
    
  }
  async function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);
    try {
      const response = await axios.post("http://localhost:4000/signup", formData);
      console.log("Form submitted successfully:", response.data);

    } catch (error) {
      console.error("Error submitting form:", error);

    }
  }
  function ClickHandler() {
    setSignUp(!signUp);
  }


  return (
    <div>
      <section class="bg-gray-50 dark:bg-gray-900">
        {!signUp && (
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  class="space-y-4 md:space-y-6"
                  onSubmit={handleSubmitLogin}
                >
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={loginData.email}
                      onChange={handleChangeLogin}
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={loginData.password}
                      onChange={handleChangeLogin}
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="remember"
                          class="text-white dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <p class="fpass--link text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-white">
                      Forgot password?
                    </p>
                  </div>
                  <button
                    type="submit"
                    class=" signin--button w-full text-white bg-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p class="text-sm font-light text-white dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <p
                      onClick={() => ClickHandler()}
                      class="signup--link text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </p>
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
        <section class="bg-gray-50 dark:bg-gray-900">
          {signUp && (
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Pavan Kalyan"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                    </div>
                    <button
                      type="submit"
                      class="create--button w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Create an account
                    </button>
                    <p class="text-sm font-light text-white dark:text-gray-400">
                      Already have an account?{" "}
                      <p
                        onClick={() => ClickHandler()}
                        class=" login--link font-medium text-white hover:underline dark:text-primary-500"
                      >
                        Login here
                      </p>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export default Home;
