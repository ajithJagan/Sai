/* tslint:disable */
/* eslint-disable */
import { LocalTime } from './local-time';
export interface RequirementPhaseDetailsDto {
  candidatePercentage?: string;
  dateOfInterview?: string;
  feedback?: string;
  interviewedBy?: string;
  jobId?: string;
  modeOfInterview?: string;
  skillOwnerId?: number;
  stage?: number;
  status?: string;
  timeOfInterview?: LocalTime;
}
