import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsedUrl, NotUsedUrl, UrlsService } from '@my-project/url';
import { Subject, takeUntil } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'my-project-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy{
  hostingAddress="";
  id="";
  hasParam = true;
  inputElement: HTMLInputElement;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private urlsService: UrlsService, 
    private location: Location, 
    private clipboard: Clipboard,
    private messageService: MessageService,  
  ){return}
  
  endSubs$: Subject<any> = new Subject();

  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
  
  ngOnInit(): void {
    this._setHostingAddress();
    const currentUrl = window.location.href;
    if(currentUrl === 'https://jisung-choi.github.io/short/'){
      this.hasParam = false;
  }
    // } else {
    //   this.route.params.subscribe(params => {
    //     if(params['id']){
    //       const id = params['id'];
    //       this._getOriginalUrl(id);
    //     }
    //   })
    // }
  }

  async onUrlEnter(event?: KeyboardEvent) {
    let id = "";

    if(event !== undefined && event.key === "Enter"){
      const url = (event.target as HTMLInputElement).value;
      const urlWithoutHttps = url.replace("https://", "");
      id = await this._getNewId();
      if(id ==="") return;
      const expDate = this._getExpDate();

      const newUsedUrl = this._setNewUsedUrl(id, urlWithoutHttps, expDate);
      
      this.urlsService.registerNewUrl(newUsedUrl).pipe(takeUntil(this.endSubs$)).subscribe((usedUrl) => {
        this.id = <string>usedUrl._id;
        console.log(this.id);
      });
    }
  }

  async onClickUrl(){
    const id = await this._getNewId();
    if(id ==="") return;
    const inputElement = document.getElementById("urlInput") as HTMLInputElement;
    const url = inputElement.value;
    const urlWithoutHttps = url.replace("https://", "");
    const expDate = this._getExpDate();
    
    const newUsedUrl = this._setNewUsedUrl(id, urlWithoutHttps, expDate);
    
    this.urlsService.registerNewUrl(newUsedUrl).pipe(takeUntil(this.endSubs$)).subscribe((usedUrl) => {
      this.id = <string>usedUrl._id;
      console.log(this.id);
    });
  }

  onClickCopy(){
    this.clipboard.copy(this.hostingAddress + this.id);
    this.showMessage();
  }

  showMessage() {
    this.messageService.add({severity:'success', summary:'Url', detail:'Url Is Copied'});
  }

  private _setHostingAddress(){
    const currentUrl = this.location.path();
    this.hostingAddress = window.location.href.replace(currentUrl, '');
  }

  // private _getOriginalUrl(id:string) {
  //   console.log(id);
  //   this.urlsService.getOriginal(id).pipe(takeUntil(this.endSubs$)).subscribe((original) => {
  //     console.log(original.originalURL);
  //     window.location.href = 'https://'+<string>original.originalURL;
  //   });
  // }

  private async _getNewId(): Promise<string>{
    let id ="";
    this.urlsService.getNewId().pipe(takeUntil(this.endSubs$)).subscribe((notUsedUrl) => {
      console.log(notUsedUrl._id);
      id = <string>notUsedUrl._id;
    });
    try {
      await this._waitUntil(() => {
        return (id !== "")
      }, 5);
    } catch (error) {
      console.error('New id not returned within maximum attempts:', error);
    }
    return id
  }

  private _setNewUsedUrl(id:string, original:string, exp:string): UsedUrl{
    const newUsedUrl: UsedUrl = new UsedUrl();
    newUsedUrl._id = id;
    console.log(newUsedUrl._id);
    newUsedUrl.originalURL = original;
    console.log(newUsedUrl.originalURL);
    newUsedUrl.expirationDate = exp;
    console.log(newUsedUrl.expirationDate);
    return newUsedUrl;
  }

  private _getExpDate(): string{
    const today = new Date();

  let year = today.getFullYear();
  year+= 1;
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
  }


  private _waitUntil(condition: () => boolean, maxAttempts: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let attempts = 0;

      const checkCondition = () => {
        attempts++;

        if (condition()) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error('Exceeded maximum attempts'));
        } else {
          setTimeout(checkCondition, 1000); // Check again after 1000 milliseconds
        }
      };

      checkCondition();
    });
  }
}
