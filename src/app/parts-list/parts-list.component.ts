import { Component } from '@angular/core';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css'],
})
export class PartsListComponent {
  filterText = '';
  sortBy = 'name'; // default
  selectedId: number | null = null;
  quantity = 1;

  parts = [
    { id: 1, name: 'SSD 1TB', price: 89.99 },
    { id: 2, name: 'Mechanical Keyboard', price: 129.99 },
    { id: 3, name: 'Gaming Mouse', price: 59.99 },
  ];

  get filteredParts() {
    let list = this.parts.filter((p) =>
      p.name.toLowerCase().includes(this.filterText.toLowerCase()),
    );

    if (this.sortBy === 'name') {
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'price') {
      list = list.sort((a, b) => a.price - b.price);
    }

    return list;
  }

  selectPart(id: number) {
    this.selectedId = id;
    this.quantity = 1; // Reset quantity when a new part is selected
  }

  proceedToPurchase() {
    const selectedPart = this.parts.find((p) => p.id === this.selectedId);

    console.log('Forwarding to purchase:', {
      part: selectedPart,
      quantity: this.quantity,
    });
  }
}
