import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/shared/ui';
import { LoginForm } from './login-form.client';

export const AuthPage = () => {
  return (
    <div className="justify-center items-center flex h-full">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};
