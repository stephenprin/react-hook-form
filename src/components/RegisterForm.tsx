import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type IFormValues = {
  username: string;
  email: string;
  channel: string;
};

export const RegisterForm = () => {
  const form = useForm<IFormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  // const {name, ref, onChange, onBlur}= register("username") optional
  const onSubmit = (data: IFormValues) => {
    console.log("form submit", data);
  };

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="orm-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Kindly enter Username" })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Kindly enter email",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*＋/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin:(fieldValues) => {
                  return fieldValues !== "admin@example.com" || "Enter a valid email address"
                },
                notBlackListed: (fieldValues) => {
                  return !fieldValues.endsWith("baddomain.com") || "This domain is not supported"
                }
              }
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Kindly enter a channel" })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
