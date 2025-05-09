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
      {name:'Home', url: '/appdev-attendancetracker/app/home', icon: homeOutline},
      {name:'About', url: '/appdev-attendancetracker/app/about', icon: rocketOutline},
      {name:'Profile', url: '/appdev-attendancetracker/app/profile', icon: settingsOutline},
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
                      <IonButton routerLink="/appdev-attendancetracker" routerDirection="back" expand="full">
                          <IonIcon icon={logOutOutline} slot="start"> </IonIcon>
                      Logout
                      </IonButton>
                      
                  </IonContent>
              </IonMenu>
              
              <IonRouterOutlet id="main">
                  <Route exact path="/appdev-attendancetracker/app/home" component={Home} />
                  <Route exact path="/appdev-attendancetracker/app/home/details" component={Details} />
                  <Route exact path="/appdev-attendancetracker/app/about" component={About} />
                  <Route exact path="/appdev-attendancetracker/app/profile" component={EditProfilePage} />


                  <Route exact path="/appdev-attendancetracker/app">
                      <Redirect to="/appdev-attendancetracker/app/home"/>
                  </Route>
              </IonRouterOutlet>

          </IonSplitPane>
      </IonPage>
  );
};

export default Menu;