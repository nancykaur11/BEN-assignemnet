import { useState } from 'react';
import axios from 'axios';
import { TextInput, PasswordInput, Button, Container, Title } from '@mantine/core';
import { setAuthToken } from '../auth/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/login', { userName, password });
      setAuthToken(res.data.token);
      navigate('/launch');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <Container size="xs">
      <Title align="center">Login</Title>
      <TextInput label="userName" value={userName} onChange={(e) => setUserName(e.currentTarget.value)} />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
      <Button fullWidth mt="md" onClick={handleLogin}>Login</Button>
      userName = "admin"
      password = "admin123"
    </Container>
  );
}