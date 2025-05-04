//Imports:
import React from "react";
import Loginform from "../../_components/login/loginform";

//Login page:
const LoginPage = async ({ searchParams }) => {
  const { redirectedFrom } = await searchParams; //Get the redirectedFrom from the url
  return <Loginform redirectedFrom={redirectedFrom} />;
};

export default LoginPage;
