/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import { useEffect, FC } from 'react';

const withAuth = (WrappedComponent: FC) => {
  const AuthenticatedComponent: FC<any> = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Check if the router is mounted and if the user is authenticated
      console.log(isAuthenticated)
      if (router && !isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    // Return null if not authenticated, otherwise render the wrapped component
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  // Set a display name for the wrapped component
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
};

export default withAuth;