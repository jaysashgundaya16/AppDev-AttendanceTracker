import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton
} from '@ionic/react';

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Jaysash Gundaya.</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="outline" size="small">Contact</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light" className="ion-padding">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%', 
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            Digital Designer <span style={{ fontSize: '2rem', fontWeight: 'normal' }}>&</span> <br />
            Webflow Developer
          </h1>
          <p style={{ marginTop: '1rem', maxWidth: '500px', fontSize: '1rem', color: '#666' }}>
            I'm Jay, a digital designer and creative Webflow developer —
            I collaborate with brands globally to design impactful, mission-focused websites
            that drive results and achieve business goals.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
