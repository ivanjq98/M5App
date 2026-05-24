// app/index.tsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText, ThemedView } from '../components/Themed';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 800);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Logo with GIF */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logoGif}
          resizeMode="contain"
        />
        <ThemedText type="title" style={styles.logoText}>
          StackUp
        </ThemedText>
      </View>

      {/* Login Form */}
      <View style={styles.form}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="johndoe@gmail.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <ThemedText style={{ color: '#888' }}>Forgot password?</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <ThemedText style={styles.loginButtonText}>
            {loading ? 'Logging in...' : 'Log In'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccount}>
          <ThemedText>
            Don't have an account?{' '}
            <ThemedText style={{ color: '#4CAF50' }}>Create an Account</ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoGif: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  loginButton: {
    backgroundColor: '#da7305',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  createAccount: {
    alignItems: 'center',
    marginTop: 24,
  },
};