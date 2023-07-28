import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UrlsService } from '@my-project/url';


@Component({
  selector: 'my-project-reroute',
  templateUrl: './reroute.component.html',
  styles: [
  ]
})
export class RerouteComponent implements OnInit, OnDestroy{
  endSubs$: Subject<any> = new Subject();

  constructor(    
    private urlsService: UrlsService, 
    private route: ActivatedRoute, 
  ){return}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id']){
        const id = params['id'];
        this._getOriginalUrl(id);
      }
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  private _getOriginalUrl(id:string) {
    console.log(id);
    this.urlsService.getOriginal(id).pipe(takeUntil(this.endSubs$)).subscribe((original) => {
      console.log(original.originalURL);
      window.location.href = 'https://'+<string>original.originalURL;
    });
  }
}
