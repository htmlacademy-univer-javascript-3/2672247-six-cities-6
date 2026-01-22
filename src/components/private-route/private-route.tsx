import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import Spinner from '../spinner/spinner';
import { selectAuthorizationStatus } from '../../store/selectors';
import { useAppSelector } from '../../hooks/store';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
