import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { Component, computed } from '@angular/core';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './features/login/login.component';
import { RigisterComponent } from './features/rigister/rigister.component';
import { ForgetPassComponent } from './features/forget-pass/forget-pass.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChangePasComponent } from './features/change-pas/change-pas.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { gustGuard } from './core/auth/guards/gust-guard';
import { authGuard } from './core/auth/guards/auth-guard';
import { DetailsComponent } from './features/details/details.component'
export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch:'full'},
    {path:'' , component:AuthComponent,
        title:'Auth Page', 
        canActivate:[gustGuard],
        children:[
        {path:'login', component:LoginComponent , title:'Login Page'},
        {path:'rigister', component:RigisterComponent, title:'Rigister Page'},
    ]},
    {path:'' , component:MainComponent,
        title:'Main Page',
        canActivate:[authGuard],
         children:[
        {path:'feed' , component:FeedComponent,title:'Feed Page'},
        {path:'profile' , component:ProfileComponent,title:'Profile Page'},
        {path:'notification' , component:NotificationComponent,title:'Notification Page'},
                {path:'change' , component:ChangePasComponent, title:'Change Page'},

        {path:'details/:id' , component:DetailsComponent,title:'DetailsPoste Page'}, //Dynamic Routing
    ] },
    {path:'**', component:NotFoundComponent}
];
