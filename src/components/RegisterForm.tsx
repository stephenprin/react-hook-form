import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";


type IFormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export const RegisterForm = () => {
  const form = useForm<IFormValues>({
    defaultValues: {
      username: "Prince",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: ""
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
     

    }
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const { fields, append,remove}=useFieldArray({
    name: 'phNumbers',
    control
  })

  // const {name, ref, onChange, onBlur}= register("username") optional
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
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: "Kindly enter twitter account"
            })}
          />
           <p className="error">{errors.channel?.message}</p>
      
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook",{
              required: "Kindly enter facebook account"
            })}
          />
           <p className="error">{errors.channel?.message}</p>
          </div>
           <div className="form-control">
          <label htmlFor="primary-number">Primary Number</label>
          <input
            type="text"
            id="primary-number"
            {...register("phoneNumbers.0", {
              required: "Kindly enter phone number"
            })}
          />
           <p className="error">{errors.channel?.message}</p>
      
        </div>
        <div className="form-control">
          <label htmlFor="sec-number">Secondary Number</label>
          <input
            type="text"
            id="sec-number"
            {...register("phoneNumbers.1")}
          />
          
        </div>
        <div>
          <label>List of numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                  {
                    index > 0 &&  <button type="button" onClick={()=> remove(index)}>Remove Number</button>
                  }
              </div>
             );
            })}

            <button type="button" onClick={()=> append({number:""})}>Add Number</button>
           </div>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { 
              valueAsNumber: true,
              required: "Kindly enter an Age"
             })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", { 
             valueAsDate: true,
              required: "Kindly enter a Date"
             })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
