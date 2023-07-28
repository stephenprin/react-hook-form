import { TextField, Button, Stack } from "@mui/material"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";

type IFormValues = {
    email: string;
    password: string;
}

const MuiLogin = () => {
    const form = useForm<IFormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { register, handleSubmit, formState, control } = form
    const { errors } = formState;
    
    const onSubmit = (data:IFormValues) => { 
        console.log(data)
    }
  return (
      <div>
          <h1>Mui Login</h1>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} width={400}>
                  
                  <TextField label="Email" type="email"  {...register("email", {
                      required: "Email is required"
                  })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                  />
                  <TextField label="Password" type="password" {...register("password", {
                      required: "Password is required"
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  
                  />

                  <Button type="submit" variant="contained" color="primary">
                      Login
                  </Button>
                  
              </Stack>
          </form>
          <DevTool control={control} /> 
    </div>
  )
}

export default MuiLogin