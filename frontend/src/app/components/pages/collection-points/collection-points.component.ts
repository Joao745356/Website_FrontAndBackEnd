import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DonationsService } from '../../../services/donations.service';
import { CollectionPoint } from '../../../models/collectionPoint';

@Component({
  selector: 'app-collection-points',
  templateUrl: './collection-points.component.html',
  styleUrls: ['./collection-points.component.css']
})
export class CollectionPointsComponent implements OnInit {

  map: any;
  collectionPoints: CollectionPoint[] = [];
  filteredCollectionPoints: CollectionPoint[] = [];

  constructor(private collectionPointsService: DonationsService) { }

  ngOnInit(): void {
    this.configMap();
    this.loadCollectionPoints();
  }

  // Configure map
  configMap() {
    this.map = L.map('map').setView([41.4425, -8.2918], 13);  // Adjust zoom level as needed

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  // Load collection points and add markers
  loadCollectionPoints() {
    this.collectionPointsService.getCollectionPoints().subscribe((collectionPoints: CollectionPoint[]) => {
      this.collectionPoints = collectionPoints;
      this.filteredCollectionPoints = collectionPoints;  // Initialize filtered list
      collectionPoints.forEach((point: CollectionPoint) => {
        const marker = L.marker([point.coordsLatitude, point.coordsLongitude]).addTo(this.map);
        marker.bindPopup(`<b>${point.name}</b><br>Donations Processed: ${point.numberOfDonationsProcessed}`);
      });
  })
}

  // Search for collection points
  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    console.log(`Search term: ${searchTerm}`);  // Debug statement
    this.filteredCollectionPoints = this.collectionPoints.filter(point => 
      point.name.toLowerCase().includes(searchTerm)
    );
    if(this.filteredCollectionPoints.length === 0){
      this.filteredCollectionPoints = this.collectionPoints
    }
    console.log('Filtered Collection Points:', this.filteredCollectionPoints);  // Debug statement
  }

  // Center the map on the selected collection point
  centerMapOnPoint(point: CollectionPoint) {
    this.map.setView([point.coordsLatitude, point.coordsLongitude], 15);
  }
}
