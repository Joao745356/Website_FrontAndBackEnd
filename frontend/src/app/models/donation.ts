

export interface Institution {
    name: string;
}

export interface Location {
    name: string;
}

export interface DonorEmail {
    email: string;
}

export class Donation {
    _id!:string
    donor!: DonorEmail;
    institution!: Institution;
    location!: Location;
    quantity!: number;
    quality!: Quality;
    pointsAwarded!: number;
    date!: Date;
    imageName?: string;
    state!: State;
}

export enum Quality {
    Excellent = 'Excellent',
    Good = 'Good',
    Fair = 'Fair',
    Poor = 'Poor'
  }

  export enum State {
    Waiting = 'Waiting',
    Sent = 'Sent',
    Received = 'Received',
    Forwarded = 'Forwarded'
  }