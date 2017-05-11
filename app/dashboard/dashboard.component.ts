import {
  Component, AfterContentInit, ViewContainerRef, ViewChild, ComponentFactoryResolver} from "@angular/core";
import {GlobalCacheService} from "../global/global.cache.service";
import {DashboardGetFormComponent} from "./dashboard.getform.component";
import {DashboardCreateTechfolioComponent} from "./dashboard.create.component";

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  entryComponents: [
    DashboardGetFormComponent,
    DashboardCreateTechfolioComponent
  ]

})
export class DashboardComponent implements  AfterContentInit {
  ngAfterContentInit(): void {

    let childComponent: any;
    if (this.hasPage) {
      childComponent = this.componentFactoryResolver.resolveComponentFactory(DashboardGetFormComponent);
    } else {
      childComponent = this.componentFactoryResolver.resolveComponentFactory(DashboardCreateTechfolioComponent);
    }

    this.content.createComponent(childComponent);
  }

  username = '';
  hasPage = false;

  @ViewChild('content', {read: ViewContainerRef}) content: ViewContainerRef;

  constructor(private cacheService: GlobalCacheService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.username = cacheService.user.username;
    this.hasPage = cacheService.hasPage;


  }

}
