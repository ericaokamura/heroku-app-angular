import { Component } from '@angular/core';

interface Hotel {
  id: number;
  name: string;
  address: string;
  image: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  hotels: Hotel[] = [
    {
      id: 1,
      name: 'Pullman Paris Tour Eiffel',
      address: '18 Avenue De Suffren, 22 Rue Jean Rey Entrée Au, 75015 Paris, França',
      image: '../../../assets/images/hotel_pullman.jpg',
    },
    {
      id: 2,
      name: 'Hôtel Rosalie',
      address: '8 Bis Av. de la Soeur Rosalie, 75013 Paris, França',
      image: '../../../assets/images/hotel_rosalie.jpg',
    },
    {
      id: 3,
      name: "L'Empire Paris",
      address: "48 Rue de l'Arbre Sec, 75001 Paris, França",
      image: '../../../assets/images/hotel_lempire.jpg',
    },
    {
      id: 4,
      name: 'Pavillon Monceau Hotel',
      address: "43 Rue Jouffroy d'Abbans, 75017 Paris, França",
      image: '../../../assets/images/hotel_pavillon.jpg',
    },
    {
      id: 5,
      name: 'Hôtel Château Frontenac',
      address: '54 Rue Pierre Charron, 75008 Paris, França',
      image: '../../../assets/images/hotel_chateau.jpg',
    },
  ];
}
