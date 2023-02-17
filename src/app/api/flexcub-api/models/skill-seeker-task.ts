/* tslint:disable */
/* eslint-disable */
import { SkillSeekerEntity } from './skill-seeker-entity';
import { SkillSeekerProjectEntity } from './skill-seeker-project-entity';
export interface SkillSeekerTask {
  skillSeeker?: SkillSeekerEntity;
  skillSeekerProjectEntity?: SkillSeekerProjectEntity;
  taskDescription?: string;
  taskId?: number;
  taskTitle?: string;
}
