import { Card, Stack, styled,Button } from '@mui/material'

export const Heading = styled(Stack)({
  color: 'burlywood',
  marginBottom: '3rem',
})

export const FieldContainer = styled(Stack)({
  color: 'burlywood',
  gap: '12px',
  padding: '0 1rem',
  margin: '2rem 0',
})

export const MainContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  minWidth: '70vw',
})
export const Container = styled(Card)({
  padding: '2rem',
  textAlign: 'center',
  width: '40%',
  borderRadius: '12px',
  zIndex: 1,
  boxShadow: '0 4px 8px #001F3F',
})

export const StyleButton = styled(Button)({
  backgroundColor: 'burlywood',
  width: '95%',
  padding: '0.5rem',
  marginBottom: '1rem',
})

export const GoogleButton = styled(Button)({
  color: 'burlywood',
  borderColor: 'burlywood',
  width: '95%',
  padding: '0.7rem',
  margin: '1.5rem 0.5rem',
})