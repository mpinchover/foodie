import React, { useState } from "react";
import { useAuth } from "../../auth/auth-context";
import {
  Box,
  Stack,
  Input,
  Button,
  Heading,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

const SignUp = ({ setIsSignIn }) => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      toast({
        title: "Error logging in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleSignUp}>
        Sign up
      </Button>

      {/* Call to action */}

      <Text textAlign="center" fontSize="sm" color="gray.500">
        Have an account?{" "}
        <Text
          as="span"
          color="blue.500"
          fontWeight="semibold"
          cursor="pointer"
          onClick={() => setIsSignIn(true)}
        >
          Sign in
        </Text>
      </Text>
    </>
  );
};

export default SignUp;
