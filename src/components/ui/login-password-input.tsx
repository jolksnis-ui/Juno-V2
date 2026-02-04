'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { LoginInput } from '@/components/ui/login-input';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icons';

interface LoginPasswordInputProps extends Omit<React.ComponentProps<typeof LoginInput>, 'type'> {
  /** Error message to display below input */
  error?: string;
}

/**
 * Password input with show/hide toggle (underline style, hover/focus like contact form)
 */
const LoginPasswordInput = React.forwardRef<HTMLInputElement, LoginPasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const toggleVisibility = () => {
      setVisible((v) => !v);
      setTimeout(() => inputRef.current?.focus(), 0);
    };

    return (
      <div className="relative flex flex-col gap-1">
        <LoginInput
          type={visible ? 'text' : 'password'}
          ref={setRefs}
          error={error}
          className={cn('pr-10', className)}
          aria-label="Password"
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-0 top-1 flex h-10 w-10 items-center justify-center rounded text-juno-500 transition-colors hover:text-juno-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-juno-900 focus-visible:ring-offset-2"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <EyeOffIcon size={20} color="currentColor" />
          ) : (
            <EyeIcon size={20} color="currentColor" />
          )}
        </button>
      </div>
    );
  }
);
LoginPasswordInput.displayName = 'LoginPasswordInput';

export { LoginPasswordInput, type LoginPasswordInputProps };
