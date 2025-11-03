// components/SocialLogin.tsx
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

interface SocialLoginProps {
  isLoading?: boolean;
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
}

function SocialLogin({ isLoading = false, onGoogleLogin, onFacebookLogin }: SocialLoginProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-zinc-900 px-2 text-zinc-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={onGoogleLogin}
          className="w-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <FcGoogle className="w-4 h-4 mr-2" />
          Google
        </Button>

        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={onFacebookLogin}
          className="w-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <FaFacebook className="w-4 h-4 mr-2 text-blue-500" />
          Facebook
        </Button>
      </div>
    </div>
  );
}

export default SocialLogin;
