import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/react';

import AttendanceTracker from '../../components/AttendanceTracker'; // Adjust the relative path if needed

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>IT35C APPLICATION DEVELOPMENT</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen color="light">
        <div style={{ padding: '16px' }}>
          <IonCard className="ion-activatable ripple-parent">
            <IonCardHeader>
              <IonCardTitle>Welcome! Please check your attendance.</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="medium">
                Here's where you’ll see your latest updates.
              </IonText>
            </IonCardContent>
          </IonCard>

          

          {/* Insert the AttendanceTracker component here */}
          <AttendanceTracker />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
