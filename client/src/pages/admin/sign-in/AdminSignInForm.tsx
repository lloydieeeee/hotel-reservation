import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/common/Spinner";
import { toast } from "sonner";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "@/features/auth/authSlice";
import { useSigninAdminMutation } from "@/app/services/auth";

const schema = z.object({
  email: z
    .string({ required_error: "Email Address is required" })
    .min(1, { message: "Email Address is required" })
    .email({ message: "Email Address invalid format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

type InputProps = z.infer<typeof schema>;

function AdminSignInForm() {
  const form = useForm<InputProps>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signin, { isLoading }] = useSigninAdminMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    const { email, password } = data;

    await signin({ email, password })
      .unwrap()
      .then((data) => {
        dispatch(setAuth(data));
        toast.success("User Login Successfully");
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        toast.error(error.data.detail);
      });
  };

  return (
    <Card className="w-full max-w-lg 2xl:max-w-xl">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-white"
              disabled={isLoading}
            >
              {isLoading ? <Spinner sm /> : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AdminSignInForm;
