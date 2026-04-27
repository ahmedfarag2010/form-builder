# Authentication Implementation Guide

## Overview
The form builder now includes a complete authentication system with login functionality, token management, and route protection.

## Features Implemented

### 1. Login Page
- Modern, animated login interface
- Email and password validation
- Password visibility toggle
- Loading state during authentication
- Error message display
- Demo credentials displayed on the page

### 2. Authentication Service
- API integration: `http://www.exc.somee.com/api/auth/login`
- Token management in localStorage
- User email persistence
- Login/logout functionality
- Authentication state management using RxJS

### 3. Route Protection
- Auth guard protects the form builder route
- Automatic redirect to login for unauthenticated users
- Automatic redirect to form builder if already logged in

### 4. Token Storage
- Token stored in localStorage with key: `auth_token`
- User email stored with key: `user_email`
- Token persists across browser sessions
- Used for future API calls (saving forms)

## Login Credentials

**Demo Account:**
- Email: `mghanam@thiqah.sa`
- Password: `123456`

## User Flow

### 1. Initial Access
```
User visits app
   ↓
Redirects to /login
   ↓
Login page displayed
```

### 2. Login Process
```
User enters credentials
   ↓
Clicks "Sign In"
   ↓
API call to login endpoint
   ↓
Token received and stored
   ↓
Redirect to /form-builder
```

### 3. Authenticated Session
```
User accesses app
   ↓
Token found in localStorage
   ↓
Automatically redirects to /form-builder
   ↓
User can build forms
```

### 4. Logout Process
```
User clicks "Logout" button
   ↓
Token removed from localStorage
   ↓
Redirect to /login
```

## Routes Configuration

### Available Routes
1. **/** - Redirects to `/login`
2. **/login** - Login page (public)
3. **/form-builder** - Form builder (protected by auth guard)
4. **/** (wildcard) - Redirects to `/login`

## API Integration

### Login Endpoint
```typescript
POST http://www.exc.somee.com/api/auth/login

Request Body:
{
  "email": "mghanam@thiqah.sa",
  "password": "123456"
}

Response:
{
  "token": "your-jwt-token-here",
  "user": { ... } // optional user data
}
```

### Token Storage
The token is automatically stored in localStorage after successful login:
```typescript
localStorage.setItem('auth_token', token);
localStorage.setItem('user_email', email);
```

## Component Structure

```
src/app/
├── components/
│   ├── login/                      # Login page component
│   │   ├── login.component.ts      # Login logic
│   │   ├── login.component.html    # Login template
│   │   └── login.component.scss    # Login styles
│   └── form-builder/               # Protected form builder
│       └── (includes logout button)
├── services/
│   └── auth.service.ts             # Authentication service
├── guards/
│   └── auth.guard.ts               # Route protection
└── models/
    └── auth.model.ts               # Auth interfaces
```

## Code Examples

### Using the Auth Service

```typescript
import { AuthService } from './services/auth.service';

constructor(private authService: AuthService) {}

// Login
login() {
  this.authService.login({ email, password }).subscribe({
    next: (response) => {
      console.log('Logged in successfully');
      // Token automatically stored
    },
    error: (error) => {
      console.error('Login failed', error.message);
    }
  });
}

// Logout
logout() {
  this.authService.logout();
  // Automatically redirects to login page
}

// Check authentication status
isLoggedIn() {
  return this.authService.isLoggedIn();
}

// Get stored token
getToken() {
  return this.authService.getToken();
}
```

### Using Auth Guard in Routes

```typescript
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [authGuard]  // Protected route
  }
];
```

## Form Builder Updates

### Header Changes
The form builder header now includes:
- User email display (👤 email@example.com)
- Logout button (🚪 Logout)
- Existing functionality (Import, Export, Clear All)

### Logout Functionality
```typescript
onLogout() {
  if (confirm('Are you sure you want to logout?')) {
    this.authService.logout();
  }
}
```

## Security Features

### Token Management
- Token stored securely in localStorage
- Automatic token retrieval for API calls
- Token removed on logout

### Route Protection
- Auth guard prevents unauthorized access
- Automatic redirect to login page
- Guards check token presence

### Session Persistence
- Token persists across browser sessions
- User stays logged in until explicit logout
- Token cleared on logout

## Future Enhancements

### Using Token for API Calls
When saving forms to the server, include the token in headers:

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

saveForm(formData: any) {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.post('api/forms/save', formData, { headers });
}
```

### Token Refresh
Implement token refresh logic when token expires:

```typescript
refreshToken() {
  // Call refresh endpoint
  // Update stored token
}
```

### Token Expiration
Add token expiration checking:

```typescript
isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;
  
  // Decode JWT and check expiration
  // Return true if expired
}
```

## Styling

### Login Page Design
- Gradient background (purple theme)
- Centered card layout
- Animated form elements
- Responsive design
- Icon-enhanced inputs

### Color Scheme
- Primary: Purple gradient (#667eea to #764ba2)
- Error: Red (#c62828)
- Success: Green (#4CAF50)

## Testing the Authentication

### Manual Testing Steps
1. Open browser and navigate to `http://localhost:4200`
2. Should redirect to `/login`
3. Enter credentials:
   - Email: `mghanam@thiqah.sa`
   - Password: `123456`
4. Click "Sign In"
5. Should redirect to `/form-builder`
6. See user email in header
7. Build forms normally
8. Click "Logout"
9. Confirm logout
10. Should redirect back to `/login`

### Testing Protected Routes
1. Clear localStorage (browser DevTools)
2. Try to access `http://localhost:4200/form-builder` directly
3. Should automatically redirect to `/login`
4. After login, should access form builder

## Troubleshooting

### Login Failed
- Check API endpoint is accessible
- Verify credentials are correct
- Check network tab for API response
- Ensure CORS is configured on server

### Token Not Persisting
- Check localStorage in browser DevTools
- Verify token is being stored after login
- Check for localStorage quota issues

### Redirect Issues
- Verify route configuration
- Check auth guard implementation
- Clear browser cache and localStorage

### CORS Errors
If you encounter CORS errors, the API server needs to allow requests from `http://localhost:4200`:
```
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Summary

✅ **Login page** - Complete with modern UI
✅ **Authentication service** - API integration working
✅ **Token storage** - localStorage implementation
✅ **Route protection** - Auth guard functional
✅ **Logout functionality** - Working in form builder
✅ **User display** - Email shown in header

The authentication system is fully integrated and ready for use!
