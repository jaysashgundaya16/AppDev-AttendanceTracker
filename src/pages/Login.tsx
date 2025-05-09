import React, { useState } from 'react';
import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { createClient } from '@supabase/supabase-js';
import './Login.css'; 

// Initialize Supabase client
const supabase = createClient('https://ypmhcyklosieqqfhdsrz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwbWhjeWtsb3NpZXFxZmhkc3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NzQxNjUsImV4cCI6MjA1ODM1MDE2NX0.FebBjZYn-wTMMCdYrA9F8kcf8vCtQ7tz4yfhVxH9ayg');

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />

  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const doLogin = async () => {
    if (email === '' || password === '') {
      setAlertMessage('Please enter both email and password.');
      setShowAlert(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/appdev-attendancetracker/app', 'forward', 'replace');
    }, 300);
  }

  const goToRegister = () => {
    navigation.push('/appdev-attendancetracker/register', 'forward', 'replace'); // Navigate to the Register page
  }
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '25%'
        }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden' 
            }}
          >
            <img 
              src="https://media.istockphoto.com/id/1268716253/vector/freshman-black-glyph-icon.jpg?s=612x612&w=0&k=20&c=_0e-sfr9RfJnNRyif6bVMLqc1rR3tBx5lVIjKfUPH2k=" 
              alt="Logo" 
              style={{ width: '100%', height: '100%' }} 
            />
          </IonAvatar>
          <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}></h1>
          <IonInput
            label="Email" 
            labelPlacement="floating" 
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
          <IonInput style={{ marginTop: '10px' }}      
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </div>
        <IonButton onClick={doLogin} expand="full" shape='round'>
          Login
        </IonButton>

        <IonButton onClick={goToRegister} expand="full" fill="clear" shape='round'>
          Don't have an account? Register here
        </IonButton>

        {/* Reusable AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};
export default Login;