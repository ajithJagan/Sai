/* tslint:disable */
/* eslint-disable */
import { LocalTime } from './local-time';
export interface RequirementPhase {
  candidatePercentage?: string;
  changedAt?: string;
  changedBy?: number;
  comments?: string;
  createdAt?: string;
  createdBy?: number;
  dateOfInterview?: string;
  deletedAt?: string;
  endTimeOfInterview?: LocalTime;
  feedback?: string;
  interviewedBy?: string;
  jobId?: string;
  modeOfInterview?: string;
  percentageExpected?: string;
  requirementId?: number;
  requirementPhaseName?: string;
  skillOwnerId?: number;
  stage?: number;
  status?: string;
  timeOfInterview?: LocalTime;
}
