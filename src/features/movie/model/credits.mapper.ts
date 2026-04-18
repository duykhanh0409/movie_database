import { CastDTO, CrewDTO, CreditsDTO } from '@/shared/types/api';
import { Cast, Crew, Credits } from '@/features/movie/model/credits';
import { buildImageUrl } from './movie.mapper';

export function mapCastDTO(dto: CastDTO): Cast {
  return {
    id: dto.id,
    name: dto.name,
    character: dto.character,
    profileUrl: buildImageUrl(dto.profile_path, 'w500'),
  };
}

export function mapCrewDTO(dto: CrewDTO): Crew {
  return {
    id: dto.id,
    name: dto.name,
    job: dto.job,
    department: dto.department,
  };
}

export function mapCreditsDTO(dto: CreditsDTO): Credits {
  return {
    cast: dto.cast.map(mapCastDTO),
    crew: dto.crew.map(mapCrewDTO),
  };
}
