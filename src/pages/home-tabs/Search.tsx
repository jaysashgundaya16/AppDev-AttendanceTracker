import { IonAvatar, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar, IonAlert, 
    IonButton } from '@ionic/react';

const Search: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Search</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen color="light">
                <IonSearchbar placeholder="Search"></IonSearchbar>
                <IonList>
                    <IonItem>
                        <IonAvatar slot="start">
                            <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Christian Lee</h2>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonAvatar slot="start">
                            <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>James Gonzaga</h2>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonAvatar slot="start">
                            <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Jeff Dela Cruz</h2>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonAvatar slot="start">
                            <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Brian Shaw</h2>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonAvatar slot="start">
                            <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>April Lee Joy</h2>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonAvatar slot="start">
                            <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Will Smith</h2>
                        </IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonAvatar slot="start">
                            <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>Taylor Swift</h2>
                        </IonLabel>
                    </IonItem>
                    
               </IonList>
                
            </IonContent>
            
        </IonPage>
    );
};

export default Search;