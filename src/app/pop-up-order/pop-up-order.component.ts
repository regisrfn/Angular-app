import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-pop-up-order',
  templateUrl: './pop-up-order.component.html'
})
export class PopUpOrderComponent implements OnInit {

  @Output() save: EventEmitter<{ item: Item, op: number }> = new EventEmitter();
  @Input() data: Item | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSave(item: { item: Item, op: number }) {
    this.save.emit(item)
  }

}
