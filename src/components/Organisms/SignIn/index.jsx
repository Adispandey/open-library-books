import {Typography }from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import GoogleIcon from '@mui/icons-material/Google'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Divider, IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import CustomTextField from '../../Atom/Textfield'
import { SIGNIN } from '../../../strings/string';
import { Container, FieldContainer, GoogleButton, Heading, MainContainer, StyleButton } from './utils';
import { validateField } from './validate'



const SignIn = ({ handleSignIn, handleSignInWithGoogle }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState({
    email: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (e,field
  ) => {
    const val = e.target.value
    setValue((prevValue) => ({ ...prevValue, [field]: e.target.value }))
    const error = validateField(val, field)
    setError((prevError) => ({ ...prevError, [field]: error }))
  }
  const disableButton =
    !value.email || !value.password || error.email || error.password
  return (
    <MainContainer>
      <Container>
        <Heading>
          <Typography variant="h3">{SIGNIN.heading}To Openlibrary Books</Typography>
        </Heading>
        <FieldContainer>
          <CustomTextField
            label={SIGNIN.field.email}
            error={error.email}
            type={SIGNIN.field.email}
            helperText={error.email ? SIGNIN.fieldError.email : ''}
            value={value.email}
            onChange={(e) => handleChange(e, SIGNIN.field.email.toLowerCase())}
          />
          <CustomTextField
            label={SIGNIN.field.password}
            type={showPassword ? '' : SIGNIN.field.password}
            error={error.password}
            helperText={error.password ? SIGNIN.fieldError.password : ''}
            value={value.password}
            endAndornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) =>
              handleChange(e, SIGNIN.field.password.toLowerCase())
            }
          />
        </FieldContainer>
        <StyleButton
          backgroundColor={'burlywood'}
          variant="contained"
          disabled={disableButton}
          onClick={() => handleSignIn(value)}
        >
          {SIGNIN.button}
        </StyleButton>
        <Divider>or</Divider>
        <GoogleButton
          variant="outlined"
          endIcon={<GoogleIcon />}
          onClick={handleSignInWithGoogle}
        >
          Sign In With Google
        </GoogleButton>
      </Container>
    </MainContainer>
  )
}

export default SignIn
