import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import SignIn from '../pages/SignIn';
import { getUserProfile, signIn } from '../services/authService';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn(),
}));

jest.mock('../services/authService', () => ({
  getUserProfile: jest.fn(),
  signIn: jest.fn(),
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      fetchUser: jest.fn(),
    });
  });

  it('should render form and header', () => {
    render(<SignIn />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /sign in to your account/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password?/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('should allow a user to sign in and navigate to home', async () => {
    const user = userEvent.setup();

    (signIn as jest.Mock).mockResolvedValue({});

    (getUserProfile as jest.Mock).mockResolvedValue({
      _id: '123',
      username: 'testuser',
      password: 'password123',
    });

    render(<SignIn />, { wrapper: MemoryRouter });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /sign in/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(button);

    expect(signIn).toHaveBeenCalledWith('testuser', 'password123');

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user/home', {
        replace: true,
      });
    });
  });

  it('should show an error message when sign in fails', async () => {
    const user = userEvent.setup();

    (signIn as jest.Mock).mockRejectedValue(new Error('Incorrect password'));

    render(<SignIn />, { wrapper: MemoryRouter });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /sign in/i });

    await user.type(usernameInput, 'wronguser');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Incorrect password/i)).toBeInTheDocument();
    });
  });
});
