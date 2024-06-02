"use client";
import { useEffect } from 'react';
import { useAppSelector } from './store/hooks'
import { LOGIN_TIME, SESSION_LENGTH } from './utils/constants';
import { useRouter } from 'next/navigation';

const AuthWrapper = ({children,admin=false}) => {
  const {token} = useAppSelector(state => state.auth)
  const user = useAppSelector(state => state.user)
  const router= useRouter();

    useEffect(() => {
      if(typeof window === 'undefined') return;
      if(!user?._id){
        window.location.href = '/login'
        return;
      }
      if(admin && !user?.role==='admin'){
        router.push('/')
        return;
      }
      const time = localStorage.getItem(LOGIN_TIME);
      if (time) {
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(time) > SESSION_LENGTH) {
          localStorage.clear()
          window.location.href = '/login'
        }
      }
    }, [])
  return (
    <>
      {children}
    </>
  )

}

export default AuthWrapper
