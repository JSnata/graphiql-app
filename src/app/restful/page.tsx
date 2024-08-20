'use client';
import { setNewNumber } from "@/lib/features/testSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useCallback } from "react";
import { toast } from "react-toastify";

export default function Restful ()
{
  const dispatch = useAppDispatch();
  const result = useAppSelector(state => state.test.value);


  const handleClick = useCallback(() =>
  {
    dispatch(setNewNumber(1));
    toast.success('Ye + 1 🙈');
  }, [dispatch]);


  return (

    <Box sx={ { margin: '0 auto', textAlign: 'center' } }>
      <Typography variant="h1">Restful Task</Typography>
      <Button variant="contained" onClick={ handleClick }>+1 Count</Button>
      <Typography variant="h3" sx={ { mt: '20px' } } >{ result }</Typography>
      <Link href="/" color="secondary"><Button variant="contained" sx={ { mt: '20px' } }>Back to main</Button></Link>
    </Box >
  );
}
