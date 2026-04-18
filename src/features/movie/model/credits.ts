export interface Cast {
  id: number;
  name: string;
  character: string;
  profileUrl: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}
