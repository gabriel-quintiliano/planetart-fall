import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef, Host, HostBinding, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-news-ticker',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.scss']
})
export class NewsTickerComponent implements AfterViewInit {
  /* this.gap and this.animationDuration have its values bound to their corresponding
   * css custom properties via @HostBinding and their value can also be set from
   * "outside" the component via @Input. These two also have default values (important) */
  @Input() @HostBinding('style.--_gap') gap: string = '2rem';
  @Input() @HostBinding('style.--_animation-duration') animationDuration: string = '2000ms';
  @Input({ required: true }) newsText!: string;
  
  // so there is a HTMLParagraphElement so that later we can get its clientWidth
  protected count: number = 1;
  @ViewChild('paragraph') private parElem!: ElementRef<HTMLParagraphElement>;
  
  // adds this callback to window resize event
  @HostListener('window:resize') handleResize = this.utils.debounce(() => {
    this.count = this.calcNewsTextCount();
  }, 100);

  constructor(
    private curComponent: ElementRef<HTMLElement>, // NewsTickerComponent itself
    private cdr: ChangeDetectorRef, // it'll be used within `ngAfterViewInit`
    private utils: UtilsService
  ) { }

  ngAfterViewInit(): void {
    /* It's really important to wait until all fonts are downloaded from Google Fonts,
     * otherwise Angular might calculate the actual clientWidth of the <p> element
     * initially rendered with one of the fallback fonts (i.e. a different clientWidth)
     * This problem might happen in low speed connections */
    document.fonts.ready.then(() => {
      // right now, the HTMLParagraphElement is already present on DOM (thus, has height and width)
      this.count = this.calcNewsTextCount();
      // as this.count had a value in the beginning of initialization and has now changed this
      // value before the end of initialization, it's important that we tell that to Angular.
      this.cdr.detectChanges();
    })
  }

  calcNewsTextCount(): number {
    const parElemClientWidth = this.parElem.nativeElement.clientWidth;
    const curCompClientWidth = this.curComponent.nativeElement.clientWidth;

    let gap: number = parseInt(window.getComputedStyle(this.curComponent.nativeElement).getPropertyValue('gap'));
    gap = isNaN(gap) ? 0 : gap; // will be `NaN` when `gap` is not set or set with an invalid value

    // calc wrapper size - gap because we intentionally want to disregard
    // that if it appears on the end of the wrapper; divide that value for
    // the total width of the added elem (elem + gap); and finally, add 1
    // to account for the translate(-100%, 0) so no void or flicker is shown
    return Math.ceil((curCompClientWidth - gap) / (parElemClientWidth + gap)) + 1;
  }
}
