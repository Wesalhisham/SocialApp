import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SuggestionsComponent } from './componants/suggestions/suggestions.component';
import { SideLeftComponent } from "./componants/side-left/side-left.component";
import { FeedContentComponent } from "./componants/feed-content/feed-content.component";

@Component({
  selector: 'app-feed',
  imports: [RouterLink, RouterLinkActive, SuggestionsComponent, SideLeftComponent, FeedContentComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {

 
}
