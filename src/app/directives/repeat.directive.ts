import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective implements OnDestroy {

  constructor(
    private tempRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) { }

  @Input({ required: true }) set appRepeat(count: number) {
    this.vcRef.clear();

    for (let i = 0; i < count; i++) {
      this.vcRef.createEmbeddedView(this.tempRef);
    }
  }

  ngOnDestroy(): void {
    // to make sure all OnDestroy hooks from eventual Angular components
    // within the ViewContainerRef are executed (avoiding memory leaks).
    this.vcRef.clear();
  }
}
