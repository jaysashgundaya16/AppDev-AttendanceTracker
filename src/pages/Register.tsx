import React, { useState } from 'react';
import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonInput,
  IonItem,
  IonLabel,
  useIonRouter,
  IonAlert,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/react';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

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

const Register: React.FC = () => {
  const navigation = useIonRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const handleOpenVerificationModal = () => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      setAlertMessage('Please fill in all fields.');
      setShowAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setShowAlert(true);
      return;
    }
    setShowVerificationModal(true);
  };
  const doRegister = async () => {
    setShowVerificationModal(false);
    try {
      // Sign up in Supabase authentication
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw new Error("Account creation failed: " + error.message);
      }
      // Hash password before storing in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Insert user data into 'users' table
      const { error: insertError } = await supabase.from("users").insert([
        {
          username,
          user_email: email,
          user_password: hashedPassword,
        },
      ]);
      if (insertError) {
        throw new Error("Failed to save user data: " + insertError.message);
      }
      setShowSuccessModal(true);
    } catch (err) {
      if (err instanceof Error) {
        setAlertMessage(err.message);

      } else {
        setAlertMessage("An unknown error occurred.");
      }

      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput 
            value={username} 
            onIonChange={e => setUsername(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput 
            type="email" 
            value={email} 
            onIonChange={e => setEmail(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput 
            type="password" 
            value={password} 
            onIonChange={e => setPassword(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput 
            type="password" 
            value={confirmPassword} 
            onIonChange={e => setConfirmPassword(e
              .detail.value!)} 
            required 
          />
        </IonItem>
        <IonButton onClick={handleOpenVerificationModal} expand="full" className="ion-margin-top">
          Register
        </IonButton>
        {/* New Button for Sign In */}
        <IonButton onClick={() => navigation.push('/appdev-attendancetracker')} expand="full" fill="clear" className="ion-margin-top">
          Already have an account? Sign in
        </IonButton>
        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding" style={{ marginTop: '25%' }}>
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent></IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
          <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', marginTop: '35%' }}>
            <IonTitle style={{ marginTop: '35%' }}>Registration Successful 🎉</IonTitle>
            <IonText>
              <p>Your account has been created successfully.</p>
              <p>Please check your email address.</p>
            </IonText>
            <IonButton routerLink="/appdev-attendancetracker" routerDirection="back" color="primary">
              Go to Login
            </IonButton>
          </IonContent>
        </IonModal>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Error'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;