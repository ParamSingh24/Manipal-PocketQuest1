import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { UserDropdown } from './UserDropdown';
import { AuthDialog } from './AuthDialog';

export const AuthButton = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <UserDropdown />;
  }

  return (
    <AuthDialog>
      <Button variant="outline" size="sm">
        Sign in
      </Button>
    </AuthDialog>
  );
};
