import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { MainLayout } from '@sharedComponents/index'

export const PrivateRoutes = () => {
  const accessToken = Cookies.get('AccessToken') ?? ''
  // useEffect(() => {
  //   const accessToken = Cookies.get("AccessToken") ?? "";
  //   if (accessToken) {
  //     try {
  //       const decodedToken = jwtDecode<JwtPayload>(accessToken);
  //       const currentTime = Date.now() / 1000;
  //       if (decodedToken.exp > currentTime) {
  //         setIsValidToken(true);
  //       } else {
  //         setIsValidToken(false);
  //         Cookies.remove("AccessToken");
  //       }
  //     } catch (error) {
  //       setIsValidToken(false);
  //       Cookies.remove("AccessToken");
  //     }
  //   } else {
  //     setIsValidToken(false);
  //   }
  // }, []);
  return accessToken
    ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
      )
    : (
    <Navigate to="/login" />
      )
}
