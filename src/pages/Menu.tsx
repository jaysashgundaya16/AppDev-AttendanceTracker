import { 
  IonButton,
  IonButtons,
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonItem, 
    IonMenu, 
    IonMenuButton, 
    IonMenuToggle, 
    IonPage, 
    IonRouterOutlet, 
    IonSplitPane, 
    IonTitle, 
    IonToolbar 
} from '@ionic/react'
import {homeOutline, logOutOutline, rocketOutline, settingsOutline} from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Home from './Home';
import About from './About';
import Details from './Details';
import { supabase } from '../utils/supabaseClient';
import EditProfilePage from './EditProfilePage';

const Menu: React.FC = () => {
  const path = [
      {name:'Home', url: '/appDev-AttendanceTracker/app/home', icon: homeOutline},
      {name:'About', url: '/appDev-AttendanceTracker/app/about', icon: rocketOutline},
      {name:'Profile', url: '/appDev-AttendanceTracker/app/profile', icon: settingsOutline},
  ]

  return (
      <IonPage>
          <IonSplitPane contentId="main">
              <IonMenu contentId="main">
                  <IonHeader>
                      <IonToolbar>
                          <IonTitle>
                              Menu
                          </IonTitle>
                      </IonToolbar>
                  </IonHeader>
                  <IonContent>
                      {path.map((item,index) =>(
                          <IonMenuToggle key={index}>
                              <IonItem routerLink={item.url} routerDirection="forward">
                                  <IonIcon icon={item.icon} slot="start"></IonIcon>
                                  {item.name}
                              </IonItem>
                          </IonMenuToggle>
                      ))}

                      {/*Logout Button*/}
                      <IonButton routerLink="/appDev-AttendanceTracker" routerDirection="back" expand="full">
                          <IonIcon icon={logOutOutline} slot="start"> </IonIcon>
                      Logout
                      </IonButton>
                      
                  </IonContent>
              </IonMenu>
              
              <IonRouterOutlet id="main">
                  <Route exact path="/appDev-AttendanceTracker/app/home" component={Home} />
                  <Route exact path="/appDev-AttendanceTracker/app/home/details" component={Details} />
                  <Route exact path="/appDev-AttendanceTracker/app/about" component={About} />
                  <Route exact path="/appDev-AttendanceTracker/app/profile" component={EditProfilePage} />


                  <Route exact path="/appDev-AttendanceTracker-lab/app">
                      <Redirect to="/appDev-AttendanceTracker/app/home"/>
                  </Route>
              </IonRouterOutlet>

          </IonSplitPane>
      </IonPage>
  );
};

export default Menu;