
export interface Institution {
    name: string;
    _id: string;
}

export interface Location {
    name: string;
    _id: string;
}

export interface DonorEmail {
    email: string;
    _id: string;
}


export class DonationRequest{
    _id!:string;
    donor!: DonorEmail;
    institution!: Institution;
    location!: Location;
    quantity!: number;
    quality!: Quality;
    dateToCollect!: Date;
    state!: 'Waiting';

    constructor(donor:DonorEmail, instituition:Institution, location:Location, quantity:number, quality:Quality, dateToCollect:Date) {
        this.donor = donor;
        this.institution = instituition;
        this.location= location;
        this.quantity = quantity;
        this.quality= quality;
        this.dateToCollect = dateToCollect;
    }
}

export enum Quality {
    Excellent = 'Excellent',
    Good = 'Good',
    Fair = 'Fair',
    Poor = 'Poor'
  }

  export enum State {
    Waiting = 'Excellent',
    Sent = 'Good',
    Received = 'Fair',
    Forwarded = 'Poor'
  }

