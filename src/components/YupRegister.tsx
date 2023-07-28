import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup.object().shape({
    username:yup.string().required("Username is required"),
    email: yup.string().email("Email format is not valid").required("Email iis required"),
    channel: yup.string().required("Channel is required"),
  });

const YupRegister = () => {
    
    type IFormValues = {
        username: string;
        email: string;
        channel: string;
    }
    const form = useForm<IFormValues>({
        defaultValues: {
            username: "Prince",
            email: "",
            channel: "",
        },
        resolver:yupResolver(schema)
    })
    const { register, control, handleSubmit,
        formState, reset} = form;
    const { errors, isSubmitSuccessful } = formState;
    useEffect(() => { 
        if (isSubmitSuccessful) {
          reset()
        }
      },[isSubmitSuccessful,reset])
    
    
    const onSubmit = (data: IFormValues) => {
        console.log("form submit", data);
    };
    
    
      
  return (
      <div>
          
          <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
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
              
              <button>Register</button>
          </form>
          <DevTool control={control} />
    </div>
  )
}

export default YupRegister